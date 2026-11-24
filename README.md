# Portfólio — Pedro Correia Lopes Filho

Landing page premium de portfólio pessoal, construída em HTML5, CSS3 e JavaScript puro
(sem frameworks e sem build step). Tema escuro com glassmorphism, gradientes
ciano/azul/violeta, animações discretas e catálogo de projetos com filtros.

**Conceito central:** *Transformando ideias em experiências digitais extraordinárias.*

---

## Estrutura do projeto

```
index.html                     Landing page principal (todas as seções)
jogos.html                     Catálogo premium de jogos publicados
css/style.css                  Design system completo (tokens + componentes + responsivo)
js/projects.js                 Fonte única de dados: 38 jogos + o próprio site
js/main.js                     Interações da landing (canvas, reveal, nav, filtros, modal, form)
js/catalog.js                  Interações do catálogo (filtros, busca, modal, contadores)
images/favicon.svg             Ícone do site (gradiente PC)
referencia/jogos-original.html Lista original preservada como referência (noindex)
jogos.html (raiz, legado)      Sobrescrito pela versão premium
```

## Páginas e seções

### `index.html`
| Seção | id | Conteúdo |
|---|---|---|
| Hero | `inicio` | Nome, headline em 3 linhas, 2 CTAs, 4 chips de áreas, orb 3D + canvas de partículas |
| Faixa | — | Marquee com as áreas de atuação |
| Sobre | `sobre` | Texto profissional, citação, card de identidade (espaço para foto) |
| Serviços | `servicos` | 6 cards: Web, Aplicativos, IA, Jogos, Sistemas/Automação, Design/UX |
| Projetos | `projetos` | 39 cards (38 jogos + este site), 8 filtros com contagem, busca, modal de detalhes |
| Tecnologias | `tecnologias` | 7 grupos de chips (front, back, dados, IA, jogos, ferramentas, design) |
| Diferenciais | `diferenciais` | 7 itens numerados |
| Processo | `processo` | Timeline em 4 etapas (Descoberta → Estratégia → Desenvolvimento → Evolução) |
| CTA | `vamos-conversar` | Bloco com gradiente e botão para WhatsApp |
| Contato | `contato` | 6 canais + formulário validado (Nome, E-mail, Assunto, Mensagem) |
| Rodapé | — | Marca, navegação, contato, redes sociais, ano automático |

### `jogos.html`
Hero com contadores dinâmicos (38 jogos / 7 categorias / 100% no navegador), filtros
por categoria, busca, grid de cards com capa, tag, ícone, botão **Jogar** e botão
**Detalhes** (modal com categoria, destaques e endereço) e bloco CTA final.

## Dados dos projetos

Todos os 38 endereços foram importados de `jogos.html` **sem alteração de URL**
(base `https://pedrocorreialopes.github.io/`). Duas duplicatas exatas do arquivo
original (Paciência e Quebra-Cabeça de Números, repetidos) aparecem apenas uma vez.
A cópia literal da lista original está em `referencia/jogos-original.html`.

Categorias de filtro (`PROJECT_GROUPS` em `js/projects.js`):

- `classicos` — Jogos Clássicos (11)
- `estrategia` — Estratégia (5)
- `educacao` — Educação (13)
- `raciocinio` — Raciocínio (13)
- `bingo` — Bingo & Sorteios (10)
- `arcade` — Arcade & Simuladores (6)
- `ferramentas` — Ferramentas Interativas (8)
- `web` — Aplicação Web (1: o próprio portfólio)

Para adicionar um projeto, basta inserir um objeto em `PROJECTS` (js/projects.js):

```js
{
  id: 'meu-jogo',               // único, usado no modal
  name: 'Meu Jogo',
  cat: 'Jogos Clássicos',       // rótulo exibido
  groups: ['classicos'],        // usado pelos filtros
  url: GH + 'meu-jogo/',        // endereço público (ou null)
  glyph: 'fa-solid fa-star',    // ícone Font Awesome
  palette: 'cat-classicos',     // capa decorativa
  desc: 'Uma linha para o card.',
  long: 'Parágrafo do modal.',
  highlights: ['Recurso A', 'Recurso B']
}
```

## Comportamento e acessibilidade

- **Progressive enhancement:** as animações de revelação só escondem conteúdo depois
  que o JS adiciona a classe `.reveal-pending`. Sem JS, tudo permanece visível.
  Há ainda três redes de segurança (sweep no scroll/resize, timeouts e liberação no load).
