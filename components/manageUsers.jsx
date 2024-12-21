'use client'
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useEffect, useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useCollection} from "react-firebase-hooks/firestore";
import useOwner from "@/lib/useOwner";
import {useRoom} from "@liveblocks/react/suspense";
import {collectionGroup, query, where} from "firebase/firestore";
import {removeUserFromDocument, useUser} from "@/actions/actions";
import {db} from "@/firebase";
import {useRouter} from "next/navigation";



const ManageUsers = ({id,user}) => {
    const isOwner = useOwner(user)
    const  room =useRoom()
    const [isOpen,setIsOpen]= useState(false)
    const [isPending ,startTransition]=useTransition()
    const router = useRouter()
    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db,"rooms"),where('roomId','==', room.id))
    )
    const handleDelete=(userId)=>{
        startTransition(async()=>{
            if(!user){
                return;
            }
            const {success} = await removeUserFromDocument(room.id,userId)
            if(success){
                setIsOpen(false)
                toast.success("User Removed to Room Succesfully")
            }else {
                toast.error("Failed to remove User from Room")
            }
        })
    }
    useEffect(() => {
        if (!usersInRoom || !usersInRoom.docs) return;
        const inRoom =usersInRoom?.docs.find(doc=> doc.data().userId === user?.email)
        if(!inRoom?.data()){
            router.replace('/')
        }
    }, [usersInRoom]);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <Button asChild variant='outline' >
                <DialogTrigger>Users {usersInRoom?.docs.length} </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Users with Access</DialogTitle>
                    <DialogDescription>
                        Below is the list of users with access to this document.
                    </DialogDescription>
                </DialogHeader>
                <hr className='my-2'/>
                <div className='flex flex-col gap-2'>
                    {
                        usersInRoom?.docs.map(doc=>{
                            return <div key={doc.data().userId} className='flex items-center justify-between'>
                                <p className='font-light'>
                                    {
                                        doc.data().userId === user?.email ? `You (${doc.data().userId})`
                                            : doc.data().userId
                                    }
                                </p>
                                <div className='flex items-center gap-2'>
                                <Button variant='outline'>{doc.data().role}</Button>
                                    {
                                        (isOwner && doc.data().userId !== user?.email) && (
                                            <Button variant='destructive'
                                                    size='sm'
                                                    disabled={isPending}
                                                    onClick={()=>handleDelete(doc.data().userId)}
                                            >
                                                {
                                                    (isPending ) ? "Removing" : "X"
                                                }
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </DialogContent>
        </Dialog>

    )
}
export default ManageUsers
