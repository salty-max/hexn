import {Box, Text} from 'ink';
import React from 'react';
import {ColoredText} from './ColoredText.js';

interface AsciiProps {
	bytes: number[];
	offset: number;
	cursor: number;
	theme: string;
}

export const Ascii = ({bytes, offset, cursor, theme}: AsciiProps) => {
	return (
		<Box>
			<ColoredText>{'|'}</ColoredText>
			{bytes.map((byte, i) => {
				const char =
					byte >= 0x20 && byte <= 0x7e ? String.fromCharCode(byte) : '.';

				if (offset + i === cursor) {
					return (
						<Text key={i} backgroundColor={theme} color="black" bold>
							{char}
						</Text>
					);
				}

				return <ColoredText key={i}>{char}</ColoredText>;
			})}
			<ColoredText>{'|'}</ColoredText>
		</Box>
	);
};
