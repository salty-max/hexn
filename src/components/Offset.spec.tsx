import test from 'ava';
import React from 'react';
import {render} from 'ink-testing-library';
import {Offset} from './Offset.js';
import chalk from 'chalk';

test('renders an offset with correct style', t => {
	const {lastFrame} = render(<Offset offset={0x00000010} />);
	t.is(lastFrame(), chalk.bold('00000010'));
});
