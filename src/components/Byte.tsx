import {Box, Text} from 'ink';
import React from 'react';
import {toHex} from '../utils.js';

interface ByteProps {
	byte: number;
}

export const Byte = ({byte}: ByteProps) => (
	<Box>
		<Text color="green" dimColor>
			{toHex(byte, 2)}
		</Text>
	</Box>
);

interface BytesProps {
	bytes: React.JSX.Element[];
}

export const Bytes = ({bytes}: BytesProps) => <Box columnGap={1}>{bytes}</Box>;
