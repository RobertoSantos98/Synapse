import { CreateUserDTO, LoginDTO, LoginResponse, ResponseModelDTO } from "../types/auth";
import { apiService } from "./api";
import UserService from "./UserService";



class AuthService {


    static async Login(data: LoginDTO): Promise<LoginResponse> {
        try {
            console.log("AuthService: ", data);

            const response = await apiService.post<ResponseModelDTO<LoginResponse>>("/User/auth", data);

            console.log(response)

            if (!response.data.isSuccess) {
                throw new Error(
                    response.data.errorMessage || "Erro ao realizar login"
                );
            }

            const loginData = response.data.data

            console.log("ID para buscar usuário:", loginData.id);

            const user = await UserService.GetUserById(loginData.id);

            console.log("USER RETORNADO:", user);

            if (!user) throw new Error(response.data.errorMessage)

            return {
                ...loginData,
                user
            };


        } catch (error: any) {

            console.log("========== ERRO LOGIN ==========");

            console.log("ERROR:", error);
            console.log("MESSAGE:", error.message);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("DATA JSON:", JSON.stringify(error.response?.data, null, 2));

            console.log("================================");

            throw error;



    }
}

    static async CreateUser(data: CreateUserDTO): Promise < void> {
    try {
        const response = await apiService.post("/User", data)

    } catch(error: any) {

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