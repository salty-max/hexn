import {Box, Text} from 'ink';
import {Mode} from '../hooks/useAppState.js';
import {SaveDialog} from './SaveDialog.js';
import {StatusInfo} from './StatusInfo.js';
import React from 'react';
import {SCREEN_W} from '../utils.js';

interface FooterProps {
	mode: Mode;
	setMode: (mode: Mode) => void;
	outputPath: string;
	buffer: Uint8Array;
	cursor: number;
}

export const Footer = ({
	mode,
	buffer,
	cursor,
	outputPath,
	setMode,
}: FooterProps) => (
	<Box flexDirection="column">
		<Text>{'-'.repeat(SCREEN_W)}</Text>
		{mode === Mode.Edit ? (
			<StatusInfo buffer={buffer} cursor={cursor} />
		) : (
			<SaveDialog buffer={buffer} outputPath={outputPath} setMode={setMode} />
		)}
		<Text>{'-'.repeat(SCREEN_W)}</Text>
	</Box>
);
