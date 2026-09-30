import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import NetInfo, {NetInfoState} from '@react-native-community/netinfo'



interface ConnectionContextProps {
    children: ReactNode
    apiBaseUrl: "https://synapse-api-linux-ewhsffdphjbfhcb3.centralus-01.azurewebsites.net/";
}

interface ConnectionContextType{
    isDeviceOnline: boolean,
    isServerOnline: boolean,
    isCheckingServer: boolean,
    checkServerConnection: () => Promise<boolean>
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

const SERVER_TIMEOUT_MS = 15000

export function ConnectionProvider({children, apiBaseUrl}: ConnectionContextProps){

    const [ isDeviceOnline, setIsDeviceOnline ] = useState<boolean>(false);
    const [ isServerOnline, setIsServerOnline ] = useState<boolean>(false);
    const [ isCheckingServer, setIsCheckingServer ] = useState<boolean>(false);

    
    const checkServerConnection = useCallback(async(): Promise<boolean> => {
        setIsCheckingServer(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), SERVER_TIMEOUT_MS)

        try {

            const response = await fetch(`${apiBaseUrl}/ping`, {
                method: "GET",
                signal: controller.signal,
                headers: { "Cache-Control": "no-cache"}
            });

            clearTimeout(timeoutId);

            const isOk = response.ok;
            setIsServerOnline(isOk);
            setIsCheckingServer(false);
            return isOk;
            
        } catch (error) {
            clearTimeout(timeoutId);
            setIsServerOnline(false);
            setIsCheckingServer(false);
            return false;
        }
    },[apiBaseUrl])


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            const online = Boolean(state.isConnected && (state.isInternetReachable ?? true))
            setIsDeviceOnline(online);

            if(online) {
                checkServerConnection();
            } else{
                setIsServerOnline(false);
            }
        });

        return () => unsubscribe();
    }, [checkServerConnection]);

    return(
        <ConnectionContext.Provider value={{isDeviceOnline, isCheckingServer, isServerOnline, checkServerConnection}}>
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