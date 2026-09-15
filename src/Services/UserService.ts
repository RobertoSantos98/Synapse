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
            
            console.log(response.data);
                    
            return response.data.data

        } catch (error) {
            console.log(error)
            throw error;
        }

    }

    static async AdicionarPontos(pontos: number, userId: string) {

        if(pontos === null || userId === null) throw new Error("Todos os campos devem estar preenchidos");

        const dados = {
            pontos,
            userId
        }

        try {
            const response = await apiService.post<User>("/User/adicionarPontos", dados);
        } catch (error) {
            
        }
    }

    static async GetUsers(): Promise<User[]> {

        try {
            const response = await apiService.get<User[]>("/User");
            if (response) {
                return response.data
            } else {
                return []
            }
            
        } catch (error) {  
            throw new Error
            
        }
    }
}

export default UserService;