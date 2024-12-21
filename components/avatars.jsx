'use client'

import {useOthers, useSelf} from "@liveblocks/react/suspense";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Avatars = () => {
    const others = useOthers()
    const self =useSelf()
    const all =[self,...others]
    return (
        <div className='flex gap-3 items-center'>
            <p>Users currently editing this page</p>
            <div className='flex -space-x-5'>
                {all.map((user,i)=>{
                    console.log(user)
                    return  <TooltipProvider key={i} >
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className='hover:z-50'>
                                    <AvatarImage src={user?.info.image}/>
                                    <AvatarFallback>{user?.info.name.charAt()[0]}</AvatarFallback>
                            </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                {self?.id === user?.id ? "You" : user?.info.name}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                })}
            </div>

        </div>
    )
}
export default Avatars
