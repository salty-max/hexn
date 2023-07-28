import {useInput} from 'ink';
import {useState} from 'react';
import {BufferCommands} from './useBuffer.js';

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
	moveCursorRight: () => void;
	isEnabled?: boolean;
}

export const useByteEdit = ({
	cursor,
	buffer,
	setBuffer,
	bufferCommands,
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

			if (key.delete || key.backspace) {
				return bufferCommands.delete();
			}

			switch (input) {
				case CommandChar.InsertByteAtCursor:
					return bufferCommands.insertAtCursor(new Uint8Array([0]));
				case CommandChar.InsertByteAfterCursor:
					bufferCommands.insertAfterCursor(new Uint8Array([0]));
					moveCursorRight();
					return;
			}
		},
		{isActive: isEnabled},
	);
};
