# Flexo News

Uma página única, moderna e responsiva para publicar avisos e notícias do setor flexográfico.

## Como usar

1. Abra `index.html` no seu navegador.
2. Para editar o conteúdo, altere o array `posts` em `app.js`.
3. Personalize estilos em `styles.css` (cores, tipografia, espaçamentos).

## Estrutura

- `index.html`: marcação da página (header, grid de cards e footer)
- `styles.css`: estilos com tema claro/escuro via CSS variables
- `app.js`: renderização dos cards e toggle de tema (localStorage)

## Conteúdo de exemplo

Em `app.js` há alguns itens de exemplo (Aviso/Notícia). Você pode trocar `title`, `date`, `excerpt` e `tags` conforme necessário.

## Deploy rápido

- GitHub Pages: faça commit deste diretório e ative Pages na branch principal.
- Netlify/Vercel: importe o repositório; não há build — deploy estático direto.

## Acessibilidade

- Semântica em header/main/footer
- Contraste otimizado para ambos os temas
- Botão de tema com `aria-pressed` e rótulo descritivo
