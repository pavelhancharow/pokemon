import styled from 'styled-components';
import { FlexBoxContainer } from '../../../shared/styles';

export const PokemonsSearchForm = styled.form`
`;

export const PokemonsSearchWrapper = styled.fieldset`
  border: 1px solid var(--primaryColor);
  background-color: var(--white);
  border-radius: 8px;
  padding: 0 10px;
  
  & > legend {
    padding: 0 5px;
  }
  
  & > input[type="search"] {
    background-color: transparent;
    padding-right: 10px;
  }
  
  & > input[type="reset"],
  input[type="submit"]{
    padding: 10px;
    background-color: transparent;
    color: inherit;
    border-left: 1px solid var(--primaryColor);
    cursor: pointer;
  }
`;