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

export const initialState: SettingsGameProviderState = {
  visible: false,
};

const SettingGameContext = createContext({
  state: initialState,
  show: (settings: SettingsGameFormProps) => ({}),
});

export const SettingGame = () => useContext(SettingGameContext);

const reducer = (
  state: SettingsGameProviderState,
  actions: ActionType
): SettingsGameProviderState => {
  switch (actions.type) {
    case 'show':
      return { ...actions.settings, visible: true };
    case 'hide':
      return { ...state, visible: false };
    default:
      return state;
  }
};

/**
 * Провайдер для передачи настроек в компонент игры
 * */
export const SettingsProvide: FC<PropsWithChildren> = ({ children }) => {
  const dispatchWithoutActions = useReducer(reducer, initialState);
  const [state, dispatch] = dispatchWithoutActions;

  const show = (settings: SettingsGameFormProps) => dispatch({ type: 'show', settings });
  const hide = () => dispatch({ type: 'hide' });

  const value = useMemo(() => ({ state, show }), [state, show]);
  // @ts-ignore
  return <SettingGameContext.Provider value={value}>{children}</SettingGameContext.Provider>;
};