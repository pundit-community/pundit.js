import React, { ReactNode, ReactElement, useMemo } from 'react'
import Policy from '../policy'

const PunditContext = React.createContext({ policy: new Policy(null, null) })

interface PunditProviderProps {
  policy: Policy
  user?: unknown
  record?: unknown
  children: ReactNode | ReactNode[] | null
}

export const usePundit = (): { policy: Policy } => {
  const value = React.useContext(PunditContext)
  return value
}

export function PunditProvider({
  policy,
  user,
  record,
  children,
}: PunditProviderProps): ReactElement {
  const value = useMemo(
    () => ({ policy: policy.copy(user, record) }),
    [policy, user, record]
  )
  return (
    <PunditContext.Provider value={value}>{children}</PunditContext.Provider>
  )
}

PunditProvider.defaultProps = {
  user: undefined,
  record: undefined,
}
