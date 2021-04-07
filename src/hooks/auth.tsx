import { addDays, isAfter, parseISO } from 'date-fns';
import React, {createContext, useCallback, useContext, useState} from 'react';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextData{
    user: User;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
    updateUser(user: User): void;
}

interface AuthState{
    user: User;
    token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {

    const [data, setData] = useState<AuthState>(()=>{

        const token = localStorage.getItem('@2Do:token');
        const user = localStorage.getItem('@2Do:user');
        const lastAccess = localStorage.getItem('@2Do:lastAccess');

        if(token && user && lastAccess){

            let lastAccessParsed = parseISO(JSON.parse(lastAccess));
            lastAccessParsed = addDays(lastAccessParsed, 2);

            if(isAfter(new Date(), lastAccessParsed)){

                localStorage.removeItem('@2Do:token');
                localStorage.removeItem('@2Do:user');
                localStorage.removeItem('@2Do:lastAccess');

                return {} as AuthState;
            }

            localStorage.setItem('@2Do:lastAccess', JSON.stringify(new Date()));

            api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;

            return {
                token: JSON.parse(token),
                user: JSON.parse(user)
            };

        }

        return {} as AuthState;
    });

    const signIn = useCallback(async (email: string, password: string)=>{

        const response = await api.post('/sessions', {
            email,
            password
        });

        const {token, user} = response.data;

        api.defaults.headers.authorization = `Bearer ${token}`;

        localStorage.setItem('@2Do:lastAccess', JSON.stringify(new Date()));
        localStorage.setItem('@2Do:token', JSON.stringify(token));
        localStorage.setItem('@2Do:user', JSON.stringify(user));

        setData({token, user});

    },[]);

    const signOut = useCallback(()=>{

        localStorage.removeItem('@2Do:token');
        localStorage.removeItem('@2Do:user');
        localStorage.removeItem('@2Do:lastAccess');

        setData({} as AuthState);
    },[]);

    const updateUser = useCallback((user: User)=>{

        setData({
            token: data.token,
            user
        });

    },[data.token, setData]);

  return (
      <AuthContext.Provider value={{user: data.user, signIn, signOut, updateUser}}>
          {children}
      </AuthContext.Provider>
  );
}

function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('Contexto deve ser criado dentro de AuthProvider');
    }

    return context;
}

export {AuthProvider, useAuth};