// components/AppSidebar.tsx
import {
    Sidebar,
    SidebarContent,
    // SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
  } from './ui/sidebar'

  import { Home, User } from "lucide-react"
  import { Link } from "react-router-dom"
  import { ModeToggle } from './mode-toggle'
  
  export function AppSidebar() {
    return (
      <Sidebar side="left" variant="sidebar" collapsible="icon" className='static'>
        {/* <SidebarHeader>
          <div className="p-4 font-bold">Hyperloop</div>
        </SidebarHeader> */}
  
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
  
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
  
        <SidebarFooter>
            <ModeToggle classNames=''/>
          {/* <div className="p-4">Logout</div> */}
        </SidebarFooter>
      </Sidebar>
    )
  }
  