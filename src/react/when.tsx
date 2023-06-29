import Policy from '../policy';
import { usePundit } from './pundit-provider';

interface WhenProps {
  children: JSX.Element | null;
  can: string;
  policy?: Policy;
  user?: unknown;
  record?: unknown;
}

export default function When({
  children,
  can,
  policy,
  user,
  record,
}: WhenProps): JSX.Element | null {
  const { policy: hookPolicy } = usePundit();
  const paramPolicy = policy?.copy(user, record);
  const canPerformAction = paramPolicy
    ? paramPolicy.can(can)
    : hookPolicy.can(can);
  return canPerformAction ? children : null;
}

When.defaultProps = {
  policy: undefined,
  user: undefined,
  record: undefined,
};
