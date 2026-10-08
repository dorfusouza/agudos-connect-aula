// Aula 12 (parte 1): primeira classe GENÉRICA. O <T> é um "tipo a ser
// escolhido por quem usa": o mesmo código serve para StoreModel, para Schedule,
// para qualquer coisa que tenha `id`. `T extends { id: string }` é a regra:
// só aceita tipos que tenham um id (precisamos dele no remove).
//
// Guarda os itens só na MEMÓRIA (some ao fechar o app). Na parte 2 (08/10) a
// mesma ideia vira o AsyncStorageRepository: troca onde guarda, não a interface.
export class InMemoryRepository<T extends { id: string }> {
    // private: ninguém de fora mexe no array direto; passa por add/remove.
    private items: T[] = []

    getAll(): T[] {
        // devolve uma CÓPIA: quem recebe não consegue alterar o array interno.
        return [...this.items]
    }

    add(item: T): void {
        this.items.push(item)
    }

    remove(id: string): void {
        this.items = this.items.filter((item) => item.id !== id)
    }
}
