import { useEffect, useState } from 'react';
import { fetchStoreById } from '../services/storesApi';
import type { Store } from '../data/stores';

// Mesma ideia do useStores, mas pra uma loja específica — recebe o id (vindo
// de route.params na tela de detalhe) e re-busca sempre que o id mudar.
export function useStore(id: string) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchStoreById(id);
        if (ativo) setStore(data);
      } catch {
        if (ativo) setError('Não foi possível carregar os dados da loja.');
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [id]);

  return { store, loading, error };
}
