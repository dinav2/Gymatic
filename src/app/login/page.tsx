"use client";
import Link from "next/link";
import { UserLogInForm } from "@/components/UserLogInForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Label } from "@radix-ui/react-label";





export default function LoginPage() {
    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0 2xl:grid xl:grid">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "absolute right-4 top-4 md:right-8 md:top-8"
              )}
            >
              Sign Up
            </Link>
            <Label className="absolute z-20 flex items-center text-lg font-medium text-black top-4 left-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-6 w-6"
                >
                    <path d="M17.1797 5.25C15.4697 5.25 13.4297 5.9 13.4297 9V15C13.4297 18.1 15.4697 18.75 17.1797 18.75C18.8897 18.75 20.9297 18.1 20.9297 15V9C20.9297 5.9 18.8897 5.25 17.1797 5.25Z" fill="#292D32"/>
                    <path d="M6.82031 5.25C5.11031 5.25 3.07031 5.9 3.07031 9V15C3.07031 18.1 5.11031 18.75 6.82031 18.75C8.53031 18.75 10.5703 18.1 10.5703 15V9C10.5703 5.9 8.53031 5.25 6.82031 5.25Z" fill="#292D32"/>
                    <path d="M13.4303 11.25H10.5703V12.75H13.4303V11.25Z" fill="#292D32"/>
                    <path d="M22.5 15.25C22.09 15.25 21.75 14.91 21.75 14.5V9.5C21.75 9.09 22.09 8.75 22.5 8.75C22.91 8.75 23.25 9.09 23.25 9.5V14.5C23.25 14.91 22.91 15.25 22.5 15.25Z" fill="#292D32"/>
                    <path d="M1.5 15.25C1.09 15.25 0.75 14.91 0.75 14.5V9.5C0.75 9.09 1.09 8.75 1.5 8.75C1.91 8.75 2.25 9.09 2.25 9.5V14.5C2.25 14.91 1.91 15.25 1.5 15.25Z" fill="#292D32"/>
                </svg>
                Gymmatic
              </Label>
            <div className="lg:p-8">
                
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Log In
                  </h1>
                </div>
                <UserLogInForm />
              </div>
            </div>
          </div>
        </>
    )

}