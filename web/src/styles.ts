import { createGlobalStyle } from 'styled-components';

export const globalColors = {
  mainPurple: '#9B608E',
  smokyWhiteDark: '#F2F2F2',
  white: '#FFFFFF',
  darkBlueGray: '#444549',
  antiFlashWhite: '#F2F2F2',
  carolinaBlue: '#56A5D2',
  raisinBlack: '#212121',
};

export default createGlobalStyle`
  :root {
    --primaryColor: ${globalColors.mainPurple};
    --white: ${globalColors.white};
    --smokyWhiteDark: ${globalColors.smokyWhiteDark};
    --darkBlueGray: ${globalColors.darkBlueGray};
    --antiFlashWhite: ${globalColors.antiFlashWhite};
    --carolinaBlue: ${globalColors.carolinaBlue};
    --raisinBlack: ${globalColors.raisinBlack};
    
    --primarySize: 16px;

    --primaryFont: 'Helvetica', sans-serif;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: var(--primaryFont);
    font-size: var(--primarySize);
    color: var(--primaryColor);
    background-color: var(--smokyWhiteDark);
  }

  input {
    :focus {
      outline: none;
    }
  }
  
  button {
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  input {
    outline: none;
    border: none;
  }
`;
