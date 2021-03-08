import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    
}

const Button: React.FC <ButtonProps> = ({children}) => {
  return (
      <Container type="submit">
          {children}
      </Container>
  );
}

export default Button;