- **`prefers-reduced-motion`:** desativa canvas, marquee, gradiente animado, orbitais
  e todas as transições; revelações aparecem imediatamente.
- **Acessibilidade:** skip link, `aria-pressed` nos filtros, `aria-live` na contagem,
  `role="dialog"` + `aria-modal` no modal, foco gerenciado ao abrir/fechar,
  fechamento por `Escape` ou clique no backdrop, `aria-label` nos botões só de ícone,
  focus-visible em todos os elementos interativos, contraste alto no tema escuro.
- **Performance:** sem bibliotecas JS; apenas Google Fonts e Font Awesome via CDN.
  Canvas pausa quando a aba fica oculta ou o canvas sai da viewport. Tudo com
  `requestAnimationFrame` e listeners `passive`.
- **Links externos:** todos com `target="_blank" rel="noopener noreferrer"`.

## Formulário de contato — comportamento real

Não existe backend de e-mail. O formulário:

1. Valida os 4 campos no navegador (nome ≥ 2, e-mail com formato válido, assunto
   selecionado, mensagem ≥ 10 caracteres) com mensagens de erro por campo;
2. Monta o texto com nome, assunto, mensagem e e-mail de retorno;
3. **Abre o WhatsApp** (`wa.me/5585989002536`) com a mensagem pré-preenchida;
4. Informa explicitamente que o envio é concluído no WhatsApp.

Nada é armazenado no site, e nenhum envio é simulado como entregue. O botão
"Enviar por e-mail" usa `mailto:`.

## Como rodar localmente

Não há build. Basta servir a pasta como arquivos estáticos:

```bash
python3 -m http.server 8000
# abra http://localhost:8000/index.html
```

Abrir `index.html` diretamente via `file://` também funciona, mas prefira um
servidor local por causa de caminhos relativos e do canvas.

## Estado atual

**Concluído**

- Landing page completa com as 15 seções do briefing
- Catálogo premium de jogos com todos os 38 links originais preservados
- Filtros, busca e modal de detalhes em ambas as páginas
- Design responsivo verificado em 1280px e 390px
- SEO técnico: title/description, canonical, Open Graph, Twitter Card, `lang="pt-BR"`
- Console sem erros nas duas páginas

**Pendências / próximos passos sugeridos**

1. **Imagens reais dos projetos.** Os cards usam capas gráficas geradas por CSS
   (gradiente + ícone), não screenshots. Para usar capturas reais, adicione campos
   `image` em `js/projects.js` e renderize `<img loading="lazy" alt="...">` nos
   templates de `cardHTML` (js/main.js e js/catalog.js).
2. **Foto profissional.** O card "Sobre" mostra um monograma "PC" como placeholder.
   Basta substituir `.photo-card__inner` por um `<img alt="Pedro Correia Lopes Filho">`.
3. **og:image.** Falta a imagem de compartilhamento social (1200×630). Adicione o
   arquivo e a meta `og:image` com URL absoluta após publicar.
4. **Envio real de e-mail.** Para receber mensagens sem depender do WhatsApp, é
   necessário um serviço externo (ex.: Formspree/Web3Forms) ou backend próprio.
   Hoje o formulário apenas abre o WhatsApp — comportamento documentado na interface.
5. **Página `index.html` anterior.** Este projeto não continha uma home prévia;
   o antigo `jogos.html` foi substituído pela versão premium e seu conteúdo
   permanece integralmente em `referencia/jogos-original.html`.

## Publicação

O site ainda **não foi publicado** nesta sessão. É um site 100% estático (HTML/CSS/JS):
funciona em qualquer hospedagem estática, incluindo GitHub Pages, que é onde os jogos
do catálogo já estão hospedados. Para publicar pelo fluxo Hosted Deploy é necessária
autorização explícita do proprietário.

## Contato do proprietário

- WhatsApp: https://wa.me/5585989002536
- E-mail: pedro.correialopesfilho@gmail.com
- LinkedIn: https://www.linkedin.com/in/pedro-correia-lopes-filho-0654ba33/
- GitHub: https://github.com/pedrocorreialopes
- Instagram: https://instagram.com/correialopesfilho
- Facebook: https://facebook.com/pedro.correialopesfilho
