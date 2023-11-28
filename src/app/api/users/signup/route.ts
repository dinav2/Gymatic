import { NextRequest, NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref } from "firebase/database"
import { rtdb, auth } from "@/dbConfig/firebase";



export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { nombre, apellido, edad, membresia, sexo } = reqBody;
        console.log(reqBody);


        try {
            // // Create a new user with Firebase Authentication
            // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // const user = userCredential.user;

            // // Store user data in Firebase Realtime Database
            // const userRef = ref(rtdb, 'usuarios/' + user.uid);
            // await set(userRef, {
            //     username,
            //     email,
            //     id,
            //     isAdmin,
            // });

            const userRef = ref(rtdb, 'usuarios/' + membresia);
            await set(userRef, {
                admin: false,
                'apellido(s)': apellido,
                asistencia: false,
                edad: edad,
                fecha_fin:"",
                fecha_inicio: "",
                membresia: true,
                'nombre(s)': nombre,
                sexo: sexo                
            });


            return NextResponse.json({
                message: "User created successfully",
                success: true
            });
        } catch (error: any) {
            // Handle Firebase Authentication or Realtime Database errors
            console.error("Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } catch (error: any) {
        // Handle general request parsing error
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}