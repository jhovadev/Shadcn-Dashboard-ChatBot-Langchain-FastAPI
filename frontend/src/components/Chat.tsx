import { Separator } from '@/components/ui/separator';
import { useCompletion } from 'ai/react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
	CardContent,
} from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import RecordButton from './RecordButton';
import { XIcon, Send } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {}

const Chat = forwardRef<HTMLDivElement, ChatProps>(
	({ className, ...props }, ref) => {
		const [response, setResponse] = useState('');

		const {
			input,
			completion,
			isLoading,
			handleInputChange,
			handleSubmit,
		} = useCompletion({
			api: '/api/chat',
			headers: {
				'Content-Type': 'application/json',
			},
			streamProtocol: 'text',
		});

		const onResult = (result: { text: string }) => {
			console.log(result.text);
			setResponse(result.text);
		};
		return (
			<>
				<Card
					ref={ref}
					className=''
					{...props}
				>
					<CardHeader>
						<CardTitle className='flex justify-between'>
							Chat
							<button className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'>
								<XIcon className='h-5 w-5' />
							</button>
						</CardTitle>
						<Separator className='my-4' />
					</CardHeader>
					<CardContent className='flex-1 space-y-4 overflow-y-auto px-4 py-3'>
						<div className='flex items-start'>
							<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 font-medium text-white dark:bg-gray-600'>
								<Avatar>
									<AvatarImage src='https://github.com/shadcn.png' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</div>
							<div className='ml-3'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									John Doe
								</p>
								<p className='text-sm text-gray-700 dark:text-gray-400'>
									Hey there! How's it going?
								</p>
							</div>
						</div>
						<div className='flex items-start justify-end'>
							<div className='ml-3'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									Jane Smith
								</p>
								<p className='text-sm text-gray-700 dark:text-gray-400'>
									I'm doing great, thanks for asking!
								</p>
							</div>
							<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 font-medium text-white'>
								<Avatar>
									<AvatarImage src='https://i.pravatar.cc/150?img=33' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</div>
						</div>
						<div className='flex items-start'>
							<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 font-medium text-white dark:bg-gray-600'>
								<Avatar>
									<AvatarImage src='https://github.com/shadcn.png' />
									<AvatarFallback>IA</AvatarFallback>
								</Avatar>
							</div>
							<div className='ml-3'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									John Doe
								</p>
								<p className='text-sm text-gray-700 dark:text-gray-400'>
									That's great to hear! I was wondering if
									you'd be free to grab coffee later?
								</p>
							</div>
						</div>
						<div>
							<form onSubmit={handleSubmit}>
								<label htmlFor='ask-input'>
									Ask something:
								</label>
								<input
									id='ask-input'
									type='text'
									value={input}
									onChange={handleInputChange}
								/>

								<button type='submit'>POST</button>
							</form>

							<textarea
								value={completion}
								rows={20}
							></textarea>
						</div>
					</CardContent>
					<CardFooter className='flex items-center border-t border-gray-200 px-4 py-3 dark:border-gray-700'>
						<Input
							type='text'
							className='flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'
							placeholder='Escribe tú mensaje...'
							value={response}
						/>
						<RecordButton onResult={onResult} />
						<Button variant='ringHover'>
							<Send />
						</Button>
					</CardFooter>
				</Card>
			</>
		);
	}
);

Chat.displayName = 'Chat';

export default Chat;
