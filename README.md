# Quitanda do Gaspar

Aplicativo front-end feito apenas com **HTML, CSS e JavaScript**, sem frameworks.
O app simula uma quitanda online com login e cadastro de clientes, catálogo,
busca por nome, filtros por categoria, sacola de compras e painel administrativo
para controle de estoque.

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

Antes da loja, a tela de login solicita nome completo e senha. O cadastro de
cliente solicita nome, sobrenome e senha. A senha precisa ter pelo menos seis
caracteres, uma letra maiúscula, uma letra minúscula e um número. Os botões
**Mostrar/Ocultar** permitem conferir a senha digitada.

O acesso do administrador é separado: a conta de cliente não recebe acesso ao
painel nem ao controle de estoque. Na opção **Acesso do administrador**, escolha
**Cadastre-se** para criar a primeira conta. Informe um usuário, uma senha forte
e uma palavra de recuperação; depois do cadastro, o painel administrativo será
aberto. O administrador pode cadastrar itens e consultar quantidades, custos,
preços e lucro estimado.
No painel, o administrador pode mostrar ou ocultar a própria senha e alterá-la.
O link **Esqueceu a senha?** permite redefini-la usando a palavra de recuperação
definida no cadastro.

### 4. Controle de estoque

A seção **Controle de estoque** permite cadastrar código, item, categoria
(fruta, legume ou vegetal), quantidade com unidade em kg ou unidade, preço de
custo e preço de venda. Os cálculos são:

- `Lucro por unidade = preço de venda - preço de custo`
- `Valor total em estoque = quantidade × preço de custo`
- `Lucro estimado = quantidade × lucro por unidade`

Os produtos ficam salvos no `localStorage` deste navegador e podem ser
removidos pelo botão **Excluir**.

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

### 5. Como estudar e evoluir

1. Altere um produto no array `products` e atualize o navegador.
2. Troque as cores no começo do `styles.css`.
3. Adicione uma nova categoria e crie produtos para ela.
4. Substitua os emojis por imagens e use uma API ou banco de dados quando quiser transformar a demonstração em uma loja real.

Esta é uma demonstração somente front-end: as credenciais e os dados ficam no
navegador e podem ser vistos ou alterados por quem o utiliza. O acesso
administrativo não é seguro para produção e a senha do cliente é armazenada
localmente sem proteção. O checkout apenas exibe uma mensagem; uma loja real
precisa de backend com autenticação segura, banco de dados e integração de
pagamento.