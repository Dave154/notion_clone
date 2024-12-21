'use client';
import {useRoom} from '@liveblocks/react/suspense'
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "lucide-react";
import {LiveblocksYjsProvider} from "@liveblocks/yjs";
import * as Y from 'yjs'
import BlockNote from "@/components/blockNote";
import TranslateDocument from '@/components/translateDocument';
import ChatToDoc from '@/components/chatToDoc';
const Editor = () => {
    const room = useRoom()
    const [doc,setDoc]= useState()
    const [darkMode,setDarkMode]= useState(false)
    const [provider , setProvider]= useState()

    useEffect(() => {
        const yDoc = new Y.Doc();
        const yProvider= new LiveblocksYjsProvider(room,yDoc)

        setDoc(yDoc)
        setProvider(yProvider)

        return ()=>{
            yDoc?.destroy()
            yProvider?.destroy()
        }
    }, [room]);
    if (!doc || !provider) {
        return null;
    }

    const style = `hover:text-white ${darkMode ? 'text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700'
        :'text-gray-700 bg-gray-200  hover:bg-gray-300 hover:text-gray-700'}`
    return (
        <div className='max-w-6xl mx-auto'>
            <div className="flex items-center gap-2 justify-end mb-10">
               <TranslateDocument doc={doc}/>
               <ChatToDoc doc={doc}/>

                <Button className={style} onClick={()=>setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon/> : <MoonIcon/>}
                </Button>
            </div>
            <BlockNote doc={doc} provider={provider} darkMode={darkMode}/>
        </div>
    )
}
export default Editor
