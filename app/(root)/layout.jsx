import React from 'react'
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import {auth} from "@/auth";
import {Toaster} from "@/components/ui/sonner";



const Layout = async ({children}) => {
    const session = await  auth()
    const user = session?.user
    return (
        <>
            <Header/>
            <div className='flex min-h-screen'>
                <Sidebar user={user}/>
                <div className='flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide '>{children}</div>

            </div>
            <Toaster position='top-center'/>
        </>

    )
}
export default Layout
