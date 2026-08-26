import axios from 'axios'
import * as SecureStorage from 'expo-secure-store'

export const TOKEN_KEY = "auth_token";
export const USER_KEY = "auth_user";

export const apiService = axios.create({
    baseURL: "https://synapse-api-linux-ewhsffdphjbfhcb3.centralus-01.azurewebsites.net/api",
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})


apiService.interceptors.request.use(
    async(config) => {
        const token = await SecureStorage.getItemAsync(TOKEN_KEY);

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiService.interceptors.response.use(
    (response) => response,

    async (error) => {
        if(error.response?.status === 401) {

            await SecureStorage.deleteItemAsync(TOKEN_KEY);
            await SecureStorage.deleteItemAsync(USER_KEY);

            console.log("Token está inválido. Usuário Deslogado.")
        }

        return Promise.reject(error);
    }
)