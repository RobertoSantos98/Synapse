import { createContext, ReactNode, useCallback, useContext, useState } from "react";



interface ConnectionContextProps {
    children: ReactNode
}

interface ConnectionContextType{
    isConnected: boolean,
    tryConnectionAgain: () => void,

}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined)

export function ConnectionProvider({children}: ConnectionContextProps){

    const [ isConnected, setIsConnected ] = useState<boolean>(false);

    
    const tryConnectionAgain = useCallback(async () => {

    }, [])

    return(
        <ConnectionContext.Provider value={{isConnected, tryConnectionAgain}}>
            {children}
        </ConnectionContext.Provider>
    )

}


export function useConnectionContext(){
    const context = useContext(ConnectionContext);

    if(!context){
        throw new Error("useConnectionContext Deve ser usado dentro de um ConnectionProvider");
    }

    return context;
} 