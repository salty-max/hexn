import {Key, useInput} from 'ink';
import {CursorCommands} from './useBuffer.js';

interface MovementProps {
	cursorCommands: CursorCommands;
	isEnabled?: boolean;
}

export const handleKey = (
	key: Partial<Key>,
	cursorCommands: CursorCommands,
) => {
	if (key.leftArrow) {
		cursorCommands.left();
	}
	if (key.rightArrow) {
		cursorCommands.right();
	}
	if (key.upArrow) {
		cursorCommands.up();
	}
	if (key.downArrow) {
		cursorCommands.down();
	}
};

export const useMovement = ({cursorCommands, isEnabled}: MovementProps) => {
	useInput((_, key) => handleKey(key, cursorCommands), {
		isActive: isEnabled,
	});
};
