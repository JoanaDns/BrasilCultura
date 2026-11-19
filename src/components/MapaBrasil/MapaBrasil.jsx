import { useState } from "react";
import "./MapaBrasil.css";
import regioes from "../../Data/regioes";
import { VIEWBOX, caminhos, rotulos, icones, linhas } from "./regioesSvg";
import { imagem } from "../../imagens";

// Página do mapa: ao clicar em uma região, abre a página dela (#/regiao/<id>).
export default function MapaBrasil() {
    const [ativa, setAtiva] = useState(null);

    const regiaoAtiva = regioes.find((r) => r.id === ativa);

    return (
        <main className="pagina pagina-mapa">

            <div className="mapa-lateral">

                <div className="mapa-texto">
                    <h2>
                        Explore o
                        <br />
                        nosso Brasil
                    </h2>

                    <p>
                        Clique em uma região do mapa para descobrir suas
                        histórias, sabores e tradições.
                    </p>
                </div>

                <ul className="mapa-legenda">
                    {regioes.map((regiao) => (
                        <li key={regiao.id}>
                            <a
                                href={`#/regiao/${regiao.id}`}
                                onMouseEnter={() => setAtiva(regiao.id)}
                                onMouseLeave={() => setAtiva(null)}
                                onFocus={() => setAtiva(regiao.id)}
                                onBlur={() => setAtiva(null)}
                            >
                                <span
                                    className="legenda-cor"
                                    style={{ background: regiao.cor }}
                                ></span>
                                {regiao.nome}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="mapa-info" aria-live="polite">
                    {regiaoAtiva ? (
                        <>
                            <strong>{regiaoAtiva.titulo}</strong>
                            <span>{regiaoAtiva.lema}</span>
                        </>
                    ) : (
                        <span>Passe o mouse sobre uma região.</span>
                    )}
                </div>

            </div>

            <div className="mapa-desenho">
                <svg
                    viewBox={VIEWBOX}
                    role="img"
                    aria-label="Mapa do Brasil dividido em cinco regiões"
                >
                    <defs>
                        <linearGradient id="mar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#eef8e6" />
                            <stop offset="1" stopColor="#cfe8bd" />
                        </linearGradient>
                        <linearGradient id="brilho" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#fff" stopOpacity=".4" />
                            <stop offset="1" stopColor="#fff" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <rect width="805" height="828" rx="26" fill="url(#mar)" />

                    <g className="mapa-linha">
                        <line x1="0" x2="805" y1={linhas.equador} y2={linhas.equador} />
                        <line x1="0" x2="805" y1={linhas.tropico} y2={linhas.tropico} />
                        <text x="795" y={linhas.equador - 6} textAnchor="end">Linha do Equador</text>
                        <text x="795" y={linhas.tropico - 6} textAnchor="end">Trópico de Capricórnio</text>
                    </g>

                    {regioes.map((regiao) => (
                        <a
                            key={regiao.id}
                            href={`#/regiao/${regiao.id}`}
                            aria-label={regiao.titulo}
                            className={`mapa-regiao ${ativa === regiao.id ? "ativa" : ""}`}
                            onMouseEnter={() => setAtiva(regiao.id)}
                            onMouseLeave={() => setAtiva(null)}
                            onFocus={() => setAtiva(regiao.id)}
                            onBlur={() => setAtiva(null)}
                        >
                            <path d={caminhos[regiao.id]} fill={regiao.cor} />
                            <path d={caminhos[regiao.id]} fill="url(#brilho)" className="mapa-brilho" />
                            {icones[regiao.id].map((i) => {
                                const foto = imagem("mapa", i.slug);
                                if (!foto) {
                                    return (
                                        <text key={i.slug} x={i.x} y={i.y} className="mapa-icone">{i.e}</text>
                                    );
                                }
                                return (
                                    <g key={i.slug} className="mapa-foto">
                                        <clipPath id={`recorte-${i.slug}`}>
                                            <circle cx={i.x} cy={i.y} r="19" />
                                        </clipPath>
                                        <circle cx={i.x} cy={i.y} r="22" fill="#fff" />
                                        <text x={i.x} y={i.y + 6} textAnchor="middle" className="mapa-icone">{i.e}</text>
                                        <image
                                            href={foto}
                                            x={i.x - 19}
                                            y={i.y - 19}
                                            width="38"
                                            height="38"
                                            preserveAspectRatio="xMidYMid slice"
                                            clipPath={`url(#recorte-${i.slug})`}
                                            onError={(evento) => { evento.currentTarget.style.display = "none"; }}
                                        />
                                    </g>
                                );
                            })}
                        </a>
                    ))}

                    {regioes.map((regiao) => (
                        <text
                            key={regiao.id}
                            x={rotulos[regiao.id].x}
                            y={rotulos[regiao.id].y}
                            className="mapa-rotulo"
                        >
                            {regiao.nome}
                        </text>
                    ))}
                </svg>
            </div>

        </main>
    );
}
