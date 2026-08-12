import { apiService as api } from './api';
import { CardProps } from './CardService';

export interface CriarBaralhoDTO {
    themeId: string | 'default'
    title: string,
    details: string,
    level: string,
}

export interface deckProps {
  id: string,
  themeId: string,
  title: string,
  details: string,
  level: string,
  totalCards: number,
  cards? : CardProps[]
}

const token = ""


class BaralhoService {

    static async GetDeck() : Promise<deckProps[]>{
        try {
            const response = await api.get<deckProps[]>("/Deck");

            return response.data;

        } catch (error: any) {
            console.log("Erro na camada de Serviço: ", error.message);
            throw error;
        }
    }

    static async GetDeckById(id: string) : Promise<deckProps>{
        try {
            const response = api.get(`/Deck/${id}`);
            return (await response).data;

        } catch (error: any) {
            console.log("Erro: ", error.message);
            throw error;
        }
    }


    static async Post(dados: CriarBaralhoDTO){
        try {
            const response = await api.post("/Deck", dados,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            return response.data;
            
        } catch (error: any) {
            if (error.response) {
                console.log("MOTIVO DA REJEIÇÃO NO C#:", JSON.stringify(error.response.data, null, 2));
            } else {
                console.log("Erro na camada de Serviço ao criar Baralho: ", error.message);
            }
            throw error;
        }
    }
}

export default BaralhoService;