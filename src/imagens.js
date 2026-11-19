// Sistema único de imagens do CulturaBrasil.
//
// TODAS as fotografias ficam em: public/imagens/<categoria>/<nome>.jpg
// Exemplo: public/imagens/comidas/tacaca.jpg
//
// Como trocar uma foto:
// 1. Abra a pasta public/imagens.
// 2. Entre na categoria correspondente.
// 3. Substitua o arquivo mantendo exatamente o mesmo nome.
// 4. Atualize o navegador. Não precisa alterar JSX nem importar a imagem.
//
// O projeto usa JPG para fotografias. O mapa continua sendo SVG porque é
// um desenho vetorial interativo, não uma fotografia.

function normalizar(valor = "") {
    return String(valor)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
}

export function imagem(pasta, nome) {
    if (!pasta || !nome) return null;

    const categoria = normalizar(pasta);
    const arquivo = normalizar(nome).replace(/\\.(jpg|jpeg|png|webp|avif)$/i, "");

    return `/imagens/${categoria}/${arquivo}.jpg`;
}
