import { CreateUserDTO, LoginDTO, LoginResponse, ResponseModelDTO } from "../types/auth";
import { apiService } from "./api";
import UserService from "./UserService";



class AuthService {


    static async Login(data: LoginDTO): Promise<LoginResponse> {
        try {
            const response = await apiService.post<ResponseModelDTO<LoginResponse>>("/User/auth", data);
            console.log(response)

            if (!response.data.isSuccess) {
                throw new Error(
                    response.data.errorMessage || "Erro ao realizar login"
                );
            }

            const loginData = response.data.data

            console.log("LOGIN DATA:", loginData);
            
            const user = await UserService.GetUserById(response.data.data.id);

            return {
                ...loginData,
                user
            };


        } catch (error: any) {

            if (error.response) {

                console.log("Erro no login: ", JSON.stringify(error.response.data, null, 2))
                throw error.response.data

            } else {
                console.log("Erro ao realizar Login: ", error.message);
            }

            throw error;

        }
    }

    static async CreateUser(data: CreateUserDTO): Promise<void> {
        try {
            const response = await apiService.post("/User", data)

        } catch (error: any) {

            if (error.response) {

                console.log("Erro no login: ", JSON.stringify(error.response.data, null, 2))
                throw error.response.data

            } else {
                console.log("Erro ao realizar Login: ", error.message);
            }

            throw error;
        }
    }

}

export default AuthService;