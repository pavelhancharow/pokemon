import React from 'react';
import { H2 } from '../../styles';

interface IHeader {
  children: React.ReactNode;
}

const Header = ({ children }: IHeader) => {
  return (
    <H2>{children}</H2>
  );
}

export default Header;