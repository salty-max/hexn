import React from 'react';
import {Mode} from '../hooks/useAppState.js';
import {InputField} from './InputField.js';

interface JumpDialogProps {
	setMode: (mode: Mode) => void;
	JumpToOffset: (offset: number) => void;
}

export const JumpDialog = ({setMode, JumpToOffset}: JumpDialogProps) => {
	const [isHex, setIsHex] = React.useState(false);

	return (
		<InputField
			label={`Jump to (${isHex ? 'hex' : 'decimal'}): `}
			mask={/^(0x[0-9a-f]*|[0-9]*)$/}
			onChange={adress => {
				setIsHex(adress.startsWith('0x'));
			}}
			onEnter={address => {
				if (address.startsWith('0x')) {
					if (address.length > 2) {
						JumpToOffset(parseInt(address, 16));
					}
				} else {
					JumpToOffset(Number(address));
				}
				setMode(Mode.Edit);
			}}
			onEscape={() => setMode(Mode.Edit)}
		/>
	);
};
