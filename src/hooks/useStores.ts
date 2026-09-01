import { useEffect, useState } from "react";
import { Store } from "../data/stores";
import { fetchStores } from "../services/storesApi";

export function useStores() {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ativo = true;
        // evita atualizar estado se o componente já desmontou
        // (ex.: usuário saiu da tela antes da resposta chegar)

        async function carregar() {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchStores();
                if (ativo) setStores(data);
            } catch {
                if (ativo) setError('Não foi possivel carregar lojas!')
            } finally {
                if (ativo) setLoading(false);
            }
        }

        carregar();

        return () => {
            ativo = false;
        };
    },[]);
    return { stores, loading, error };
}