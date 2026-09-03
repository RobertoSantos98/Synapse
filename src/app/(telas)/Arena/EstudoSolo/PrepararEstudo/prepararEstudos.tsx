import ConfigurarSessao from './configurarSessao';
import ResumoSessao from './Resumo';
import { useStudySoloSession } from '@/src/context/StudySoloSession';
import PrepararSessao from './PrepararSessao';


export default function PrepararEstudos() {
    
    
    return(
            <Preparacao/>
    )
    
}

function Preparacao(){


    const { step } = useStudySoloSession();

    console.log("STEP ATUAL:", step);

    if(step === 1 ) return <PrepararSessao/>

    if(step === 2 ) return <ConfigurarSessao/>

    return <ResumoSessao/>

}



