// Baixa uma foto para cada prato, povo e ícone do mapa, usando o Wikimedia Commons
// (fotos livres). As fotos vão para public/imagens/<pasta>/<slug>.jpg.
//
// Como usar (na pasta do projeto, onde fica o package.json):
//   npm run imagens              -> baixa tudo que ainda não existe
//   npm run imagens -- comidas   -> só os pratos (ou: povos, mapa)
//
// Fotos que você já colocou não são trocadas. Os créditos de cada foto
// ficam em CREDITOS-IMAGENS.md (muitas licenças exigem citar o autor).
// A primeira foto achada nem sempre é a ideal: confira e troque se precisar.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Acha a pasta do projeto (a que tem src/Data), mesmo que o script esteja em outro lugar.
const aqui = path.dirname(fileURLToPath(import.meta.url));
const raiz = [aqui, path.join(aqui, ".."), process.cwd(), path.join(process.cwd(), "Cultura"), path.join(process.cwd(), "..")]
    .map((d) => path.resolve(d))
    .find((d) => fs.existsSync(path.join(d, "src", "Data", "norte.js")));
if (!raiz) {
    console.log("Não achei a pasta do projeto (a que tem src/Data). Abra o terminal dentro da pasta Cultura e rode de novo.");
    process.exit(1);
}
console.log(`Projeto encontrado em: ${raiz}`);
const pastaImg = path.join(raiz, "public", "imagens");
const arquivoCreditos = path.join(raiz, "CREDITOS-IMAGENS.md");
const filtro = process.argv[2];

const povos = {
    indigenas: "Povo indígena brasileiro aldeia",
    portugueses: "Caravela portuguesa",
    africanos: "Baiana de acarajé Salvador",
    "migrantes-nordestinos": "Retirantes sertão nordestino",
    holandeses: "Forte das Cinco Pontas Recife",
    bandeirantes: "Monumento às Bandeiras São Paulo",
    candangos: "Construção de Brasília 1958",
    imigrantes: "Imigrantes italianos Brasil",
    tropeiros: "Tropeiros mulas tropeirismo",
    europeus: "Oktoberfest Blumenau",
};

const mapa = {
    floresta: "Floresta Amazônica", arara: "Arara-azul", tambaqui: "Tambaqui peixe",
    acai: "Açaizeiro palmeira", jambu: "Jambu Acmella oleracea",
    mandacaru: "Mandacaru cacto", coco: "Coco verde", praia: "Praia de Porto de Galinhas",
    jangada: "Jangada Fortaleza", coqueiro: "Coqueiral Nordeste",
    onca: "Onça-pintada Pantanal", gado: "Gado Pantanal", soja: "Plantação de soja",
    milho: "Espiga de milho",
    serra: "Serra da Mantiqueira", industria: "Indústria São Paulo",
    cafe: "Cafezal Minas Gerais", "sao-paulo": "Avenida Paulista",
    uva: "Uvas Vale dos Vinhedos", araucaria: "Araucária", chimarrao: "Chimarrão",
};

const itens = [];
for (const [slug, busca] of Object.entries(povos)) itens.push({ pasta: "povos", slug, busca });
for (const [slug, busca] of Object.entries(mapa)) itens.push({ pasta: "mapa", slug, busca });
for (const arq of ["norte", "nordeste", "centroOeste", "sudeste", "sul"]) {
    const url = pathToFileURL(path.join(raiz, "src", "Data", `${arq}.js`)).href;
    const regiao = (await import(url)).default;
    for (const p of regiao.pratos) itens.push({ pasta: "comidas", slug: p.slug, busca: p.nome });
}

// No seu projeto, "comidas", "povos" etc. eram arquivos vazios, e não pastas.
// Aqui eles são apagados (só se estiverem vazios) e recriados como pastas.
function garantirPasta(dir) {
    if (fs.existsSync(dir) && fs.statSync(dir).isFile()) {
        if (fs.statSync(dir).size > 0) throw new Error(`${dir} é um arquivo com conteúdo; renomeie-o`);
        fs.unlinkSync(dir);
    }
    fs.mkdirSync(dir, { recursive: true });
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const cabecalho = { "User-Agent": "CulturaBrasil/1.0 (projeto escolar sobre culinária brasileira)" };

async function pedir(url) {
    for (let i = 1; i <= 4; i++) {
        const r = await fetch(url, { headers: cabecalho });
        if (r.status === 429 || r.status >= 500) { await esperar(2500 * i); continue; }
        if (!r.ok) throw new Error(`erro ${r.status}`);
        return r;
    }
    throw new Error("o site demorou a responder");
}

const semTags = (t = "") => t.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

async function buscar(busca) {
    const api = new URL("https://commons.wikimedia.org/w/api.php");
    api.search = new URLSearchParams({
        action: "query", format: "json", generator: "search", gsrnamespace: "6",
        gsrsearch: `${busca} filetype:bitmap`, gsrlimit: "10",
        prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "900",
    });
    const dados = await (await pedir(api)).json();
    const paginas = Object.values(dados.query?.pages ?? {}).sort((a, b) => a.index - b.index);
    return paginas.find((p) => {
        const i = p.imageinfo?.[0];
        return i && i.mime === "image/jpeg" && i.width >= 700 && i.thumburl;
    });
}

console.log(`Procurando fotos para ${itens.filter((i) => !filtro || filtro === i.pasta).length} itens...\n`);
let ok = 0, faltou = [];
for (const { pasta, slug, busca } of itens) {
    if (filtro && filtro !== pasta) continue;
    const destino = path.join(pastaImg, pasta, `${slug}.jpg`);
    garantirPasta(path.dirname(destino));
    const jaTem = ["jpg", "jpeg", "png", "webp", "avif"].some((e) =>
        fs.existsSync(path.join(pastaImg, pasta, `${slug}.${e}`)));
    if (jaTem) continue;

    try {
        const achada = await buscar(busca);
        if (!achada) { faltou.push(`${pasta}/${slug}`); console.log(`✗ ${pasta}/${slug}: nada encontrado`); continue; }
        const info = achada.imageinfo[0];
        const foto = Buffer.from(await (await pedir(info.thumburl)).arrayBuffer());
        garantirPasta(path.dirname(destino));
        fs.writeFileSync(destino, foto);

        const meta = info.extmetadata ?? {};
        const linha = `- ${pasta}/${slug}.jpg — ${semTags(meta.Artist?.value) || "autor não informado"}, ` +
            `${semTags(meta.LicenseShortName?.value) || "licença não informada"} — ${achada.title}\n`;
        if (!fs.existsSync(arquivoCreditos)) {
            fs.writeFileSync(arquivoCreditos, "# Créditos das imagens (Wikimedia Commons)\n\n");
        }
        fs.appendFileSync(arquivoCreditos, linha);
        ok++;
        console.log(`✓ ${pasta}/${slug}`);
    } catch (e) {
        faltou.push(`${pasta}/${slug}`);
        console.log(`✗ ${pasta}/${slug}: ${e.message}`);
    }
    await esperar(700);
}

console.log(`\nPronto: ${ok} fotos baixadas.`);
if (faltou.length) console.log(`Sem foto (coloque à mão):\n  ${faltou.join("\n  ")}`);
