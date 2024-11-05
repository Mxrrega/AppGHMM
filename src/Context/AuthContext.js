import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {

    const [logado, setLogado] = useState(true);
    const [cargoId, setCargoId] = useState(null);
    const [usuarioNome, setUsuarioNome] = useState(null);
    const [error, setError] = useState(false);

    async function Login(email, cpf, senha) {

        console.log('chegou')
        if (email !== "" && cpf !== "" && senha !== "") {
            await fetch(process.env.EXPO_PUBLIC_URL + '/api/Usuario/Login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    usuarioEmail: email,
                    usuarioCpf: cpf,
                    usuarioSenha: senha
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.usuarioId) {
                        setLogado(true);
                        setCargoId(json.cargoId);
                        setUsuarioNome(json.usuarioNome);
                        setError(false);
                    } else {
                        setError(true);
                         console.error('Erro ao fazer login:', json);
                    }
                })
                .catch(err => console.error('Erro ao fazer login:', err));
        } else {
            setError(true);
        }
    }

    return (
        <AuthContext.Provider value={{ logado, cargoId, usuarioNome, Login, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;