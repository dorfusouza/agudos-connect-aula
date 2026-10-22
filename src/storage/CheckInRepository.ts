import { CheckIn } from '../types'
import { AsyncStorageRepository } from './AsyncStorageRepository'

// Mesmo padrão do DuplicateScheduleError (Aula 12): um erro PRÓPRIO do domínio,
// que a tela reconhece com instanceof e mostra a mensagem certa.
export class EmptyCheckInError extends Error {
    constructor() {
        super('O check-in precisa ter pelo menos a foto ou a localização.')
        this.name = 'EmptyCheckInError'
    }
}

// O que a tela informa. O id e o createdAt são responsabilidade do repositório.
export type NewCheckIn = Omit<CheckIn, 'id' | 'createdAt'>

// HERANÇA de novo: CheckInRepository É UM AsyncStorageRepository<CheckIn>. Já nasce
// com getAll(), add() e remove() — nenhuma linha de getItem/setItem repetida.
export class CheckInRepository extends AsyncStorageRepository<CheckIn> {
    constructor() {
        // Uma chave só dos check-ins (a dos agendamentos é outra).
        super('@agudos-connect:checkins')
    }

    // Monta o check-in completo (id + createdAt) depois de conferir a regra:
    // vale foto OU localização, mas não os dois ausentes.
    async create(data: NewCheckIn): Promise<CheckIn> {
        const semFoto = data.photoUri === null
        // Compare com null, NÃO use "!data.latitude": a latitude 0 (linha do Equador)
        // é um valor válido, e 0 é falsy em JavaScript.
        const semLocalizacao = data.latitude === null || data.longitude === null
        if (semFoto && semLocalizacao) throw new EmptyCheckInError()

        return this.add({
            ...data,
            id: String(Date.now()),
            createdAt: new Date().toISOString(),
        })
    }

    // Os check-ins de uma loja só (a tela de detalhe mostra o último deles).
    async getByStore(storeId: string): Promise<CheckIn[]> {
        const todos = await this.getAll()
        return todos.filter((c) => c.storeId === storeId)
    }
}

// Uma instância só para o app inteiro, como o scheduleRepository.
export const checkInRepository = new CheckInRepository()
