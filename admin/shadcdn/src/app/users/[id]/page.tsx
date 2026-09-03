import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { BadgeCheck, Candy, Citrus, Shield } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '../../components/ui/badge'
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"
import EditUser from '../../components/EditUser'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { AppLineChart } from '../../components/AppLineChart'

function userPage() {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Belal Wael</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='mt-4 flex flex-col xl:flex-row gap-8'>
                {/* Left */}
                <div className='w-full xl:w-1/3 space-y-6'>
                    <div className='bg-primary-foreground rounded-lg p-4'>
                        <h1 className='text-xl font-semibold'>Users Badges</h1>
                        <div className='flex gap-4 mt-4'>
                            <HoverCard>
                                <HoverCardTrigger><BadgeCheck size={36} className='rounded-full bg-blue-500/30 border border-blue-500/50 p-2' /> </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className='font-bold mb-2'>Verified User</h1>
                                    <p className='text-muted-foreground'>this user has been verified by the admin</p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger><Shield size={36} className='rounded-full bg-green-500/30 border border-green-500/50 p-2' /> </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className='font-bold mb-2'>Admin</h1>
                                    <p className='text-muted-foreground'>    Admin users have access to all features and can manage
                                        users.</p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger><Candy size={36} className='rounded-full bg-yellow-500/30 border border-yellow-500/50 p-2' /> </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className='font-bold mb-2'>Awarded</h1>
                                    <p className='text-muted-foreground'>This user has been awarded for their contributions.</p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger><Citrus size={36} className='rounded-full bg-orange-500/30 border border-orange-500/50 p-2' /> </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className='font-bold mb-2'>Popular</h1>
                                    <p className='text-muted-foreground'>This user has been popular in the community.</p>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                         <div className='bg-primary-foreground rounded-lg p-4 space-y-2'>
                       <div className='flex  items-center gap-2 '>
                        <Avatar className='size-12'  >
                            <AvatarImage src={"https://avatars.githubusercontent.com/ui/1486366"}/>
                            <AvatarFallback>BW</AvatarFallback>
                        </Avatar>
                         <h1 className='text-xl font-semibold'>Belal Wael</h1>
                       </div>
                       <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate dolore fuga mollitia ut quaerat obcaecati veniam quia, unde quasi dolorem! Tempora, ratione molestiae neque veniam similique possimus voluptatum ipsum repudiandae?</p>
                    </div>
                    <div className='bg-primary-foreground rounded-lg p-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-xl font-semibold'>User Information</h1>
                            <Sheet>
                                <SheetTrigger asChild>
                                <button className='bg-white text-black font-semibold rounded-lg px-2 py-1'>Edit User</button>
                                </SheetTrigger>
                                 <EditUser/>
                            </Sheet>
                        </div>
                        <div className='space-y-4 mt-4'>
                            <div className='flex flex-col gap-2 mb-8'>
                                <p className='text-sm text-muted-foreground'>Profile Completion</p>
                                <Progress value={33} />
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold'>Full Name :</span>
                                <span>Belal Wael </span>
                            </div>

                            <div className='flex items-center gap-2'>
                                <span className='font-bold'>Email:</span>
                                <span>belalwael@gmail.com </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold'>Phone:</span>
                                <span>012345678952</span>
                            </div>
                            <div className='flex     items-center gap-2'>
                                <span className='font-bold'>Address:</span>
                                <span>Egypt </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold'>City:</span>
                                <span>Cairo </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold'>Role:</span>
                                <Badge>Admin </Badge>
                            </div>
                            <p className='text-sm text-muted-foreground mt-4'>Joined on 2025.01.01</p>
                        </div>
                    </div>

                </div>
                {/* Right */}
                <div className='w-full xl:w-2/3 space-y-6'>
               
                    <div className='bg-primary-foreground rounded-lg p-4 space-y-4'>
                        <h1 className='text-xl font-semibold'>User Activity</h1>
                        <AppLineChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default userPage