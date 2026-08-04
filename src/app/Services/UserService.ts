
import { useAuth } from "@/src/context/AuthContext";
import apiService from "./api";


export interface createUserProps {
    nome: string,
    usuario: string,
    email: string,
    password: string
}

class UserService{
    

    static async PostUser(data: createUserProps){

        try {
            const response = await apiService.post("/User", data);
            console.log(response)
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async SignIn(email: string, password: string){

        const data = {
            email: email,
            password: password
        }

        try {
            const response = await apiService.post("/User/auth", data );
            const userToken = response.data.data;
            console.log("logado" , userToken)
            return userToken;
            
        } catch (error) {
            
        }
    }


}


export default UserService;