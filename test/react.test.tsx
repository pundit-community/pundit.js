import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Policy } from '../src/policy';
import { PunditProvider, When } from '../src/react';

describe('<PunditProvider />', () => {
  const user = {};
  const record = {};
  const policy = new Policy(user, record);
  policy.add('view', () => true);
  policy.add('edit', () => false);

  it('displays <When /> child when action is permitted', () => {
    render(
      <PunditProvider policy={policy}>
        <When can="view">
          <button>View</button>
        </When>
      </PunditProvider>
    );
    expect(screen.queryByText('View')).toBeInTheDocument();
  });

  it('does not display <When /> child when action is forbidden', () => {
    render(
      <PunditProvider policy={policy}>
        <When can="edit">
          <button>Edit</button>
        </When>
      </PunditProvider>
    );
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('authorises multiple <When /> children from a single provider', () => {
    render(
      <PunditProvider policy={policy}>
        <When can="view">
          <button>View</button>
        </When>
        <When can="edit">
          <button>Edit</button>
        </When>
      </PunditProvider>
    );
    expect(screen.queryByText('View')).toBeInTheDocument();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('authorises nested <When /> child elements', () => {
    render(
      <PunditProvider policy={policy}>
        <When can="view">
          <>
            <button>View</button>
            <When can="edit">
              <button>Edit</button>
            </When>
          </>
        </When>
      </PunditProvider>
    );
    expect(screen.queryByText('View')).toBeInTheDocument();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('does not authorise <When /> children outside of a provider', () => {
    render(
      <>
        <PunditProvider policy={policy}>
          <></>
        </PunditProvider>
        <When can="view">
          <button>View</button>
        </When>
      </>
    );
    expect(screen.queryByText('View')).not.toBeInTheDocument();
  });
});
