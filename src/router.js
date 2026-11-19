import { useEffect, useState } from "react";

// Roteador simples, sem instalar nenhum pacote.
// O endereço fica depois do "#". Exemplos:
//   #/                                  -> página inicial
//   #/mapa                              -> mapa do Brasil
//   #/regiao/norte                      -> página da região
//   #/regiao/norte/receita/tacaca       -> página da receita

function lerRota() {
    const caminho = window.location.hash.replace(/^#\/?/, "");
    return caminho.split("/").filter(Boolean);
}

export function useRota() {
    const [partes, setPartes] = useState(lerRota);

    useEffect(() => {
        const aoMudar = () => {
            setPartes(lerRota());
            window.scrollTo({ top: 0 });
        };
        window.addEventListener("hashchange", aoMudar);
        return () => window.removeEventListener("hashchange", aoMudar);
    }, []);

    return partes;
}

export function irPara(caminho) {
    window.location.hash = caminho;
}
