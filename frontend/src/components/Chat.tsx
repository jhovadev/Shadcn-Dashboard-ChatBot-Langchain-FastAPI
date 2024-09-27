import { ScrollArea } from '@/components/ui/scroll-area';
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

enum Role {
	USER = 'user',
	AI = 'ai',
}

type Messages = {
	role: Role;
	content: string;
};

const Chat = forwardRef<HTMLDivElement, ChatProps>(
	({ className, ...props }, ref) => {
		const [messages, setMessages] = useState<Messages[]>([
			{ role: Role.USER, content: 'Hola, ¿cómo estás?' },
			{
				role: Role.AI,
				content:
					'Estoy bien, gracias por preguntar. ¿Qué te gustaría saber?',
			},
		]);

		const { input, isLoading, complete, handleInputChange, setInput } =
			useCompletion({
				api: '/api/chat',
				headers: {
					'Content-Type': 'application/json',
				},
				streamProtocol: 'text',
				onFinish: (prompt: string, completion: string) => {
					setMessages((prev) => [
						...prev,
						{ role: Role.AI, content: completion },
					]);
				},
			});

		const sendMessage = async (event: React.FormEvent) => {
			event.preventDefault();
			if (input.trim() === '') return;

			// Añadir el mensaje del usuario
			setMessages((prev) => [
				...prev,
				{ role: Role.USER, content: input },
			]);
			setInput('');
			// Enviar el mensaje al AI
			await complete(input);
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
					<CardContent className='flex-1 space-y-4 overflow-y-auto px-4'>
						<ScrollArea className='h-[200px] w-full rounded-md border p-4'>
							{messages.map((message, index) => (
								<div
									key={index}
									className={`flex items-start ${message.role === Role.USER ? 'justify-end' : 'justify-start'}`}
								>
									{message.role === Role.USER ? (
										<>
											<div className='ml-3'>
												<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
													You
												</p>
												<p className='text-sm text-gray-700 dark:text-gray-400'>
													{message.content}
												</p>
											</div>
											<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 font-medium text-white'>
												{/* Puedes cambiar la imagen o inicial del usuario */}
												<Avatar>
													<AvatarImage src='https://i.pravatar.cc/150?img=1' />
													<AvatarFallback>
														U
													</AvatarFallback>
												</Avatar>
											</div>
										</>
									) : (
										<>
											<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 font-medium text-white'>
												{/* Cambiar la imagen o inicial del AI */}
												<Avatar>
													<AvatarImage src='https://i.pravatar.cc/150?img=2' />
													<AvatarFallback>
														A
													</AvatarFallback>
												</Avatar>
											</div>
											<div className='ml-3'>
												<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
													AI
												</p>
												<p className='text-sm text-gray-700 dark:text-gray-400'>
													{message.content}
												</p>
											</div>
										</>
									)}
								</div>
							))}
						</ScrollArea>
					</CardContent>
					<CardFooter className='flex items-center border-t border-gray-200 px-4 py-3 dark:border-gray-700'>
						<form
							onSubmit={sendMessage}
							className='flex w-full items-center'
						>
							<Input
								type='text'
								className='flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'
								placeholder='Escribe tú mensaje...'
								value={input}
								onChange={handleInputChange}
							/>
							<RecordButton
								onResult={(result) => {
									setInput(result);
								}}
							/>
							<Button
								variant='ringHover'
								disabled={isLoading}
								type='submit'
							>
								<Send />
							</Button>
						</form>
					</CardFooter>
				</Card>
			</>
		);
	}
);

Chat.displayName = 'Chat';

export default Chat;
