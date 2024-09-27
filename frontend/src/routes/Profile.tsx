import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
	CardContent,
} from '@/components/ui/card';
import { GithubIcon, TwitterIcon } from 'lucide-react';

export default function Profile() {
	return (
		<>
			<Card className='w-full max-w-3xl'>
				<CardContent className='space-y-4'>
					<div className='flex items-center space-x-4'>
						<div className='h-20 w-20 overflow-hidden rounded-full border-2 border-white'>
							<img
								src='/placeholder.svg'
								width='80'
								height='80'
								alt='Avatar'
								style={{
									aspectRatio: '80/80',
									objectFit: 'cover',
								}}
							/>
						</div>
						<div className='space-y-1.5'>
							<h1 className='text-2xl font-bold'>Jane Doe</h1>
							<p className='text-gray-500 dark:text-gray-400'>
								Expert in all things. Passionate about web
								development and design.
							</p>
						</div>
					</div>
					<dl className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<dt className='font-semibold'>Location</dt>
							<dd>San Francisco, CA</dd>
						</div>
						<div className='space-y-2'>
							<dt className='font-semibold'>Occupation</dt>
							<dd>Product Manager</dd>
						</div>
					</dl>
				</CardContent>
				<CardFooter className='border-t p-4'>
					<div className='flex justify-end space-x-2'>
						<Button
							size='sm'
							variant='outline'
						>
							<TwitterIcon className='h-4 w-4' />
							Twitter
						</Button>
						<Button
							size='sm'
							variant='outline'
						>
							<GithubIcon className='h-4 w-4' />
							GitHub
						</Button>
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
