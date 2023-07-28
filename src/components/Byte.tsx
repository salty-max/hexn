import {Box, Text} from 'ink';
import React from 'react';
import {toHex} from '../utils.js';
import {useAppState} from '../hooks/useAppState.js';

interface ByteProps {
	byte: number;
	index: number;
	isSelected?: boolean;
}

export const Byte = ({byte, index, isSelected}: ByteProps) => {
	const {theme} = useAppState();
	const spacing = (index + 1) % 4 === 0 ? '  ' : ' ';
	return (
		<Box>
			<Text
				backgroundColor={isSelected ? theme : 'black'}
				color={isSelected ? 'black' : theme}
				bold={isSelected}
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
