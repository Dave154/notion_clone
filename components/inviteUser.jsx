'use client'
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useState, useTransition} from "react";
import {Button} from "@/components/ui/button";

import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {inviteUserToRoom} from "@/actions/actions";


const InviteUser = ({id}) => {
    const [email,setEmail]= useState('')
    const [isOpen,setIsOpen]= useState(false)
    const [isPending ,startTransition]=useTransition()
    const handleInvite=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        if(!id){
            return;
        }

        startTransition(async()=>{
            const {success} = await inviteUserToRoom(id,email)

            if(success){
                setIsOpen(false)
                setEmail('')
                toast.success("User Added to Room Succesfully")
            }else {
                toast.error("Failed to add User to Room")
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant='outline' >
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a user to collaborate!</DialogTitle>
                    <DialogDescription>
                       Enter the email of the user you want to invite.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInvite} className='flex gap-2'>
                    <Input
                        type='email'
                        placeholder='Email'
                        className='w-full'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Button type='submit' disabled={!email || isPending}>
                        {isPending ? 'Inviting' :" Invite"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}
export default InviteUser
