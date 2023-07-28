import {useInput} from 'ink';
import {useState} from 'react';
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
	setBuffer: (buffer: Uint8Array) => void;
	bufferCommands: BufferCommands;
	setMode: (mode: Mode) => void;
	moveCursorRight: () => void;
	isEnabled?: boolean;
}

export const useEdit = ({
	cursor,
	buffer,
	setBuffer,
	bufferCommands,
	setMode,
	moveCursorRight,
	isEnabled,
}: ByteEditProps) => {
	const [isMSN, setIsMSN] = useState(true); // Most Significant Nibble

	useInput(
		(input, key) => {
			if (isHexChar(input)) {
				const value = parseInt(input, 16);
				const newBuffer = Uint8Array.from(buffer);

				if (isMSN) {
					newBuffer[cursor] = (value << 4) | (newBuffer[cursor]! & 0x0f);
				} else {
					newBuffer[cursor] = (newBuffer[cursor]! & 0xf0) | value;
					moveCursorRight();
				}

				setBuffer(newBuffer);
				setIsMSN(!isMSN);
				return;
			}

			if (key.leftArrow || key.rightArrow || key.upArrow || key.downArrow) {
				setIsMSN(true);
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
				setIsMSN(true);
				return;
			}

			switch (input) {
				case CommandChar.InsertByteAtCursor:
					bufferCommands.insertAtCursor(new Uint8Array([0]));
					setIsMSN(true);
					return;
				case CommandChar.InsertByteAfterCursor:
					bufferCommands.insertAfterCursor(new Uint8Array([0]));
					moveCursorRight();
					setIsMSN(true);
					return;
			}

			if (key.ctrl && input === 's') {
				return setMode(Mode.Save);
			}
		},
		{isActive: isEnabled},
	);
};
