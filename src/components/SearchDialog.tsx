import React from 'react';
import {Mode} from '../hooks/useAppState.js';
import {InputField} from './InputField.js';
import {ColoredText} from './ColoredText.js';

interface SearchDialogProps {
	setMode: (mode: Mode) => void;
	searchForSequence: (search: Uint8Array) => boolean;
}

export const SearchDialog = ({
	setMode,
	searchForSequence,
}: SearchDialogProps) => {
	const [showNotFound, setShowNotFound] = React.useState(false);

	return (
		<>
			{showNotFound && <ColoredText>Sequence not found</ColoredText>}
			<InputField
				label="Search for bytes (hex): "
				mask={/^([0-9a-f]*\s*?)$/}
				onChange={() => {
					if (showNotFound) setShowNotFound(false);
				}}
				onEnter={byteSequence => {
					const byteArray = byteSequence.split('/s/').flatMap(byte => {
						const out = [];
						let p = parseInt(byte, 16);

						do {
							out.push(p & 0xff);
							p >>>= 8; // zero fill right shift
						} while (p > 255);

						return out;
					});

					if (!searchForSequence(new Uint8Array(byteArray)))
						setShowNotFound(true);
					else setMode(Mode.Edit);
				}}
				onEscape={() => setMode(Mode.Edit)}
			/>
		</>
	);
};
