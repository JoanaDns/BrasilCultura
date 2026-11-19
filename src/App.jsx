import { useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Povos from "./components/Povos/Povos";
import MapaBrasil from "./components/MapaBrasil/MapaBrasil";
import Regiao from "./components/Regiao/Regiao";
import Footer from "./components/Footer/Footer";
import { useRota } from "./router";

// Página inicial: banner com o botão "Ver mapa" + seção dos povos.
function Inicio({ rolarPara }) {
    useEffect(() => {
        if (rolarPara) {
            document.getElementById(rolarPara)?.scrollIntoView({ behavior: "smooth" });
        }
    }, [rolarPara]);

    return (
        <>
            <Hero />
            <Povos />
        </>
    );
}

function App() {
    const [pagina, regiaoId] = useRota();

    let conteudo;

    if (pagina === "mapa") {
        conteudo = <MapaBrasil />;
    } else if (pagina === "regiao" && regiaoId) {
        // key: ao trocar de região, a página começa do zero (receita fechada)
        conteudo = <Regiao key={regiaoId} id={regiaoId} />;
    } else {
        conteudo = <Inicio rolarPara={pagina === "historia" ? "historia" : null} />;
    }

    return (
        <>
            <Navbar />
            {conteudo}
            <Footer />
        </>
    );
}

export default App;
