import styled from 'styled-components';
import { FlexColumnContainer } from '../../../shared/styles';

export const PokemonsCardContainer = styled(FlexColumnContainer)`
  grid-gap: 35px;
  width: 200px;
  height: 200px;
  padding: 15px;
  background-color: var(--white);
  border: 1px solid var(--primaryColor);
  border-radius: 10px;
  cursor: pointer;
  transition: all .7s;
  
  & > span {
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
  }
  
  & > img {
    width: 100px;
    height: 100px;
    align-self: center;
  }
  
  &:hover {
    transform: scale(1.1);
  }
`;