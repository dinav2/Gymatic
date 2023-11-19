"use client"
import React, {useEffect, useState} from "react";
import Image from "next/image"
import {useRouter} from "next/navigation";
import { onValue, set, get, ref } from "firebase/database";
import { rtdb } from "@/dbConfig/firebase";
import axios from "axios"


import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { UserTable } from "@/components/user-table"
import { UserNav } from "@/components/user-nav"

type sensores = {
    nfc: boolean,
    peso: number,
    ph:   number,
    presencia: boolean,
    temperatura:  number
}

type Cookie = {
    id: string,
    username: string,
    email: string,
    iat: string,
    exp: string,
}

type User = {
    email: string,
    id: string,
    isAdmin: boolean,
    username: string,
}

export default function DashboardPage() {
    const router = useRouter()
    const [userData, setUserData] = useState<User>()
    const [cookieData, setCookieData] = useState<Cookie>()
    const [sensorData, setSensorData] = useState<sensores>({
        nfc: false,
        peso: 0,
        ph:   0,
        presencia: false,
        temperatura:  0
    });

    useEffect(() => {
        const onSensorDataChange = async () => {
            try {
              const entriesRef = ref(rtdb, 'sensores/');
              onValue(entriesRef, (snapshot) => {
                  const data = snapshot.val();
                  setSensorData(data);
              });
            } catch (err) { 
              console.error(err);
            }
          };

        const fetchData = async () => {
            try {
                const cookie = await axios.get('/api/getToken')
                const value = JSON.parse(atob(cookie.data.data.value.split(".")[1]));          
                setCookieData(value);
                
                const usersRef = ref(rtdb, 'usuarios/' + value.id);
                onValue(usersRef, (snapshot) => {
                    const data = snapshot.val();
                    console.log(data);
                    setUserData(data);
                });
            } catch (error: any) {
                console.log(error.message);
            }
        }
        
        fetchData();
        onSensorDataChange();
    }, [])

    
    

    return (
        <>
        <div className="hidden flex-col md:flex">
            <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                <UserNav />
                </div>
            </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Gymatic</h2>
            </div>
            <Tabs defaultValue="dashboard" className="space-y-4">
                <TabsList>
                <TabsTrigger value="dashboard">Gym</TabsTrigger>
                {userData ? ( userData.isAdmin ? (
                    <>
                    <TabsTrigger value="entradas">
                        Entradas
                    </TabsTrigger>
                    <TabsTrigger value="usuarios">
                        Usuarios
                    </TabsTrigger>
                    </>
                ) : ("")): ("")
                }                                
                </TabsList>
                <TabsContent value="dashboard" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Temperatura
                        </CardTitle>
                        <Icons.thermometer className="mr-2 h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{(sensorData.temperatura != undefined || sensorData)  ? (sensorData.temperatura)+"º" : (
                        <>
                        <Skeleton className="w-[150px] h-[20px] rounded-full" />
                        </>)}
                        </div>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        PH Alberca
                        </CardTitle>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                        >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(sensorData.ph != undefined || sensorData)  ? (sensorData.ph) : (
                            <>
                            <Skeleton className="w-[150px] h-[20px] rounded-full" />
                            </>)}
                        </div>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{(sensorData.presencia == true)  ? ("Maquina ocupada") : ("Maquina desocupada")}</CardTitle>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                        >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold"></div>
                        <p className="text-xs text-muted-foreground">
                        
                        </p>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Peso
                        </CardTitle>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                        >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(sensorData.peso != undefined || sensorData)  ? (sensorData.peso+"lb") : (
                            <>
                            <Skeleton className="w-[150px] h-[20px] rounded-full" />
                            </>)}
                            </div>
                        <p className="text-xs text-muted-foreground">
                        
                        </p>
                    </CardContent>
                    </Card>
                </div>
                </TabsContent>
                {userData ? ( userData.isAdmin ? (
                    <>
                    <TabsContent value="entradas" className="space-y-4">
                        <p>asd</p>
                    </TabsContent>
                    <TabsContent value="usuarios" className="space-y-4">
                        <UserTable />
                    </TabsContent>
                    </>
                ) : ("")): ("")
                }                
            </Tabs>
            </div>
        </div>
        </>
    )
}