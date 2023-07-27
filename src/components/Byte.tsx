import {Box, Text} from 'ink';
import React from 'react';
import {toHex} from '../utils.js';

interface ByteProps {
	byte: number;
	isSelected?: boolean;
}

export const Byte = ({byte, isSelected}: ByteProps) => (
	<Box>
		<Text
			backgroundColor={isSelected ? 'white' : 'black'}
			color={isSelected ? 'black' : 'white'}
		>
			{toHex(byte, 2)}
		</Text>
	</Box>
);

interface BytesProps {
	bytes: React.JSX.Element[];
}

export const Bytes = ({bytes}: BytesProps) => <Box columnGap={1}>{bytes}</Box>;
