import { Schedule } from "../types"
import { AsyncStorageRepository } from "./AsyncStorageRepository"

const SCHEDULES_KEY = '@agudos-connect:schedules'

export class DuplicateScheduleError extends Error {
    constructor(){
        super('Já existe um agendamento para este horario.')
        this.name = 'DuplicateScheduleError'
    }
}

export type NewSchedule = Omit<Schedule, 'id' | 'createdAt'>

export class ScheduleRepository extends AsyncStorageRepository<Schedule>{
    constructor() {
        super(SCHEDULES_KEY)
    }
    async add(item: Schedule): Promise<Schedule> {
        const todos = await this.getAll()
        const duplicado = todos.some((s) => s.storeId === item.storeId && s.slot === item.slot)
        if (duplicado) throw new DuplicateScheduleError()
        return super.add(item)
    }
    async create(data: NewSchedule): Promise<Schedule> {
        return this.add({
            ...data,
            id: String(Date.now()),
            createdAt: new Date().toISOString(),
        })
    }
}

// Uma instância só para o app inteiro (as telas e hooks importam esta).
export const scheduleRepository = new ScheduleRepository()
