import { Home, Inbox, Calendar, Search, Settings, User2, ChevronUp, Plus, Shirt, User, ShoppingBasket } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton, SidebarSeparator } from './ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Sheet } from './ui/sheet';
import { SheetTrigger } from '@/components/ui/sheet';
import AddOrder from './AddOrder';
import AddUser from './AddUser';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';


const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

function AppSideBar() {
  return (
    <div>
      <Sidebar collapsible='icon'>
        <SidebarHeader className='py-4'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuSubButton asChild>
                <Link href={'/'} >
                  <Image src={'/logo.svg'} alt='logo' width={20} height={20} />
                  <span>Lama Dev</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator className='mx-0' />
        <SidebarContent>
          <SidebarGroup >
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {
                  items.map((item) =>
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                      {
                        item.title === 'Inbox' && <SidebarMenuBadge>9</SidebarMenuBadge>
                      }
                    </SidebarMenuItem>
                  )
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Products</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarGroupAction>
                <Plus /> <span className="sr-only">Add Product</span>
              </SidebarGroupAction>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={'/Products'}><Shirt />See All Products</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Sheet>
                      <SheetTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href={'/Products'}><Plus />  Add Product </Link>
                        </SidebarMenuButton>
                      </SheetTrigger>
                      <AddProduct />
                    </Sheet>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Sheet>
                      <SheetTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href={'/Products'}><Plus />  Add Category </Link>
                        </SidebarMenuButton>
                      </SheetTrigger>
                      <AddCategory />
                    </Sheet>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Users</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarGroupAction>
                <Plus /> <span className="sr-only">Add User</span>
              </SidebarGroupAction>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={'/users'}><User />See All users</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Sheet>
                      <SheetTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href={'/users'}><Plus />  Add User </Link>
                        </SidebarMenuButton>
                      </SheetTrigger>
                      <AddUser />
                    </Sheet>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Orders / Payments</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarGroupAction>
                <Plus /> <span className="sr-only">Add Order</span>
              </SidebarGroupAction>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={'/users'}><ShoppingBasket />See All Transactions</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Sheet>
                      <SheetTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href={'#'}><Plus />  Add Order  </Link>
                        </SidebarMenuButton>
                      </SheetTrigger>
                      <AddOrder />
                    </Sheet>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 />John Doe <ChevronUp className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>SignOut</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}

export default AppSideBar