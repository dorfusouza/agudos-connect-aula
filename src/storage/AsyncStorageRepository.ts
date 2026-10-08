import AsyncStorage from '@react-native-async-storage/async-storage'

// Aula 12 (parte 2): a mesma ideia do InMemoryRepository<T> da parte 1, agora
// guardando no aparelho (AsyncStorage). A lógica de getItem / setItem /
// JSON.parse / JSON.stringify fica escrita UMA vez aqui; quem precisar guardar
// outro tipo de dado (check-ins, favoritos) só herda desta classe.
export class AsyncStorageRepository<T extends { id: string }> {
    // private readonly: cada repositório tem a sua chave, definida no constructor
    // e que ninguém de fora enxerga nem troca.
    private readonly key: string

    constructor(key: string) {
        this.key = key
    }

    async getAll(): Promise<T[]> {
        const raw = await AsyncStorage.getItem(this.key)
        // Primeira vez que o app roda, a chave não existe: getItem devolve null.
        if (!raw) return []
        return JSON.parse(raw) as T[]
    }

    async add(item: T): Promise<T> {
        const items = await this.getAll()
        // Lê a lista inteira, acrescenta e grava a lista inteira (não há "update parcial").
        await AsyncStorage.setItem(this.key, JSON.stringify([...items, item]))
        return item
    }

    async remove(id: string): Promise<void> {
        const items = await this.getAll()
        await AsyncStorage.setItem(this.key,
             JSON.stringify(items.filter((item) => item.id !== id)))
    }
}
