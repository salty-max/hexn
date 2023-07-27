import test from 'ava';
import React from 'react';
import {render} from 'ink-testing-library';
import {Byte} from './Byte.js';

test('renders a byte', t => {
	const {lastFrame, rerender} = render(<Byte byte={0xca} />);
	t.is(lastFrame(), 'ca');
	rerender(<Byte byte={0xfe} />);
	t.is(lastFrame(), 'fe');
});
