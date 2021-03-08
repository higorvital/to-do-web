import React from 'react';

// import { Container } from './styles';

import {AuthProvider} from './auth';

const AppProvider: React.FC = ({children}) => {
  return (
      <AuthProvider>
          {children}
      </AuthProvider>
  );
}

export default AppProvider;