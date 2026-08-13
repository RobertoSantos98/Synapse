import { ResponseModelDTO, User } from "../types/auth";
import { apiService } from "./api";


export interface UserProps {
    Id: string,
    Nome: string
}

export interface CreateUserProps{
    email: string,
    password: string
}

class UserService {

    static async GetUserById(userId: string): Promise<User>{

        try {
            const response =await apiService.get<User>(`/User/${userId}`);
            
            return response.data;
            
        } catch (error: any) {

            console.log("Erro: ", error.message)
            throw error
        }

    }
}

export default UserService;