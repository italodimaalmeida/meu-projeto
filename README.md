# Verdejar — aplicativo de quitanda

Aplicativo front-end feito apenas com **HTML, CSS e JavaScript**, sem frameworks.
Ele simula uma quitanda online com catálogo, busca por nome, filtros por categoria
e uma sacola de compras funcional.

## Como executar

1. Baixe ou clone este projeto.
2. Abra a pasta no VS Code.
3. Abra o arquivo `index.html` no navegador. A forma mais prática é instalar a extensão **Live Server** no VS Code e clicar em **Go Live**.

Não há dependências para instalar nem servidor obrigatório.

## Passo a passo da programação

### 1. HTML: estrutura da página

O arquivo `index.html` cria as partes visíveis:

- cabeçalho com logo, navegação e botão da sacola;
- seção principal com chamada da quitanda;
- benefícios da loja;
- área de produtos e filtros;
- história, rodapé e painel lateral do carrinho.

O elemento `<template id="product-template">` funciona como um molde. O JavaScript
duplica esse molde para cada produto, evitando escrever oito cartões manualmente.

### 2. CSS: aparência e responsividade

O arquivo `styles.css` define cores, fontes, espaçamentos, cards e o painel da
sacola. As regras `@media` adaptam o layout para tablet e celular.

As variáveis no início do arquivo, como `--green-900` e `--orange`, facilitam
trocar a identidade visual inteira em um só lugar.

### 3. JavaScript: dados e comportamento

O arquivo `script.js` começa com um array chamado `products`. Cada objeto
representa um produto com nome, preço, categoria e emoji.

Antes do catálogo, a aplicação também exibe uma tela de login. O formulário
valida nome, e-mail e senha, e guarda somente o nome e o e-mail no
`localStorage`. A senha não é salva. O botão **Sair** remove essa sessão e
mostra a tela de login novamente.

Também existe a tela **Cadastre-se**. Ela solicita nome completo, e-mail, senha
e repetição da senha. A senha precisa ter no mínimo seis caracteres, uma letra
maiúscula, uma letra minúscula e um número. O JavaScript compara os dois campos
antes de criar a sessão.

No login, o e-mail foi retirado: agora são solicitados apenas nome e senha.
Os botões **Mostrar/Ocultar** permitem visualizar temporariamente a senha no
login e no cadastro, inclusive nas duas confirmações do cadastro.

### 4. Controle de estoque

A seção **Controle de estoque** permite cadastrar código, item, categoria
(fruta, legume ou vegetal), quantidade com unidade em kg ou unidade, preço de
custo e preço de venda. Os cálculos são:

- `Lucro por unidade = preço de venda - preço de custo`
- `Valor total em estoque = quantidade × preço de custo`
- `Lucro estimado = quantidade × lucro por unidade`

Os produtos ficam salvos no `localStorage` do navegador e podem ser removidos
pelo botão **Excluir**.

Depois, o objeto `state` guarda o estado atual da aplicação:

- `category`: filtro selecionado;
- `search`: texto digitado;
- `cart`: produtos adicionados e suas quantidades.

As funções principais são:

- `renderProducts()`: mostra os produtos filtrados;
- `addToCart()`: adiciona um item à sacola;
- `changeQuantity()`: aumenta ou diminui a quantidade;
- `renderCart()`: recalcula quantidade e preço total;
- `openCart()` e `closeCart()`: abrem e fecham a sacola.

### 4. Como estudar e evoluir

1. Altere um produto no array `products` e atualize o navegador.
2. Troque as cores no começo do `styles.css`.
3. Adicione uma nova categoria e crie produtos para ela.
4. Substitua os emojis por imagens e use uma API ou banco de dados quando quiser transformar a demonstração em uma loja real.

Esta versão ainda não salva pedidos em um servidor e o botão de checkout apenas
exibe uma mensagem. Para produção, seria necessário backend, autenticação e
integração com pagamento.