import { NextResponse } from "next/server";
import { cookies } from 'next/headers'


export async function GET() {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')

        const response = NextResponse.json(
            {
                message: "Token Found",
                data: token,
            }
        )
        
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
        
    }

