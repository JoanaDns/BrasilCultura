import "./CardComida.css";
import Foto from "../Foto/Foto";

// Cartão de um prato típico. A foto vem de src/assets/imagens/comidas/<slug>.jpg
export default function CardComida({ comida, ativo, onAbrir }) {
    return (
        <article className={`card-comida ${ativo ? "ativo" : ""}`}>

            <div className="card-comida-foto">
                <Foto pasta="comidas" nome={comida.slug} alt={comida.nome} />
            </div>

            <div className="card-comida-texto">
                <span className="card-comida-origem">{comida.origem}</span>
                <h3>{comida.nome}</h3>
                <p>{comida.descricao}</p>

                <span className="card-comida-meta">
                    ⏱ {comida.tempo} · {comida.dificuldade}
                </span>

                <button
                    type="button"
                    className="card-comida-botao"
                    onClick={onAbrir}
                    aria-expanded={ativo}
                >
                    {ativo ? "Fechar receita" : "Ver receita"}
                </button>
            </div>

        </article>
    );
}
