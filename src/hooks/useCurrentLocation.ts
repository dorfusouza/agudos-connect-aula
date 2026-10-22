import { useState } from 'react'
import * as Location from 'expo-location'

export type Coords = { latitude: number; longitude: number }

// Os cinco estados que a tela precisa distinguir. Um status em vez de vários
// booleanos (loading, error, denied...) evita combinações impossíveis.
export type LocationStatus = 'idle' | 'loading' | 'ready' | 'denied' | 'error'

// Sem sinal de GPS (dentro de um prédio, por exemplo), getCurrentPositionAsync pode
// demorar muito ou NUNCA responder, e a tela ficaria presa em "Obtendo localização…".
// Por isso a espera tem prazo: se estourar, rejeita e cai no catch, e o usuário ainda
// pode confirmar o check-in só com a foto.
const TEMPO_LIMITE_MS = 20000
const TEMPO_ESGOTADO = 'tempo esgotado'

function comTempoLimite<T>(promessa: Promise<T>, ms: number): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(TEMPO_ESGOTADO)), ms)
        promessa.then(
            (valor) => {
                clearTimeout(timer)
                resolve(valor)
            },
            (erro) => {
                clearTimeout(timer)
                reject(erro)
            }
        )
    })
}

// Aula 14-B: toda a lógica do GPS num hook, no mesmo molde do useSchedules — a tela
// só chama getLocation() e desenha o que o hook devolve.
export function useCurrentLocation() {
    const [coords, setCoords] = useState<Coords | null>(null)
    const [status, setStatus] = useState<LocationStatus>('idle')
    const [message, setMessage] = useState<string | null>(null)

    async function getLocation() {
        setStatus('loading')
        setMessage(null)
        try {
            // Permissão em RUNTIME, como a da câmera. Se já foi concedida antes,
            // o sistema não pergunta de novo e devolve granted direto.
            const permission = await Location.requestForegroundPermissionsAsync()
            if (!permission.granted) {
                setStatus('denied')
                setMessage(
                    permission.canAskAgain
                        ? 'Precisamos da localização para o check-in. Toque em "Obter localização" e permita o acesso.'
                        : 'A permissão de localização foi negada. Libere nas configurações do aparelho.'
                )
                return
            }
            // High (~10 m) usa o GPS de verdade: serve para provar que o cliente está na loja
            // e também funciona no EMULADOR, depois de definir uma posição (ver README).
            // Balanced (~100 m) usa Wi-Fi/rede: gasta menos bateria, mas o emulador não tem
            // rede de localização e a chamada nunca responderia.
            const position = await comTempoLimite(
                Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }),
                TEMPO_LIMITE_MS
            )
            setCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
            setStatus('ready')
        } catch (e) {
            // GPS desligado, sem sinal, emulador sem posição definida...
            setStatus('error')
            setMessage(
                e instanceof Error && e.message === TEMPO_ESGOTADO
                    ? 'A localização demorou demais. Chegue perto de uma janela e tente de novo, ou confirme só com a foto.'
                    : 'Não foi possível obter a localização. Verifique se o GPS está ligado e tente de novo.'
            )
        }
    }

    // Volta ao estado inicial (usado depois de confirmar um check-in).
    function reset() {
        setCoords(null)
        setStatus('idle')
        setMessage(null)
    }

    return { coords, status, message, getLocation, reset }
}
