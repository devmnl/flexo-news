// Flexo News — script principal

// Dados de exemplo (substitua à vontade)
const posts = [
  {
    id: 'p1',
    type: 'Aviso',
    title: 'REAJUSTE SALARIAL 2025 PARA O SETOR FLEXOGRÁFICO',
    date: '2025-09-16',
    excerpt: 'Os salários vigentes em 1° de Setembro de 2024, limitados a R$ 12.675,82 (doze mil seiscentos e setenta e cinco reais e oitenta e dois centavos serão reajustados mediante aplicação do percentual de 5,70% (cinco inteiros e setenta centésimos por cento, a partir de 1º de Setembro de 2025.',
    tags: ['Dissídio', 'Reajuste Salarial'],
    link: 'https://sindigraf.org.br/wp-content/uploads/2025/09/SINDIGRAF-SP-INFORMA-005_2025-NEGOCIACOES-COLETIVAS-DE-TRABALHO-2025-FECHAMENTO.pdf'
  },
  {
    id: 'p2',
    type: 'Aviso',
    title: 'REAJUSTE SALARIAL 2024 PARA O SETOR FLEXOGRÁFICO',
    date: '2024-09-16',
    excerpt: 'Os salários vigentes em 1° de Setembro de 2023, limitados a R$ 11.992,27 (onze mil novecentos e noventa e dois reais evinte e sete centavos), serão reajustados mediante aplicação do percentual de 4,75% (quatro inteiros e setenta e cincocentésimos por cento), a partir de 1º de Setembro de 2024. Para os salários superiores ao valor acima, será adicionada aparcela fixa de R$ 569,63 (quinhentos e sessenta e nove reais e sessenta e três centavos).',
    tags: ['Dissídio', 'Reajuste Salarial'],
    link: 'https://sindigraf.org.br/wp-content/uploads/2024/09/SINDIGRAF-SP-INFORMA-007-2024-FECHAMENTO-DETALHADO.pdf'
  },
    {
    id: 'p3',
    type: 'Notícia',
    title: 'Mercado flexográfico 2025',
    date: '2025-09-16',
    excerpt: 'O mercado flexográfico apresentou um crescimento de 1,8% em 2025, em comparação com o ano anterior. Este aumento foi influenciado por diversos fatores, incluindo a recuperação da economia global e o aumento da demanda por produtos flexográficos.',
    tags: ['Negocios', 'Informações'],
    link: 'https://www.flexography.org/industry-news/smithers-report-flexo-market-181-billion-2025/?utm_source=chatgpt.com'
  },
  
];

function formatDateToPtBr(isoDate) {
  try {
    return new Date(isoDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (e) {
    return isoDate;
  }
}

function createCard(post) {
  const tagBadges = (post.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
  const titleHtml = post.link
    ? `<a class="link" href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a>`
    : post.title;
  const actionLink = post.link
    ? `<a class="link" href="${post.link}" target="_blank" rel="noopener noreferrer" aria-label="Abrir: ${post.title}">Abrir ↗</a>`
    : '';
  return `
    <article class="card" tabindex="0" aria-labelledby="title-${post.id}">
      <div class="card-type">
        <span class="type-badge">${post.type}</span>
        <span class="card-meta">
          <span>${formatDateToPtBr(post.date)}</span>
        </span>
      </div>
      <h3 id="title-${post.id}">${titleHtml}</h3>
      <p>${post.excerpt}</p>
      <div class="tags">${tagBadges}</div>
      ${actionLink}
    </article>
  `;
}

function renderCards(list) {
  const container = document.getElementById('cards');
  if (!container) return;
  const html = list.map(createCard).join('');
  container.innerHTML = html;
}

// Tema claro/escuro
const Theme = {
  key: 'flexo-theme',
  getPreferred() {
    const saved = localStorage.getItem(this.key);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },
  apply(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      const icon = toggle.querySelector('.toggle-icon');
      if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || this.getPreferred();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.key, next);
    this.apply(next);
  },
  init() {
    const preferred = this.getPreferred();
    this.apply(preferred);
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.addEventListener('click', () => this.toggle());
  }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderCards(posts);
  Theme.init();
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
