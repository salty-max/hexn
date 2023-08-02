import React from 'react';
import {program} from 'commander';
import chalk from 'chalk';
import {render} from 'ink';
import App from './App.js';
import {AppStateProvider} from './hooks/useAppState.js';

program.name('hexn');

// Define commands and their handlers
program
	.description('Edit a file')
	.option('-f, --file <filePath>', 'Enter the file path')
	.option('-m, --matrix', 'Enter the matrix')
	.action(cmd => {
		render(
			<AppStateProvider isMatrix={cmd.matrix}>
				<App filePath={cmd.file} />
			</AppStateProvider>,
		);
	});

program
	.command('hex <number>')
	.description('Translates specified number to hex')
	.alias('h')
	.action(number => {
		console.log(`${chalk.green(`0x${Number(number).toString(16)}`)}`);
	});

program
	.command('dec <number>')
	.alias('d')
	.description('Translates specified number to decimal')
	.action(number => {
		console.log(`${chalk.green(Number(number).toString(10))}`);
	});

program
	.command('bin <number>')
	.alias('b')
	.description('Translates specified number to binary')
	.action(number => {
		console.log(`${chalk.green(`0b${Number(number).toString(2)}`)}`);
	});

// Parse command-line arguments
program.parse(process.argv);
