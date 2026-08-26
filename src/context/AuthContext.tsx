import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { LoginDTO, LoginResponse, User } from "../types/auth";

import * as SecureStorage from "expo-secure-store"
import AuthService from "../Services/AuthService";

interface AuthContextProps {
    user: User | null;
    token: string | null;

    isAuthenticated: boolean;
    isLoading: boolean;

    login: (data: LoginDTO) => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const TOKEN_KEY = "auth_token";
export const USER_KEY = "auth_user";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(null);

    const [token, setToken] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadingSession();
    }, [])


    async function loadingSession() {
        try {
            const storedToken = await SecureStorage.getItemAsync(TOKEN_KEY);

            const storedUser = await SecureStorage.getItemAsync(USER_KEY);

            if(storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }

        } catch (error) {
            console.log("Erro ao carregar sessão: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function login(data:LoginDTO): Promise<void> {

        console.log("AuthContext: ", data)

        const response = await AuthService.Login(data);

        await SecureStorage.setItemAsync(TOKEN_KEY, response.token);

        await SecureStorage.setItemAsync(USER_KEY, JSON.stringify(response.user))

        setToken(response.token);
        setUser(response.user);
    }

    async function logout(): Promise<void> {
        await SecureStorage.deleteItemAsync(TOKEN_KEY);

        await SecureStorage.deleteItemAsync(USER_KEY);

        setToken(null);
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, token, isAuthenticated: !!token, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("UseAuth deve ser usado dentro de AuthProvider");
    }

    return context;
}