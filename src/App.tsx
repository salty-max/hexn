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

interface AppProps {
	filePath?: string;
}

const App: React.FC<AppProps> = ({filePath}: AppProps) => {
	if (!filePath) {
		return <Text color="red">No file path provided</Text>;
	}

	const {mode, setMode} = useAppState();

	const {buffer, setBuffer, cursor, offset, cursorCommands, bufferCommands} =
		useBuffer();

	const getFile = async () => {
		const file = await fs.readFile(
			path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath),
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

	return (
		<Box flexDirection="column">
			<HexView buffer={buffer} cursor={cursor} offset={offset} />
			<Footer
				mode={mode}
				setMode={setMode}
				outputPath={filePath}
				buffer={buffer}
				cursor={cursor}
			/>
		</Box>
	);
};

export default App;
