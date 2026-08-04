import axios from 'axios'

const apiService = axios.create({
    baseURL: "https://synapse-api-linux-ewhsffdphjbfhcb3.centralus-01.azurewebsites.net/api",
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default apiService;