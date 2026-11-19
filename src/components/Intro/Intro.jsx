import "./Intro.css";

export default function Intro() {
    return (
        <section className="intro">

            <span className="intro-subtitulo">
                Descubra o Brasil
            </span>

            <h2>
                Uma viagem pelos sabores,
                <br />
                histórias e tradições.
            </h2>

            <p>
                Explore cada região do Brasil e descubra como a cultura,
                os povos e os ingredientes típicos deram origem a pratos
                que fazem parte da nossa identidade.
            </p>

            <a href="#mapa" className="intro-botao">
                Explorar o mapa →
            </a>

        </section>
    );
}