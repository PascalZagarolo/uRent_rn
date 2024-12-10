import { createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { getCurrentUser } from "@/actions/getCurrentUser";

const AuthProviderContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("...")
        const retrieveCurrentUser = async () => {
            try {
                console.log("test")
                const foundToken = await SecureStore.getItemAsync("authToken");
               
                if (foundToken) {
                    console.log("test")
                    const res = null;
                    //const res = await getCurrentUser(foundToken);
                    
                    if(res) {
                        setCurrentUser(res);
                    } else {
                        setCurrentUser(null);
                    }
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Failed to retrieve current user1:", error);
            } finally {
                setIsLoading(false);
            }
        }

        retrieveCurrentUser();
    }, [])

    const refetchUser = async () => {
        try {
            
            const foundToken = await SecureStore.getItemAsync("authToken");
            if (foundToken) {
                const res = await getCurrentUser(foundToken);
                setCurrentUser(res);
            } else {
                setCurrentUser(null);
            }
        } catch (error) {
            console.error("Failed to retrieve current user2:", error);
        }
    }

    return (
        <AuthProviderContext.Provider value={{currentUser , setCurrentUser, isLoading, refetchUser}}>
            {children}
        </AuthProviderContext.Provider>
    );
}

export const useAuth = () => useContext(AuthProviderContext);