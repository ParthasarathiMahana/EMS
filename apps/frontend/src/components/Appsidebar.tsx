// components/AppSidebar.tsx
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader
  } from './ui/sidebar'

import { Plane, LogOut, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { ModeToggle } from './mode-toggle'
import { useQueryClient } from '@tanstack/react-query'
import { useLogout } from '../services/auth.query'
import { toast } from 'sonner'
import { SidebarTrigger } from './ui/sidebar'
  
  export function AppSidebar() {
    const navigate = useNavigate()
    const { mutateAsync: logout} = useLogout()
    const queryClient = useQueryClient()

    const handleLogout = async() => {
      // localStorage.removeItem("auth_token")
      
      try {
        await logout()
        await queryClient.cancelQueries()
        queryClient.removeQueries()          // remove all query cache
        queryClient.clear()
        navigate("/login", { replace: true })
      } catch (error) {
        console.log(error);
        toast.error("Logout failed")
      }
    }

    return (
      <Sidebar side="left" variant="sidebar" collapsible="icon" className='static'>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className='flex items-center justify-end mr-2'>
                <SidebarTrigger/>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        
  
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>

              <SidebarMenuItem className='flex items-center justify-center'>
                  <SidebarMenuButton asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className='flex items-center justify-center'>
                  <SidebarMenuButton asChild>
                    <Link to="/leave-request" className="flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      <span>Leave Request</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
  
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
  
        <SidebarFooter>
          <SidebarMenu className='gap-2 flex flex-col justify-center'>
            <SidebarMenuItem className='flex items-center justify-center'>
              <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
            <ModeToggle classNames='border-t border-[var(--border)] py-2'/>
        </SidebarFooter>
      </Sidebar>
    )
  }
  