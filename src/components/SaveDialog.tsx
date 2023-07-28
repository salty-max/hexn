import React from 'react';
import * as fs from 'fs/promises';
import {Mode} from '../hooks/useAppState.js';
import {InputField} from './InputField.js';

interface SaveDialogProps {
	buffer: Uint8Array;
	setMode: (mode: Mode) => void;
	outputPath: string;
}

export const SaveDialog = ({buffer, setMode, outputPath}: SaveDialogProps) => {
	return (
		<InputField
			label="Save to: "
			initialValue={outputPath}
			onEnter={async path => {
				try {
					await fs.writeFile(path, buffer);
					setMode(Mode.Edit);
				} catch (error) {
					console.error(error);
					setMode(Mode.Edit);
				}
			}}
			onEscape={() => setMode(Mode.Edit)}
		/>
	);
};
