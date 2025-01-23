import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebarComponent';
import { Outlet } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="fixed top-0">
          <SidebarTrigger />
        </div>
        <div className="fixed right-0 top-0">
          <ModeToggle></ModeToggle>
        </div>
        <div className="">
          <Outlet></Outlet>
        </div>
      </main>
    </SidebarProvider>
  );
}
