import {Box, Text} from 'ink';
import React from 'react';
import {toHex} from '../utils.js';

interface OffsetProps {
	offset: number;
}

export const Offset = ({offset}: OffsetProps) => (
	<Box marginRight={2}>
		<Text bold>{toHex(offset, 8)}</Text>
	</Box>
);
