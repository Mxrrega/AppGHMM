import { createContext, useState } from "react";

export const AuthContext = createContext(0);

export default function AuthProvider({ children }) {

    const [logado, setLogado] = useState(false);
    const [cargoId, setCargoId] = useState(null);
    const [usuarioNome, setUsuarioNome] = useState(null);
    const [error, setError] = useState(false);

    async function Login (cpf, senha) {
        console.log('chegou')
        if (cpf !== "" && senha !== "") {
            await fetch(process.env.EXPO_PUBLIC_URL + '/api/Usuario/Login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    usuarioCpf: cpf,
                    usuarioSenha: senha
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json === true) {
                        setLogado(true);
                        setCargoId(json.cargoId);
                        setUsuarioNome(json.usuarioNome);
                        setError(false);
                    } else {
                        setError(true);
                         console.log('corno2')
                    }
                })
                .catch(err => console.error('Erro ao fazer login:', err));
        } else {
            setError(true);
            console.log('corno3')
        }
    }

    return (
        <AuthContext.Provider value={{ logado, cargoId, usuarioNome, Login, error }}>
            {children}
        </AuthContext.Provider>
    );
}

