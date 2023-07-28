import React from 'react';
import {Box, Text} from 'ink';
import {SCREEN_W, toHex} from '../utils.js';

interface StatusInfoProps {
	buffer: Uint8Array;
	cursor: number;
}

export const StatusInfo = ({cursor}: StatusInfoProps) => {
	return (
		<Box flexDirection="column">
			<Text>{'-'.repeat(SCREEN_W)}</Text>
			<Box paddingLeft={2}>
				<Text>
					Offset [<Text bold>{toHex(cursor, 8)}</Text>]
				</Text>
			</Box>
			<Text>{'-'.repeat(SCREEN_W)}</Text>
		</Box>
	);
};
