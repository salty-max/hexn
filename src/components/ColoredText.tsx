import React from 'react';
import {Text, TextProps} from 'ink';
import {useAppState} from '../hooks/useAppState.js';

interface ColoredTextProps extends TextProps {
	children: React.ReactNode;
}

export const ColoredText = ({children, ...props}: ColoredTextProps) => {
	const {theme} = useAppState();

	return (
		<Text color={theme} {...props}>
			{children}
		</Text>
	);
};
