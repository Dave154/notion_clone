'use client'

import {Input} from "@/components/ui/input";
import {useEffect, useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {doc,updateDoc} from 'firebase/firestore'
import {db} from "@/firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";
import Editor from "@/components/editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "@/components/deleteDocument";
import InviteUser from "@/components/inviteUser";
import ManageUsers from "@/components/manageUsers";
import Avatars from "@/components/avatars";
const Document = ({id,user}) => {
    const [data,loading,error]=useDocumentData(doc(db,'documents',id))
    const [input,setInput] =useState('')
    const [isUpdating,startTransition]=useTransition()
    const isOwner = useOwner(user)
    useEffect(() => {
        if(data){
            setInput(data.title)
        }
    }, [data]);

    const updateTitle=(e)=>{
        e.preventDefault()
        if(input.trim()){
            startTransition(async () =>{
                await updateDoc(doc(db,"documents",id),{
                    title:input,
                });
            })
        }
    }
    return (
        <div className='bg-white flex-1 h-full p-5'>
            <div className="flex max-w-6xl justify-between mx-auto pb-5">
                <form onSubmit={updateTitle} className='flex flex-1  gap-2'>
                    <Input
                    placeholder=''
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    />
                    <Button disabled={isUpdating} type='submit'>
                        {isUpdating ? 'Updating....': 'Update'}
                    </Button>

                    {
                        isOwner && <>
                        <InviteUser id={id}/>
                        <DeleteDocument id={id}/>
                        </>
                    }
                </form>


            </div>
            <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
                <ManageUsers id={id} user={user}/>
                <Avatars/>
            </div>
            <hr className='pb-10'/>
            <Editor/>


        </div>
    )
}
export default Document
