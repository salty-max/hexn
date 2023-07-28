import React from 'react';
import {Box, Text, useInput} from 'ink';

interface HelpScreenProps {
	exit: () => void;
}

export const HelpScreen = ({exit}: HelpScreenProps) => {
	useInput((_, key) => {
		if (key.escape) exit();
	});

	const helpItems = [
		['←↑↓→', 'Move cursor'],
		['[a-f0-9]', 'Edit the byte at cursor'],
		['Del/Backspace', 'Delete the byte at cursor'],
		['i', 'Insert a zero byte before the cursor'],
		['I', 'Insert a zero byte after the cursor'],
		['j', 'Jump to specified offset'],
		['Ctrl + s', 'Save file'],
		['Esc', 'Exit any mode'],
		['?', 'Show help'],
	];

	return (
		<Box
			flexDirection="column"
			height={25}
			width={80}
			borderStyle="doubleSingle"
			paddingX={1}
		>
			<Box marginBottom={2}>
				<Text bold>Hexn :: Help</Text>
			</Box>

			{helpItems.map(([key, description]) => (
				<Box key={key}>
					<Box minWidth={25}>
						<Text bold>{key}</Text>
					</Box>
					<Text>{description}</Text>
				</Box>
			))}
		</Box>
	);
};
