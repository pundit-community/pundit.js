import * as React from 'react'
import { createRoot } from 'react-dom/client'
import BasicExample from './basic-example'
import PunditProviderExample from './pundit-provider-example'
import WhenExample from './when-example'
import ExtendedPolicyExample from './extended-policy-example'

function App(): React.ReactElement {
  return (
    <>
      <h1>Examples</h1>
      <BasicExample />
      <PunditProviderExample />
      <WhenExample />
      <ExtendedPolicyExample />
    </>
  )
}

const container = document.getElementById('root')
if (container !== null) {
  const root = createRoot(container)
  root.render(<App />)
}
