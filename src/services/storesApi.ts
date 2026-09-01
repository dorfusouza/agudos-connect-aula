import { Store } from "../data/stores";
import { api } from "./api";

export async function fetchStores(): Promise<Store[]> {
    try {
        const response = await api.get<Store[]>('/stores');
        return response.data;
    } catch (error) {
        console.log('[storesApi] erro em fetchStores:', error);
        throw error;
    }
}

export async function fetchStoreById(id: string): Promise<Store> {
  try {
    const response = await api.get<Store>(`/stores/${id}`);
    return response.data;
  } catch (error) {
    console.log('[storesApi] erro em fetchStoreById:', error);
    throw error;
  }
}