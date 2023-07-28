import {useInput} from 'ink';
import * as fs from 'fs/promises';

interface SaveProps {
	buffer: Uint8Array;
	outputPath: string;
	isEnabled?: boolean;
}

const handleSave = async (buffer: Uint8Array, outputPath: string) => {
	try {
		await fs.writeFile(outputPath, buffer);
	} catch (error) {
		console.error(error);
	}
};

export const useSave = ({buffer, outputPath, isEnabled}: SaveProps) => {
	useInput(
		input => {
			if (input === 's') {
				handleSave(buffer, outputPath);
			}
		},
		{isActive: isEnabled},
	);
};
