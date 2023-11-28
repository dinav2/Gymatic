import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { get, ref } from "firebase/database"
import { rtdb, auth } from "@/dbConfig/firebase";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Authenticate the user with Firebase Authentication
    try {
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;

      // // Retrieve user data from Firebase Realtime Database
      // const userRef = ref(rtdb, 'usuarios/' + user.uid);
      // const userSnapshot = await get(userRef);
      // const userData = userSnapshot.val();

      // if (userData) {
      //   // Create token data
      //   const tokenData = {
      //     id: user.uid,
      //     username: userData.nombre || '', // Check if 'username' exists, and provide a default value
      //     email: user.email,
      //     isVerified: userData.isVerified,
      //   };

      //   // Create token
      //   const token = jwt.sign(tokenData, "iotToken", { expiresIn: "1d" });

      //   const response = NextResponse.json({
      //     message: "Login successful",
      //     success: true,
      //   });
      //   response.cookies.set("token", token, {
      //     httpOnly: true,
      //   });

      const userRef = ref(rtdb, 'usuarios/' + email);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();

      if (userData) {
        // Create token data
        const tokenData = {
          id: email,
          username: userData['nombre(s)'] || '', // Check if 'username' exists, and provide a default value
        };

        // Create token
        const token = jwt.sign(tokenData, "iotToken", { expiresIn: "1d" });

        const response = NextResponse.json({
          message: "Login successful",
          success: true,
        });
        response.cookies.set("token", token, {
          httpOnly: true,
        });



        return response;
      } else {
        return NextResponse.json({ error: "User data not found" }, { status: 400 });
      }
    } catch (error: any) {
      // Handle Firebase Authentication errors
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } catch (error: any) {
    // Handle general request parsing errors
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
