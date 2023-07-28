import {useInput} from 'ink';
import {useEffect, useState} from 'react';
import {BufferCommands} from './useBuffer.js';
import {Mode} from './useAppState.js';

const hexRegex = /^[0-9a-fA-F]+$/;
const isHexChar = (char: string) => hexRegex.test(char);

enum CommandChar {
	InsertByteAtCursor = 'i',
	InsertByteAfterCursor = 'I',
}

interface ByteEditProps {
	cursor: number;
	buffer: Uint8Array;
	bufferCommands: BufferCommands;
	setMode: (mode: Mode) => void;
	moveCursorRight: () => void;
	isEnabled?: boolean;
}

export const useEdit = ({
	cursor,
	buffer,
	bufferCommands,
	setMode,
	moveCursorRight,
	isEnabled,
}: ByteEditProps) => {
	const [isMSN, setIsMSN] = useState(true); // Most Significant Nibble

	useEffect(() => {
		setIsMSN(true);
	}, [cursor, buffer]);

	useInput(
		(input, key) => {
			if (isHexChar(input)) {
				const value = parseInt(input, 16);

				if (isMSN) {
					buffer[cursor] = (value << 4) | (buffer[cursor]! & 0x0f);
				} else {
					buffer[cursor] = (buffer[cursor]! & 0xf0) | value;
					moveCursorRight();
				}

				setIsMSN(!isMSN);
				return;
			}

			if (input === '?') {
				return setMode(Mode.Help);
			}

			if (input === 'j') {
				return setMode(Mode.Jump);
			}

			if (input === 't') {
				return setMode(Mode.Theme);
			}

			if (key.delete || key.backspace) {
				bufferCommands.delete();
				return;
			}

			switch (input) {
				case CommandChar.InsertByteAtCursor:
					bufferCommands.insertAtCursor(new Uint8Array([0]));
					return;
				case CommandChar.InsertByteAfterCursor:
					bufferCommands.insertAfterCursor(new Uint8Array([0]));
					moveCursorRight();
					return;
			}

			if (key.ctrl && input === 's') {
				return setMode(Mode.Save);
			}
		},
		{isActive: isEnabled},
	);
};
