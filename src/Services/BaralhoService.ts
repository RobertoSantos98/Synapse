import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { apiService as api } from './api';
import { CardProps } from './CardService';

export interface CriarBaralhoDTO {
    themeId: string | 'default'
    title: string,
    details: string,
    level: string,
    userId?: string,
    isPrivate: boolean
}

export interface deckProps {
  id: string,
  themeId: string,
  title: string,
  details: string,
  level: string,
  isPrivate: boolean,
  userId: string,
  totalCards: number,
  cards? : CardProps[]
}

export const DECKS_KEY = "decksLocalStorage"




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
            console.log(dados);
            const response = await api.post("/Deck", dados);
    
            return response.data;
            
        } catch (error: any) {
            if (error) {
                console.log("MOTIVO DA REJEIÇÃO NO C#:", error.response.message);
            } else {
                console.log("Erro na camada de Serviço ao criar Baralho: ", error.message);
            }
            throw error;
        }
    }


    static async DownloadDeck(DeckId: string): Promise<deckProps> {

        try {
            const deck : deckProps = await this.GetDeckById(DeckId);

            const response = await AsyncStorage.getItem(DECKS_KEY);

            const decksSalvos : deckProps[] = response ? JSON.parse(response) : [];

            const deckExistente = decksSalvos.filter(d => d.id === deck.id);

            if(deckExistente) return deck;

            decksSalvos.push(deck);

            await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decksSalvos));

            console.log("Deck Baixado!");

            return deck;


        } catch (error: any) {
            console.log("Erro ao salvar o arquivo localmente: ", error.message)
            throw error
        }

    }

    static async GetDecksBaixados() : Promise<deckProps[]>{
        try {
            const response = await AsyncStorage.getItem(DECKS_KEY);
            const decks = response ? JSON.parse(response) : [];
            return decks;

        } catch (error) {
            throw error
        }
    }



    static async HandleDecksJogo(decks: deckProps[], onProgress?: (atual: number, total: number, message: string, porcentagem: number) => void): Promise<deckProps[]>{
        
        try {
            onProgress?.(0, 0, "Verificando Decks Baixados", 0);

            const decksJaBaixados = await this.GetDecksBaixados();
            const decksParaBaixar = decks.filter(item => !decksJaBaixados.some(baixado => baixado.id === item.id));
            
            let totalDecks = decks.length;
            const totalParaBaixar = decksParaBaixar.length;
            
            if(totalParaBaixar === 0) {
                onProgress?.(totalDecks, totalDecks, "Todos os decks já disponível offline", 100);
                return decksJaBaixados.filter(baixado => decks.some(deck => deck.id === baixado.id));
            }
            
            let atual = totalDecks - totalParaBaixar;

            let porcentagem = Math.min(atual / totalDecks * 100, 100);
            
            onProgress?.(atual, totalDecks, "Baixando...", porcentagem);
            
            const decksBaixados: deckProps[] = []

            for(const deck of decksParaBaixar){
                onProgress?.(atual, totalDecks, "Baixando: ", porcentagem)

                const response = await this.DownloadDeck(deck.id);

                decksBaixados.push(response);

                atual++;
                porcentagem = Math.min(atual/ totalDecks * 100, 100)

                onProgress?.(atual, totalDecks, `Baixando: ${deck.title}`, porcentagem)
            }

            return [
                ...decksJaBaixados.filter(baixado => decks.some(deck => deck.id === baixado.id)),
                ...decksBaixados
            ]

        } catch (error) {
            console.error("Erro ao baixar decks: ", error);
            return []
        }
    }


}

export default BaralhoService;