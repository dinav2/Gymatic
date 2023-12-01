import React, {useEffect, useState} from "react";
import { onValue, ref } from "firebase/database";
import { rtdb } from "@/dbConfig/firebase";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  type User = {
    ['nombre(s)']: string,
    ['apellido(s)']: string,
    email: string,
    id: string,
    asistencia: boolean
  }

  type Registro = {
    id: {
      id1: string
    }
  }
  
  export function UserTable() {
    const [userList, setUserList] = useState<Array<User>>([]);
    const [registroList, setRegistroList] = useState<Registro>({
      id: {
        id1: "0"
      }
    });

    useEffect(() => {
        const getUsersData = async () => {
          try {
            const userRef = ref(rtdb, 'usuarios/')
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setUserList(data);
            });
          } catch (err) { 
            console.error(err);
          }
        };

        getUsersData();
    }, [])

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
            Usuarios
            </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            { userList ? (
              Object.values(userList).map((user, index) => (
                <>
                <div className="flex items-center">
                <RadioGroup defaultValue="online">
                  <div className="flex items-center space-x-2 mr-6 ml-4">
                    {user ? (user.asistencia == true ? (
                      <RadioGroupItem value="online" id="online" is-online="true" />                      
                    ) : ( 
                      <RadioGroupItem value="online" id="online" is-online="false" />
                    )) : ("")
                      
                    }
                    
                  </div>
                </RadioGroup>

                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>{user['nombre(s)'][0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{user['nombre(s)'] + " " + user['apellido(s)']}</p>
                      <p className="text-sm text-muted-foreground">
                      {user.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium"></div>
                  </div>
                </>
              ))) : (<p>s</p>)
            }
            </div>
        </CardContent>
      </Card>
    )
  }