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
            const response = await apiService.get<User>(`/User/${userId}`);
            
            return response.data;
            
        } catch (error: any) {

            console.log("Erro: ", error.message)
            throw error
        }

    }

    static async ChangeAvatar(userId: string, avatar: string): Promise<User>{

        const dados = {
            id: userId,
            avatarUrl: avatar
        }

        console.log(dados)

        try {
            const response = await apiService.post<ResponseModelDTO<User>>("/User/atualizar-avatar", dados);

            if(response === null) throw new Error("Resposta da Api Vazia");
            
            console.log(response.data)
                    
            return response.data.data

        } catch (error) {
            console.log(error)
            throw error;
        }

    }
}

export default UserService;