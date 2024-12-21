'use client'
import {
	Dialog, DialogClose,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {useState, useTransition} from "react";
import {Button} from "@/components/ui/button";

import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import { BotIcon, MessageCircleCode } from 'lucide-react';
import Markdown from 'react-markdown';

const ChatToDoc = ({doc}) => {
	const [input, setInput] = useState('');
	const [summary, setSummary] = useState('');
	const [question, setQuestion] = useState('');
	const [isOpen,setIsOpen]= useState(false)
	const [isPending ,startTransition]=useTransition()
	const handleAskQuestion=(e)=> {
		e.preventDefault()
		setQuestion(input)
		startTransition(async()=>{
			try {
			const documentData = doc.get("document-store").toJSON()
			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}chatToDocument`, {
					method:'POST',
					headers:{
						"Content-type":"application/json"
					},
					body:JSON.stringify({
						documentData,
						question:input
					})
				}

			)
				const data = await res.json()
				console.log(data)
				const {message} = data.message
				console.log(message)
				setInput('')
				setQuestion('')
				setSummary(message)
				// toast.success('Question Answered')


			} catch (e) {
				console.log(e)
				toast.error('Something went wrong Try again!')

			}
		})

	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Button asChild variant='outline' >
				<DialogTrigger>
					<MessageCircleCode />
					Chat to Document
				</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chat To The Document</DialogTitle>
					<DialogDescription>
						Ask a question and shat to the document with AI
					</DialogDescription>

					{
						question &&
						<p className='mt-5 text-gray-500'>
							{question}
						</p>
					}
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
				<form onSubmit={handleAskQuestion} className='flex gap-2'>
					<Input
						type='text'
						placeholder='........'
						className='w-full'
						value={input}
						onChange={(e)=>setInput(e.target.value)}
					/>
					<Button type='submit' disabled={!input || isPending}>
						{isPending ? 'Asking' :" Ask"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>

	)
}
export default ChatToDoc
