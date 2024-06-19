import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [logado, setLogado] = useState(false);
    const [usuarioId, setUsuarioId] = useState(null);
    const [usuarioNome, setUsuarioNome] = useState(null);
    const [error, setError] = useState(false);

    async function Login(email, senha) {
        if (email !== "" && senha !== "") {
            await fetch('http://10.139.75.20:5251/api/Usuario/Login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    usuarioEmail: email,
                    usuarioSenha: senha
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.usuarioId) {
                        setLogado(true);
                        setUsuarioId(json.usuarioId);
                        setUsuarioNome(json.usuarioNome);
                        setError(false);
                    } else {
                        setError(true);
                    }
                })
                .catch(err => setError(true));
        } else {
            setError(true);
        }
    }

    return (
        <AuthContext.Provider value={{ logado, usuarioId, usuarioNome, Login, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;