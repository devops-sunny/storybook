import React, { createContext, useContext, useMemo } from 'react';

import { useAppDataContext } from './AppDataProvider';

export enum AppMode {
  Attract,
  Approach,
}

type AppModeValue = {
  mode: AppMode;
};
const AppModeContext = createContext<AppModeValue>({ mode: AppMode.Attract });

export type AppModeProviderProps = {};

export function AppModeProvider(
  props: React.PropsWithChildren<AppModeProviderProps>,
) {
  const { children } = props;
  const { users } = useAppDataContext();

  const isAnyUserPresent = useMemo(() => {
    return users?.length;
  }, [users]);

  // use memo to derive the current mode
  const mode = useMemo(() => {
    if (isAnyUserPresent) return AppMode.Approach;
    return AppMode.Attract;
  }, [isAnyUserPresent]);

  const value = useMemo<AppModeValue>(() => ({ mode }), [mode]);
  return (
    <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>
  );

  // @TODO - age-out users based on a timeout
}

export function useAppModeContext() {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error(
      'useAppModeContext must be used in descendent of AppModeProvider',
    );
  }
  return context;
}
