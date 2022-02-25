import { AppStaticConfig, useAppStaticConfig } from './AppStaticConfigProvider';
import React, { createContext, useContext, useMemo, useState } from 'react';

import { AppConfigDialog } from './AppConfigDialog';
import useLocalStorage from 'react-use/lib/useLocalStorage';

export type AppDynamicConfig = {
  storefrontId: string;
  storefrontName: string;
  producerId: string;
  producerSerial: string;
};

export type AppConfig = AppStaticConfig & AppDynamicConfig;

type AppConfigProviderValue = {
  config: AppConfig | undefined;
  setConfig: React.Dispatch<React.SetStateAction<AppDynamicConfig | undefined>>;
  appConfigDialogIsOpen: boolean;
  setAppConfigDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppConfigContext = createContext<AppConfigProviderValue | undefined>(
  undefined,
);

type Props = {
  staticConfig: AppStaticConfig;
  dynamicConfig?: AppDynamicConfig;
};

export function AppConfigProvider(props: React.PropsWithChildren<Props>) {
  const {
    children,
    staticConfig,
    dynamicConfig: dynamicConfigOverride,
  } = props;

  const configKey: string = staticConfig.clientName
    ? `appConfig_${staticConfig.clientName}`
    : 'appConfig';

  const [dynamicConfig, setDynamicConfig] =
    useLocalStorage<AppDynamicConfig>(configKey);
  const [appConfigDialogIsOpen, setAppConfigDialogIsOpen] = useState(false);

  const finalDynamicConfig = dynamicConfigOverride || dynamicConfig;

  const config = useMemo<AppConfig | undefined>(() => {
    if (!staticConfig || !finalDynamicConfig) {
      return undefined;
    }

    return {
      ...staticConfig,
      ...finalDynamicConfig,
    } as AppConfig;
  }, [staticConfig, finalDynamicConfig]);

  const value = useMemo<AppConfigProviderValue>(
    () => ({
      config,
      setConfig: setDynamicConfig,
      appConfigDialogIsOpen,
      setAppConfigDialogIsOpen,
    }),
    [config, setDynamicConfig, appConfigDialogIsOpen],
  );

  return (
    <AppConfigContext.Provider value={value}>
      {config ? children : undefined}
      {dynamicConfig ? null : <AppConfigDialog />}
    </AppConfigContext.Provider>
  );
}

export function useAppConfigContext() {
  const context = useContext(AppConfigContext);

  if (!context) {
    throw new Error(
      'useAppConfig must be used in a descendent of AppConfigProvider',
    );
  }

  return context;
}

export function useAppConfig() {
  const { config } = useAppConfigContext();

  if (!config) {
    throw new Error('config has not been set');
  }

  return config;
}
