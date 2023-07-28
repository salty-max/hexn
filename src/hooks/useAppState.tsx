import React from 'react';

export enum Mode {
	Edit,
	Save,
	Help,
	Jump,
}

interface AppState {
	mode: Mode;
}

interface AppStateContextProps {
	mode: Mode;
	setMode: (mode: Mode) => void;
}

interface AppStateProviderProps {
	children: React.ReactNode;
}

const initialState: AppState = {
	mode: Mode.Edit,
};

const AppStateContext = React.createContext<AppStateContextProps | null>(null);

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
	children,
}) => {
	const [state, setState] = React.useState<AppState>(initialState);

	const setMode = (mode: Mode) => setState(prev => ({...prev, mode}));

	return (
		<AppStateContext.Provider
			value={{
				mode: state.mode,
				setMode,
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
