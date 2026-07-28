import { apiService as api } from './api';

export interface CriarBaralhoDTO {
    title: string,
    details: string,
    level: string,
    themeId: string | 'default'
}

export class BaralhoService {


    static async Post(dados: CriarBaralhoDTO){
        try {
            const response = await api.post("/Deck", dados);
    
            return response.data;
            
        } catch (error: any) {
            if (error.response) {
                // Imprime a fofoca inteira que o C# mandou de volta!
                console.log("MOTIVO DA REJEIÇÃO NO C#:", JSON.stringify(error.response.data, null, 2));
            } else {
                console.log("Erro na camada de Serviço ao criar Baralho: ", error.message);
            }
            throw error;
        }
    }
}