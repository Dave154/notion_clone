'use client'



import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { LanguagesIcon,BotIcon } from 'lucide-react';
import { toast } from 'sonner';
import Markdown from 'react-markdown'
const langs= ['english',"spanish",'portugese','french','germany','chinese','arabic','hindi', 'japanese']
const TranslateDocument = ({doc}) => {
	const [isOpen,setIsOpen]= useState()
	const[summary,setSummary]=useState('')
	const [question, setQuestion] = useState('');
	const [language, setLanguage] = useState('');
	const [isPending, startTransition] = useTransition();
  const handleAskQuestion=(e)=> {
		e.preventDefault()
		startTransition(async()=>{
			const documentData = doc.get("document-store").toJSON()
			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}translateDocument`, {
					method:'POST',
					headers:{
						"Content-type":"application/json"
					},
					body:JSON.stringify({
						documentData,
						targetLang:language
					})
				}

		)
			if(res.ok){
				const {translated_text} = await res.json()
				setSummary(translated_text)
				toast.success('Translated Summary Successfully')

			}else{
				console.log(res)
				toast.error('Something went wrong Try again!')
			}
		})

	}
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Button asChild variant='outline' >
				<DialogTrigger>
					<LanguagesIcon/>
					Translate
				</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Translate the document</DialogTitle>
					<DialogDescription>
						Select a language and AI will translate a summary of the document in the selected language
					</DialogDescription>
		<hr className='mt-5'/>

				</DialogHeader>

				{
					summary && <div className='flex flex-col max-h-36 overflow-y-auto gap-2 p-5 bg-gray-100'>
					<div className="flex">
						<BotIcon className='w-20'/>
							<p>
								GPT {isPending ? 'is Thinking' : 'Says'}
							</p>
					</div>
					<p> {isPending ? "Thinking" : <Markdown>{summary}</Markdown>} </p>
					</div>
				}
				<form onSubmit={handleAskQuestion} className='flex justify-between gap-2'>
					<Select
						classNamm='w-full'
						value={language}
						onValueChange={(value)=>setLanguage(value)}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Choose a Language" />
						</SelectTrigger>
						<SelectContent>
							{langs.map(lang=>{
								return (
									<SelectItem key={lang} value={lang} className='capitalize'>{lang}</SelectItem>
									)
							})}
						</SelectContent>
					</Select>

					<Button type='submit' disabled={!language || isPending}>
						{isPending ? 'Translating' :" Translate"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>

	);
};
export default TranslateDocument;
