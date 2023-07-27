import {Key, useInput} from 'ink';
import {BYTES_PER_LINE} from '../utils.js';

interface MovementProps {
	cursor: number;
	setCursor: React.Dispatch<React.SetStateAction<number>>;
	buffer: Uint8Array;
	isEnabled?: boolean;
}

export const handleKey = (
	key: Partial<Key>,
	cursor: number,
	setCursor: React.Dispatch<React.SetStateAction<number>>,
	buffer: Uint8Array,
) => {
	if (key.leftArrow) {
		setCursor(Math.max(0, cursor - 1));
	}
	if (key.rightArrow) {
		setCursor(Math.min(cursor + 1, buffer.byteLength - 1));
	}
	if (key.upArrow) {
		setCursor(Math.max(cursor - BYTES_PER_LINE, 0));
	}
	if (key.downArrow) {
		setCursor(Math.min(cursor + BYTES_PER_LINE, buffer.byteLength - 1));
	}
};

export const useMovement = ({
	cursor,
	setCursor,
	buffer,
	isEnabled,
}: MovementProps) => {
	useInput((_, key) => handleKey(key, cursor, setCursor, buffer), {
		isActive: isEnabled,
	});
};
