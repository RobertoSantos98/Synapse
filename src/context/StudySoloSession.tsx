import { createContext, ReactNode, useContext, useState } from "react";
import { deckProps } from "../Services/BaralhoService";


interface StudySoloSessionContextData {

    step: number;
    proximoStep: () => void
    voltarStep: () => void

    decksEscolhidos: deckProps[];
    adicionarDeck: (deck: deckProps) => void;
    removerDeck: (deckId: string) => void;

    quantidadeCards: number;
    setQuantidadeCards: (quantidade: number) => void;
    handleQuantidade: (quantidade: number) => void;
    modoEstudo: string;
    setModoEstudo: (modo: string) => void;
    ordemEstudo: string;
    setOrdemEstudo: (ordem: string) => void;

    limparSessao: () => void;

}

const StudySoloSessionContext = createContext({} as StudySoloSessionContextData);

export function StudySoloSessionProvider({ children }: { children: ReactNode }) {

    const [step, setStep] = useState<number>(1);

    const [decksEscolhidos, setDecksEscolhidos] = useState<deckProps[]>([]);

    const [quantidadeCards, setQuantidadeCards] = useState<number>(20);

    const [modoEstudo, setModoEstudo] = useState<string>('revisao');

    const [ordemEstudo, setOrdemEstudo] = useState<string>('aleatorio');

    const proximoStep = () => {
        setStep(prev => Math.min(prev + 1, 3))
    }

    const voltarStep = () => {
        setStep(prev => Math.min(prev - 1, 1))
    }

    const adicionarDeck = (deck: deckProps) => {

        setDecksEscolhidos(prev => {

            // Impede duplicados
            if (prev.some(item => item.id === deck.id)) {
                return prev;
            }

            // Limite de 4 decks
            if (prev.length >= 4) {
                return prev;
            }

            return [...prev, deck];
        });
    };

    const removerDeck = (deckId: string) => {
        setDecksEscolhidos(prev => prev.filter(deck => deck.id !== deckId));
    }

    const limparSessao = () => {

        setDecksEscolhidos([]);
        setQuantidadeCards(20);
        setModoEstudo('revisao');
        setOrdemEstudo('aleatorio');

    };

    const handleQuantidade = (valor: number) => {
        setQuantidadeCards(prev =>
            Math.max(1, prev + valor)
        );
    };

    return (
        <StudySoloSessionContext.Provider value={{ step, proximoStep, voltarStep, decksEscolhidos, adicionarDeck, removerDeck, quantidadeCards, setQuantidadeCards, handleQuantidade, modoEstudo, setModoEstudo, ordemEstudo, setOrdemEstudo, limparSessao }}>
            {children}
        </StudySoloSessionContext.Provider>
    )
};

export function useStudySoloSession() {
    const context = useContext(StudySoloSessionContext);

    if (!context) throw new Error("useStudySoloSession deve ser usado dentro de StudySessionProvider");

    return context;
}