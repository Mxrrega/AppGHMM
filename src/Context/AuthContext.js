import { createContext, useState } from "react";

export const AuthContext = createContext(0);

export default function AuthProvider({ children }) {

    const [logado, setLogado] = useState(false);
    const [cargoId, setCargoId] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(false);

    async function Login( cpf, senha) {
        if ( cpf !== "" && senha !== "") {
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
                    if( json.usuarioId > 0 ) {
                        setLogado( true );
                        setUsuario( json );
                    } else {
                        setLogado( false );
                        setError( true );
                    }
                })
                .catch(err => console.error('Erro ao fazer login:', err));
        } else {
            setError(true);
        }
    }

    return (
        <AuthContext.Provider value={{ logado, cargoId, usuario: usuario, setUsuario: setUsuario, Login, error }}>
            {children}
        </AuthContext.Provider>
    );
}

