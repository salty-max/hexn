import {Box} from 'ink';
import React from 'react';
import {toHex} from '../utils.js';
import {ColoredText} from './ColoredText.js';

interface OffsetProps {
	offset: number;
}

export const Offset = ({offset}: OffsetProps) => (
	<Box marginRight={2}>
		<ColoredText bold>{toHex(offset, 8)}</ColoredText>
	</Box>
);
