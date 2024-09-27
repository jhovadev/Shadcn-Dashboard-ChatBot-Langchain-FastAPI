import { useState } from 'react';
import RecordButton from './components/RecordButton';

function App() {
	const [response, setResponse] = useState('');

	const onResult = (result: { text: string }) => {
		console.log(result.text);
		setResponse(result.text);
	};

	return (
		<>
			<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'></div>
			<main className='flex min-h-screen flex-col items-center justify-center gap-4'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					WhisperAI + RecordRTC
				</h1>
				<RecordButton onResult={onResult} />
				<p className='text-xl text-muted-foreground'>{response}</p>
			</main>
		</>
	);
}

export default App;
