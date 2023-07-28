import React from 'react';
import {Box, Text} from 'ink';
import {HEXVIEW_W, toHex} from '../utils.js';

interface StatusInfoProps {
	buffer: Uint8Array;
	cursor: number;
}

export const StatusInfo = ({buffer, cursor}: StatusInfoProps) => {
	return (
		<Box width={HEXVIEW_W} paddingX={2} justifyContent="space-between">
			<Box>
				<Box marginRight={1}>
					<Text>
						Offset [<Text bold>{toHex(cursor, 8)}</Text>]
					</Text>
				</Box>
				<Text>({buffer.byteLength === 0 ? '-' : buffer[cursor]})</Text>
			</Box>
			<Text>
				[<Text bold>?</Text>]&nbsp;Help
			</Text>
		</Box>
	);
};
