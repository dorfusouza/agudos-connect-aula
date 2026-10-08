export class StoreModel {
    // readonly: recebe o valor no constructor e nunca mais muda.
    readonly id: string
    readonly name: string
    readonly category: string
    // private: só o código DE DENTRO da classe lê e altera. Quem está fora só
    // consegue mudar a nota pelo método avaliar(), que valida o valor.
    private rating: number

    constructor(id: string, name: string, category: string, rating: number) {
        this.id = id
        this.name = name
        this.category = category
        this.rating = rating
    }

    // getter: permite LER a nota (loja.nota) sem permitir escrever nela.
    get nota(): number {
        return this.rating
    }

    // método de acesso controlado: é aqui que a regra "nota entre 0 e 5" mora.
    avaliar(nota: number): void {
        if (nota < 0 || nota > 5) {
            throw new Error('A nota precisa estar entre 0 e 5.')
        }
        this.rating = nota
    }

    // método comum: usa os atributos da própria instância (this).
    resumo(): string {
        return `${this.name} (${this.category}) — nota ${this.rating.toFixed(1)}`
    }
}
