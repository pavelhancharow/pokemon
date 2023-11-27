import styled from 'styled-components';
import { FlexColumnContainer } from '../shared/styles';

export const AppWrapper = styled(FlexColumnContainer)`
  margin: 0 auto;
  padding-bottom: 50px;
  
  @media (min-width: 1200px) {
    width: 1200px;
  }
`;

export const AppHeader = styled.div`
  margin: 50px 0;
`;
