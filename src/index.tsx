#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './App.js';

const cli = meow(
	`
	Usage
	  $ hexn

	Options
		--file  File to edit

	Examples
	  $ hexn --file=./bytes.bin
`,
	{
		importMeta: import.meta,
		flags: {
			file: {
				type: 'string',
			},
		},
	},
);

render(<App filePath={cli.flags.file} />);
