import styled from 'styled-components';
import { FlexBoxContainer, FlexColumnContainer } from '../../../shared/styles';

export const PokemonsModalContainer = styled(FlexBoxContainer)`
  justify-content: center;
  grid-gap: 30px;
`;

export const PokemonsModalImage = styled.div`
  width: 335px;
  height: 380px;
  background-color: var(--antiFlashWhite);
  border-radius: 8px;
`

export const PokemonsModalDescription = styled(FlexColumnContainer)`
  width: 100%;
  grid-gap: 30px;
`;

export const PokemonsModalInfo = styled(FlexColumnContainer)`
  padding: 15px;
  background-color: var(--carolinaBlue);
  border-radius: 8px;
  
  & > div:not(:last-of-type) {
    margin-bottom: 15px;
  }
`

export const PokemonsModalInfoField = styled(FlexColumnContainer)`
  color: var(--white);
  
  & > span {
    display: inline-block;
    margin-top: 10px;
    color: var(--raisinBlack);
  }
`;

export const PokemonsModalInfoFieldExperience = styled.div`
  color: var(--raisinBlack);
  
  & > b:first-of-type {
    color: var(--white);
  }
`;

export const PokemonsModalType = styled(FlexColumnContainer)`
  height: 180px;
  color: var(--raisinBlack);
  
  & > div {
    display: flex;
    grid-gap: 15px;
    flex-wrap: wrap;
    margin-top: 20px;
    
    & > span {
      width: 110px;
      padding: 10px 30px;
      text-align: center;
      background-color: greenyellow;
      border-radius: 8px;
    }
  }
`