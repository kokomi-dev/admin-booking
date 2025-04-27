import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import '../../assets/css/style.css';
import clsx from 'clsx';
import { RiUserLine } from 'react-icons/ri';
import { BsSend } from 'react-icons/bs';
import { MdMessage } from 'react-icons/md';

const AdminChatPanel = ({ adminId }) => {
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [conversations, setConversations] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Connect to WebSocket server when component mounts
  useEffect(() => {
    const actualAdminId = adminId || 'admin123';
    const newSocket = io(import.meta.env.VITE_PORT_SERVER);
    setSocket(newSocket);

    // Set up connection event immediately
    newSocket.on('connect', () => {
      setIsConnected(true);

      // Register as admin with specific ID
      newSocket.emit('register', { userId: actualAdminId, isAdmin: true });
    });

    // Clean up when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [adminId]);

  // Set up event listeners when socket is created
  useEffect(() => {
    if (!socket) return;

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('all_conversations', (allConversations) => {
      const convMap = {};
      allConversations.forEach((conv) => {
        convMap[conv.userId] = conv.messages;
      });
      setConversations(convMap);

      // Scroll to bottom after conversations load (with delay to ensure DOM update)
      setTimeout(() => scrollToBottom(), 100);
    });

    socket.on('user_connected', ({ userId, socketId }) => {
      setActiveUsers((prev) => {
        if (!prev.find((user) => user.userId === userId)) {
          return [...prev, { userId, socketId, hasNewMessage: false }];
        }
        return prev;
      });
    });

    socket.on('user_disconnected', ({ userId }) => {
      console.log('User disconnected:', userId);
      setActiveUsers((prev) => prev.filter((user) => user.userId !== userId));
    });

    socket.on('new_message', (data) => {
      setConversations((prev) => {
        const updatedConversations = { ...prev };
        if (!updatedConversations[data.userId]) {
          updatedConversations[data.userId] = [];
        }
        updatedConversations[data.userId] = [
          ...(updatedConversations[data.userId] || []),
          data,
        ];
        return updatedConversations;
      });

      // Visual notification for new message if not from selected user
      if (selectedUser !== data.userId) {
        setActiveUsers((prev) =>
          prev.map((user) =>
            user.userId === data.userId
              ? { ...user, hasNewMessage: true }
              : user,
          ),
        );
      } else {
        // If this is a message for the currently selected user, scroll to bottom
        setTimeout(() => scrollToBottom(), 50);
      }

      // Add user to active users if they're not already there
      setActiveUsers((prev) => {
        if (!prev.find((user) => user.userId === data.userId)) {
          return [
            ...prev,
            {
              userId: data.userId,
              socketId: 'unknown',
              hasNewMessage: selectedUser !== data.userId,
            },
          ];
        }
        return prev;
      });
    });

    socket.on('admin_message_sync', (data) => {
      // Update conversations with messages from other admins
      setConversations((prev) => {
        const updatedConversations = { ...prev };
        if (!updatedConversations[data.userId]) {
          updatedConversations[data.userId] = [];
        }
        updatedConversations[data.userId] = [
          ...(updatedConversations[data.userId] || []),
          data,
        ];
        return updatedConversations;
      });

      // If this is a message for the currently selected user, scroll to bottom
      if (selectedUser === data.userId) {
        setTimeout(() => scrollToBottom(), 50);
      }
    });

    // Clean up event listeners
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('all_conversations');
      socket.off('user_connected');
      socket.off('user_disconnected');
      socket.off('new_message');
      socket.off('admin_message_sync');
    };
  }, [socket, adminId, selectedUser]);

  // Function to handle scrolling to bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Auto-scroll to bottom when messages update or selected user changes
  useEffect(() => {
    if (selectedUser) {
      scrollToBottom();
    }
  }, [conversations, selectedUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket && selectedUser) {
      const messageData = {
        userId: selectedUser,
        message: message.trim(),
        content: message.trim(),
        fromUser: false,
        fromAdmin: true,
        timestamp: new Date().toISOString(),
      };
      socket.emit('admin_message', messageData);
      setMessage('');

      // Scroll xuống sau gửi tin
      setTimeout(() => scrollToBottom(), 50);
    }
  };

  const selectUser = (userId) => {
    setSelectedUser(userId);

    // Clear new message flag for this user
    setActiveUsers((prev) =>
      prev.map((user) =>
        user.userId === userId ? { ...user, hasNewMessage: false } : user,
      ),
    );

    // Scroll to bottom when selecting a user (with delay to ensure DOM update)
    setTimeout(() => scrollToBottom(), 100);
  };
  return (
    <div className="flex h-screen bg-gray-100 mt-3">
      {/* Sidebar - User List */}
      <aside className="sticky top-0 w-64 bg-white border-r border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-blue-600 text-white">
          <h2 className="text-lg font-semibold">Quản lý người dùng</h2>
          <div className="flex items-center mt-2 text-sm">
            <span
              className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-400' : 'bg-red-500'}`}
            ></span>
            <span>{isConnected ? 'Đã kết nối' : 'Mất kết nối'}</span>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {activeUsers.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Không có người dùng nào đang hoạt động
            </div>
          ) : (
            <ul>
              {activeUsers.map((user) => (
                <li
                  key={user.userId}
                  className={`border-b border-gray-100 cursor-pointer transition-colors duration-150 ${
                    selectedUser === user.userId
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectUser(user.userId)}
                >
                  <div className="flex items-center p-3 relative">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                      <RiUserLine size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        Người dùng {user.userId}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {conversations[user.userId] &&
                        conversations[user.userId].length > 0
                          ? (
                              conversations[user.userId][
                                conversations[user.userId].length - 1
                              ].message ||
                              conversations[user.userId][
                                conversations[user.userId].length - 1
                              ].content ||
                              ''
                            ).substring(0, 20) + '...'
                          : 'Chưa có tin nhắn'}
                      </p>
                    </div>
                    {user.hasNewMessage && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center shadow-md">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                <RiUserLine size={20} />
              </div>
              <div>
                <h3 className="font-medium">Người dùng {selectedUser}</h3>
                <p className="text-xs text-gray-500">
                  {isConnected ? 'Đang trực tuyến' : 'Ngoại tuyến'}
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 max-h-[400px] overflow-y-auto p-4 bg-gray-50"
            >
              {!conversations[selectedUser] ||
              conversations[selectedUser].length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Chưa có tin nhắn với người dùng này
                </div>
              ) : (
                conversations[selectedUser].map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${msg.fromUser ? 'flex justify-start' : 'flex justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm ${
                        msg.fromUser
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      <p className="break-words">
                        {msg.content || 'Không có nội dung'}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={sendMessage}
              className="border-t border-gray-200 bg-white p-4 flex"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn của bạn..."
                disabled={!isConnected}
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!isConnected || !message.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <BsSend size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-500">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <MdMessage size={32} />
            </div>
            <h3 className="text-xl font-medium mb-2">
              Chọn người dùng để bắt đầu trò chuyện
            </h3>
            <p className="text-sm">
              Tất cả các cuộc hội thoại với người dùng sẽ xuất hiện ở đây
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminChatPanel;
