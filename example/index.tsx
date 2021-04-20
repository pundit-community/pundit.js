import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Policy, PunditProvider, When } from '../.';

const user = {};
const record = {};
const policy = new Policy(user, record);
policy.add('view', () => true);
policy.add('edit', () => false);

const App = () => {
  return (
    <PunditProvider policy={policy}>
      Abilities:
      <When can="view">view</When>
      <When can="edit">edit</When>
    </PunditProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
