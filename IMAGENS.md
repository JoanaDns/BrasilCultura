# Como trocar e adicionar imagens no CulturaBrasil

## Regra simples

Todas as fotografias do site são arquivos **.jpg** e ficam na pasta:

`public/imagens/`

Não coloque fotos dentro de `src/`. A pasta `public` foi escolhida para que você possa trocar uma fotografia sem fazer importação no React.

## Pastas

```text
public/
└── imagens/
    ├── home/
    │   └── hero.jpg
    ├── comidas/
    │   ├── tacaca.jpg
    │   ├── acaraje.jpg
    │   └── feijoada.jpg
    ├── povos/
    │   ├── indigenas.jpg
    │   ├── africanos.jpg
    │   └── europeus.jpg
    ├── regioes/
    │   ├── norte.jpg
    │   ├── nordeste.jpg
    │   ├── centro-oeste.jpg
    │   ├── sudeste.jpg
    │   └── sul.jpg
    └── mapa/
        ├── floresta.jpg
        ├── arara.jpg
        └── ...
```

## Para substituir uma foto que já existe

1. Abra `public/imagens`.
2. Entre na pasta da categoria.
3. Substitua o arquivo pela nova fotografia.
4. Mantenha o mesmo nome, por exemplo `tacaca.jpg`.
5. Atualize o navegador.

Não precisa mexer em nenhum arquivo `.jsx`.

## Para adicionar uma nova foto

Salve o arquivo JPG na pasta da categoria usando o nome correspondente ao `slug` usado nos dados.

Exemplo: se o prato tem `slug: "bolo-de-rolo"`, o arquivo deve ser:

`public/imagens/comidas/bolo-de-rolo.jpg`

O componente já está preparado para localizar automaticamente esse caminho.

## Se quiser mudar o nome do arquivo

O nome da foto precisa corresponder ao valor `nome` ou `slug` enviado ao componente `Foto`. Se você mudar o nome, altere também esse valor nos dados do item.

## Formato

Use `.jpg` em letras minúsculas. Evite espaços e acentos nos nomes dos arquivos. Use hífen, como `arroz-de-cuxa.jpg`.

## Observação sobre o mapa

O mapa interativo do Brasil continua desenhado em SVG porque ele é um desenho vetorial clicável. Isso não significa que as fotografias estejam em SVG: todas as fotos exibidas pelo site usam JPG. O mapa pode continuar sendo SVG sem afetar a troca das fotografias.
