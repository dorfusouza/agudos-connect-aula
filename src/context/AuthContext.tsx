import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type User = {
    name: string;
    email: string;
}

type AuthContextValue = {
    user: User | null;
    login: (name: string, email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider( { children } : { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            login: (name: string, email:string) => setUser({name, email}),
            logout: () => setUser(null),
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error ('useAuth precisa ser usado de um AuthProvider');
    }
    return context;
}