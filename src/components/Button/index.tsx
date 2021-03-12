import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    
}

const Button: React.FC <ButtonProps> = ({children, type="submit"}) => {
  return (
      <Container type={type}>
          {children}
      </Container>
  );
}

export default Button;