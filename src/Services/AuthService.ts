import { LoginDTO, LoginResponse } from "../types/auth";
import { apiService } from "./api";



class AuthService {


    static async Login(data: LoginDTO): Promise<LoginResponse>{
        try {
            const response = await apiService.post<LoginResponse>("/User/auth", data);

            return response.data;
        } catch (error : any) {

            if(error.response) {
                console.log("Erro no login: ", JSON.stringify(error.response.data, null, 2))
            } else {
                console.log("Erro ao realizar Login: ", error.message);
            }

            throw error;
            
        }
    }

}

export default AuthService;