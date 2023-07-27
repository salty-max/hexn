import {Box, Text} from 'ink';
import React from 'react';

interface AsciiProps {
	bytes: number[];
	offset: number;
}

export const Ascii = ({bytes, offset}: AsciiProps) => (
	<Box>
		<Text>{'|'}</Text>
		{bytes.map((byte, i) => {
			const char =
				byte >= 0x20 && byte <= 0x7e ? String.fromCharCode(byte) : '.';

			return <Text key={offset + i}>{char}</Text>;
		})}
		<Text>{'|'}</Text>
	</Box>
);
