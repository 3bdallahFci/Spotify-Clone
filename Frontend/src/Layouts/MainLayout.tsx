import React from 'react'
import { Outlet } from 'react-router-dom'
import { ResizablePanelGroup,ResizablePanel,ResizableHandle } from '@/components/ui/resizable'
import LeftSidebar from '@/components/ui/LeftSidebar';
import FirendActivity from '@/pages/FriendActivity';
import AudioPlayer from '@/components/AudioPlayer';

const MainLayout = () => {
  return (
    <div className='flex flex-col bg-black text-white h-screen'>
      <ResizablePanelGroup direction='horizontal'>
        <AudioPlayer />
          {/* left Sidebar */}
            <ResizablePanel minSize={10} defaultSize={20} maxSize={30} className="bg-black-900 border-r border-gray-700 p-4">
                <LeftSidebar />
            </ResizablePanel>

            <ResizableHandle className="bg-gray-700 w-1 cursor-col-resize hover:bg-gray-500"/>

            <ResizablePanel defaultSize={60}  >
                <Outlet />
            </ResizablePanel>

            <ResizableHandle className="bg-gray-700 w-1 cursor-col-resize hover:bg-gray-500"/>

            <ResizablePanel maxSize={25} minSize={0} defaultSize={20} collapsedSize={0}>
                    <FirendActivity />
            </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
};

export default MainLayout