import React from 'react';
import {Box, useInput} from 'ink';
import {SCREEN_H, SCREEN_W} from '../utils.js';
import {ColoredText} from './ColoredText.js';

interface HelpScreenProps {
	exit: () => void;
	theme: string;
}

export const HelpScreen = ({exit, theme}: HelpScreenProps) => {
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
		[
			'v',
			'Switch the address display in the status line between hex and decimal',
		],
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
			borderStyle="round"
			borderDimColor
			borderColor={theme}
			paddingX={1}
		>
			<Box marginBottom={2}>
				<ColoredText>
					<ColoredText bold>Hexn</ColoredText> v0.3.0 :: Help
				</ColoredText>
			</Box>

			{helpItems.map(([key, description]) => (
				<Box key={key} marginBottom={0.25}>
					<Box minWidth={30}>
						<ColoredText bold>{key}</ColoredText>
					</Box>
					<ColoredText>{description}</ColoredText>
				</Box>
			))}
		</Box>
	);
};
