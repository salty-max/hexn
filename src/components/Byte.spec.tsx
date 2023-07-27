import test from 'ava';
import React from 'react';
import {render} from 'ink-testing-library';
import {Byte, Bytes} from './Byte.js';
import chalk from 'chalk';

test('renders an unselected byte correctly', t => {
	const {lastFrame} = render(<Byte byte={0xca} />);
	t.is(lastFrame(), chalk.bgBlack(chalk.white('ca')));
});

test('renders a selected byte correctly', t => {
	const {lastFrame} = render(<Byte byte={0xca} isSelected />);
	t.is(lastFrame(), chalk.bgWhite(chalk.black('ca')));
});

test('renders a row of bytes correctly', t => {
	const {lastFrame} = render(
		<Bytes
			bytes={[
				<Byte key={0} byte={0xca} />,
				<Byte key={1} byte={0xfe} isSelected />,
				<Byte key={2} byte={0xc0} />,
				<Byte key={3} byte={0xde} />,
			]}
		/>,
	);
	t.is(
		lastFrame(),
		chalk.bgBlack(chalk.white('ca')) +
			' ' +
			chalk.bgWhite(chalk.black('fe')) +
			' ' +
			chalk.bgBlack(chalk.white('c0')) +
			' ' +
			chalk.bgBlack(chalk.white('de')),
	);
});
