import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from './api'
import BaralhoService, { DECKS_KEY } from './BaralhoService';

export interface CardProps {
    id?: string,
    deckId?: string,
    question: string,
    answer: string,
    wrongAnswer: string,
    dificuldade?: DificuldadeCardProps 
}

export enum DificuldadeCardProps {
    Facil = "facil",
    Medio = "medio",
    Dificil = "dificil"
}

class CardService{

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

    static async HandleDificuldadePessoalCard(dificuldade: DificuldadeCardProps, cardId: string) {
        const decks = await BaralhoService.GetDecksBaixados();

        const decksAtualizados = decks.map(deck => ({
            ...deck,
            cards: deck.cards?.map(card => {
                if(card.id === cardId) {
                    return {
                        ...card,
                        dificuldade: dificuldade
                    };
                }
                return card
            })
        }));

        await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decksAtualizados));
        
    }
}

export default CardService;