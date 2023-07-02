import React, { JSX, ReactElement, useMemo } from 'react';
import Policy from '../policy';

const PunditContext = React.createContext({ policy: new Policy(null, null) });

interface PunditContextProps {
  children: JSX.Element | JSX.Element[] | null;
  policy: Policy;
}

export const usePundit = (): { policy: Policy } => {
  const value = React.useContext(PunditContext);
  return value;
};

export function PunditProvider({
  policy,
  children,
}: PunditContextProps): ReactElement {
  const value = useMemo(() => ({ policy }), [policy]);
  return (
    <PunditContext.Provider value={value}>{children}</PunditContext.Provider>
  );
}
