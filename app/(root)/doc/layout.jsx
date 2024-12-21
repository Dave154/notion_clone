import React from 'react'
import LiveBlocksProvider from "@/components/liveBlocksProvider";

const Layout = ({children}) => {
    return (
        <LiveBlocksProvider>
            {children}
        </LiveBlocksProvider>
    )
}
export default Layout
