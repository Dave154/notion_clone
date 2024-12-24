import React from 'react'
import LiveBlocksProvider from "@/components/liveBlocksProvider";
import { auth } from '@/auth';
import { redirect } from 'next/navigation'
const Layout =async ({children}) => {
    const session = await auth()
    if(!session){
        redirect('/login')
    }
    return (
        <LiveBlocksProvider>
            {children}
        </LiveBlocksProvider>
    )
}
export default Layout
