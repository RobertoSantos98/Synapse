import { FlatList, View } from 'react-native';
import TitleHome from '../titleHome';
import CardShortHome, { cardShortHomeProps } from '../cardShortHome';

type continuarEstudandoProps = {
    continuarEstudando: cardShortHomeProps[]
}


export default function ContinuarEstudando({continuarEstudando}:continuarEstudandoProps) {
    return (
        <View className='py-2'>
            <TitleHome title='Continuar Estudando' label='Ver todos' onPressLabel={() => { }} />

            <View className=''>
                <FlatList
                data={continuarEstudando}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CardShortHome id={item.id} themeId={item.themeId} title={item.title} detalhes={item.detalhes} nivel={item.nivel} concluido={item.concluido} />}
                horizontal
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingHorizontal: 16
                }}
                />
            </View>
        </View>
    );
}