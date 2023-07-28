import React from 'react';

export enum Mode {
	Edit,
	Save,
	Help,
	Jump,
	Theme,
}

interface AppState {
	mode: Mode;
	theme: string;
}

interface AppStateContextProps {
	mode: Mode;
	theme: string;
	setMode: (mode: Mode) => void;
	setTheme: (theme: string) => void;
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
		theme: isMatrix ? 'green' : 'white',
	});

	const setTheme = (theme: string) => setState(prev => ({...prev, theme}));
	const setMode = (mode: Mode) => setState(prev => ({...prev, mode}));

	return (
		<AppStateContext.Provider
			value={{
				mode: state.mode,
				setMode,
				theme: state.theme,
				setTheme,
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
