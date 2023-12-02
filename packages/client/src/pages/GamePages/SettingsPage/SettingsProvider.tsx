import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { SettingsGameFormProps } from './SettingsGameForm/SettingsGameFormProps';
import { ActionType, SettingsGameProviderState } from './SettingsGameProviderTypes';
import { SETTINGS } from '../../../constants/settings';

/** Инициализация параметров для формы настроек в игре * */
export const initialState: SettingsGameProviderState = {
  ...SETTINGS,
  visible: false,
};

const SettingGameContext = createContext({
  settings: initialState,
  startGame: (settings: SettingsGameProviderState) => ({}),
  endGame: (settings: SettingsGameProviderState) => ({}),
});

export const useSettingGame = () => useContext(SettingGameContext);

const reducer = (
  state: SettingsGameProviderState,
  actions: ActionType
): SettingsGameProviderState => {
  switch (actions.type) {
    case 'startGame':
      return { ...actions.settingsGame, visible: true };
    case 'endGame':
      return { ...actions.settingsGame, visible: false };
    default:
      return state;
  }
};

/**
 * Провайдер для передачи настроек в компонент игры
 * */
export const SettingsProvide: FC<PropsWithChildren> = ({ children }) => {
  const dispatchWithoutActions = useReducer(reducer, initialState);
  const [settings, dispatch] = dispatchWithoutActions;

  const startGame = (settingsGame: SettingsGameProviderState) =>
    dispatch({ type: 'startGame', settingsGame });
  const endGame = (settingsGame: SettingsGameProviderState) =>
    dispatch({ type: 'endGame', settingsGame });

  const value = useMemo(() => ({ settings, startGame, endGame }), [settings, startGame, endGame]);
  // @ts-ignore
  return <SettingGameContext.Provider value={value}>{children}</SettingGameContext.Provider>;
};
