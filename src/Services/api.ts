import axios from 'axios'

export const apiService = axios.create({
    baseURL: "https://synapse-api-linux-ewhsffdphjbfhcb3.centralus-01.azurewebsites.net/api",
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})