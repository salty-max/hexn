import React from 'react';
import {Box} from 'ink';
import {SCREEN_W} from '../utils.js';
import {ColoredText} from './ColoredText.js';

interface HeaderProps {
	filepath: string;
	theme: string;
}

export const Header = ({filepath, theme}: HeaderProps) => {
	return (
		<Box
			borderStyle="round"
			width={SCREEN_W}
			borderDimColor
			borderColor={theme}
			paddingX={1}
			justifyContent="space-between"
		>
			<ColoredText>
				<ColoredText bold>Hexn</ColoredText> v0.5.0
			</ColoredText>
			<ColoredText>{filepath}</ColoredText>
		</Box>
	);
};
