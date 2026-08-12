import BaralhoService, { deckProps } from "./BaralhoService";
import AsyncStorage from "@react-native-async-storage/async-storage"



const LOCAL_DECKS_KEY = "LocalStorageDecks"

class LocalStorageService {



    static async DownloadDeck(deckId: string) : Promise<deckProps>{

        try {
            const deck = await BaralhoService.GetDeckById(deckId);

            const decksSalvos = await AsyncStorage.getItem(LOCAL_DECKS_KEY);

            const decks : deckProps[] = decksSalvos ? JSON.parse(decksSalvos) : [];
            
            const deckExistente = decks.some((item) => item.id === deck.id);
            if(deckExistente){
                console.log("Baralho já existente.")
                return deck 
            } 

            decks.push(deck);
    
            await AsyncStorage.setItem(LOCAL_DECKS_KEY, JSON.stringify(decks));

            return deck;
            
        } catch (error) {
            console.log("Erro: " + error);
            throw error
        }
        

    }
}


export default LocalStorageService;