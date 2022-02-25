import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type AppValue = {
  focusedOrderId: string | undefined;
  setFocusedOrderId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const AppContext = createContext<AppValue | undefined>(undefined);

const focusedOrderIdKey = 'focusedOrderId';

type Props = {};

export function AppProvider(props: React.PropsWithChildren<Props>) {
  const { children } = props;

  const [focusedOrderId, setFocusedOrderId] = useState<string | undefined>(
    () => window.localStorage.getItem(focusedOrderIdKey) ?? undefined,
  );

  useEffect(() => {
    if (focusedOrderId) {
      window.localStorage.setItem(focusedOrderIdKey, focusedOrderId);
    } else {
      window.localStorage.removeItem(focusedOrderIdKey);
    }
  }, [focusedOrderId]);

  const value = useMemo<AppValue>(
    () => ({
      focusedOrderId,
      setFocusedOrderId,
    }),
    [focusedOrderId],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used in descendent of AppProvider');
  }

  return context;
}
