import { jsx } from 'react/jsx-runtime'

/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  // Avoid need to pass index file path explictly when running pnpx typedoc:
  entryPoints: ['./src/index.ts'],

  // Highlight README codeblocks and prevent JSX from rendering incorrectly:
  highlightLanguages: ['bash', 'javascript', 'jsx']
}

export default config
