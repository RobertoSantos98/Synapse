import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';


type AuthContextData = {
    userToken: UserTokenProp | null;
    isLoading: boolean;
    signIn: (token: UserTokenProp) => Promise<void>;
    signOut: () => Promise<void>;
}

export type UserTokenProp = {
    id: string,
    nome: string,
    token: string
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userToken, setUserToken] = useState<UserTokenProp | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const token = await SecureStore.getItemAsync('jwt_token');
                if (token) {
                    setUserToken(JSON.parse(token));
                }
            } catch (error) {
                console.log("Erro ao carregar Token: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadStorageData()
    }, []);


    async function signIn(userToken: UserTokenProp){
        await SecureStore.setItemAsync('jwt_token', JSON.stringify(userToken));
        setUserToken(userToken);
    }

    async function signOut(){
        await SecureStore.deleteItemAsync('jwt_token');
        setUserToken(null);
    }

    return(
        <AuthContext.Provider value={{userToken, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth(){
    return useContext(AuthContext);
}