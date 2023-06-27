import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Policy, PunditProvider, When } from '../src/index';

const user = {};
const record = {};
const policy = new Policy(user, record);
policy.add('view', () => true);
policy.add('edit', () => false);

function App(): React.ReactElement {
  return (
    <PunditProvider policy={policy}>
      <h1>Abilities:</h1>
      <When can="view">
        <span>view</span>
      </When>
      <When can="edit">
        <span>edit</span>
      </When>
    </PunditProvider>
  );
}

const container = document.getElementById('root');
if (container !== null) {
  const root = createRoot(container);
  root.render(<App />);
}
