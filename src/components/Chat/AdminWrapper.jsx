// AdminApp.jsx or your main admin component (continued)
import React from 'react';
import AdminChatPanel from './AdminChatPanel';
import '../../assets/css/style.css';

function AdminApp() {
  // Generate a unique admin ID or use a fixed ID for this admin panel
  const adminId =
    localStorage.getItem('adminId') ||
    `admin_${Math.random().toString(36).substring(2, 9)}`;

  // Store the ID in localStorage for persistence
  React.useEffect(() => {
    if (!localStorage.getItem('adminId')) {
      localStorage.setItem('adminId', adminId);
    }
  }, [adminId]);

  return (
    <div className="AdminApp">
      <AdminChatPanel adminId={adminId} />
    </div>
  );
}

export default AdminApp;
