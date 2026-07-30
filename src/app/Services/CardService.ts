import { apiService } from './api'

export interface CardProps {
    id?: string,
    deckId?: string,
    question: string,
    answer: string,
    wrongAnswer: string
}

export class CardService{

    static async GetCard(){

    }

    static async PostCard(card : CardProps){

        try {
            const response = await apiService.post("/Card", card);
            
            return response.data
        } catch (error: any) {
            
            console.log("Erro na camada de Serviço: ", error)
            throw error

        }

    }
}