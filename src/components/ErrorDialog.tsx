import {Box, Text, useInput} from 'ink';
import React from 'react';
import {Mode} from '../hooks/useAppState.js';

type ErrorDialogProps = {
	error: string;
	setMode: (mode: Mode) => void;
};
export const ErrorDialog = ({error, setMode}: ErrorDialogProps) => {
	useInput((_, key) => {
		if (key.escape) {
			setMode(Mode.Edit);
		}
	});

	return (
		<Box>
			<Text color="red" bold>
				Error:{' '}
			</Text>
			<Text color="red">{error}</Text>
		</Box>
	);
};
