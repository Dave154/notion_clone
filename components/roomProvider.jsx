'use client'
import {
    ClientSideSuspense,
    RoomProvider as RoomProviderWrapper
} from "@liveblocks/react/suspense";
import LoadingSpinner from "@/components/loadingSpinner";
import LiveCursorProvider from "@/components/liveCursorProvider";
const RoomProvider = ({roomId,children}) => {
    return (
        <RoomProviderWrapper
            id={roomId}
            initialPresence={
                {
                    cursor: null
                }
            }
        >
            <ClientSideSuspense fallback={<LoadingSpinner/>}>
                <LiveCursorProvider>
                {children}
                </LiveCursorProvider>
            </ClientSideSuspense>

        </RoomProviderWrapper>
    )
}
export default RoomProvider
