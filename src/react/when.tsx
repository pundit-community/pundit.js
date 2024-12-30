import { PropsWithChildren, ReactNode } from 'react'
import Policy from '../policy'
import { usePundit } from './pundit-provider'

interface WhenProps {
  /** The name of the policy action to be authorised. */
  can: string
  /** The instance of the policy to be authorised for the policy action. */
  policy?: Policy
  /** The user to be authorised for the policy action. */
  user?: unknown
  /** The record to be authorised for the policy action. */
  record?: unknown
}

/**
 * A React component that can be wrapped around one or more components to
 * determine whether they should be rendered based on the specified policy
 * action, user, and record.
 *
 * @param props - The props passed to the component to determine whether it
 * should be rendered. These must include the policy action name, and optionally
 * the policy instance, user, and record.
 * @returns - The child component(s) that would be rendered if the policy action
 * is permitted. Returns null if the policy action is not permitted.
 */
export default function When({
  children,
  can,
  policy,
  user,
  record
}: PropsWithChildren<WhenProps>): ReactNode {
  const { policy: hookPolicy } = usePundit()
  const paramPolicy = policy?.copy(user, record)
  const canPerformAction = paramPolicy
    ? paramPolicy.can(can)
    : hookPolicy.can(can)
  return canPerformAction ? children : null
}

When.defaultProps = {
  policy: undefined,
  user: undefined,
  record: undefined
}
