import {Box} from 'ink';
import {Mode} from '../hooks/useAppState.js';
import {SaveDialog} from './SaveDialog.js';
import {StatusInfo} from './StatusInfo.js';
import React from 'react';
import {JumpDialog} from './JumpDialog.js';
import {SCREEN_W} from '../utils.js';
import {ThemeDialog} from './ThemeDialog.js';
import {ErrorDialog} from './ErrorDialog.js';

interface FooterProps {
	mode: Mode;
	outputPath: string;
	buffer: Uint8Array;
	cursor: number;
	error: string;
	theme: string;
	setError: (error: string) => void;
	setMode: (mode: Mode) => void;
	setTheme: (theme: string) => void;
	jumpToOffset: (offset: number) => void;
}

export const Footer = ({
	mode,
	buffer,
	cursor,
	outputPath,
	theme,
	error,
	setError,
	setMode,
	setTheme,
	jumpToOffset,
}: FooterProps) => (
	<Box
		flexDirection="column"
		borderStyle="round"
		borderColor={mode === Mode.Error ? 'red' : theme}
		width={SCREEN_W}
		paddingX={1}
	>
		{mode === Mode.Edit ? (
			<StatusInfo buffer={buffer} cursor={cursor} />
		) : mode === Mode.Jump ? (
			<JumpDialog setMode={setMode} JumpToOffset={jumpToOffset} />
		) : mode === Mode.Theme ? (
			<ThemeDialog setMode={setMode} theme={theme} setTheme={setTheme} />
		) : mode === Mode.Error ? (
			<ErrorDialog error={error} setMode={setMode} />
		) : (
			<SaveDialog
				buffer={buffer}
				outputPath={outputPath}
				setMode={setMode}
				setError={setError}
			/>
		)}
	</Box>
);
