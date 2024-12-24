import Document from '@/components/document'
import {auth} from "@/auth";
import {redirect} from 'next/navigation'
const Page =async ({params}) => {
    const session = await auth()
    const user = session?.user
    const pparams= await params

    return (
        <div className='flex flex-col flex-1 min-h-screen'>
            <Document id={pparams.docId} user={user}/>
        </div>
    )
}
export default Page
