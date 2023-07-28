import {useState} from 'react';
import {BYTES_PER_LINE} from '../utils.js';

export interface CursorCommands {
	left: () => void;
	right: () => void;
	up: () => void;
	down: () => void;
}

export const useBuffer = () => {
	const [buffer, setBuffer] = useState(new Uint8Array(0));
	const [cursor, setCursor] = useState(0);

	const cursorCommands: CursorCommands = {
		left: () => setCursor(Math.max(0, cursor - 1)),
		right: () => setCursor(Math.min(cursor + 1, buffer.byteLength - 1)),
		up: () => setCursor(Math.max(cursor - BYTES_PER_LINE, 0)),
		down: () =>
			setCursor(Math.min(cursor + BYTES_PER_LINE, buffer.byteLength - 1)),
	};

	return {
		buffer,
		setBuffer,
		cursor,
		setCursor,
		cursorCommands,
	};
};
