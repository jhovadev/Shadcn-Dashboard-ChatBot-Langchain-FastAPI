import { useEffect, useState } from 'react';

function App() {
	const [response, setResponse] = useState('');

	useEffect(() => {
		fetch('/api/reply?value=hello from React APP!')
			.then((response) => response.json())
			.then((result) => setResponse(JSON.stringify(result)));
	}, []);
	return (
		<>
			<div className='flex min-h-screen flex-col items-center justify-center gap-4 text-center'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					FASTAPI + REACT TEMPLATE
				</h1>
				<code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
					{response}
				</code>
			</div>
		</>
	);
}

export default App;
