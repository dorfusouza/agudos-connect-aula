export type RootStackParamList = {
    Tabs: undefined;
    Sobre: undefined;
    StoreDetail: { StoreId: string };
    // Aula 07/08: a rota Login agora só existe no navegador quando não há
    // usuário logado (navegação condicional no RootNavigator).
    Login: undefined;
}

export type TabParamList = {
    Home: undefined;
    Agenda: undefined;
    Perfil: undefined;
}

// Aula 09: um agendamento persistido de verdade (AsyncStorage), diferente do
// useState local da StoreDetailScreen, que some ao fechar o app.
export type Schedule = {
    id: string;
    storeId: string;
    storeName: string;
    slot: string;
    createdAt: string; // ISO string — Date não serializa em JSON.stringify
}
// Aula 14-B: um check-in persistido. Foto e coordenadas são OPCIONAIS (null) porque
// cada recurso pode falhar sozinho: se o GPS falhar mas a foto existir (ou o
// contrário), o check-in ainda pode ser confirmado com o que existe.
export type CheckIn = {
    id: string;
    storeId: string;
    storeName: string;
    photoUri: string | null;
    latitude: number | null;
    longitude: number | null;
    createdAt: string; // ISO string, igual ao Schedule
}
