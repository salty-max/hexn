import React from 'react';
import {Box, Text} from 'ink';
import fs from 'fs/promises';
import path from 'path';
import HexView from './components/HexView.js';
import {useBuffer} from './hooks/useBuffer.js';
import {useMovement} from './hooks/useMovement.js';
import {useEdit} from './hooks/useEdit.js';
import {Mode, useAppState} from './hooks/useAppState.js';
import {Footer} from './components/Footer.js';
import {HelpScreen} from './components/HelpScreen.js';
import {Header} from './components/Header.js';
import {ThemeScreen} from './components/ThemeScreen.js';

interface AppProps {
	filePath?: string;
}

const App: React.FC<AppProps> = ({filePath}: AppProps) => {
	if (!filePath) {
		return <Text color="red">No file path provided</Text>;
	}

	const {
		mode,
		setMode,
		theme,
		setTheme,
		error,
		setError,
		addressMode,
		setAddressMode,
	} = useAppState();

	const {
		buffer,
		cursor,
		offset,
		cursorCommands,
		bufferCommands,
		searchCommands,
		jumpToOffset,
	} = useBuffer();

	const getFile = async () => {
		const file = await fs.readFile(
			path.isAbsolute(filePath) ? filePath : path.resolve(filePath),
		);
		bufferCommands.insertAtCursor(new Uint8Array(file.buffer));
	};

	React.useEffect(() => {
		getFile();
	}, []);

	useMovement({cursorCommands, isEnabled: mode === Mode.Edit});
	useEdit({
		buffer,
		cursor,
		bufferCommands,
		setMode: setMode,
		moveCursorRight: cursorCommands.right,
		isEnabled: mode === Mode.Edit,
	});

	return mode === Mode.Help ? (
		<HelpScreen theme={theme} exit={() => setMode(Mode.Edit)} />
	) : mode === Mode.Theme ? (
		<ThemeScreen
			theme={theme}
			setTheme={setTheme}
			exit={() => setMode(Mode.Edit)}
		/>
	) : (
		<Box flexDirection="column">
			<Header theme={theme} filepath={filePath} />
			<HexView buffer={buffer} cursor={cursor} offset={offset} theme={theme} />
			<Footer
				outputPath={filePath}
				buffer={buffer}
				cursor={cursor}
				mode={mode}
				theme={theme}
				error={error}
				addressMode={addressMode}
				setError={setError}
				setMode={setMode}
				setAddressMode={setAddressMode}
				jumpToOffset={jumpToOffset}
				searchForSequence={searchCommands.searchForSequence}
			/>
		</Box>
	);
};

export default App;
