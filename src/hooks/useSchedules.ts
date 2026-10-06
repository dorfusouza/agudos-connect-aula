import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Schedule } from '../types'
import { getSchedules, removeSchedule } from '../storage/schedulesStorage'

// Mesma ideia do useStores (loading + dados), mas a fonte é o AsyncStorage e o
// recarregamento acontece a cada vez que a TELA ganha foco, não só na montagem.
export function useSchedules() {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(true)

    const load = useCallback(async () => {
        const data = await getSchedules()
        // Mais recente primeiro. createdAt é ISO string, então a ordem
        // alfabética das strings já é a ordem cronológica.
        setSchedules([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
        setLoading(false)
    }, [])

    // useEffect roda só quando o componente MONTA — e as abas do Tab Navigator
    // não são remontadas ao trocar de aba. useFocusEffect roda toda vez que a
    // tela ganha foco. O useCallback evita que o efeito reexecute sem necessidade.
    useFocusEffect(
        useCallback(() => {
            load()
        }, [load])
    )

    async function cancelSchedule(id: string) {
        await removeSchedule(id)
        await load() // recarrega do storage: a tela mostra o que está salvo de verdade
    }

    return { schedules, loading, cancelSchedule }
}
