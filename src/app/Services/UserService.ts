
import { useAuth, UserTokenProp } from "@/src/context/AuthContext";
import apiService from "./api";


export interface createUserProps {
    nome: string,
    usuario: string,
    email: string,
    password: string
}

export interface UserProps {
    id: string,
    nome: string,
    usuario: string,
    level: number,
    avatarUrl: string,
    experiencePoints: number,
    wins: number,
    losses: number,
    totalDuelos: number,
    pontosAtuais: number,
    pontosNecessarios: number
}

class UserService {


    static async PostUser(data: createUserProps) {

        try {
            const response = await apiService.post("/User", data);
            console.log(response)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async SignIn(email: string, password: string) {

        const data = {
            email: email,
            password: password
        }

        console.log("Email:", email);
        console.log("Password preenchida:", !!password);

        try {
            const response = await apiService.post("/User/auth", data);
            const userToken = response.data.data;
            console.log("logado", userToken)
            return userToken as UserTokenProp;

        } catch (error: any) {
            console.log("Erro no service: ", error?.response?.data || error.message)
            throw error;
        }
    }

    static async GetUserById(userId: string): Promise<UserProps> {
        try {

            const response = await apiService.get(`/User/${userId}`);

            return response.data.data as UserProps

        } catch (error: any) {

            console.log("Erro na camada de serviço: ", error.message)
            throw error;

        }
    }


}


export default UserService;