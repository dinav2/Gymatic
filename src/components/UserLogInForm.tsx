"use client"

import React, { useEffect } from "react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {useRouter} from "next/navigation";
import axios from "axios";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLogInForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            //toast.success("Login success");
            router.push("/dashboard");
        } catch (error:any) {
            console.log("Login failed", error.message);
            //toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading}
            />
            <Input
              id="password"
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={loading}
            />
          </div>
          <Button onClick={onLogin}>
            Log In
          </Button>
        </div>
    </div>
  )
}
