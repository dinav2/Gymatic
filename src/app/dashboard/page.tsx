"use client"
import React, {useEffect, useState} from "react";
import Image from "next/image"
import {useRouter} from "next/navigation";
import { onValue, ref } from "firebase/database";
import { rtdb } from "@/dbConfig/firebase";
import axios from "axios"
import toast from "react-hot-toast";
import logo from "@/components/images/logosinfondo.png"
import bg from "@/components/images/backgroundImg.png"


import { Icons } from "@/components/icons"
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
  
import { NewUserForm } from "@/components/NewUserForm"
import { UserTable } from "@/components/user-table"
import { UserNav } from "@/components/user-nav"

type sensores = {
    mancuerna_correcta: boolean,
    mancuerna_esta: boolean,
    nfc:   boolean,
    presencia: boolean,
    temperatura:  number
}

type Cookie = {
    id: string,
    idlogin: string
    username: string,
    iat: string,
    exp: string,
}

type User = {
    email: string,
    id: string,
    admin: boolean,
    username: string,
}

export default function DashboardPage() {
    const router = useRouter()
    const [userData, setUserData] = useState<User>()
    const [cookieData, setCookieData] = useState<Cookie>()
    const [sensorData, setSensorData] = useState<sensores>({
        mancuerna_correcta: false,
        mancuerna_esta: false,
        nfc: false,
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
        <div className="hidden flex-col 2xl:flex xl:flex lg:flex md:flex sm:flex xs:flex">
            <Image
                src={bg}
                placeholder="blur"
                quality={100}
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                    opacity: 0.4,
                }}
                alt="bg"
                className="z-0"
            />
            <div className="flex-1 space-y-4 p-8 pt-6 z-10">            
            <div className="flex items-center justify-between space-y-2 z-0 bg-transparent">    
                <div className="inline-flex items-center -mb-4">
                <Image
                    src={logo}
                    width={200}
                    height={300}
                    alt="logo"
                    className="-mr-14 -ml-16"
                />
                <h2 className="text-3xl font-bold tracking-tight">Gymatic</h2>
                </div>                            
                <UserNav />
            </div>
            <Tabs defaultValue="dashboard" className="space-y-4 z-1">
                <TabsList>
                <TabsTrigger value="dashboard">Gym</TabsTrigger>
                {userData ? ( userData.admin ? (
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
                <TabsContent value="dashboard" className="space-y-4 z-1">
                <div className="grid gap-4 grid-cols-4 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
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
                    <Card className="col-span-2">
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
                        <div className="2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm font-bold">
                            <div className="grid-container relative ">
                                {(sensorData.mancuerna_esta) ? (
                                    (sensorData.mancuerna_correcta) ? (
                                        <div className="bg-greenn">10<em>lb</em></div>
                                    ) : (
                                        <div className="bg-yelloww">10<em>lb</em></div>
                                    )
                                ) : (
                                    <div className="bg-redd">10<em>lb</em></div>
                                )}                                
                                <div className="bg-redd">10<em>lb</em></div>
                                <div className="bg-redd">15<em>lb</em></div>  
                                <div className="bg-redd">15<em>lb</em></div>
                                <div className="bg-redd">20<em>lb</em></div>
                                <div className="bg-redd">20<em>lb</em></div>  
                                <div className="bg-redd">25<em>lb</em></div>
                                <div className="bg-redd">25<em>lb</em></div>
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </TabsContent>
                {userData ? ( userData.admin ? (
                    <>
                    <TabsContent value="entradas" className="space-y-4">
                        <p>asd</p>
                    </TabsContent>
                    <TabsContent value="usuarios" className="space-y-4">
                        <UserTable />
                        <NewUserForm />

                        
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