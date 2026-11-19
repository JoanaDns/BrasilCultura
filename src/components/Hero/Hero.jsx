import "./Hero.css";
import { imagem } from "../../imagens";
import { irPara } from "../../router";

export default function Hero() {

    // Foto do banner: src/assets/imagens/home/hero.jpg
    // Sem a foto, o banner usa um fundo verde.
    const hero = imagem("home", "hero");

    const fundo = hero
        ? `url(${hero})`
        : "linear-gradient(135deg, #14340f 0%, #2f6a1f 60%, #0f2a0b 100%)";

    return (
        <section
            className="hero"
            style={{ backgroundImage: fundo }}
        >

            <div className="overlay"></div>

            <div className="hero-container">

                <div className="hero-texto">

                    <h1>
                        Cultura<span>Brasil</span>
                    </h1>

                    <h2>
                        Sabores que contam
                        <br />
                        nossa história.
                    </h2>

                    <p>
                        Uma viagem pela ancestralidade e pelo território
                        brasileiro através da nossa culinária.
                    </p>

                    <div className="hero-botoes">

                        <button
                            className="btn-amarelo"
                            onClick={() => irPara("/mapa")}
                        >
                            Ver mapa →
                        </button>

                    </div>

                </div>

            </div>

            <div className="ondas">

                <div className="onda verde"></div>

                <div className="onda amarela"></div>

                <div className="onda azul"></div>

            </div>

        </section>
    );
}
