
// ======================================================
// ÍCONES
// ======================================================

function faIcon(icon, extraClass = '') {
  return `<i class="fa-solid ${icon} ${extraClass}" aria-hidden="true"></i>`;
}

// ======================================================
// CAPÍTULOS
// ======================================================

const chapters = [
  // ==================== INICIANTE ====================
  {
    id: 1,
    level: "iniciante",
    emoji: "fa-seedling",
    title: "Introdução ao Mundo dos Investimentos",
    desc: "Entenda os fundamentos antes de colocar dinheiro em qualquer investimento.",
    intro: "Antes de qualquer coisa, é preciso entender para onde seu dinheiro vai e como ele pode trabalhar por você. Esse capítulo é a base de tudo.",
    topics: [
      { id: "1a", icon: "fa-lightbulb", name: "O que é investir", content: "Investir é colocar seu dinheiro para trabalhar em vez de deixá-lo parado. Ao investir, você espera receber mais do que colocou após um período.", tip: "Dica: os resultados dos investimentos dependem do prazo, das taxas e dos riscos envolvidos." },
      { id: "1b", icon: "fa-building-columns", name: "Poupar vs Investir", content: "Poupar significa guardar dinheiro sem necessariamente obter rendimento. Investir significa aplicar esse dinheiro em ativos que podem gerar retorno. É importante considerar a inflação ao comparar os resultados.", tip: "Compare sempre o rendimento com a inflação para avaliar o ganho real." },
      { id: "1c", icon: "fa-chart-column", name: "Juros simples e compostos", content: "Juros simples incidem apenas sobre o capital inicial. Juros compostos incidem sobre o capital mais os juros acumulados, formando o chamado juro sobre juro.", tip: "O tempo pode ter um papel importante no crescimento de um investimento com juros compostos." },
      { id: "1d", icon: "fa-chart-line", name: "Inflação", content: "Inflação é o aumento generalizado dos preços. Se seu dinheiro rende 5% ao ano, mas a inflação é de 6%, você perde poder de compra. No Brasil, o índice oficial de inflação ao consumidor é o IPCA.", tip: "Sempre compare o retorno do investimento com a inflação do período." },
      { id: "1e", icon: "fa-thumbtack", name: "CDI, Selic e IPCA", content: "Selic: taxa básica de juros do Brasil, definida pelo Banco Central. CDI: taxa de referência das operações interbancárias, próxima à Selic. IPCA: índice oficial da inflação brasileira.", tip: "Um CDB que paga 110% do CDI tem rendimento atrelado a essa taxa, que pode variar." },
      { id: "1f", icon: "fa-compass", name: "Perfil de investidor", content: "Os perfis geralmente são classificados como conservador, moderado e arrojado. Eles refletem a tolerância ao risco e a capacidade de suportar perdas, além dos objetivos e do prazo dos investimentos.", tip: "Seu perfil pode mudar ao longo do tempo e conforme seus objetivos." }
    ],
    downloadUrl: "../pdf/Capitulo1.pdf"
  },
  {
    id: 2,
    level: "iniciante",
    emoji: "fa-shield-halved",
    title: "Reserva de Emergência",
    desc: "A base de qualquer planejamento financeiro sólido.",
    intro: "Antes de investir em qualquer coisa, você precisa ter uma rede de segurança. Sem reserva de emergência, um imprevisto pode obrigar você a resgatar investimentos em um momento desfavorável.",
    topics: [
      { id: "2a", icon: "fa-life-ring", name: "O que é", content: "É uma quantia guardada para cobrir imprevistos, como desemprego ou consertos urgentes. Deve priorizar segurança e facilidade de resgate." },
      { id: "2b", icon: "fa-list-ol", name: "Quanto guardar", content: "Uma referência comum é acumular de 3 a 6 meses de despesas para quem tem renda estável e de 6 a 12 meses para quem tem renda variável. O valor adequado depende da situação individual.", tip: "Se você gasta R$ 3.000 por mês, uma reserva de 6 meses corresponderia a R$ 18.000." },
      { id: "2c", icon: "fa-location-dot", name: "Onde investir", content: "Tesouro Selic e CDBs com liquidez diária podem ser considerados. Avalie as condições de resgate, os riscos, os custos e as garantias de cada produto." },
      { id: "2d", icon: "fa-triangle-exclamation", name: "Erros mais comuns", content: "1) Não ter reserva. 2) Investir a reserva em ativos voláteis. 3) Escolher produtos sem liquidez adequada. 4) Usar a reserva para despesas que não são emergenciais." }
    ],
    downloadUrl: "../pdf/Capitulo2.pdf"
  },
  {
    id: 3,
    level: "iniciante",
    emoji: "fa-landmark",
    title: "Tesouro Direto Completo",
    desc: "Conheça os títulos públicos e suas características.",
    intro: "O Tesouro Direto é um programa do governo federal que permite a pessoas físicas investir em títulos públicos. Os títulos têm risco de crédito soberano, mas podem apresentar oscilações de preço.",
    topics: [
      { id: "3a", icon: "fa-chart-line", name: "Tesouro Selic", content: "Título público cuja rentabilidade acompanha a Selic. Pode ser utilizado para objetivos de curto prazo, observadas as condições de resgate e as oscilações de preço." },
      { id: "3b", icon: "fa-lock", name: "Tesouro Prefixado", content: "Título com taxa prefixada contratada na compra. Mantido até o vencimento, segue as condições contratadas. Se vendido antes, o preço pode variar conforme as taxas de mercado.", tip: "A rentabilidade contratada não elimina o risco de perda em uma venda antecipada." },
      { id: "3c", icon: "fa-shield-halved", name: "Tesouro IPCA+", content: "Título cuja rentabilidade combina a variação do IPCA com uma taxa prefixada. É utilizado por investidores com objetivos de longo prazo, mas pode sofrer oscilações relevantes antes do vencimento.", tip: "Avalie o prazo do título e a possibilidade de precisar do dinheiro antes do vencimento." },
      { id: "3d", icon: "fa-cart-shopping", name: "Como comprar", content: "1. Tenha uma conta em uma instituição habilitada. 2. Acesse a plataforma de investimentos. 3. Consulte os títulos disponíveis. 4. Confira taxas, vencimentos e condições. 5. Confirme a aplicação." },
      { id: "3e", icon: "fa-money-bill-transfer", name: "Tributação", content: "O imposto de renda segue a tabela regressiva da renda fixa: até 180 dias, 22,5%; de 181 a 360 dias, 20%; de 361 a 720 dias, 17,5%; acima de 720 dias, 15%. Pode haver IOF sobre resgates nos primeiros 30 dias." },
      { id: "3f", icon: "fa-bolt", name: "Riscos", content: "Os títulos públicos estão sujeitos ao risco soberano e, quando vendidos antecipadamente, ao risco de mercado. O preço pode variar, especialmente nos títulos prefixados e IPCA+." }
    ],
    downloadUrl: "../pdf/Capitulo3.pdf"
  },
  {
    id: 4,
    level: "iniciante",
    emoji: "fa-gem",
    title: "Renda Fixa para Iniciantes",
    desc: "CDBs, LCIs, LCAs e como escolher.",
    intro: "A renda fixa reúne investimentos cujas regras de remuneração são definidas no momento da aplicação ou seguem um indicador. O investidor pode emprestar recursos a instituições ou empresas.",
    topics: [
      { id: "4a", icon: "fa-building-columns", name: "CDB", content: "Certificado de Depósito Bancário. É um título emitido por bancos. Pode ter remuneração prefixada, pós-fixada ou híbrida. Alguns CDBs contam com a cobertura do FGC, respeitados seus limites e condições." },
      { id: "4b", icon: "fa-house", name: "LCI", content: "Letra de Crédito Imobiliário. É emitida por instituições financeiras e direcionada ao financiamento imobiliário. Para pessoa física, possui isenção de IR nas condições previstas na legislação. Pode ter carência." },
      { id: "4c", icon: "fa-wheat-awn", name: "LCA", content: "Letra de Crédito do Agronegócio. É emitida por instituições financeiras e relacionada ao financiamento do agronegócio. Para pessoa física, possui isenção de IR nas condições previstas na legislação." },
      { id: "4d", icon: "fa-clipboard", name: "Debêntures", content: "Títulos de dívida emitidos por empresas. Em geral, não contam com a garantia do FGC. As debêntures incentivadas podem ter tratamento tributário específico." },
      { id: "4e", icon: "fa-box", name: "Fundos de renda fixa", content: "Fundos que investem em ativos de renda fixa, conforme sua política de investimento. Podem cobrar taxa de administração e apresentar riscos e tributação próprios." },
      { id: "4f", icon: "fa-lock", name: "Garantia do FGC", content: "O Fundo Garantidor de Créditos cobre determinados produtos financeiros, como CDB, LCI e LCA, respeitando os limites de cobertura por CPF ou CNPJ, instituição ou conglomerado e o teto global aplicável." }
    ],
    downloadUrl: "../pdf/Capitulo4.pdf"
  },
  {
    id: 5,
    level: "iniciante",
    emoji: "fa-bullseye",
    title: "Como Montar sua Primeira Carteira",
    desc: "Diversificação, alocação e exemplos práticos para começar.",
    intro: "Com os fundamentos aprendidos, é hora de compreender como estruturar uma carteira de acordo com seus objetivos, seu horizonte de tempo e sua tolerância ao risco.",
    topics: [
      { id: "5a", icon: "fa-shuffle", name: "Diversificação", content: "Diversificar significa distribuir os investimentos entre diferentes ativos, emissores, setores e prazos. A diversificação pode reduzir riscos específicos, mas não elimina a possibilidade de perdas." },
      { id: "5b", icon: "fa-scale-balanced", name: "Distribuição de patrimônio", content: "A alocação depende dos objetivos, do prazo e da tolerância ao risco. Uma carteira com maior parcela de renda variável pode apresentar oscilações maiores. Não existe uma divisão universal adequada para todos." },
      { id: "5c", icon: "fa-pen-to-square", name: "Exemplos de carteiras", content: "Uma carteira hipotética pode combinar Tesouro Selic, CDBs e títulos de prazo mais longo. Outra pode incluir também ações, ETFs ou FIIs. Os percentuais devem ser definidos conforme os objetivos e os riscos aceitos." }
    ],
    downloadUrl: "../pdf/Capitulo5.pdf"
  },

  // ==================== INTERMEDIÁRIO ====================
  {
    id: 6,
    level: "intermediario",
    emoji: "fa-chart-column",
    title: "Introdução à Bolsa de Valores",
    desc: "Entenda como funciona o mercado de capitais brasileiro.",
    intro: "A bolsa de valores é um ambiente organizado em que compradores e vendedores negociam ativos, como ações, FIIs e ETFs. No Brasil, a principal bolsa é a B3.",
    topics: [
      { id: "6a", icon: "fa-building", name: "O que é a bolsa", content: "É um mercado organizado no qual são negociados ativos financeiros. No Brasil, a B3 oferece infraestrutura para negociação, registro e liquidação de operações." },
      { id: "6b", icon: "fa-gear", name: "Como funciona", content: "Empresas podem abrir capital por meio de uma oferta pública inicial (IPO). Depois, as ações podem ser negociadas no mercado secundário. Os preços variam de acordo com a oferta, a demanda e as expectativas dos participantes." },
      { id: "6c", icon: "fa-laptop", name: "Home broker", content: "Plataforma de negociação oferecida por corretoras. Permite enviar ordens de compra e venda de ativos, conforme os recursos disponibilizados pela instituição." },
      { id: "6d", icon: "fa-clipboard", name: "Tipos de ordens", content: "Ordem a mercado: busca execução pelo melhor preço disponível. Ordem limitada: estabelece um preço máximo de compra ou mínimo de venda. Ordens stop: são ativadas quando determinadas condições de preço são atingidas." }
    ],
    downloadUrl: "../pdf/Capitulo6.pdf"
  },
  {
    id: 7,
    level: "intermediario",
    emoji: "fa-chart-line",
    title: "Investindo em Ações",
    desc: "Dividendos, valorização e análise de empresas.",
    intro: "Ao comprar uma ação, você adquire uma participação no capital de uma empresa. O retorno pode vir da valorização do ativo e da distribuição de proventos.",
    topics: [
      { id: "7a", icon: "fa-puzzle-piece", name: "O que são ações", content: "Ações representam frações do capital social de uma empresa. As ordinárias geralmente conferem direito a voto, enquanto as preferenciais podem ter preferência econômica, conforme as regras de cada emissão. Units podem reunir diferentes classes de ações." },
      { id: "7b", icon: "fa-money-bill-wave", name: "Dividendos", content: "Dividendos são parcelas dos lucros distribuídas aos acionistas, quando aprovadas conforme as regras aplicáveis. Dividend Yield é uma medida que relaciona os proventos distribuídos ao preço da ação." },
      { id: "7c", icon: "fa-rocket", name: "Valorização", content: "Ações podem valorizar ou desvalorizar. O ganho ou a perda de capital corresponde à diferença entre o valor de venda e o custo de aquisição, observadas as regras tributárias aplicáveis." },
      { id: "7d", icon: "fa-magnifying-glass", name: "Como analisar empresas", content: "Avalie resultados financeiros, posição no mercado, gestão, setor, endividamento, geração de caixa, histórico de distribuição de lucros e perspectivas de crescimento." }
    ],
    downloadUrl: "../pdf/Capitulo7.pdf"
  },
  {
    id: 8,
    level: "intermediario",
    emoji: "fa-microscope",
    title: "Análise Fundamentalista",
    desc: "Indicadores para avaliar empresas.",
    intro: "A análise fundamentalista busca avaliar uma empresa considerando seus demonstrativos financeiros, sua atividade e suas perspectivas.",
    topics: [
      { id: "8a", icon: "fa-chart-column", name: "P/L (Preço/Lucro)", content: "Relaciona o preço da ação ao lucro por ação. Pode ajudar a comparar empresas, mas deve ser interpretado considerando o setor, o crescimento e a qualidade dos resultados." },
      { id: "8b", icon: "fa-chart-line", name: "ROE", content: "Return on Equity é a relação entre o lucro líquido e o patrimônio líquido. Ajuda a avaliar a rentabilidade dos recursos próprios, mas precisa ser analisado em conjunto com o endividamento e outros indicadores." },
      { id: "8c", icon: "fa-money-bill-1", name: "Dividend Yield", content: "Relaciona os proventos por ação ao preço da ação. Um indicador elevado, isoladamente, não garante que os pagamentos futuros serão mantidos." },
      { id: "8d", icon: "fa-chart-line", name: "Margens", content: "A margem bruta relaciona o lucro bruto à receita. A margem líquida relaciona o lucro líquido à receita. A evolução dessas medidas pode ajudar a compreender a eficiência operacional." },
      { id: "8e", icon: "fa-dumbbell", name: "Endividamento", content: "Indicadores como dívida líquida/EBITDA ajudam a avaliar o endividamento. A interpretação depende do setor, da geração de caixa e das características da empresa." }
    ],
    downloadUrl: "../pdf/Capitulo8.pdf"
  },
  {
    id: 9,
    level: "intermediario",
    emoji: "fa-chart-line",
    title: "Análise Técnica para Iniciantes",
    desc: "Gráficos, suportes, resistências e padrões de preço.",
    intro: "A análise técnica estuda gráficos e dados de negociação. Seus indicadores podem auxiliar na avaliação de cenários, mas não garantem a previsão de preços futuros.",
    topics: [
      { id: "9a", icon: "fa-arrow-down", name: "Suportes", content: "Suporte é uma região de preço em que, historicamente, houve interesse comprador. Não representa um piso garantido: o preço pode atravessar essa região." },
      { id: "9b", icon: "fa-arrow-up", name: "Resistências", content: "Resistência é uma região em que, historicamente, houve pressão vendedora. O preço pode ultrapassá-la, mas isso não garante uma tendência de alta." },
      { id: "9c", icon: "fa-ruler-combined", name: "Tendência", content: "Tendência de alta: sequência de topos e fundos crescentes. Tendência de baixa: sequência de topos e fundos decrescentes. Tendência lateral: os preços oscilam em uma faixa." },
      { id: "9d", icon: "fa-box", name: "Volume", content: "Volume representa a quantidade de ativos negociados. Pode ser utilizado em conjunto com os preços para avaliar a intensidade de um movimento." },
      { id: "9e", icon: "fa-chart-column", name: "Candlesticks", content: "Cada candle representa a abertura, o fechamento, a máxima e a mínima de um período. As cores utilizadas para indicar alta e baixa dependem da configuração do gráfico." }
    ],
    downloadUrl: "../pdf/Capitulo9.pdf"
  },
  {
    id: 10,
    level: "intermediario",
    emoji: "fa-building",
    title: "Fundos Imobiliários (FIIs)",
    desc: "Conheça os fundos imobiliários e seus riscos.",
    intro: "Os FIIs permitem investir em carteiras ligadas ao mercado imobiliário por meio da aquisição de cotas negociadas em bolsa. Seus preços e rendimentos podem variar.",
    topics: [
      { id: "10a", icon: "fa-helmet-safety", name: "O que são", content: "FIIs são fundos de investimento que aplicam em ativos imobiliários, como imóveis físicos e títulos relacionados ao setor. Suas cotas podem ser negociadas na bolsa." },
      { id: "10b", icon: "fa-folder-tree", name: "Tipos de FIIs", content: "FIIs de tijolo investem em imóveis físicos. FIIs de papel investem em títulos imobiliários. Fundos híbridos combinam estratégias e fundos de fundos investem em cotas de outros FIIs." },
      { id: "10c", icon: "fa-money-bill-transfer", name: "Dividendos mensais", content: "Os FIIs podem distribuir rendimentos periodicamente. A frequência e os valores dependem dos resultados do fundo e de sua política de distribuição. Rendimentos passados não garantem pagamentos futuros." },
      { id: "10d", icon: "fa-magnifying-glass", name: "Como escolher", content: "Analise a estratégia do fundo, a qualidade dos ativos, a vacância, os contratos, o endividamento, a gestão, a liquidez das cotas e os riscos associados." }
    ],
    downloadUrl: "../pdf/Capitulo10.pdf"
  },
  {
    id: 11,
    level: "intermediario",
    emoji: "fa-basket-shopping",
    title: "ETFs",
    desc: "Conheça os fundos negociados em bolsa.",
    intro: "ETFs são fundos negociados em bolsa que buscam acompanhar índices ou estratégias. Eles podem oferecer diversificação por meio de uma única cota, mas também estão sujeitos a riscos.",
    topics: [
      { id: "11a", icon: "fa-box", name: "O que são", content: "ETFs são fundos cujas cotas são negociadas em bolsa. Muitos buscam acompanhar índices de mercado, permitindo exposição a uma carteira de ativos por meio de um único produto." },
      { id: "11b", icon: "fa-flag", name: "ETFs brasileiros", content: "Existem ETFs negociados na B3 que acompanham índices como Ibovespa e S&P 500, além de estratégias setoriais e de outros segmentos do mercado. Consulte sempre o índice e a política de cada fundo." },
      { id: "11c", icon: "fa-earth-americas", name: "ETFs internacionais", content: "É possível obter exposição internacional por meio de ETFs negociados no Brasil ou no exterior. Os produtos variam quanto à moeda, aos custos, à tributação e aos ativos acompanhados.", tip: "Consulte o regulamento e os custos antes de investir." },
      { id: "11d", icon: "fa-scale-balanced", name: "Vantagens e desvantagens", content: "Diversificação em um único ativo, praticidade e, em alguns casos, taxas reduzidas são características dos ETFs. Por outro lado, o investidor não escolhe individualmente todos os ativos da carteira e pode sofrer perdas acompanhando as quedas do mercado." }
    ],
    downloadUrl: "../pdf/Capitulo11.pdf"
  },

  // ==================== AVANÇADO ====================
  {
    id: 12,
    level: "avancado",
    emoji: "fa-bolt",
    title: "Swing Trade vs Day Trade",
    desc: "Operações de curto prazo: diferenças e riscos.",
    intro: "Essas estratégias envolvem negociação ativa e podem apresentar riscos elevados. Exigem estudo, disciplina e avaliação cuidadosa dos custos e das perdas possíveis.",
    topics: [
      { id: "12a", icon: "fa-arrows-rotate", name: "Diferenças", content: "Day trade é a operação iniciada e encerrada no mesmo pregão. Swing trade é a operação mantida por mais de um pregão, geralmente por dias ou semanas." },
      { id: "12b", icon: "fa-check", name: "Vantagens", content: "O day trade encerra a posição no mesmo dia, mas exige acompanhamento frequente. O swing trade permite um horizonte maior para análise, mas envolve riscos durante o período em que a posição fica aberta." },
      { id: "12c", icon: "fa-triangle-exclamation", name: "Desvantagens", content: "As duas modalidades envolvem risco de perda. Day trade pode exigir atenção constante e custos frequentes. Swing trade está sujeito a variações de preço durante a noite e em dias sem negociação." },
      { id: "12d", icon: "fa-shield-halved", name: "Gestão de risco", content: "Estabeleça limites de perda, avalie a relação entre risco e retorno e considere os custos das operações. Ordens de stop não garantem execução pelo preço desejado." },
      { id: "12e", icon: "fa-brain", name: "Qual combina com cada perfil", content: "A escolha depende da disponibilidade de tempo, do conhecimento, dos objetivos e da capacidade financeira para suportar perdas. Nenhuma modalidade garante ganhos." }
    ],
    downloadUrl: "../pdf/Capitulo12.pdf"
  },
  {
    id: 13,
    level: "avancado",
    emoji: "fa-shield-halved",
    title: "Gestão de Risco",
    desc: "Como compreender e controlar os riscos.",
    intro: "A gestão de risco busca limitar perdas e organizar decisões de investimento. Nenhuma estratégia elimina completamente o risco de perdas.",
    topics: [
      { id: "13a", icon: "fa-circle-stop", name: "Stop Loss", content: "É uma ordem ou estratégia para encerrar uma posição quando determinada condição de preço é atingida. Em situações de baixa liquidez ou oscilações intensas, a execução pode ocorrer em preço diferente do esperado." },
      { id: "13b", icon: "fa-bullseye", name: "Stop Gain", content: "É uma estratégia para encerrar uma posição quando um objetivo de preço é alcançado. A execução e o preço efetivo dependem das condições do mercado e do tipo de ordem utilizado." },
      { id: "13c", icon: "fa-person", name: "Controle emocional", content: "Ter um plano de investimento, registrar decisões e avaliar os resultados pode ajudar a reduzir decisões impulsivas. É importante reconhecer os limites de conhecimento e de tolerância ao risco." },
      { id: "13d", icon: "fa-ruler", name: "Tamanho de posição", content: "O tamanho de uma posição deve considerar o capital disponível, a volatilidade do ativo e a perda potencial. Percentuais fixos não são adequados para todos os investidores." }
    ],
    downloadUrl: "../pdf/Capitulo13.pdf"
  },
  {
    id: 14,
    level: "avancado",
    emoji: "fa-brain",
    title: "Psicologia do Investidor",
    desc: "Conheça os vieses que influenciam decisões financeiras.",
    intro: "Compreender como as emoções e os vieses cognitivos influenciam as decisões pode ajudar o investidor a desenvolver hábitos mais conscientes.",
    topics: [
      { id: "14a", icon: "fa-face-smile", name: "Ganância", content: "O desejo de obter ganhos elevados pode levar à tomada de riscos excessivos, à concentração de investimentos e à dificuldade de seguir um planejamento." },
      { id: "14b", icon: "fa-face-frown", name: "Medo", content: "O medo pode influenciar decisões durante períodos de queda e volatilidade. É importante avaliar os fundamentos e os objetivos antes de tomar decisões precipitadas." },
      { id: "14c", icon: "fa-magnifying-glass", name: "Viés cognitivo", content: "Viés de confirmação: procurar informações que reforcem uma opinião. Efeito manada: seguir decisões de outras pessoas. Ancoragem: dar peso excessivo a uma informação inicial, como o preço de compra." },
      { id: "14d", icon: "fa-scale-balanced", name: "Disciplina", content: "Um planejamento documentado, revisões periódicas e critérios objetivos podem ajudar a organizar as decisões. É importante ajustar o plano quando as circunstâncias mudam." }
    ],
    downloadUrl: "../pdf/Capitulo14.pdf"
  },
  {
    id: 15,
    level: "avancado",
    emoji: "fa-money-bill-transfer",
    title: "Estratégias de Dividendos",
    desc: "Entenda a construção de uma carteira voltada à renda.",
    intro: "Uma estratégia de dividendos busca investir em ativos que possam distribuir proventos ao longo do tempo. Os pagamentos não são garantidos e podem variar.",
    topics: [
      { id: "15a", icon: "fa-trophy", name: "Empresas pagadoras", content: "Ao analisar empresas pagadoras de dividendos, observe a geração de caixa, a estabilidade dos resultados, o endividamento, o setor e a política de distribuição." },
      { id: "15b", icon: "fa-chart-column", name: "Dividend Yield", content: "O Dividend Yield relaciona os proventos ao preço do ativo. Um indicador elevado pode decorrer de uma queda expressiva no preço e não significa necessariamente que o pagamento seja sustentável." },
      { id: "15c", icon: "fa-arrow-rotate-right", name: "Reinvestimento", content: "O reinvestimento dos proventos pode ampliar a quantidade de ativos da carteira. O resultado depende da rentabilidade, dos custos, da tributação e das condições futuras do mercado." }
    ],
    downloadUrl: "../pdf/Capitulo15.pdf"
  },
  {
    id: 16,
    level: "avancado",
    emoji: "fa-lightbulb",
    title: "Value Investing",
    desc: "Conheça a filosofia de investimento em valor.",
    intro: "Value Investing é uma abordagem que busca identificar ativos cujo preço de mercado esteja abaixo de uma estimativa de seu valor intrínseco.",
    topics: [
      { id: "16a", icon: "fa-book-open", name: "Filosofia de investimento", content: "A abordagem diferencia preço de mercado e valor estimado. A avaliação de uma empresa depende de premissas sobre resultados futuros, riscos e perspectivas do negócio." },
      { id: "16b", icon: "fa-magnifying-glass-plus", name: "Empresas descontadas", content: "Indicadores como P/L, P/VP e EV/EBITDA podem auxiliar comparações. Um múltiplo baixo não significa necessariamente que uma empresa esteja subavaliada." },
      { id: "16c", icon: "fa-shield-halved", name: "Margem de segurança", content: "Margem de segurança é a diferença entre o valor estimado e o preço de aquisição. Ela pode reduzir o impacto de erros nas estimativas, mas não elimina o risco de perdas." }
    ],
    downloadUrl: "../pdf/Capitulo16.pdf"
  },
  {
    id: 17,
    level: "avancado",
    emoji: "fa-earth-europe",
    title: "Investimentos Internacionais",
    desc: "Como investir no exterior e diversificar globalmente.",
    intro: "Investir no exterior pode ampliar as possibilidades de diversificação, mas envolve riscos cambiais, tributários e de mercado, além de regras específicas.",
    topics: [
      { id: "17a", icon: "fa-globe", name: "Como investir fora", content: "É possível acessar mercados internacionais por meio de BDRs, ETFs negociados no Brasil e contas em corretoras estrangeiras. Cada alternativa possui características, custos e riscos próprios." },
      { id: "17b", icon: "fa-flag-usa", name: "ETFs americanos", content: "Há ETFs que acompanham índices como S&P 500, Nasdaq-100 e mercado amplo dos Estados Unidos. Compare taxas, composição, domicílio do fundo e exposição cambial." },
      { id: "17c", icon: "fa-chart-line", name: "Stocks", content: "Stocks são ações de empresas negociadas em bolsas estrangeiras. Investir em empresas individuais exige avaliar seus resultados, riscos específicos e exposição cambial." },
      { id: "17d", icon: "fa-money-bill-transfer", name: "Tributação", content: "Os investimentos no exterior e os BDRs podem ter regras tributárias diferentes. A tributação depende do tipo de ativo, da operação e da legislação vigente. Consulte as regras atuais antes de investir." }
    ],
    downloadUrl: "../pdf/Capitulo17.pdf"
  }
];

