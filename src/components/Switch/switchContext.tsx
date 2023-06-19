import { createContext, useMemo, useState } from 'react';

interface SwitchProviderProps {
  children: React.ReactNode;
}

interface SwitchContextType {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SwitchContext = createContext<SwitchContextType>({
  isDisabled: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsDisabled: () => {},
});

export const SwitchProvider = ({ children }: SwitchProviderProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const providerValue = useMemo(
    () => ({
      isDisabled,
      setIsDisabled,
    }),
    [isDisabled]
  );

  return (
    <SwitchContext.Provider value={providerValue}>
      {children}
    </SwitchContext.Provider>
  );
};
