// Liga o nome de cada povo (como aparece nas regiões) à foto e ao emoji dele.
// A foto vai em src/assets/imagens/povos/<slug>.jpg (ou .png, .webp...).
// Enquanto a foto não existir, o card mostra um fundo colorido com o emoji.
const porNome = {
    "Povos indígenas": { slug: "indigenas", emoji: "🌿" },
    "Portugueses": { slug: "portugueses", emoji: "⛵" },
    "Africanos escravizados": { slug: "africanos", emoji: "🥁" },
    "Migrantes nordestinos": { slug: "migrantes-nordestinos", emoji: "🌵" },
    "Holandeses": { slug: "holandeses", emoji: "🌷" },
    "Bandeirantes e colonos": { slug: "bandeirantes", emoji: "🧭" },
    "Candangos e migrantes": { slug: "candangos", emoji: "🏗️" },
    "Imigrantes europeus e asiáticos": { slug: "imigrantes", emoji: "🌾" },
    "Tropeiros e gaúchos": { slug: "tropeiros", emoji: "🐎" },
    "Imigrantes europeus": { slug: "europeus", emoji: "🍷" },
};

export function imagemPovo(nome) {
    return porNome[nome] || { slug: "povo", emoji: "🍽️" };
}
