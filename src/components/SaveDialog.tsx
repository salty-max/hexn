import React from 'react';
import * as fs from 'fs/promises';
import path from 'path';
import {Mode} from '../hooks/useAppState.js';
import {InputField} from './InputField.js';

interface SaveDialogProps {
	buffer: Uint8Array;
	setMode: (mode: Mode) => void;
	setError: (error: string) => void;
	outputPath: string;
}

export const SaveDialog = ({
	buffer,
	setMode,
	outputPath,
	setError,
}: SaveDialogProps) => {
	return (
		<InputField
			label="Save to: "
			initialValue={outputPath}
			onEnter={async filePath => {
				try {
					await fs.writeFile(path.resolve(filePath), buffer);
					setMode(Mode.Edit);
				} catch {
					setError(`Could not save to ${filePath}`);
					setMode(Mode.Error);
				}
			}}
			onEscape={() => setMode(Mode.Edit)}
		/>
	);
};
