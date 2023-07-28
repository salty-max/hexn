import {Box} from 'ink';
import {Mode} from '../hooks/useAppState.js';
import {SaveDialog} from './SaveDialog.js';
import {StatusInfo} from './StatusInfo.js';
import React from 'react';
import {JumpDialog} from './JumpDialog.js';
import {SCREEN_W} from '../utils.js';
import {ThemeDialog} from './ThemeDialog.js';

interface FooterProps {
	mode: Mode;
	outputPath: string;
	buffer: Uint8Array;
	cursor: number;
	setMode: (mode: Mode) => void;
	theme: string;
	setTheme: (theme: string) => void;
	jumpToOffset: (offset: number) => void;
}

export const Footer = ({
	mode,
	buffer,
	cursor,
	outputPath,
	setMode,
	theme,
	setTheme,
	jumpToOffset,
}: FooterProps) => (
	<Box
		flexDirection="column"
		borderStyle="round"
		borderColor="grey"
		width={SCREEN_W}
		paddingX={1}
	>
		{mode === Mode.Edit ? (
			<StatusInfo buffer={buffer} cursor={cursor} />
		) : mode === Mode.Jump ? (
			<JumpDialog setMode={setMode} JumpToOffset={jumpToOffset} />
		) : mode === Mode.Theme ? (
			<ThemeDialog setMode={setMode} theme={theme} setTheme={setTheme} />
		) : (
			<SaveDialog buffer={buffer} outputPath={outputPath} setMode={setMode} />
		)}
	</Box>
);
