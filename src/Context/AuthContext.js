import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {

    return (
        <AuthContext.Provider value={''}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;