import React from 'react';
import {Text} from 'ink';

type Props = {
	name: string | undefined;
};

const App = ({name = 'Stranger'}: Props) => {
	return (
		<Text>
			Hello, <Text color="green">{name}</Text>
		</Text>
	);
}

export default App
