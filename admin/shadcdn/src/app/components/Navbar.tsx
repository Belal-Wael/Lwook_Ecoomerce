"use client"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/src/app/components/ui/avatar"
import { LogOut, Moon, Settings, Sun, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/app/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { SidebarTrigger } from "./ui/sidebar"

function Navbar() {
    
     const { setTheme } = useTheme()

    return (
        <nav className='p-4 flex items-center justify-between sticky top-0 bg-background z-10'>
            {/* LEFT */}
            <SidebarTrigger/>
            {/* RIGHT */}
            <div className='flex items-center gap-4'>
                <Link href='/dashboard'>Dashboard</Link>
                {/* Theme Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://avatars.githubusercontent.com/u/1486366" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><User className='mr-2 h-[w-[1.2rem] w-[1.2rem]' /> Profile</DropdownMenuItem>
                        <DropdownMenuItem> <Settings className='mr-2 h-[w-[1.2rem] w-[1.2rem]' /> Settings </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive"><LogOut className='mr-2 h-[w-[1.2rem] w-[1.2rem]' />LogOut </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>



            </div>
        </nav>
    )
}

export default Navbar