import { Loader, Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import AudioRTC from '../lib/AudioRTC';
import { cn } from '@/lib/utils';
import { stat } from 'fs';

const fetchAudioToText = async (audio: Blob) => {
	const formData = new FormData();

	formData.append('audio', audio);
	formData.append('timestamp', String(+new Date()));

	const data = await fetch('/api/transcribe', {
		method: 'POST',
		body: formData,
	});

	return await data.json();
};

type props = {
	onResult?: (result: { text: string }) => void;
};

enum Status {
	// 空闲
	IDLE = 'idle',
	// 记录中
	RECORDING = 'recording',
}

const labelMapper = {
	[Status.IDLE]: <Mic />,
	[Status.RECORDING]: <MicOff />,
};

const processStatusMapper = {
	[Status.IDLE]: Status.RECORDING,
	[Status.RECORDING]: Status.IDLE,
};

const audioRTC = new AudioRTC();

export default function RecordButton(props: props) {
	const [status, setStatus] = useState(Status.IDLE);
	const [loading, setLoading] = useState(false);

	const onClick = async () => {
		if (status === Status.IDLE) {
			audioRTC.startRecording();
		}

		if (status === Status.RECORDING) {
			await audioRTC.stopRecording();
			const waveBlob = await audioRTC.getWaveBlob();

			try {
				setLoading(true);

				const response = await fetchAudioToText(waveBlob);
				console.log(response);

				props.onResult?.(response);
			} catch (error) {
				props.onResult?.({ text: `${error}` });
			} finally {
				setLoading(false);
			}
		}

		setStatus(processStatusMapper[status]);
	};

	return (
		<>
			<Button
				onClick={onClick}
				variant={'destructive'}
				className={
					(cn(
						'flex justify-evenly gap-2 rounded-full transition-all'
					),
					status === Status.RECORDING ? 'bg-secondary' : 'bg-primary')
				}
			>
				{loading ? (
					<Loader className='animate-spin' />
				) : (
					labelMapper[status]
				)}
			</Button>
			{/* loading && <Loader className='animate-spin' /> */}
		</>
	);
}
