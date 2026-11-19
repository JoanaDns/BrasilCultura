import { useState } from "react";
import "./Foto.css";
import { imagem } from "../../imagens";

// Componente padrão para TODAS as fotografias do site.
// Basta informar a pasta e o nome do arquivo JPG.
export default function Foto({
    pasta,
    nome,
    alt = "",
    className = "",
    emoji = "📷"
}) {
    const [imagemComErro, setImagemComErro] = useState("");
    const src = imagem(pasta, nome);

    if (imagemComErro === src || !src) {
        return (
            <div
                className={`foto foto-vazia ${className}`}
                role="img"
                aria-label={alt || "Imagem não encontrada"}
            >
                <span>{emoji}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`foto ${className}`}
            loading="lazy"
            onError={() => setImagemComErro(src)}
        />
    );
}
