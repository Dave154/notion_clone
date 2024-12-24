import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import liveblocks from "@/lib/liveblocks";
import { adminDb } from "@/firebase-admin";
import { redirect } from "next/navigation";
export async function POST(req) {
    try {
        // Authenticate the user
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { email, name,image } = session.user;

        // Parse the request body
        const body = await req.json();
        const { room } = body;

        if (!room) {
            return NextResponse.json(
                { message: "Missing 'room' in request body" },
                { status: 400 }
            );
        }

        // Prepare Liveblocks session
        const liveblocksSession = liveblocks.prepareSession(email, {
            userInfo: {
                name,
                email,
                image
            },
        });

        // Check if the user is already in the room
        const usersInRoom = await adminDb
            .collectionGroup("rooms")
            .where("userId", "==", email)
            .get();
        const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

        if (userInRoom?.exists) {
            // Allow user to access the room with full permissions
            liveblocksSession.allow(room, liveblocksSession.FULL_ACCESS);
            const { body: sessionBody, status } = await liveblocksSession.authorize();

            return new Response(sessionBody, { status });
        } else {
            return NextResponse.json(
                { message: "You are not in this room" },
                { status: 403 }
            );
        }
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
