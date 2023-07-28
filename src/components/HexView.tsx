import {Box, Text} from 'ink';
import React from 'react';
import {BYTES_PER_LINE, HEXVIEW_H} from '../utils.js';
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
				<Byte
					key={offset + i}
					byte={byte}
					index={i}
					isSelected={offset + i === cursor}
				/>
			);
		});

		if (bytes.length < BYTES_PER_LINE) {
			const wordSpaces = 4 - Math.floor(bytes.length / 4);
			const diff = BYTES_PER_LINE - bytes.length;
			const padding = (
				<Text key="padding">
					{'   '.repeat(diff)}
					{' '.repeat(wordSpaces)}
				</Text>
			);
			bytes.push(padding);
		}

		lines.push(
			<Box key={offset}>
				<Offset offset={offset} />
				<Bytes bytes={bytes} />
				<Ascii bytes={slice} />
			</Box>,
		);
	}

	return <Box flexDirection="column">{lines}</Box>;
};

export default HexView;
