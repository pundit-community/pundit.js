import React, { PropsWithChildren, ReactElement, useMemo } from 'react'
import Policy from '../policy'

const PunditContext = React.createContext({ policy: new Policy(null, null) })

interface PunditProviderProps {
  /** The instance of the policy to be authorised. */
  policy: Policy
  /** The user to be authorised. */
  user?: unknown
  /** The record to be authorised. */
  record?: unknown
}

/**
 * A hook for using the policy loaded from the PunditContext.
 *
 * @returns - An object containing the policy loaded into PunditContext.
 */
export const usePundit = (): { policy: Policy } => {
  const value = React.useContext(PunditContext)
  return value
}

/**
 * A React context provider that can wrapped around one or more When components.
 * PunditProvider can be used to avoid passing policy, user, or record props to
 * each usage of the When component.
 *
 * @param props - The props passed to the provider, which must include the
 * policy instance that can be used by child components, and optionally user and
 * record.
 * @returns - The specified children wrapped in the PunditContext provider.
 */
export function PunditProvider({
  policy,
  user,
  record,
  children
}: PropsWithChildren<PunditProviderProps>): ReactElement {
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
  record: undefined
}
