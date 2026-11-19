import { useEffect, useRef, useState } from "react";
import "./Pratos.css";
import CardComida from "../CardComida/CardComida";
import Foto from "../Foto/Foto";

// Pratos típicos da região, em um carrossel com setas para os lados.
// Ao clicar em "Ver receita", a receita aparece logo abaixo do carrossel.
export default function Pratos({ regiao }) {
    const trilho = useRef(null);
    const painel = useRef(null);

    const [aberto, setAberto] = useState(null);
    const [podeVoltar, setPodeVoltar] = useState(false);
    const [podeAvancar, setPodeAvancar] = useState(true);

    const atualizarSetas = () => {
        const el = trilho.current;
        if (!el) return;
        setPodeVoltar(el.scrollLeft > 4);
        setPodeAvancar(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        window.addEventListener("resize", atualizarSetas);
        return () => window.removeEventListener("resize", atualizarSetas);
    }, []);

    // Quando uma receita abre, rola a página até ela
    useEffect(() => {
        if (aberto && painel.current) {
            painel.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [aberto]);

    const mover = (direcao) => {
        const el = trilho.current;
        if (!el) return;
        el.scrollBy({ left: direcao * el.clientWidth * 0.8, behavior: "smooth" });
    };

    const alternar = (slug) => setAberto((atual) => (atual === slug ? null : slug));

    const prato = regiao.pratos.find((p) => p.slug === aberto);

    return (
        <div className="pratos">

            <p className="pratos-dica">
                <strong>{regiao.pratos.length} pratos</strong> com receita nesta região.
                Use as setas ou deslize para o lado para ver mais, e toque em
                <strong> Ver receita</strong> para ver o modo de preparo.
            </p>

            <div className="pratos-area">

                <button
                    type="button"
                    className="pratos-seta pratos-seta-esq"
                    onClick={() => mover(-1)}
                    disabled={!podeVoltar}
                    aria-label="Ver pratos anteriores"
                >
                    ‹
                </button>

                <ul className="pratos-trilho" ref={trilho} onScroll={atualizarSetas}>
                    {regiao.pratos.map((comida) => (
                        <li key={comida.slug}>
                            <CardComida
                                comida={comida}
                                ativo={aberto === comida.slug}
                                onAbrir={() => alternar(comida.slug)}
                            />
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="pratos-seta pratos-seta-dir"
                    onClick={() => mover(1)}
                    disabled={!podeAvancar}
                    aria-label="Ver mais pratos"
                >
                    ›
                </button>

            </div>

            {prato && (
                <section
                    className="receita-aberta"
                    ref={painel}
                    aria-labelledby="receita-titulo"
                >

                    <div className="receita-aberta-foto">
                        <Foto pasta="comidas" nome={prato.slug} alt={prato.nome} />
                    </div>

                    <div className="receita-aberta-conteudo">

                        <button
                            type="button"
                            className="receita-fechar"
                            onClick={() => setAberto(null)}
                        >
                            ✕ Fechar receita
                        </button>

                        <span className="receita-aberta-origem">{prato.origem}</span>
                        <h3 id="receita-titulo">{prato.nome}</h3>
                        <p className="receita-aberta-descricao">{prato.descricao}</p>

                        <ul className="receita-info">
                            <li>
                                <span>Rendimento</span>
                                <strong>{prato.porcoes}</strong>
                            </li>
                            <li>
                                <span>Tempo</span>
                                <strong>{prato.tempo}</strong>
                            </li>
                            <li>
                                <span>Dificuldade</span>
                                <strong>{prato.dificuldade}</strong>
                            </li>
                        </ul>

                        <div className="receita-colunas">

                            <div>
                                <h4>Ingredientes</h4>
                                <ul className="receita-ingredientes">
                                    {prato.ingredientes.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4>Modo de preparo</h4>
                                <ol className="receita-preparo">
                                    {prato.preparo.map((passo) => (
                                        <li key={passo}>{passo}</li>
                                    ))}
                                </ol>
                            </div>

                        </div>

                        {prato.nota && (
                            <p className="receita-nota">
                                <strong>Importante:</strong> {prato.nota}
                            </p>
                        )}

                    </div>

                </section>
            )}

        </div>
    );
}
