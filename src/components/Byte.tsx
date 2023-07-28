import {Box, Text} from 'ink';
import React from 'react';
import {toHex} from '../utils.js';

interface ByteProps {
	byte: number;
	index: number;
	isSelected?: boolean;
}

export const Byte = ({byte, index, isSelected}: ByteProps) => {
	const spacing = (index + 1) % 4 === 0 ? '  ' : ' ';
	return (
		<Box>
			<Text
				backgroundColor={isSelected ? 'white' : 'black'}
				color={isSelected ? 'black' : 'white'}
			>
				{toHex(byte, 2)}
			</Text>
			<Text>{spacing}</Text>
		</Box>
	);
};

interface BytesProps {
	bytes: React.JSX.Element[];
}

export const Bytes = ({bytes}: BytesProps) => <Box>{bytes}</Box>;
