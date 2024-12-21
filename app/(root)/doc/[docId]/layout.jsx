import RoomProvider from "@/components/roomProvider";


const Layout =async ({children,params }) => {
     const pparams = await params
    return (
        <RoomProvider roomId={pparams.docId}>{children}</RoomProvider>
    )
}
export default Layout
