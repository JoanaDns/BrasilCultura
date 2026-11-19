import "./Regiao.css";
import regioes from "../../Data/regioes";
import Foto from "../Foto/Foto";
import Pratos from "../Pratos/Pratos";
import { imagemPovo } from "../../Data/povosImagens";

// Página de uma região: banner, história, povos e pratos típicos com receitas.
export default function Regiao({ id }) {
    const regiao = regioes.find((r) => r.id === id);

    if (!regiao) {
        return (
            <main className="pagina regiao-vazia">
                <h2>Região não encontrada</h2>
                <a href="#/mapa" className="botao-amarelo">Voltar ao mapa</a>
            </main>
        );
    }

    const rolarPara = (secao) => {
        document.getElementById(secao)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="pagina regiao" style={{ "--cor": regiao.cor }}>

            <a href="#/mapa" className="link-voltar">← Voltar ao mapa</a>

            <section className="regiao-banner">

                <Foto
                    pasta="regioes"
                    nome={regiao.id}
                    alt={regiao.titulo}
                    className="regiao-banner-foto"
                    emoji="🌎"
                />

                <div className="regiao-banner-sombra"></div>

                <div className="regiao-banner-texto">
                    <h2>{regiao.titulo}</h2>
                    <h3>{regiao.lema}</h3>
                    <p>{regiao.resumo}</p>

                    <div className="regiao-atalhos">
                        <button onClick={() => rolarPara("secao-historia")}>História</button>
                        <button onClick={() => rolarPara("secao-pratos")}>Pratos e receitas</button>
                    </div>
                </div>

            </section>

            <section className="regiao-secao" id="secao-historia">
                <h2>História</h2>

                {regiao.historia.map((paragrafo, i) => (
                    <p key={i} className="regiao-paragrafo">{paragrafo}</p>
                ))}

                <p className="regiao-estados">
                    <strong>Estados:</strong> {regiao.estados.join(", ")}
                </p>

                <h3 className="regiao-subtitulo">Quem formou essa cultura</h3>

                <div className="regiao-povos">
                    {regiao.povos.map((povo) => {
                        const { slug, emoji } = imagemPovo(povo.nome);
                        return (
                            <article key={povo.nome} className="regiao-povo">
                                <div className="regiao-povo-foto">
                                    <Foto pasta="povos" nome={slug} alt={povo.nome} emoji={emoji} />
                                </div>
                                <div className="regiao-povo-corpo">
                                    <h4>{povo.nome}</h4>
                                    <p>{povo.descricao}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="regiao-secao" id="secao-pratos">
                <h2>Pratos típicos e receitas</h2>

                <Pratos regiao={regiao} />
            </section>

        </main>
    );
}
