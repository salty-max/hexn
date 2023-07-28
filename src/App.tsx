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

interface AppProps {
	filePath?: string;
}

const App: React.FC<AppProps> = ({filePath}: AppProps) => {
	if (!filePath) {
		return <Text color="red">No file path provided</Text>;
	}

	const {mode, setMode, theme, setTheme, error, setError} = useAppState();

	const {
		buffer,
		setBuffer,
		cursor,
		offset,
		cursorCommands,
		bufferCommands,
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
		setBuffer,
		bufferCommands,
		setMode: setMode,
		moveCursorRight: cursorCommands.right,
		isEnabled: mode === Mode.Edit,
	});

	return mode === Mode.Help ? (
		<HelpScreen exit={() => setMode(Mode.Edit)} />
	) : (
		<Box flexDirection="column">
			<Header filepath={filePath} />
			<HexView buffer={buffer} cursor={cursor} offset={offset} />
			<Footer
				outputPath={filePath}
				buffer={buffer}
				cursor={cursor}
				mode={mode}
				theme={theme}
				error={error}
				setError={setError}
				setMode={setMode}
				setTheme={setTheme}
				jumpToOffset={jumpToOffset}
			/>
		</Box>
	);
};

export default App;
