import {Box, Text} from 'ink';
import React from 'react';
import {BYTES_PER_LINE} from '../utils.js';

interface AsciiProps {
	bytes: number[];
}

export const Ascii = ({bytes}: AsciiProps) => (
	<Box>
		<Text>
			{'|'}
			{bytes
				.map(byte => {
					if (byte >= 0x20 && byte <= 0x7e) return String.fromCharCode(byte);

					return '.';
				})
				.join('')
				.padEnd(BYTES_PER_LINE, '.')}
			{'|'}
		</Text>
	</Box>
);
