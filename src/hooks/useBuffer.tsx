import {useState} from 'react';
import {BYTES_PER_LINE, HEXVIEW_H} from '../utils.js';

export interface CursorCommands {
	left: () => void;
	right: () => void;
	up: () => void;
	down: () => void;
}

const isCursorVisible = (cursor: number, offset: number) => {
	return cursor >= offset && cursor < offset + HEXVIEW_H * BYTES_PER_LINE;
};

export const useBuffer = () => {
	const [buffer, setBuffer] = useState(new Uint8Array(0));
	const [cursor, setCursor] = useState(0);
	const [offset, setOffset] = useState(0);

	const cursorCommands: CursorCommands = {
		left: () => {
			const newCursor = Math.max(0, cursor - 1);
			setCursor(newCursor);

			if (!isCursorVisible(newCursor, offset)) {
				setOffset(offset - BYTES_PER_LINE);
			}
		},
		right: () => {
			const newCursor = Math.min(buffer.byteLength - 1, cursor + 1);
			setCursor(newCursor);

			if (!isCursorVisible(newCursor, offset)) {
				setOffset(offset + BYTES_PER_LINE);
			}
		},
		up: () => {
			const newCursor = Math.max(0, cursor - BYTES_PER_LINE);
			setCursor(newCursor);

			if (!isCursorVisible(newCursor, offset)) {
				setOffset(offset - BYTES_PER_LINE);
			}
		},
		down: () => {
			const newCursor = Math.min(
				buffer.byteLength - 1,
				cursor + BYTES_PER_LINE,
			);
			setCursor(newCursor);

			if (!isCursorVisible(newCursor, offset)) {
				setOffset(offset + BYTES_PER_LINE);
			}
		},
	};

	return {
		buffer,
		setBuffer,
		cursor,
		setCursor,
		offset,
		setOffset,
		cursorCommands,
	};
};
