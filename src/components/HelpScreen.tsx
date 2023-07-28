import React from 'react';
import {Box, useInput} from 'ink';
import {SCREEN_H, SCREEN_W} from '../utils.js';
import {useAppState} from '../hooks/useAppState.js';
import {ColoredText} from './ColoredText.js';

interface HelpScreenProps {
	exit: () => void;
}

export const HelpScreen = ({exit}: HelpScreenProps) => {
	const {theme} = useAppState();
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
		['t', 'Change theme (blue, red, green, yellow, magenta, cyan, white)'],
		['Esc', 'Exit any mode'],
		['?', 'Show help'],
	];

	return (
		<Box
			flexDirection="column"
			height={SCREEN_H}
			width={SCREEN_W}
			borderStyle="doubleSingle"
			borderDimColor
			borderColor={theme}
			paddingX={1}
		>
			<Box marginBottom={2}>
				<ColoredText bold>Hexn :: Help</ColoredText>
			</Box>

			{helpItems.map(([key, description]) => (
				<Box key={key}>
					<Box minWidth={25}>
						<ColoredText bold>{key}</ColoredText>
					</Box>
					<ColoredText>{description}</ColoredText>
				</Box>
			))}
		</Box>
	);
};
