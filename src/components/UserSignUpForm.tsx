"use client"

import React, { useEffect } from "react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {useRouter} from "next/navigation";
import axios from "axios";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            //toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
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
              id="username"
              placeholder="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={loading}
            />
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
              placeholder="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={loading}  
            />
          </div>
          <Button onClick={onSignup}>
            Sign Up
          </Button>
        </div>
    </div>
  )
}
