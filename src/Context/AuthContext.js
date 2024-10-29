import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {

    const [logado, setLogado] = useState(true);
    const [cargoId, setCargoId] = useState(null);
    const [usuarioNome, setUsuarioNome] = useState(null);
    const [error, setError] = useState(false);

    async function Login(cpf, senha) {
        if (cpf !== "" && senha !== "") {
            await fetch('http://10.139.75.91/api/Usuario/Login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    usuarioCPF: cpf,
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
                    }
                })
                .catch(err => setError(true));
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