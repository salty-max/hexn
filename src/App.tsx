import React, {useEffect, useState} from 'react';
import {Box, Text} from 'ink';
import fs from 'fs/promises';
import path from 'path';
import HexView from './components/HexView.js';

interface AppProps {
	filePath?: string;
}

const App = ({filePath}: AppProps) => {
	if (!filePath) {
		return <Text color="red">No file path provided</Text>;
	}

	const [buffer, setBuffer] = useState(new Uint8Array(0));

	const getFile = async () => {
		const file = await fs.readFile(path.join(process.cwd(), filePath));
		setBuffer(new Uint8Array(file.buffer));
	};

	useEffect(() => {
		getFile();
	}, []);

	return (
		<Box flexDirection="column">
			<HexView buffer={buffer} />
		</Box>
	);
};

export default App;
