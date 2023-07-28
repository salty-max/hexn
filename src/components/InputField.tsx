import {useInput, Text, Box} from 'ink';
import React from 'react';
import {ColoredText} from './ColoredText.js';
import {useAppState} from '../hooks/useAppState.js';

interface InputFieldProps {
	onEnter?: (value: string) => void | Promise<void>;
	onChange?: (value: string) => void | Promise<void>;
	onEscape?: (value: string) => void | Promise<void>;
	initialValue?: string;
	label?: string;
	mask?: RegExp;
}

export const InputField: React.FC<InputFieldProps> = ({
	label = '',
	initialValue = '',
	onEnter = () => void 0,
	onChange = () => void 0,
	onEscape = () => void 0,
	mask,
}: InputFieldProps) => {
	const [value, setValue] = React.useState(initialValue);
	const [cursor, setCursor] = React.useState(initialValue.length);

	const {theme} = useAppState();

	useInput((input, key) => {
		if (key.escape) return onEscape(value);

		if (key.backspace || key.delete) {
			if (value.length === 0) {
				setCursor(0);
				return;
			}

			const part1 = value.slice(0, cursor - 1);
			const part2 = value.slice(cursor);
			const newValue = part1 + part2;

			if (mask && !mask.test(newValue)) return;

			setValue(newValue);
			setCursor(cursor - 1);
			onChange(newValue);
			return;
		}

		if (key.leftArrow) {
			return setCursor(Math.max(0, cursor - 1));
		}
		if (key.rightArrow) {
			return setCursor(Math.min(value.length, cursor + 1));
		}
		if (key.upArrow || key.downArrow) return;

		if (key.return) return onEnter(value);

		if (input !== '') {
			const part1 = value.slice(0, cursor);
			const part2 = value.slice(cursor);
			const newValue = part1 + input + part2;

			if (mask && !mask.test(newValue)) return;

			setValue(newValue);
			setCursor(cursor + input.length);
			onChange(newValue);
		}
	});

	const textComponents = value.split('').map((char, i) => {
		if (i === cursor) {
			return (
				<Text key={`${char}_${i}`} backgroundColor={theme} color="black">
					{char}
				</Text>
			);
		}

		return <ColoredText key={`${char}_${i}`}>{char}</ColoredText>;
	});

	return (
		<Box>
			<ColoredText>{label}</ColoredText>
			<Box>{textComponents}</Box>
			{cursor === value.length ? (
				<Text backgroundColor={theme} color="black">
					{' '}
				</Text>
			) : null}
		</Box>
	);
};
