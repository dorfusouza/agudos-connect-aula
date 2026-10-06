import { Store } from "../data/stores";
import { api } from "./api";

export async function fetchStores(): Promise<Store[]> {
    try {
        // CONTINGÊNCIA: o db.json do GitHub vem como { stores: [...] }.
        // Voltando ao my-json-server: api.get<Store[]>('/stores') e return response.data
        const response = await api.get<{ stores: Store[] }>('/db.json');
        return response.data.stores;
    } catch (error) {
        console.log('[storesApi] erro em fetchStores:', error);
        throw error;
    }
}

export async function fetchStoreById(id: string): Promise<Store> {
  try {
    // CONTINGÊNCIA: sem a rota /stores/:id, busca no db.json e filtra pelo id.
    // Voltando ao my-json-server: api.get<Store>(`/stores/${id}`) e return response.data
    const response = await api.get<{ stores: Store[] }>('/db.json');
    const store = response.data.stores.find((s) => s.id === id);
    if (!store) throw new Error('Loja não encontrada');
    return store;
  } catch (error) {
    console.log('[storesApi] erro em fetchStoreById:', error);
    throw error;
  }
}