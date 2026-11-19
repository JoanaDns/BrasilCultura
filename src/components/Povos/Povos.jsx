import "./Povos.css";
import Foto from "../Foto/Foto";
import povos from "../../Data/povos";

export default function Povos() {
    return (
        <section className="povos" id="historia">

            <div className="povos-texto">
                <h2>
                    Uma mistura de povos,
                    <br />
                    um país de sabores
                </h2>

                <p>
                    A culinária brasileira é resultado do encontro entre
                    diferentes povos que, ao longo da história, contribuíram
                    para formar nossa cultura.
                </p>
            </div>

            <ol className="povos-linha">
                {povos.map((povo) => (
                    <li key={povo.slug} className="povo">
                        <div className="povo-foto">
                            <Foto
                                pasta="povos"
                                nome={povo.slug}
                                alt={povo.nome}
                                emoji={povo.emoji}
                            />
                        </div>

                        <h3>{povo.nome}</h3>
                        <span className="povo-periodo">{povo.periodo}</span>
                        <p>{povo.descricao}</p>
                    </li>
                ))}
            </ol>

        </section>
    );
}
