import React from 'react';
import {Box, useInput} from 'ink';
import {AddressMode, toDecimal, toHex} from '../utils.js';
import {ColoredText} from './ColoredText.js';

interface StatusInfoProps {
	buffer: Uint8Array;
	cursor: number;
	addressMode: AddressMode;
	setAddressMode: (addressMode: AddressMode) => void;
}

export const StatusInfo = ({
	buffer,
	cursor,
	addressMode,
	setAddressMode,
}: StatusInfoProps) => {
	useInput(input => {
		if (input === 'v') {
			if (addressMode === AddressMode.Hex) {
				setAddressMode(AddressMode.Decimal);
			} else {
				setAddressMode(AddressMode.Hex);
			}
		}
	});

	const formatFn = addressMode === AddressMode.Hex ? toHex : toDecimal;

	return (
		<Box justifyContent="space-between">
			<Box>
				<Box>
					<ColoredText>
						Offset [<ColoredText bold>{formatFn(cursor, 8)}</ColoredText>]
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
