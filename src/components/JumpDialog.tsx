import React from 'react';
import {Mode} from '../hooks/useAppState.js';
import {InputField} from './InputField.js';

interface JumpDialogProps {
	setMode: (mode: Mode) => void;
	JumpToOffset: (offset: number) => void;
}

export const JumpDialog = ({setMode, JumpToOffset}: JumpDialogProps) => {
	return (
		<InputField
			label="Jump to (hex): "
			mask={/^[0-9a-f]+$/}
			onEnter={address => {
				JumpToOffset(parseInt(address, 16));
				setMode(Mode.Edit);
			}}
			onEscape={() => setMode(Mode.Edit)}
		/>
	);
};
