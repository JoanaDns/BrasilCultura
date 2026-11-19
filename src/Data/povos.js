// Povos que formaram a culinária brasileira (seção da página inicial).
// A foto de cada um vai em src/assets/imagens/povos/<slug>.jpg
const povos = [
    {
        slug: "indigenas",
        nome: "Povos indígenas",
        periodo: "antes de 1500",
        emoji: "🌿",
        descricao:
            "Os primeiros habitantes. Ensinaram o uso da mandioca, do milho, do pequi, do açaí e de dezenas de frutas e peixes.",
    },
    {
        slug: "portugueses",
        nome: "Colonização portuguesa",
        periodo: "1500–1822",
        emoji: "⛵",
        descricao:
            "Trouxeram a cana-de-açúcar, o gado, o trigo e a tradição de cozidos, doces e conservas.",
    },
    {
        slug: "africanos",
        nome: "Povos africanos",
        periodo: "1500–1888",
        emoji: "🥁",
        descricao:
            "Trazidos à força, trouxeram o dendê, o quiabo, a pimenta e técnicas de preparo que moldaram a cozinha do país.",
    },
    {
        slug: "europeus",
        nome: "Imigração europeia",
        periodo: "a partir de 1824",
        emoji: "🌾",
        descricao:
            "Alemães, italianos, poloneses, espanhóis e outros povos trouxeram massas, embutidos, pães e bolos.",
    },
    {
        slug: "asiaticos",
        nome: "Imigração asiática",
        periodo: "a partir de 1908",
        emoji: "🍚",
        descricao:
            "Japoneses e outros imigrantes asiáticos levaram novas hortaliças, o shoyu e novos modos de preparar o arroz e o peixe.",
    },
];

export default povos;
