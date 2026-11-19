import "./Receita.css";
import regioes from "../../Data/regioes";
import Foto from "../Foto/Foto";

// Página de uma receita (ingredientes e modo de preparo).
export default function Receita({ regiaoId, slug }) {
    const regiao = regioes.find((r) => r.id === regiaoId);
    const receita = regiao?.receitas.find((r) => r.slug === slug);

    if (!receita) {
        return (
            <main className="pagina receita-vazia">
                <h2>Receita não encontrada</h2>
                <a href="#/mapa" className="botao-amarelo">Voltar ao mapa</a>
            </main>
        );
    }

    return (
        <main className="pagina receita" style={{ "--cor": regiao.cor }}>

            <div className="receita-foto">
                <Foto
                    pasta="comidas"
                    nome={receita.slug}
                    alt={receita.nome}
                />
            </div>

            <div className="receita-conteudo">

                <a href={`#/regiao/${regiao.id}`} className="link-voltar">
                    ← Voltar para a região
                </a>

                <h2>{receita.nome}</h2>
                <h3>{receita.subtitulo}</h3>
                <p className="receita-descricao">{receita.descricao}</p>

                <ul className="receita-info">
                    <li>
                        <span>Rendimento</span>
                        <strong>{receita.porcoes}</strong>
                    </li>
                    <li>
                        <span>Tempo</span>
                        <strong>{receita.tempo}</strong>
                    </li>
                    <li>
                        <span>Dificuldade</span>
                        <strong>{receita.dificuldade}</strong>
                    </li>
                </ul>

                <div className="receita-colunas">

                    <div>
                        <h4>Ingredientes</h4>
                        <ul className="receita-ingredientes">
                            {receita.ingredientes.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4>Modo de preparo</h4>
                        <ol className="receita-preparo">
                            {receita.preparo.map((passo) => (
                                <li key={passo}>{passo}</li>
                            ))}
                        </ol>
                    </div>

                </div>

                {receita.nota && (
                    <p className="receita-nota">
                        <strong>Importante:</strong> {receita.nota}
                    </p>
                )}

            </div>

        </main>
    );
}
