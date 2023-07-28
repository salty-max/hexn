import {Box, Text} from 'ink';
import {Mode} from '../hooks/useAppState.js';
import {SaveDialog} from './SaveDialog.js';
import {StatusInfo} from './StatusInfo.js';
import React from 'react';
import {SCREEN_W} from '../utils.js';
import {JumpDialog} from './JumpDialog.js';

interface FooterProps {
	mode: Mode;
	outputPath: string;
	buffer: Uint8Array;
	cursor: number;
	setMode: (mode: Mode) => void;
	jumpToOffset: (offset: number) => void;
}

export const Footer = ({
	mode,
	buffer,
	cursor,
	outputPath,
	setMode,
	jumpToOffset,
}: FooterProps) => (
	<Box flexDirection="column">
		<Text>{'-'.repeat(SCREEN_W)}</Text>
		{mode === Mode.Edit ? (
			<StatusInfo buffer={buffer} cursor={cursor} />
		) : mode === Mode.Jump ? (
			<JumpDialog setMode={setMode} JumpToOffset={jumpToOffset} />
		) : (
			<SaveDialog buffer={buffer} outputPath={outputPath} setMode={setMode} />
		)}
		<Text>{'-'.repeat(SCREEN_W)}</Text>
	</Box>
);
