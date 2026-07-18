import { Text, View } from 'react-native';
import TitleHome from '../titleHome';
import BackgroundHome from '@/src/Assets/backgroundHome';

export default function DashBoard() {

    const dados = [
        { id: 1, dia: 'Seg', cardsEstudados: 40 },
        { id: 2, dia: 'Ter', cardsEstudados: 20 },
        { id: 3, dia: 'Qua', cardsEstudados: 65 },
        { id: 4, dia: 'Qui', cardsEstudados: 11 },
        { id: 5, dia: 'Sex', cardsEstudados: 47 },
        { id: 6, dia: 'Sáb', cardsEstudados: 15 },
        { id: 7, dia: 'Dom', cardsEstudados: 0 },
    ];

    const maior = Math.max(...dados.map((item) => item.cardsEstudados)) || 1;


    return (
        <View className='mb-6'>
            <TitleHome title='Atividades da Semana' label='' onPressLabel={() => { }} />

            <View className='bg-white border border-slate-200 mx-6 mt-2 rounded-3xl p-6 shadow-md flex-row h-48 items-end justify-between'>


                {dados.slice(0, 7).map((item) => (
                    <RenderItemsDashBoard key={item.id} dia={item.dia} cardsEstudados={item.cardsEstudados} maior={maior} />
                ))}


            </View>


        </View>
    );
}

type RenderDashboardProps = {

    dia: string,
    cardsEstudados: number
    maior: number
}

const RenderItemsDashBoard = ({ dia, cardsEstudados, maior }: RenderDashboardProps) => {

    const porcentagemProgresso = Math.min(
        Math.round((cardsEstudados / maior) * 100),
        100
    )

    return (
        <View className='items-center gap-2 '>

            <Text className='text-[10px] font-bold text-slate-400 '>
                {cardsEstudados > 0 ? cardsEstudados : ""}
            </Text>

            <View className='w-3 h-24 bg-slate-100 rounded-full justify-end overflow-hidden'>
                <View style={{ height: `${porcentagemProgresso}%` }} className='bg-emerald-500 w-full rounded-full' />
            </View>
            <Text className='text-slate-500 font-bold text-sm uppercase'>{dia}</Text>
        </View>
    )
}