import ConfigurarSessao from './configurarSessao';
import ResumoSessao from './Resumo';
import { StudySoloSessionProvider, useStudySoloSession } from '@/src/context/StudySoloSession';
import PrepararSessao from './PrepararSessao';


export default function PrepararEstudos() {
    
    
    return(
        <StudySoloSessionProvider>
            <Preparacao/>
        </StudySoloSessionProvider>
    )
    
}

function Preparacao(){


    const { step } = useStudySoloSession();


    if(step === 1 ) return <PrepararSessao/>

    if(step === 2 ) return <ConfigurarSessao/>

    return <ResumoSessao/>

}



