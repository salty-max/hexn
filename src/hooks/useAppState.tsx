import React from 'react';

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
}

interface AppStateContextProps {
	mode: Mode;
	theme: string;
	error: string;
	setMode: (mode: Mode) => void;
	setTheme: (theme: string) => void;
	setError: (error: string) => void;
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
	});

	const setTheme = (theme: string) => setState(prev => ({...prev, theme}));
	const setMode = (mode: Mode) => setState(prev => ({...prev, mode}));
	const setError = (error: string) => setState(prev => ({...prev, error}));

	return (
		<AppStateContext.Provider
			value={{
				mode: state.mode,
				theme: state.theme,
				error: state.error,
				setMode,
				setTheme,
				setError,
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
