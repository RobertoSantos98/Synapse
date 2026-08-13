export interface User {

}

export interface LoginDTO{
    email: string,
    password: string
}

export interface LoginResponse{
    id: string,
    nome: string,
    token: string,
    user: User
}