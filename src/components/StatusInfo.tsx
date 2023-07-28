import React from 'react';
import {Box} from 'ink';
import {toHex} from '../utils.js';
import {ColoredText} from './ColoredText.js';

interface StatusInfoProps {
	buffer: Uint8Array;
	cursor: number;
}

export const StatusInfo = ({buffer, cursor}: StatusInfoProps) => {
	return (
		<Box justifyContent="space-between">
			<Box>
				<Box>
					<ColoredText>
						Offset [<ColoredText bold>{toHex(cursor, 8)}</ColoredText>]
					</ColoredText>
				</Box>
				<ColoredText>
					({buffer.byteLength === 0 ? '-' : buffer[cursor]})
				</ColoredText>
			</Box>
			<Box>
				<ColoredText>
					[<ColoredText bold>?</ColoredText>]&nbsp;Help
				</ColoredText>
			</Box>
		</Box>
	);
};
