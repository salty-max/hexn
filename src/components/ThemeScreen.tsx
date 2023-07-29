import React, {useState, useEffect} from 'react';
import {Box, Text, useInput} from 'ink';
import {SCREEN_H, SCREEN_W} from '../utils.js';
import {ColoredText} from './ColoredText.js';

interface ThemeScreenProps {
	exit: () => void;
	theme: string;
	setTheme: (theme: string) => void;
}

export const ThemeScreen = ({exit, theme, setTheme}: ThemeScreenProps) => {
	const themes: string[][] = [
		['white', 'default'],
		['green', 'matrix'],
		['cyan', 'sky'],
		['red', 'blood'],
		['yellow', 'sun'],
		['magenta', 'lavender'],
	];
	const [cursor, setCursor] = useState(0);

	useEffect(() => {
		if (themes[cursor]) {
			const newTheme = themes[cursor]![0];
			if (newTheme) {
				setTheme(newTheme);
			}
		}
	}, [cursor]);

	useInput((_, key) => {
		if (key.escape || key.return) {
			exit();
		}

		if (key.upArrow) {
			setCursor(c => Math.max(0, c - 1));
		}

		if (key.downArrow) {
			setCursor(c => Math.min(themes.length - 1, c + 1));
		}
	});

	return (
		<Box
			flexDirection="column"
			height={SCREEN_H}
			width={SCREEN_W}
			borderStyle="round"
			borderDimColor
			borderColor={theme}
			paddingX={1}
		>
			<Box marginBottom={2}>
				<ColoredText>
					<ColoredText bold>Hexn</ColoredText> v0.5.0 :: Theme
				</ColoredText>
			</Box>

			{themes.map(([key, label], i) => (
				<Box key={key}>
					{cursor === i ? (
						<Text backgroundColor={theme} color="black">
							{label}
						</Text>
					) : (
						<ColoredText>{label}</ColoredText>
					)}
				</Box>
			))}
		</Box>
	);
};
