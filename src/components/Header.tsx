import React from 'react';
import {Box} from 'ink';
import {SCREEN_W} from '../utils.js';
import {useAppState} from '../hooks/useAppState.js';
import {ColoredText} from './ColoredText.js';

interface HeaderProps {
	filepath: string;
}

export const Header = ({filepath}: HeaderProps) => {
	const {theme} = useAppState();
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
				<ColoredText bold>Hexn</ColoredText> v0.3.0
			</ColoredText>
			<ColoredText>{filepath}</ColoredText>
		</Box>
	);
};