// ======================================================
// ESTADO
// ======================================================

let completedTopics = new Set();
let completedChapters = new Set();
let currentFilter = 'all';

// Guarda o último tópico aberto por capítulo.
const openTopics = new Map();

// ======================================================
// INICIALIZAÇÃO
// ======================================================

function init() {
  renderChapters();
  updateProgress();

  const nav = document.getElementById('main-nav');
  const layout = document.getElementById('main-layout');

  if (nav) nav.style.display = 'flex';
  if (layout) layout.style.display = 'grid';

  // Exibe a navegação quando a capa sair da tela.
  window.addEventListener('scroll', () => {
    const cover = document.getElementById('cover');
    if (!cover || !nav) return;

    if (cover.getBoundingClientRect().bottom < 0) {
      nav.style.display = 'flex';
    }
  }, { passive: true });
}

// ======================================================
// RENDERIZAÇÃO
// ======================================================

function renderChapters() {
  const container = document.getElementById('chapters-container');
  if (!container) return;

  container.innerHTML = '';

  chapters.forEach(ch => {
    container.appendChild(createChapterEl(ch));
  });

  applyFilter();
}

function createChapterEl(ch) {
  const div = document.createElement('div');
  div.className = 'chapter';
  div.id = 'ch-' + ch.id;
  div.setAttribute('data-level', ch.level);

  const topicsHTML = ch.topics.map(t => {
    const done = completedTopics.has(t.id);

    return `
      <div
        class="topic-card ${done ? 'done' : ''}"
        role="button"
        tabindex="0"
        aria-pressed="${done}"
        data-topic-id="${t.id}"
        onclick="toggleTopic('${t.id}', ${ch.id}, event)"
        onkeydown="handleTopicKey(event, '${t.id}', ${ch.id})"
      >
        <div class="topic-icon">${faIcon(t.icon)}</div>
        <div class="topic-name">${escapeHTML(t.name)}</div>
        <div class="topic-status">
          ${done ? faIcon('fa-check') + ' Estudado' : ''}
        </div>
      </div>
    `;
  }).join('');

  const done = completedChapters.has(ch.id);

  const levelLabel = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  }[ch.level];

  div.innerHTML = `
    <div
      class="chapter-header"
      role="button"
      tabindex="0"
      aria-expanded="false"
      aria-controls="chapter-body-${ch.id}"
      onclick="toggleChapter(${ch.id})"
      onkeydown="handleChapterKey(event, ${ch.id})"
    >
      <div class="chapter-num">
        Cap. ${String(ch.id).padStart(2, '0')}
      </div>

      <div class="chapter-title-block">
        <span class="chapter-level-badge badge-${ch.level}">
          ${faIcon(
            ch.level === 'iniciante'
              ? 'fa-book'
              : ch.level === 'intermediario'
                ? 'fa-chart-line'
                : 'fa-rocket'
          )}
          ${levelLabel}
        </span>

        <h2>${faIcon(ch.emoji)} ${escapeHTML(ch.title)}</h2>
        <p class="chapter-desc">${escapeHTML(ch.desc)}</p>
      </div>

      <div class="chapter-toggle" aria-hidden="true">▾</div>
    </div>

    <div class="chapter-body" id="chapter-body-${ch.id}">
      <div class="chapter-intro">
        <div class="chapter-intro-icon">${faIcon(ch.emoji)}</div>
        <div>
          <h3>${escapeHTML(ch.title)}</h3>
          <p>${escapeHTML(ch.intro)}</p>
        </div>
      </div>

      <div class="topics-grid">${topicsHTML}</div>

      <div
        id="topic-panel-${ch.id}"
        class="topic-panel"
        style="display:none;"
        aria-live="polite"
      ></div>

      <div class="chapter-download">
        <a
          class="btn btn-outline"
          href="${ch.downloadUrl ? escapeHTML(ch.downloadUrl) : '#'}"
          ${ch.downloadUrl ? 'download' : ''}
          onclick="handleDownload(event, ${ch.id})"
        >
          ${faIcon('fa-download')}
          Baixar capítulo em PDF
        </a>
      </div>

      <div
        class="chapter-complete"
        id="ch-done-${ch.id}"
        style="${done ? '' : 'display:none'}"
      >
        <span class="complete-checkmark">${faIcon(ch.emoji)}</span>
        <h4>Capítulo concluído!</h4>
        <p>Você estudou todos os tópicos deste capítulo.</p>

        ${
          ch.id < chapters.length
            ? `<button class="btn btn-primary" onclick="goNext(${ch.id})">
                Próximo capítulo →
              </button>`
            : `<p style="color:var(--eco-green);font-weight:600;">
                ${faIcon('fa-trophy')} Você completou o eBook!
              </p>`
        }
      </div>
    </div>
  `;

  return div;
}

