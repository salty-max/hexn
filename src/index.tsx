import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './App.js';
import {AppStateProvider} from './hooks/useAppState.js';

const cli = meow(
	`
	Usage
	  $ hexn

	Options
		--file | -f  File to edit
		--matrix | -m  Enter the matrix

	Examples
	  $ hexn --file=./bytes.bin
`,
	{
		importMeta: import.meta,
		flags: {
			file: {
				type: 'string',
				alias: 'f',
			},
			matrix: {
				type: 'boolean',
				alias: 'm',
			},
		},
	},
);

render(
	<AppStateProvider isMatrix={cli.flags.matrix}>
		<App filePath={cli.flags.file} />
	</AppStateProvider>,
);
