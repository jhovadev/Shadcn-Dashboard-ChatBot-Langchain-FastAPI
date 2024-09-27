import RecordRTC from 'recordrtc';
import { getWaveBlob } from 'webm-to-wav-converter';

export default class AudioRTC {
	stream!: MediaStream;

	recorder!: RecordRTC;

	async startRecording() {
		if (!this.recorder) {
			this.stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});

			this.recorder = new RecordRTC(this.stream, {
				type: 'audio',
			});
		}

		this.recorder.startRecording();
	}

	stopRecording(): Promise<Blob> {
		if (!this.recorder) {
			return Promise.reject('Recorder is not initialized');
		}

		return new Promise((resolve) => {
			this.recorder.stopRecording(() => {
				const blob = this.recorder.getBlob();

				resolve(blob);
			});
		});
	}

	getWaveBlob() {
		const blob = this.recorder.getBlob();

		return getWaveBlob(blob, false);
	}
}
