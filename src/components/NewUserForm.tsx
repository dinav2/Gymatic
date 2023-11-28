import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function NewUserForm() {
    const router = useRouter();

    const [newUser, setNewUser] = React.useState({
        nombre: "",
        apellido: "",
        sexo: "",
        membresia: "",
        edad: ""
    });

    const onSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup", newUser);
            console.log("Signup success", response.data);
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            //toast.error(error.message);
        }
    }

    return(
        <>
        <Popover>
            <PopoverTrigger>
            <Button variant="outline">Añadir usuario</Button>
            </PopoverTrigger>
            <PopoverContent>
            <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Nuevo usuario</h4>
                <p className="text-sm text-muted-foreground">
                Llena los campos
                </p>
            </div>
            <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="nombre">Nombre(s)</Label>
                <Input
                    id="nombre"
                    className="col-span-2 h-8"
                    value={newUser.nombre}
                    onChange={(e) => setNewUser({...newUser, nombre: e.target.value})}
                />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="apellido">Apellido(s)</Label>
                <Input
                    id="apellido"
                    className="col-span-2 h-8"
                    value={newUser.apellido}
                    onChange={(e) => setNewUser({...newUser, apellido: e.target.value})}
                />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="sexo">Sexo</Label>
                <Select>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Sexo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="femenino">Femenino</SelectItem>                                        
                    </SelectContent>
                </Select>

                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="edad">Edad</Label>
                <Input
                    id="edad"                                    
                    className="col-span-2 h-8"
                    value={newUser.edad}
                    onChange={(e) => setNewUser({...newUser, edad: e.target.value})}
                />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="membresia">Membresia</Label>
                <Input
                    id="membresia"                                    
                    className="col-span-2 h-8"
                    value={newUser.membresia}
                    onChange={(e) => setNewUser({...newUser, membresia: e.target.value})}
                />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Button onClick={onSignup}>Guardar</Button>
                </div>                
            </div>
            </div>                
            </PopoverContent>
        </Popover>
        </>
    )
}