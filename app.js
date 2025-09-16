// Flexo News — script principal

// Dados de exemplo (substitua à vontade)
const posts = [
  {
    id: 'p1',
    type: 'Aviso',
    title: 'Reajuste salarial 2025 para o setor flexográfico.',
    date: '2025-09-12',
    excerpt: 'Os salários vigentes em 1° de Setembro de 2024, limitados a R$ 12.675,82 (doze mil seiscentos e setenta e cinco reais e oitenta e dois centavos serão reajustados mediante aplicação do percentual de 5,70% (cinco inteiros e setenta centésimos por cento, a partir de 1º de Setembro de 2025.',
    tags: ['Dissídio', 'Reajuste Salarial'],
    link: 'https://www.gov.br/pt-br/servicos/reajuste-salarial-2025-para-o-setor-flexografico'
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
  const tagBadges = (post.tags || []).map(tag => `<span class=\"tag\">${tag}</span>`).join('');
  return `
    <article class=\"card\" tabindex=\"0\" aria-labelledby=\"title-${post.id}\">
      <div class=\"card-type\">
        <span class=\"type-badge\">${post.type}</span>
        <span class=\"card-meta\">
          <span>${formatDateToPtBr(post.date)}</span>
        </span>
      </div>
      <h3 id=\"title-${post.id}\">${post.title}</h3>
      <p>${post.excerpt}</p>
      <div class=\"tags\">${tagBadges}</div>
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
