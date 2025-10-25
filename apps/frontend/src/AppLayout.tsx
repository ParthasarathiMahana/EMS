// AppLayout.tsx
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/Appsidebar"
import { Outlet } from "react-router-dom"

export function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-grow">
                <SidebarTrigger className="relative"/>
                {/* <header className="border-b p-4">Header Here</header> */}
                <main className="pl-1 pr-1">
                    <div className="h-[96vh] rounded-[8px] bg-[var(--sidebar)] p-3">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    </SidebarProvider>
  )
}