// ======================================================
// SEGURANÇA: ESCAPE DE TEXTO
// ======================================================

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

// ======================================================
// CAPÍTULOS: ABRIR E FECHAR
// ======================================================

function toggleChapter(id) {
  const el = document.getElementById('ch-' + id);
  if (!el) return;

  const isExpanded = el.classList.toggle('expanded');
  const header = el.querySelector('.chapter-header');

  if (header) {
    header.setAttribute('aria-expanded', String(isExpanded));
  }
}

function handleChapterKey(event, id) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleChapter(id);
  }
}

// ======================================================
// TÓPICOS
// ======================================================

function toggleTopic(topicId, chapterId, event) {
  if (event) {
    event.stopPropagation();
  }

  const isDone = completedTopics.has(topicId);

  if (isDone) {
    completedTopics.delete(topicId);
  } else {
    completedTopics.add(topicId);
  }

  updateCard(topicId);
  showTopicContent(topicId, chapterId);
  checkChapterComplete(chapterId);
  updateProgress();
}

function handleTopicKey(event, topicId, chapterId) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleTopic(topicId, chapterId, event);
  }
}

function showTopicContent(topicId, chapterId) {
  const ch = chapters.find(c => c.id === chapterId);
  if (!ch) return;

  const topic = ch.topics.find(t => t.id === topicId);
  if (!topic) return;

  const panel = document.getElementById('topic-panel-' + chapterId);
  if (!panel) return;

  // Clicar no mesmo tópico fecha o painel.
  const previousTopic = openTopics.get(chapterId);

  if (previousTopic === topicId) {
    panel.style.display = 'none';
    panel.innerHTML = '';
    openTopics.delete(chapterId);
    return;
  }

  openTopics.set(chapterId, topicId);
  panel.style.display = 'block';

  const tipHTML = topic.tip
    ? `<div class="callout callout-tip">
         <span class="callout-icon">${faIcon('fa-lightbulb')}</span>
         <span>${escapeHTML(topic.tip)}</span>
       </div>`
    : '';

  panel.innerHTML = `
    <div class="content-panel">
      <h4>${faIcon(topic.icon)} ${escapeHTML(topic.name)}</h4>
      <p>${escapeHTML(topic.content)}</p>
      ${tipHTML}
    </div>
  `;
}

// ======================================================
// ATUALIZAÇÃO DOS CARDS
// ======================================================

function updateCard(topicId) {
  const card = document.querySelector(
    `.topic-card[data-topic-id="${topicId}"]`
  );

  if (!card) return;

  const done = completedTopics.has(topicId);

  card.classList.toggle('done', done);
  card.setAttribute('aria-pressed', String(done));

  const status = card.querySelector('.topic-status');

  if (status) {
    status.innerHTML = done
      ? faIcon('fa-check') + ' Estudado'
      : '';
  }
}

// ======================================================
// CONCLUSÃO DOS CAPÍTULOS
// ======================================================

function checkChapterComplete(chapterId) {
  const ch = chapters.find(c => c.id === chapterId);
  if (!ch) return;

  const allDone = ch.topics.every(topic =>
    completedTopics.has(topic.id)
  );

  const doneEl = document.getElementById('ch-done-' + chapterId);

  if (allDone) {
    completedChapters.add(chapterId);
  } else {
    completedChapters.delete(chapterId);
  }

  if (doneEl) {
    doneEl.style.display = allDone ? 'block' : 'none';
  }
}

// ======================================================
// PROGRESSO
// ======================================================

function updateProgress() {
  const totalTopics = chapters.reduce(
    (acc, ch) => acc + ch.topics.length,
    0
  );

  const done = completedTopics.size;
  const pct = totalTopics
    ? Math.round((done / totalTopics) * 100)
    : 0;

  const bar = document.getElementById('sidebar-progress');
  const label = document.getElementById('progress-label');
  const nav = document.getElementById('progress-nav');

  if (bar) {
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', String(pct));
  }

  if (label) {
    label.textContent = pct + '% concluído';
  }

  if (nav) {
    nav.textContent =
      completedChapters.size + ' / ' + chapters.length + ' capítulos';
  }
}

// ======================================================
// DOWNLOAD DOS PDFS
// ======================================================

function handleDownload(event, chapterId) {
  const ch = chapters.find(c => c.id === chapterId);

  if (!ch || !ch.downloadUrl) {
    event.preventDefault();
    alert('O PDF deste capítulo ainda não foi publicado.');
    return;
  }

  // Se existe um caminho, o navegador pode iniciar o download.
  // O arquivo precisa estar presente no local indicado.
}

// ======================================================
// FILTROS
// ======================================================

function filterLevel(level) {
  const validLevels = ['all', 'iniciante', 'intermediario', 'avancado'];

  if (!validLevels.includes(level)) {
    return;
  }

  currentFilter = level;

  document.querySelectorAll('#nav-links a').forEach(a => {
    a.classList.remove('active');
    a.removeAttribute('aria-current');
  });

  const navId = level === 'all' ? 'nav-all' : 'nav-' + level;
  const activeLink = document.getElementById(navId);

  if (activeLink) {
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
  }

  applyFilter();
}

function showOnly(level) {
  filterLevel(level);
}

function applyFilter() {
  document.querySelectorAll('.chapter').forEach(ch => {
    const level = ch.getAttribute('data-level');
    const visible = currentFilter === 'all' || level === currentFilter;

    ch.classList.toggle('visible', visible);
    ch.hidden = !visible;
  });
}

// ======================================================
// PRÓXIMO CAPÍTULO
// ======================================================

function goNext(id) {
  const nextChapter = chapters.find(ch => ch.id === id + 1);
  if (!nextChapter) return;

  // Se o próximo capítulo não corresponde ao filtro,
  // muda para a visualização de todos.
  if (
    currentFilter !== 'all' &&
    currentFilter !== nextChapter.level
  ) {
    filterLevel('all');
  }

  const next = document.getElementById('ch-' + nextChapter.id);
  if (!next) return;

  next.hidden = false;
  next.classList.add('visible', 'expanded');

  const header = next.querySelector('.chapter-header');
  if (header) {
    header.setAttribute('aria-expanded', 'true');
  }

  next.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// ======================================================
// INICIALIZAÇÃO DA PÁGINA
// ======================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
