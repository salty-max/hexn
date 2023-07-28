import {useInput} from 'ink';
import {useState} from 'react';

const hexRegex = /^[0-9a-fA-F]+$/;
const isHexChar = (char: string) => hexRegex.test(char);

interface ByteEditProps {
	cursor: number;
	buffer: Uint8Array;
	setBuffer: (buffer: Uint8Array) => void;
	moveCursorRight: () => void;
	isEnabled?: boolean;
}

export const useByteEdit = ({
	cursor,
	buffer,
	setBuffer,
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
		},
		{isActive: isEnabled},
	);
};
