import React from 'react';
import {Mode} from '../hooks/useAppState.js';
import {InputField} from './InputField.js';

const themes = ['blue', 'green', 'red', 'cyan', 'magenta', 'yellow'];

interface ThemeDialogProps {
	setMode: (mode: Mode) => void;
	theme: string;
	setTheme: (theme: string) => void;
}

export const ThemeDialog = ({setMode, theme, setTheme}: ThemeDialogProps) => {
	return (
		<InputField
			label="Change theme: "
			onEnter={input => {
				if (!themes.includes(input)) {
					console.error('Invalid theme');
					input = theme;
					setMode(Mode.Edit);
				}
				setTheme(input);
				setMode(Mode.Edit);
			}}
			onEscape={() => setMode(Mode.Edit)}
		/>
	);
};
