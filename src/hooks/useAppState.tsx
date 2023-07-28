import React from 'react';
import {AddressMode} from '../utils.js';

export enum Mode {
	Edit,
	Save,
	Help,
	Jump,
	Theme,
	Error,
}

interface AppState {
	mode: Mode;
	error: string;
	theme: string;
	addressMode: AddressMode;
}

interface AppStateContextProps {
	mode: Mode;
	theme: string;
	error: string;
	addressMode: AddressMode;
	setMode: (mode: Mode) => void;
	setTheme: (theme: string) => void;
	setError: (error: string) => void;
	setAddressMode: (addressMode: AddressMode) => void;
}

interface AppStateProviderProps {
	isMatrix?: boolean;
	children: React.ReactNode;
}

const AppStateContext = React.createContext<AppStateContextProps | null>(null);

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
	isMatrix,
	children,
}) => {
	const [state, setState] = React.useState<AppState>({
		mode: Mode.Edit,
		error: '',
		theme: isMatrix ? 'green' : 'white',
		addressMode: AddressMode.Hex,
	});

	const setTheme = (theme: string) => setState(prev => ({...prev, theme}));
	const setMode = (mode: Mode) => setState(prev => ({...prev, mode}));
	const setError = (error: string) => setState(prev => ({...prev, error}));
	const setAddressMode = (addressMode: AddressMode) =>
		setState(prev => ({...prev, addressMode}));

	return (
		<AppStateContext.Provider
			value={{
				mode: state.mode,
				theme: state.theme,
				error: state.error,
				addressMode: state.addressMode,
				setMode,
				setTheme,
				setError,
				setAddressMode,
			}}
		>
			{children}
		</AppStateContext.Provider>
	);
};

export const useAppState = () => {
	const context = React.useContext(AppStateContext);

	if (!context) {
		throw new Error('useAppState must be used within an AppStateProvider');
	}

	return context;
};
