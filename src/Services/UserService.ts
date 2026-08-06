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

    static async Logar(data: CreateUserProps){

        try {
            const response = await apiService.post("/User/auth", data);
            
            
        } catch (error) {

            console.log("Erro: ", error);
            throw error

        }


    }
}

export default UserService;