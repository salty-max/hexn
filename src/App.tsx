import React, {useEffect} from 'react';
import {Box, Text} from 'ink';
import fs from 'fs/promises';
import path from 'path';
import HexView from './components/HexView.js';
import {useBuffer} from './hooks/useBuffer.js';
import {useMovement} from './hooks/useMovement.js';
import {useByteEdit} from './hooks/useByteEdit.js';

interface AppProps {
	filePath?: string;
}

const App = ({filePath}: AppProps) => {
	if (!filePath) {
		return <Text color="red">No file path provided</Text>;
	}

	const {buffer, setBuffer, cursor, setCursor} = useBuffer();

	const getFile = async () => {
		// TODO: handle absolute paths
		const file = await fs.readFile(path.join(process.cwd(), filePath));
		setBuffer(new Uint8Array(file.buffer));
	};

	useEffect(() => {
		getFile();
	}, []);

	useMovement({buffer, cursor, setCursor, isEnabled: true});

	useByteEdit({buffer, cursor, setBuffer, isEnabled: true});

	return (
		<Box flexDirection="column">
			<HexView buffer={buffer} cursor={cursor} />
		</Box>
	);
};

export default App;
