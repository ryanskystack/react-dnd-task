import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

// Import main Board component
import { Board } from './components/board';

// Use createGlobalStyle to change the background of 'body' element
const GlobalStyle = createGlobalStyle`
  body {    
    background-color: #ecf0f3;
  }
`

// Create component for the page
const Page = () => (<>
  <Board />
  <GlobalStyle />
</>)

// Render the page into DOM
ReactDOM.render(<Page />, document.getElementById('root'))

