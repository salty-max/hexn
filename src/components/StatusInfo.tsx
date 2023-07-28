import React from 'react';
import {Box, Text} from 'ink';
import {toHex} from '../utils.js';

interface StatusInfoProps {
	buffer: Uint8Array;
	cursor: number;
}

export const StatusInfo = ({cursor}: StatusInfoProps) => {
	return (
		<Box paddingLeft={2}>
			<Text>
				Offset [<Text bold>{toHex(cursor, 8)}</Text>]
			</Text>
		</Box>
	);
};
