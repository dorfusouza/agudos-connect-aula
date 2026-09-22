export type RootStackParamList = {
    Tabs: undefined;
    Sobre: undefined;
    StoreDetail: { StoreId: string };

    Login: undefined;
}

export type TabParamList = {
    Home: undefined;
    Agenda: undefined;
    Perfil: undefined;
}

export type Schedule = {
    id: string;
    storeId: string;
    storeName: string;
    slot: string;
    createdAt: string; //ISO string
}