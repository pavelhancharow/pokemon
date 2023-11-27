import styled from 'styled-components';
import { globalColors } from '../../../styles';
import { convertHexToRgb } from '../../helpers';
import { FlexBoxCenterContainer, FlexColumnContainer, H3 } from '../../styles';

const modalBGColor = convertHexToRgb(globalColors.darkBlueGray, 0.55)

export const ModalContainer = styled(FlexBoxCenterContainer)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  
  background-color: ${modalBGColor};
  overflow-y: auto;
`;

export const ModalCard = styled(FlexColumnContainer)`
  background-color: var(--white);
  border-radius: 10px;
  width: 100%;
  max-width: 780px;
  position: relative;
  overflow-y: visible;
  padding: 30px 40px;
`;

export const ModalTitle = styled(H3)`
  margin-bottom: 25px;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;