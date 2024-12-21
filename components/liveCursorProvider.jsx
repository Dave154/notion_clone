'use client';
import {useMyPresence, useOthers} from "@liveblocks/react/suspense";
import FollowPointer from "@/components/followPointer";

const LiveCursorProvider = ({children}) => {
    const [presence, updateMyPresence] =useMyPresence()
    const others = useOthers();

    const handlePointerMove =(e)=>{
        const cursor = {x:Math.floor(e.pageX),y:Math.floor(e.pageY)}
        updateMyPresence({cursor})
    }
    const handlePointerLeave =(e)=>{
        const cursor = {x:Math.floor(e.pageX),y:Math.floor(e.pageY)}
        updateMyPresence({cursor:null})
    }
    return (
        <div onPointerMove={handlePointerMove}
             onPointerLeave={handlePointerLeave}
        >
            {others.filter(other=>other.presence.cursor !== null).map(user=> {
                const {connectionId,presence,info} =user
                return  <FollowPointer
                key={connectionId}
                info={info}
                x={presence.cursor.x}
                y={presence.cursor.y}
                />
            })}
            {children}
        </div>
    )
}
export default LiveCursorProvider
