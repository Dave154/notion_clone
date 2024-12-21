'use client';
import NewDocumentButton from "@/components/newDocumentButton";
import {Sheet,SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import {MenuIcon} from "lucide-react";
import {useCollection} from "react-firebase-hooks/firestore";
import {auth} from "@/auth";
import {db} from "@/firebase";
import {collectionGroup,query,where} from 'firebase/firestore'
import {useEffect, useState} from "react";
import SidebarOption from "@/components/sidebarOption";

const Sidebar =  ({user}) => {

    const [groupedData, setGroupeddata]= useState({
        owner:[],
        editor:[]
    })
    const [data,loading,error]=useCollection(
        user && (
            query(collectionGroup(db,'rooms'),where('userId','==',user.email))
        )
    );
    useEffect(() => {
        if(!data){
            return;
        }
        const grouped = data.docs.reduce((acc,curr)=>{
            const roomdata= curr.data()
            if(roomdata.role === 'owner'){
                acc.owner.push({
                    id:curr.id,
                    ...roomdata
                })
            }else{
                acc.editor.push({
                    id:curr.id,
                    ...roomdata
                })

            }
            return acc
        },{
            owner :[],
            editor:[]
        })
        setGroupeddata(grouped)
    }, [data]);
    const menuOptions =(
        <>
            <NewDocumentButton/>
            {/*My documents*/}
            <div className='flex py-4 flex-col space-y-4 md:max-w-40'>
                {groupedData.owner.length === 0 ?
                    <h2 className=''>No Documents Found</h2>
                    : <>
                    <h2 className='text-gray-500 font-semibold text-sm'>My Documents</h2>
                        {
                            groupedData.owner.map(doc=>{
                                return <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>
                            })
                        }
                    </>
                }

        {/*Shared with me*/}
            <>
             <h2 className='text-gray-500 font-semibold text-sm'>
                 Shared with me
             </h2>
                {
                    groupedData.editor.map(doc=>{
                      return  <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>
                    })
                }
            </>
            </div>
        </>
    );
    return (
        <aside className='p-2 md:p-5 bg-gray-200 relative'>
            <div className='md:hidden'>
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon/>
                    </SheetTrigger>
                    <SheetContent side='left'>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>{menuOptions}</div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

            </div>
                <div className='hidden md:inline'>
                    {menuOptions}
                </div>
        </aside>
    )
}
export default Sidebar
