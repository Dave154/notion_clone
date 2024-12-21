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
import {useRouter} from "next/navigation";
import {deleteDocument} from "@/actions/actions";
import {toast} from "sonner";


const DeleteDocument = ({id}) => {
    const router = useRouter()
    const [isOpen,setIsOpen]= useState(false)
    const [isPending ,startTransition]=useTransition()
    const handleDelete=(e)=>{
        if(!id){
            return;
        }

        startTransition(async()=>{
            const {success} = await deleteDocument(id)

            if(success){
                setIsOpen(false)
                router.replace('/')
                toast.success("Room Deleted Succesfully")
            }else {
                toast.error("Room Deleted Succesfully")
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant='destructive'>
            <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                       This will delete the document and all its content ,removing all users from theh document
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type='button'
                        variant='destructive'
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending? "Deleting" : "Delete"}
                    </Button>
                    <DialogClose>
                        <Button
                            type='button'
                            variant='secondary'
                        >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
export default DeleteDocument
