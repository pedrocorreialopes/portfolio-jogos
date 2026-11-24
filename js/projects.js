/* ============================================================
   projects.js — Catálogo de projetos
   Fonte: jogos.html (arquivo original enviado pelo autor).
   Todos os links abaixo foram importados do arquivo original,
   preservados sem alteração. Nenhum projeto foi inventado.
   ============================================================ */

const GH = 'https://pedrocorreialopes.github.io/';

/* Grupos usados pelos filtros e pelos rótulos dos cards */
const PROJECT_GROUPS = [
  { id: 'todos',       label: 'Todos' },
  { id: 'classicos',   label: 'Jogos Clássicos' },
  { id: 'estrategia',  label: 'Estratégia' },
  { id: 'educacao',    label: 'Educação' },
  { id: 'raciocinio',  label: 'Raciocínio' },
  { id: 'bingo',       label: 'Bingo & Sorteios' },
  { id: 'arcade',      label: 'Arcade & Simuladores' },
  { id: 'ferramentas', label: 'Ferramentas Interativas' }
];

const PROJECTS = [
  /* ---------------- Bingo & Sorteios ---------------- */
  {
    id: 'bingo', name: 'Bingo', cat: 'Bingo & Sorteios', groups: ['bingo', 'ferramentas'],
    url: GH + 'bingo/', glyph: 'fa-solid fa-globe', palette: 'cat-bingo',
    desc: 'Cartelas de bingo digital com sorteio de pedras e marcação automática, pensado para rodadas rápidas em grupo.',
    long: 'Versão base do bingo digital: geração de cartelas, sorteio sequencial de números e acompanhamento da rodada direto no navegador. Boa porta de entrada para conhecer a família de bingos do portfólio.',
    highlights: ['Cartelas digitais', 'Sorteio de números', 'Uso em grupo']
  },
  {
    id: 'bingo-legal', name: 'Bingo Legal', cat: 'Bingo & Sorteios', groups: ['bingo'],
    url: GH + 'bingo-legal/', glyph: 'fa-solid fa-globe', palette: 'cat-bingo',
    desc: 'Variante do bingo com interface simplificada, focada em leitura fácil dos números e em partidas descomplicadas.',
    long: 'Uma releitura do bingo tradicional com foco em clareza visual e simplicidade de uso — pensada para quem quer jogar sem etapa de configuração.',
    highlights: ['Interface simplificada', 'Leitura fácil', 'Partida imediata']
  },
  {
    id: 'bingo-classico', name: 'Bingo Clássico', cat: 'Bingo & Sorteios', groups: ['bingo', 'classicos'],
    url: GH + 'bingo-classico/', glyph: 'fa-solid fa-globe', palette: 'cat-bingo',
    desc: 'O bingo na sua forma tradicional: cartelas, globo de sorteio e conferência de números no melhor estilo clássico.',
    long: 'Recria a experiência do bingo de salão em versão digital, com a mecânica tradicional de sorteio e conferência de cartelas.',
    highlights: ['Formato tradicional', 'Conferência de cartelas', 'Mecânica de salão']
  },
  {
    id: 'bingo-tradicional', name: 'Bingo Tradicional', cat: 'Bingo & Sorteios', groups: ['bingo', 'classicos'],
    url: GH + 'bingo-tradicional/', glyph: 'fa-solid fa-globe', palette: 'cat-bingo',
    desc: 'Rodadas de bingo com regras tradicionais, ideal para encontros, aulas e atividades recreativas.',
    long: 'Versão voltada para o uso recreativo em grupo, mantendo as regras tradicionais do bingo e uma condução de rodada direta.',
    highlights: ['Regras tradicionais', 'Uso recreativo', 'Condução de rodada']
  },
  {
    id: 'bingo-completo', name: 'Bingo Completo', cat: 'Bingo & Sorteios', groups: ['bingo'],
    url: GH + 'bingo-completo/', glyph: 'fa-solid fa-globe', palette: 'cat-bingo',
    desc: 'Conjunto completo de recursos de bingo em uma única aplicação, com controles mais elaborados de partida.',
    long: 'A versão mais equipada da linha de bingos: reúne recursos de sorteio, cartelas e controle de partida em uma interface única.',
    highlights: ['Recursos reunidos', 'Controle de partida', 'Cartelas múltiplas']
  },
  {
    id: 'bingo-completo2', name: 'Bingo Completo 2', cat: 'Bingo & Sorteios', groups: ['bingo'],
    url: GH + 'bingo-completo2/', glyph: 'fa-solid fa-globe', palette: 'cat-bingo',
    desc: 'Evolução do Bingo Completo, com ajustes de usabilidade e novas opções de condução da rodada.',
    long: 'Segunda geração do Bingo Completo, com refinamentos de usabilidade e alternativas adicionais para conduzir a partida.',
    highlights: ['Usabilidade refinada', 'Novas opções', 'Segunda geração']
  },
  {
    id: 'bingo-locutor', name: 'Bingo com Locutor', cat: 'Bingo & Sorteios', groups: ['bingo', 'ferramentas'],
    url: GH + 'bingo-locutor/', glyph: 'fa-solid fa-microphone-lines', palette: 'cat-bingo',
    desc: 'Bingo com narração em voz do número sorteado, simulando a experiência de um locutor de salão.',
    long: 'Adiciona locução ao sorteio: cada número é anunciado em voz, recriando a atmosfera de uma sessão de bingo conduzida por um locutor.',
    highlights: ['Anúncio em voz', 'Ritmo de salão', 'Mãos livres']
  },
  {
    id: 'bingo-locutor2', name: 'Bingo com Locutor 2', cat: 'Bingo & Sorteios', groups: ['bingo', 'ferramentas'],
    url: GH + 'bingo-locutor2/', glyph: 'fa-solid fa-microphone-lines', palette: 'cat-bingo',
    desc: 'Segunda versão do bingo narrado, com melhorias no controle de voz e na sequência dos sorteios.',
    long: 'Versão aprimorada do bingo com locutor, com foco em controle de voz e organização da sequência de sorteios.',
    highlights: ['Controle de voz', 'Sequência de sorteio', 'Versão aprimorada']
  },
  {
    id: 'chamador-de-bingo', name: 'Chamador de Bingo', cat: 'Bingo & Sorteios', groups: ['bingo', 'ferramentas'],
    url: GH + 'chamador-de-bingo/', glyph: 'fa-solid fa-bullhorn', palette: 'cat-bingo',
    desc: 'Ferramenta dedicada a chamar as pedras do bingo, para ser usada junto com cartelas físicas ou digitais.',
    long: 'Um sorteador puro: apresenta os números na tela para que o organizador anuncie a rodada, funcionando em conjunto com qualquer conjunto de cartelas.',
    highlights: ['Sorteador dedicado', 'Uso com cartelas físicas', 'Apoio ao organizador']
  },
  {
    id: 'bingo-completao', name: 'Bingo Completão', cat: 'Bingo & Sorteios', groups: ['bingo'],
    url: GH + 'bingo-completao/', glyph: 'fa-solid fa-globe', palette: 'cat-bingo',
    desc: 'A versão mais ampla da família de bingos, reunindo o maior conjunto de recursos de sorteio e cartelas.',
    long: 'Reúne o conjunto mais amplo de recursos entre os bingos do portfólio, indicado para quem precisa de mais opções em uma única tela.',
    highlights: ['Conjunto amplo', 'Mais opções', 'Uso intensivo']
  },
  {
    id: 'sorteio', name: 'Sorteio', cat: 'Ferramentas Interativas', groups: ['ferramentas'],
    url: GH + 'sorteio/', glyph: 'fa-solid fa-shuffle', palette: 'cat-ferramentas',
    desc: 'Sorteador digital para escolher nomes, números ou itens de forma rápida e visual.',
    long: 'Aplicação utilitária de sorteio: insira os itens e deixe a aplicação escolher. Útil em dinâmicas, aulas, brindes e decisões em grupo.',
    highlights: ['Sorteio de itens', 'Resultado visual', 'Uso em dinâmicas']
  },
  {
    id: 'formacaodeequipes', name: 'Formação de Equipes', cat: 'Ferramentas Interativas', groups: ['ferramentas', 'educacao'],
    url: GH + 'formacaodeequipes/', glyph: 'fa-solid fa-users', palette: 'cat-ferramentas',
    desc: 'Divide participantes em equipes automaticamente — prático para aulas, dinâmicas e atividades colaborativas.',
    long: 'Ferramenta de organização para professores e facilitadores: distribui os participantes em grupos de forma equilibrada, sem discussão sobre quem fica com quem.',
    highlights: ['Divisão automática', 'Grupos equilibrados', 'Apoio a professores']
  },

  /* ---------------- Jogos Clássicos ---------------- */
  {
    id: 'jogodavelha', name: 'Jogo da Velha', cat: 'Jogos Clássicos', groups: ['classicos', 'raciocinio'],
    url: GH + 'jogodavelha/', glyph: 'fa-solid fa-hashtag', palette: 'cat-classicos',
    desc: 'O clássico jogo da velha em versão digital, com tabuleiro limpo e partidas rápidas.',
    long: 'Implementação do jogo da velha com tabuleiro digital, detecção de vitória e reinício imediato da partida.',
    highlights: ['Tabuleiro digital', 'Detecção de vitória', 'Partidas rápidas']
  },
  {
    id: 'jogoforca', name: 'Jogo da Forca', cat: 'Jogos Clássicos', groups: ['classicos', 'educacao'],
    url: GH + 'jogoforca/', glyph: 'fa-solid fa-gavel', palette: 'cat-classicos',
    desc: 'Descubra a palavra letra por letra antes que as tentativas acabem. Clássico absoluto das salas de aula.',
    long: 'Jogo da forca com banco de palavras e controle de tentativas. Trabalha vocabulário e raciocínio linguístico de forma leve.',
    highlights: ['Banco de palavras', 'Controle de tentativas', 'Vocabulário']
  },
  {
    id: 'jogomemoria', name: 'Jogo da Memória', cat: 'Jogos Clássicos', groups: ['classicos', 'raciocinio', 'educacao'],
    url: GH + 'jogomemoria/', glyph: 'fa-solid fa-brain', palette: 'cat-classicos',
    desc: 'Encontre os pares virando as cartas. Exercita memória visual e concentração.',
    long: 'Jogo de memória com cartas que viram ao clique. Estimula atenção, memória visual e reconhecimento de padrões.',
    highlights: ['Pares de cartas', 'Memória visual', 'Concentração']
  },
  {
    id: 'paciencia', name: 'Paciência', cat: 'Jogos Clássicos', groups: ['classicos', 'estrategia'],
    url: GH + 'paciencia/', glyph: 'fa-solid fa-clone', palette: 'cat-classicos',
    desc: 'O solitário de cartas em versão web: organize naipes e sequências até completar o jogo.',
    long: 'Versão digital do solitário com baralho, pilhas e organização por naipe. Um clássico de paciência e planejamento.',
    highlights: ['Baralho completo', 'Organização por naipe', 'Solitário']
  },
  {
    id: 'cobrinha', name: 'Jogo da Cobrinha', cat: 'Arcade & Simuladores', groups: ['classicos', 'arcade'],
    url: GH + 'cobrinha/', glyph: 'fa-solid fa-angles-right', palette: 'cat-arcade',
    desc: 'A cobrinha que cresce a cada fruta comida, no melhor estilo arcade dos anos 80.',
    long: 'Recriação do clássico Snake: controle a direção, coma os alvos para crescer e evite colidir com as paredes ou com o próprio corpo.',
    highlights: ['Controle por teclado', 'Crescimento progressivo', 'Estilo arcade']
  },
  {
    id: 'tetris', name: 'Tetris', cat: 'Arcade & Simuladores', groups: ['classicos', 'arcade', 'raciocinio'],
    url: GH + 'tetris/', glyph: 'fa-solid fa-cubes', palette: 'cat-arcade',
    desc: 'Encaixe as peças e limpe linhas antes que a pilha chegue ao topo. Puzzle atemporal.',
    long: 'Implementação do Tetris com queda de peças, rotação, limpeza de linhas e progressão de dificuldade.',
    highlights: ['Rotação de peças', 'Limpeza de linhas', 'Dificuldade progressiva']
  },
  {
    id: 'viracartas', name: 'Vira Cartas', cat: 'Jogos Clássicos', groups: ['classicos', 'raciocinio'],
    url: GH + 'viracartas/', glyph: 'fa-solid fa-clone', palette: 'cat-classicos',
    desc: 'Jogo de virar cartas com foco em memória e associação entre pares.',
    long: 'Mecânica de virar cartas para encontrar correspondências, com interface simples e partidas curtas.',
    highlights: ['Associação de pares', 'Partidas curtas', 'Interface simples']
  },
  {
    id: 'jogosclassicos', name: 'Jogos Clássicos', cat: 'Jogos Clássicos', groups: ['classicos', 'estrategia'],
    url: GH + 'jogosclassicos/', glyph: 'fa-solid fa-dice', palette: 'cat-classicos',
    desc: 'Coletânea que reúne vários jogos de tabuleiro clássicos em um único endereço.',
    long: 'Uma central de jogos clássicos: reúne diferentes tabuleiros e regras tradicionais em uma só aplicação, útil para descobrir as várias modalidades.',
    highlights: ['Coletânea', 'Vários tabuleiros', 'Regras tradicionais']
  },

  /* ---------------- Estratégia & Tabuleiro ---------------- */
  {
    id: 'xadrez', name: 'Xadrez', cat: 'Estratégia & Tabuleiro', groups: ['estrategia', 'raciocinio'],
    url: GH + 'xadrez/', glyph: 'fa-solid fa-chess', palette: 'cat-estrategia',
    desc: 'Tabuleiro de xadrez digital com movimentação das peças para partidas de estratégia.',
    long: 'Xadrez jogável no navegador, com tabuleiro completo e movimentação das peças. Estratégia pura em formato digital.',
    highlights: ['Tabuleiro completo', 'Movimentação de peças', 'Estratégia']
  },
  {
    id: 'jogodedamas', name: 'Jogo de Damas', cat: 'Estratégia & Tabuleiro', groups: ['estrategia', 'raciocinio'],
    url: GH + 'jogodedamas/', glyph: 'fa-solid fa-circle-dot', palette: 'cat-estrategia',
    desc: 'Damas em versão web, com tabuleiro tradicional e movimentos de captura.',
    long: 'Implementação das damas com tabuleiro tradicional, movimentos diagonais e capturas — um clássico de raciocínio tático.',
    highlights: ['Tabuleiro tradicional', 'Capturas', 'Tática']
  },
  {
    id: 'trilha', name: 'Jogo de Trilha', cat: 'Estratégia & Tabuleiro', groups: ['estrategia', 'raciocinio'],
    url: GH + 'trilha/', glyph: 'fa-solid fa-campground', palette: 'cat-estrategia',
    desc: 'O tradicional jogo de trilha (moinho), com formação de linhas e captura de peças.',
    long: 'Recria o jogo de trilha: posicione peças, forme linhas de três e capture as peças do adversário. Um clássico de estratégia com regras simples e profundidade real.',
    highlights: ['Formação de linhas', 'Captura de peças', 'Regras tradicionais']
  },

  /* ---------------- Raciocínio ---------------- */
  {
    id: 'sudoku', name: 'Sudoku', cat: 'Raciocínio & Lógica', groups: ['raciocinio', 'educacao'],
    url: GH + 'sudoku/', glyph: 'fa-solid fa-table-cells', palette: 'cat-raciocinio',
    desc: 'Grade 9×9 para preencher sem repetir números em linhas, colunas e quadrantes.',
    long: 'Sudoku completo no navegador: preencha a grade respeitando as regras de linhas, colunas e blocos 3×3. Exercício de lógica e paciência.',
    highlights: ['Grade 9×9', 'Lógica pura', 'Sem repetição de números']
  },
  {
    id: 'quebranumeros', name: 'Quebra-Cabeça de Números', cat: 'Raciocínio & Lógica', groups: ['raciocinio', 'educacao'],
    url: GH + 'quebranumeros/', glyph: 'fa-solid fa-puzzle-piece', palette: 'cat-raciocinio',
    desc: 'Ordene as peças numeradas deslizando-as até a posição correta.',
    long: 'Quebra-cabeça deslizante com peças numeradas: reorganize a sequência usando o espaço vazio disponível. Trabalha planejamento e sequência lógica.',
    highlights: ['Peças deslizantes', 'Sequência lógica', 'Planejamento']
  },
  {
    id: 'jogodeadivinhacao', name: 'Jogo de Adivinhação', cat: 'Raciocínio & Lógica', groups: ['raciocinio', 'educacao'],
    url: GH + 'jogodeadivinhacao/', glyph: 'fa-solid fa-question', palette: 'cat-raciocinio',
    desc: 'Descubra o número secreto com base nas dicas a cada tentativa.',
    long: 'Clássico exercício de dedução: o jogador testa palpites e recebe indicações até encontrar o número correto, desenvolvendo raciocínio por eliminação.',
    highlights: ['Dedução por tentativa', 'Dicas a cada rodada', 'Raciocínio lógico']
  },
  {
    id: 'pedrapapeltesoura', name: 'Pedra, Papel e Tesoura', cat: 'Jogos Clássicos', groups: ['classicos', 'raciocinio'],
    url: GH + 'pedrapapeltesoura/', glyph: 'fa-solid fa-hand-rock', palette: 'cat-classicos',
    desc: 'O duelo de três opções contra o computador, com resultado imediato a cada rodada.',
    long: 'Versão digital do clássico pedra, papel e tesoura, com placar de rodadas e resposta instantânea às escolhas do jogador.',
    highlights: ['Duelo contra o computador', 'Rodadas rápidas', 'Placar']
  },

  /* ---------------- Educação ---------------- */
  {
    id: 'quiz', name: 'Quiz', cat: 'Educação', groups: ['educacao', 'ferramentas'],
    url: GH + 'quiz/', glyph: 'fa-solid fa-circle-question', palette: 'cat-educativos',
    desc: 'Perguntas e respostas com correção automática, ideal para revisão de conteúdo.',
    long: 'Aplicação de quiz com perguntas de múltipla escolha e feedback de acerto. Ferramenta útil para revisar conteúdo em sala ou em estudo autônomo.',
    highlights: ['Múltipla escolha', 'Correção automática', 'Revisão de conteúdo']
  },
  {
    id: 'desafioportugues', name: 'Desafio de Português', cat: 'Educação', groups: ['educacao'],
    url: GH + 'desafioportugues/', glyph: 'fa-solid fa-language', palette: 'cat-educativos',
    desc: 'Atividades de língua portuguesa em formato de desafio, com foco em vocabulário e escrita.',
    long: 'Desafios de língua portuguesa que combinam prática de vocabulário e atenção à escrita, em formato de jogo.',
    highlights: ['Língua portuguesa', 'Vocabulário', 'Formato de desafio']
  },
  {
    id: 'desafiodeportugueses', name: 'Desafio de Português 2', cat: 'Educação', groups: ['educacao'],
    url: GH + 'desafiodeportugueses/', glyph: 'fa-solid fa-language', palette: 'cat-educativos',
    desc: 'Segunda versão dos desafios de português, com novas rodadas de questões.',
    long: 'Continuação dos desafios de língua portuguesa, com uma nova série de exercícios em formato interativo.',
    highlights: ['Nova série de questões', 'Interativo', 'Língua portuguesa']
  },
  {
    id: 'desafiodematematica', name: 'Desafio Matemático', cat: 'Educação', groups: ['educacao', 'raciocinio'],
    url: GH + 'desafiodematematica/', glyph: 'fa-solid fa-square-root-variable', palette: 'cat-educativos',
    desc: 'Contas e problemas matemáticos apresentados como desafio progressivo.',
    long: 'Desafios de matemática com operações e problemas em sequência, para praticar cálculo mental e resolução de problemas.',
    highlights: ['Cálculo mental', 'Progressão de dificuldade', 'Matemática']
  },
  {
    id: 'jogosdevocabulario', name: 'Jogos de Vocabulário', cat: 'Educação', groups: ['educacao'],
    url: GH + 'jogosdevocabulario/', glyph: 'fa-solid fa-spell-check', palette: 'cat-educativos',
    desc: 'Conjunto de atividades para ampliar e fixar vocabulário de forma lúdica.',
    long: 'Coletânea de exercícios de vocabulário apresentados como jogos, com foco em ampliação de repertório linguístico.',
    highlights: ['Ampliação de vocabulário', 'Atividades lúdicas', 'Repertório linguístico']
  },
  {
    id: 'jogodosanimais', name: 'Jogo dos Animais', cat: 'Educação', groups: ['educacao', 'raciocinio'],
    url: GH + 'jogodosanimais/', glyph: 'fa-solid fa-paw', palette: 'cat-educativos',
    desc: 'Atividade interativa sobre animais, com associação e reconhecimento.',
    long: 'Jogo educativo com tema animal: associe, reconheça e aprenda enquanto joga. Pensado para o público infantil e para uso em sala.',
    highlights: ['Tema animal', 'Associação', 'Público infantil']
  },
  {
    id: 'jogodaprenda', name: 'Jogo da Prenda', cat: 'Educação', groups: ['educacao', 'ferramentas'],
    url: GH + 'jogodaprenda/', glyph: 'fa-solid fa-gift', palette: 'cat-educativos',
    desc: 'Dinâmica de prendas para festas e atividades em grupo, com sorteio de tarefas.',
    long: 'Ferramenta de dinâmica em grupo: sorteia prendas e tarefas, animando festas, confraternizações e atividades recreativas.',
    highlights: ['Sorteio de prendas', 'Dinâmica de grupo', 'Uso recreativo']
  },

  /* ---------------- Arcade & Simuladores ---------------- */
  {
    id: 'corridadecarros', name: 'Corrida de Carros', cat: 'Arcade & Simuladores', groups: ['arcade'],
    url: GH + 'corridadecarros/', glyph: 'fa-solid fa-car-side', palette: 'cat-arcade',
    desc: 'Desvie dos obstáculos e mantenha o carro na pista o máximo possível.',
    long: 'Jogo de corrida com controle lateral, obstáculos progressivos e foco em reflexo e concentração.',
    highlights: ['Controle lateral', 'Obstáculos progressivos', 'Reflexo']
  },
  {
    id: 'pixeldash', name: 'Pixel Dash', cat: 'Arcade & Simuladores', groups: ['arcade'],
    url: GH + 'pixeldash/', glyph: 'fa-solid fa-bolt', palette: 'cat-arcade',
    desc: 'Arcade de ritmo acelerado com estética pixel, baseado em reflexo e timing.',
    long: 'Jogo arcade de ritmo rápido com identidade visual pixel art, exigindo reflexo e precisão nos movimentos.',
    highlights: ['Ritmo acelerado', 'Estética pixel', 'Precisão']
  },
  {
    id: 'penalties', name: 'Penalidades', cat: 'Arcade & Simuladores', groups: ['arcade'],
    url: GH + 'penalties/', glyph: 'fa-solid fa-futbol', palette: 'cat-simuladores',
    desc: 'Cobrança de pênaltis: escolha o canto e tente vencer o goleiro.',
    long: 'Simulação de disputa de pênaltis com escolha de direção e resultado a cada cobrança.',
    highlights: ['Disputa de pênaltis', 'Escolha de canto', 'Rodadas rápidas']
  },
  {
    id: 'simulador-de-futebol', name: 'Simulador de Futebol', cat: 'Arcade & Simuladores', groups: ['arcade'],
    url: GH + 'simulador-de-futebol/', glyph: 'fa-solid fa-futbol', palette: 'cat-simuladores',
    desc: 'Simulação de partidas de futebol com placar e andamento do jogo.',
    long: 'Simulador de futebol que reproduz o andamento de uma partida com placar e eventos, em formato de jogo para navegador.',
    highlights: ['Simulação de partida', 'Placar', 'Eventos de jogo']
  }
];

/* Catálogo do próprio site, exibido junto aos demais projetos */
const SITE_PROJECT = {
  id: 'portfolio', name: 'Portfólio — este site', cat: 'Aplicação Web', groups: ['web'],
  url: null, glyph: 'fa-solid fa-window-maximize', palette: 'cat-classicos',
  desc: 'A própria landing page que você está navegando: HTML, CSS e JavaScript puros, design responsivo e acessível.',
  long: 'Esta landing page foi construída do zero com HTML5 semântico, CSS3 (Grid, Flexbox, glassmorphism e gradientes) e JavaScript modular — sem frameworks e sem dependências pesadas. Inclui animações com respeito a prefers-reduced-motion, navegação por teclado, metadados Open Graph e catálogo de projetos com filtros.',
  highlights: ['HTML5 + CSS3 + JS', 'Sem frameworks', 'Acessibilidade e reduced-motion'],
  currentPage: true
};

if (typeof window !== 'undefined') {
  window.PROJECTS = PROJECTS;
  window.PROJECT_GROUPS = PROJECT_GROUPS;
  window.SITE_PROJECT = SITE_PROJECT;
}
