import {Box} from 'ink';
import {Mode} from '../hooks/useAppState.js';
import {SaveDialog} from './SaveDialog.js';
import {StatusInfo} from './StatusInfo.js';
import React from 'react';
import {JumpDialog} from './JumpDialog.js';
import {AddressMode, SCREEN_W} from '../utils.js';
import {ErrorDialog} from './ErrorDialog.js';
import {SearchDialog} from './SearchDialog.js';

interface FooterProps {
	mode: Mode;
	outputPath: string;
	buffer: Uint8Array;
	cursor: number;
	error: string;
	theme: string;
	addressMode: AddressMode;
	setError: (error: string) => void;
	setMode: (mode: Mode) => void;
	setAddressMode: (addressMode: AddressMode) => void;
	jumpToOffset: (offset: number) => void;
	searchForSequence: (sequence: Uint8Array) => boolean;
}

export const Footer = ({
	mode,
	buffer,
	cursor,
	outputPath,
	theme,
	error,
	addressMode,
	setError,
	setMode,
	setAddressMode,
	jumpToOffset,
	searchForSequence,
}: FooterProps) => (
	<Box
		flexDirection="column"
		borderStyle="round"
		borderColor={mode === Mode.Error ? 'red' : theme}
		width={SCREEN_W}
		paddingX={1}
	>
		{mode === Mode.Edit ? (
			<StatusInfo
				buffer={buffer}
				cursor={cursor}
				addressMode={addressMode}
				setAddressMode={setAddressMode}
			/>
		) : mode === Mode.Jump ? (
			<JumpDialog setMode={setMode} JumpToOffset={jumpToOffset} />
		) : mode === Mode.Search ? (
			<SearchDialog setMode={setMode} searchForSequence={searchForSequence} />
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
