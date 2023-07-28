import {Box, Text} from 'ink';
import React from 'react';
import {BYTES_PER_LINE, HEXVIEW_H, HEXVIEW_W} from '../utils.js';
import {Byte, Bytes} from './Byte.js';
import {Offset} from './Offset.js';
import {Ascii} from './Ascii.js';

interface HexViewProps {
	buffer: Uint8Array;
	cursor: number;
	offset: number;
}

const HexView = ({buffer, cursor, offset: startOffset}: HexViewProps) => {
	const lines: React.JSX.Element[] = [];
	for (let line = 0; line < HEXVIEW_H; line++) {
		const offset = startOffset + line * BYTES_PER_LINE;
		const slice = [...buffer.slice(offset, offset + BYTES_PER_LINE)];
		if (slice.length === 0) {
			break;
		}
		const bytes = slice.map((byte, i) => {
			return (
				<Byte key={offset + i} byte={byte} isSelected={offset + i === cursor} />
			);
		});

		if (bytes.length < BYTES_PER_LINE) {
			const missing = BYTES_PER_LINE - bytes.length;
			for (let i = 0; i < missing; i++) {
				bytes.push(
					<Box key={`padding-${i}`}>
						<Text>{'  '}</Text>
					</Box>,
				);
			}
		}

		lines.push(
			<Box
				key={offset}
				columnGap={2}
				width={HEXVIEW_W}
				justifyContent="space-between"
			>
				<Offset offset={offset} />
				<Bytes bytes={bytes} />
				<Ascii bytes={slice} />
			</Box>,
		);
	}

	return <Box flexDirection="column">{lines}</Box>;
};

export default HexView;
