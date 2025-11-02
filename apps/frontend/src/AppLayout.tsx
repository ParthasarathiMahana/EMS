// AppLayout.tsx
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/Appsidebar"
import { Outlet } from "react-router-dom"

export function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-grow">
                {/* <SidebarTrigger className="relative"/> */}
                {/* <header className="border-b p-4">Header Here</header> */}
                <main className="px-1 py-0.5 ">
                    <div className="h-[99vh] my-0.5 rounded-lg bg-[var(--sidebar)] p-3 overflow-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    </SidebarProvider>
  )
}
