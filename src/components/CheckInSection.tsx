//CheckInSection.tsx - dentro de components

import { CameraView, useCameraPermissions } from "expo-camera"
import { useRef, useState } from "react";

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
    const [ lastCheckIn, setlastCheckIn] = useState<string | null>(null);
    

}