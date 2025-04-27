import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

export default function DefaultLayout({ children }) {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const isExpanded = isPinned || isHovering;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`bg-[#EEF2F6] text-white flex flex-col transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-64' : 'w-20'}
        `}
      >
        <Sidebar isExpanded={isExpanded} />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header
          isPinned={isPinned}
          setIsPinned={setIsPinned}
          isExpanded={isExpanded}
        />{' '}
        <main>
          {' '}
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#f9fafb]">
            {children}{' '}
          </div>{' '}
        </main>{' '}
      </div>
    </div>
  );
}
