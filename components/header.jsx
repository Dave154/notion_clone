import {auth,signIn,signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {CircleUser} from 'lucide-react'
import Form from "next/form";
import  Link from 'next/link'
import Breadcrumbs from "@/components/breadcrumbs";
const Header = async () => {
    const session = await auth()
    return (
       <header className=''>
                   <nav className='flex items-center justify-between p-3'>
                       {

                           session?.user && <Link href='/' className='font-bold text-2xl'>{session.user?.name}{`'s`} Space</Link>
                       }
                        <Breadcrumbs/>

                       <div className=''>
                           {
                               session ?
                                   <div className='flex gap-3'>

                                       <Form action={async()=>{
                                           'use server';
                                           await signOut()
                                       }}>
                                           <Button>SignOut</Button>

                                       </Form>
                                       <Avatar>
                                           <AvatarImage src={session.user?.image} />
                                           <AvatarFallback><CircleUser/></AvatarFallback>
                                       </Avatar>

                                   </div>


                                   :
                                   <Form action={async()=>{
                                       'use server';
                                       await signIn()
                                   }}>
                                       <Button>SignIn</Button>

                                   </Form>

                           }
                       </div>
                   </nav>
       </header>
    )
}
export default Header
