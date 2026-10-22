//CheckInSection.tsx - dentro de components

import { CameraView, useCameraPermissions } from "expo-camera"
import { useEffect, useRef, useState } from "react";
import { checkInRepository, EmptyCheckInError } from "../storage/CheckInRepository";
import { CheckIn } from "../types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useCurrentLocation } from "../hooks/useCurrentLocation";

type Props = {
    storeId: string
    storeName: string
}

export default function CheckInSection({ storeId, storeName}: Props){
    // Camera
    const [ permission, requestPermission] = useCameraPermissions();
    const [ cameraOpen, setCameraOpen ] = useState(false);
    const [ photoUri, setPhotoUri] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    // GPS
    const location = useCurrentLocation();

    // Salvar o checkin
    const [ saving, setSaving] = useState(false);
    const [ saveError, setSaveError] = useState<string | null>(null);
    const [lastCheckIn, setLastCheckIn] = useState<CheckIn | null>(null)

    useEffect(() => {
        checkInRepository
            .getByStore(storeId)
            .then((lista) => {
                setLastCheckIn(lista.length > 0 ? lista[lista.length - 1] : null)})
            .catch(() => setLastCheckIn(null))
    }, [storeId])

     async function openCamera() {
        setError(null)
        if (!permission?.granted) {
            const result = await requestPermission()
            if (!result.granted) {
                setError(
                    result.canAskAgain
                        ? 'Precisamos da câmera para fazer o check-in. Toque em "Tirar foto" e permita o acesso.'
                        : 'A permissão da câmera foi negada. Libere nas configurações do aparelho para tirar a foto.'
                )
                return
            }
        }
        setCameraOpen(true)
    }

    async function takePicture() {
        try {
            const photo = await cameraRef.current?.takePictureAsync()
            if (photo) {
                setPhotoUri(photo.uri)
                setCameraOpen(false)
            }
        } catch {
            setError('Não foi possível tirar a foto. Tente novamente.')
        }
    }

    const podeConfirmar = photoUri !== null || location.coords !== null;

    async function confirmCheckIn() {
        setSaving(true) // trava o botão: sem isso, dois toques seguidos salvam dois check-ins
        setSaveError(null)
        try {
            const salvo = await checkInRepository.create({
                storeId,
                storeName,
                photoUri,
                // `?? null`: sem GPS, grava null (e não undefined, que o JSON descartaria)
                latitude: location.coords?.latitude ?? null,
                longitude: location.coords?.longitude ?? null,
            })
            setLastCheckIn(salvo)
            setPhotoUri(null)
            location.reset()
        } catch (e) {
            setSaveError(
                e instanceof EmptyCheckInError ? e.message 
                : 'Não foi possível salvar o check-in. Tente novamente.'
            )
        } finally {
            setSaving(false)
        }
    }
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Check-in na loja</Text>

            {/* ---------- Foto ---------- */}
            {cameraOpen ? (
                <View>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing="back"
                        onMountError={() => {
                            setCameraOpen(false)
                            setError('Câmera indisponível neste aparelho.')
                        }}
                    />
                    <View style={styles.row}>
                        <Pressable style={[styles.button, styles.buttonFlex]} onPress={takePicture}>
                            <Text style={styles.buttonText}>Capturar</Text>
                        </Pressable>
                        <Pressable style={[styles.buttonOutline, styles.buttonFlex]} onPress={() => setCameraOpen(false)}>
                            <Text style={styles.buttonOutlineText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View>
                    {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}
                    <Pressable style={styles.button} onPress={openCamera}>
                        <Text style={styles.buttonText}>{photoUri ? 'Tirar outra foto' : 'Tirar foto'}</Text>
                    </Pressable>
                </View>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* ---------- Localização (novo) ---------- */}
            {!cameraOpen && (
                <View style={styles.block}>
                    <Text style={styles.subtitle}>Localização</Text>
                    {location.status === 'loading' && <Text style={styles.info}>Obtendo localização…</Text>}
                    {location.coords && (
                        <Text style={styles.info}>
                            Latitude {location.coords.latitude.toFixed(5)} · Longitude {location.coords.longitude.toFixed(5)}
                        </Text>
                    )}
                    <Pressable
                        style={[styles.buttonOutline, location.status === 'loading' && styles.disabled]}
                        onPress={location.getLocation}
                        disabled={location.status === 'loading'}
                    >
                        <Text style={styles.buttonOutlineText}>
                            {location.coords ? 'Atualizar localização' : 'Obter localização'}
                        </Text>
                    </Pressable>
                    {location.message && <Text style={styles.errorText}>{location.message}</Text>}
                </View>
            )}

            {/* ---------- Confirmar (novo) ---------- */}
            {!cameraOpen && (
                <View style={styles.block}>
                    <Pressable
                        style={[styles.button, (!podeConfirmar || saving) && styles.disabled]}
                        onPress={confirmCheckIn}
                        disabled={!podeConfirmar || saving}
                    >
                        <Text style={styles.buttonText}>{saving ? 'Salvando…' : 'Confirmar check-in'}</Text>
                    </Pressable>
                    {!podeConfirmar && (
                        <Text style={styles.hint}>Tire a foto ou obtenha a localização para confirmar.</Text>
                    )}
                    {saveError && <Text style={styles.errorText}>{saveError}</Text>}
                </View>
            )}

            {/* ---------- Último check-in salvo (novo) ---------- */}
            {lastCheckIn && !cameraOpen && (
                <View style={styles.lastBox}>
                    <Text style={styles.lastTitle}>Último check-in salvo</Text>
                    <Text style={styles.info}>{new Date(lastCheckIn.createdAt).toLocaleString('pt-BR')}</Text>
                    <Text style={styles.info}>
                        {lastCheckIn.latitude !== null && lastCheckIn.longitude !== null
                            ? `Local: ${lastCheckIn.latitude.toFixed(5)}, ${lastCheckIn.longitude.toFixed(5)}`
                            : 'Local: não registrado'}
                    </Text>
                    <Text style={styles.info}>{lastCheckIn.photoUri ? 'Foto: registrada' : 'Foto: não registrada'}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    section: { marginTop: 32 },
    title: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
    subtitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
    block: { marginTop: 20 },
    camera: { width: '100%', height: 320, borderRadius: 12, overflow: 'hidden' },
    preview: { width: '100%', height: 220, borderRadius: 12, backgroundColor: '#DDD', marginBottom: 12 },
    row: { flexDirection: 'row', gap: 12, marginTop: 12 },
    button: { backgroundColor: '#1E2761', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
    buttonFlex: { flex: 1 },
    buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
    buttonOutline: { borderWidth: 1, borderColor: '#1E2761', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
    buttonOutlineText: { color: '#1E2761', fontWeight: '700', fontSize: 15 },
    disabled: { opacity: 0.45 },
    info: { color: '#333', marginBottom: 8 },
    hint: { marginTop: 8, color: '#666', fontSize: 13 },
    errorText: { marginTop: 12, color: '#B00020' },
    lastBox: { marginTop: 24, padding: 12, borderRadius: 12, backgroundColor: '#EEF3FF' },
    lastTitle: { fontWeight: '700', marginBottom: 6, color: '#1E2761' },
})
