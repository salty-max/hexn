import {Box} from 'ink';
import React from 'react';
import {BYTES_PER_LINE} from '../utils.js';
import {Byte, Bytes} from './Byte.js';
import {Offset} from './Offset.js';
import {Ascii} from './Ascii.js';

interface HexViewProps {
	buffer: Uint8Array;
}

const HexView = ({buffer}: HexViewProps) => {
	const lines: React.JSX.Element[] = [];
	for (let offset = 0; offset < buffer.length; offset += BYTES_PER_LINE) {
		const slice = [...buffer.slice(offset, offset + BYTES_PER_LINE)];
		const bytes = slice.map((byte, i) => {
			return <Byte key={offset + i} byte={byte} />;
		});

		lines.push(
			<Box key={offset} columnGap={2}>
				<Offset offset={offset} />
				<Bytes bytes={bytes} />
				<Ascii bytes={slice} offset={offset} />
			</Box>,
		);
	}

	return <Box flexDirection="column">{lines}</Box>;
};

export default HexView;
