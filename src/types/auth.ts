export interface User {
    id: string,
    nome: string,
    usuario: string,
    level: number,
    avatarUrl: null,
    metaDiaria: number,
    experiencePoints: number,
    wins: number,
    losses: number,
    totalDuelos: null | number,
    pontosAtuais: null | number,
    pontosNecessarios: null | number
}

export interface LoginDTO{
    email: string,
    password: string
}

export interface CreateUserDTO{
    nome: string;
    usuario: string;
    email: string;
    password: string;
}

export interface LoginResponse{
    id: string,
    nome: string,
    token: string,
    user: User
}

export interface ResponseModelDTO<T> {
    isSuccess: boolean;
    errorMessage: string;
    data: T;
}