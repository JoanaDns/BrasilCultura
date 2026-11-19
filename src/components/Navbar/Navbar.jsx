import "./Navbar.css";

export default function Navbar() {
    return (
        <header className="navbar">
            <a href="#/" className="logo">
                <span className="logo-icon">🌿</span>
                <span className="logo-nome">CulturaBrasil</span>
            </a>

            <nav aria-label="Menu principal">
                <ul>
                    <li><a href="#/">Início</a></li>
                    <li><a href="#/mapa">Mapa</a></li>
                    <li><a href="#/historia">História</a></li>
                </ul>
            </nav>
        </header>
    );
}
