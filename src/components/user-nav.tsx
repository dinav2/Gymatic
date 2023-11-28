import { useRouter } from "next/navigation"
import axios from "axios"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

type Cookie = {
  id: string,
  username: string,
  email: string,
  iat: string,
  exp: string,
}
  
  export function UserNav() {
    const [cookieData, setCookieData] = useState<Cookie>()
    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            //toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            //toast.error(error.message)
        }
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const cookie = await axios.get('/api/getToken')
          const value = JSON.parse(atob(cookie.data.data.value.split(".")[1]));          
          setCookieData(value);
        } catch (error: any) {
          console.log(error.message);
        }
      }

      fetchData();
      
    }, []);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">              
              <AvatarFallback>{cookieData ? (cookieData.username[0].toUpperCase()) : ("")}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">shadcn</p>
              <p className="text-xs leading-none text-muted-foreground">
                m@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            Log out
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }