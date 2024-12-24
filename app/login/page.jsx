// 'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import {Github} from 'lucide-react'
import Image from "next/image";
import {auth,signIn} from "@/auth";
import { redirect } from "next/navigation";
import Form from 'next/form';
const Page = async () => {
const session = await auth()
	if(session){
		redirect('/')
	}
	return (
		<main className='flex justify-center items-center min-h-screen'>
			<Card className="w-[350px] bg-gray-800">
				<CardHeader>
					<CardTitle className='text-xl text-white'>Sign In</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col justify-center items-center gap-2'>
					<Form className='w-full' action={async ()=>{
						'use server';
						await signIn('google',{ redirect: '/foo' })
					}}>
						<Button
							className="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 w-full rounded-xl text-black"

						>
							<Image
								src="/google.svg"
								alt="Google Logo"
								width={20}
								height={20}
							/>
							Sign in with Google
						</Button>
					</Form>

					<div className="flex items-center">
						<div className="w-full h-1 bg-white"></div>
						<span className="px-4 text-sm text-gray-200">OR</span>
						<div className="w-full h-1 bg-white"></div>
					</div>

					<Form className='w-full' action={async ()=>{
						'use server';
						 await signIn("github", { redirect: '/foo' });
					}}>
						<Button
							className="flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 w-full rounded-xl"
						>
							<Github />
							Sign in with GitHub
						</Button>
					</Form>

				</CardContent>
			</Card>
		</main>
	);
};
export default Page;
