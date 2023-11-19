import React, {useEffect, useState} from "react";
import { onValue, set, get, ref } from "firebase/database";
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
    username: string,
    email: string,
    id: string
  }

  type Registro = {
    id: {
      id1: string
    }
  }
  
  export function RecentSales() {
    const [userList, setUserList] = useState<Array<User>>([]);
    const [registroList, setRegistroList] = useState<Array<Registro>>([]);

    useEffect(() => {
        const onSensorDataChange = async () => {
          try {
            const userRef = ref(rtdb, 'usuarios/')
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                setUserList(data);
            });
          } catch (err) { 
            console.error(err);
          }
        };

        const onRegistroDataChange = async () => {
          try {
            const userRef = ref(rtdb, 'registro/')
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                setRegistroList(data);
            });
          } catch (err) { 
            console.error(err);
          }
        };

        onSensorDataChange();
        onRegistroDataChange();
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
                    {registroList.id ? (registroList.id.id1 == user.id ? (
                      <RadioGroupItem value="online" id="online" is-Online="true" />                      
                    ) : (
                      <RadioGroupItem value="online" id="online" is-Online="false" />
                    )) : ("")
                      
                    }
                    
                  </div>
                </RadioGroup>

                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{user.username}</p>
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