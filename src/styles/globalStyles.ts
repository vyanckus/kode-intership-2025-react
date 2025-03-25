import { createGlobalStyle } from "styled-components";
import "normalize.css";
import "./fonts.css";

const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: start;
    min-width: 320px;
    font-family: 'Inter', sans-serif;
    background-color: #f5f5f5;
  }

  .container {
    position: absolute;
    left: 0;
    right: 0;
    max-width: 1920px;
    width: 100%;
    min-height: 100%;
    margin: 0 auto;
    padding: 0;
    background-color: #fff;
  }

  ol, ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}
 
`;

export default GlobalStyle;
