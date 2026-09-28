
// Renderiza os ícones do eBook usando Font Awesome.
function faIcon(icon, extraClass = '') {
  return `<i class="fa-solid ${icon} ${extraClass}" aria-hidden="true"></i>`;
}

//INICIANTE

const chapters = [
  {
    id: 1, level: "iniciante", emoji: "fa-seedling",
    title: "Introdução ao Mundo dos Investimentos",
    desc: "Entenda os fundamentos antes de colocar dinheiro em qualquer investimento.",
    intro: "Antes de qualquer coisa, é preciso entender para onde seu dinheiro vai e como ele pode trabalhar por você. Esse capítulo é a base de tudo.",
    topics: [
      { id: "1a", icon: "fa-lightbulb", name: "O que é investir", content: "Investir é colocar seu dinheiro para trabalhar em vez de deixá-lo parado. Ao investir, você espera receber mais do que colocou após um período.", tip: "Dica: quem investiu R$1.000 há 10 anos no Tesouro IPCA+ hoje teria mais de R$2.500 em poder de compra." },
      { id: "1b", icon: "fa-building-columns", name: "Poupar vs Investir", content: "Poupar significa guardar dinheiro sem rendimento real (ex: debaixo do colchão ou na conta corrente). Investir significa aplicar esse dinheiro em ativos que geram retorno acima da inflação.", tip: "Quem só poupa perde poder de compra com o tempo." },
      { id: "1c", icon: "fa-chart-column", name: "Juros simples e compostos", content: "Juros simples incidem apenas sobre o capital inicial. Juros compostos incidem sobre o capital + juros acumulados — o famoso 'juro sobre juro', que é a base do crescimento exponencial do patrimônio.", tip: "Einstein teria dito que os juros compostos são a maior força do universo." },
      { id: "1d", icon: "fa-chart-line", name: "Inflação", content: "Inflação é o aumento geral dos preços. Se seu dinheiro rende 5% ao ano mas a inflação é 6%, você perdeu poder de compra. No Brasil, o índice oficial é o IPCA.", tip: "Sempre compare o retorno do investimento com a inflação do período." },
      { id: "1e", icon: "fa-thumbtack", name: "CDI, Selic e IPCA", content: "Selic: taxa básica de juros do Brasil, definida pelo Banco Central. CDI: certificado de depósito interbancário, muito próximo da Selic, referência para renda fixa. IPCA: índice oficial da inflação brasileira.", tip: "A maioria dos CDBs paga um % do CDI — ex: 'CDB 110% do CDI'." },
      { id: "1f", icon: "fa-compass", name: "Perfil de investidor", content: "Existem 3 perfis: Conservador (prioriza segurança, aceita rendimentos menores), Moderado (equilíbrio entre segurança e rentabilidade) e Agressivo (aceita riscos maiores por retornos maiores).", tip: "Seu perfil pode mudar com o tempo e com seus objetivos." }
    ],
    downloadUrl: '../pdf/Capitulo1.pdf'
  },
  {
    id: 2, level: "iniciante", emoji: "fa-shield-halved",
    title: "Reserva de Emergência",
    desc: "A base de qualquer planejamento financeiro sólido.",
    intro: "Antes de investir em qualquer coisa, você precisa ter uma rede de segurança. Sem reserva de emergência, qualquer imprevisto pode te forçar a resgatar investimentos no pior momento.",
    topics: [
      { id: "2a", icon: "fa-life-ring", name: "O que é", content: "É uma quantia guardada para cobrir imprevistos: desemprego, doença, conserto urgente. Deve ser de fácil acesso (liquidez diária) e segura." },
      { id: "2b", icon: "fa-list-ol", name: "Quanto guardar", content: "A regra geral é: 3 a 6 meses de gastos mensais para quem tem emprego fixo. 6 a 12 meses para autônomos e empreendedores.", tip: "Se você gasta R$3.000/mês, sua reserva ideal é de R$9.000 a R$18.000." },
      { id: "2c", icon: "fa-location-dot", name: "Onde investir", content: "Tesouro Selic: rende próximo ao CDI, resgate em D+1. CDB de liquidez diária: opção segura em bancos digitais. Conta remunerada: fácil mas rendimento pode ser menor." },
      { id: "2d", icon: "fa-triangle-exclamation", name: "Erros mais comuns", content: "1) Não ter reserva nenhuma. 2) Usar a poupança como reserva (rendimento abaixo do CDI). 3) Colocar a reserva em investimentos sem liquidez. 4) Usar a reserva para oportunidades de investimento." }
    ],
    downloadUrl: null
  },
  {
    id: 3, level: "iniciante", emoji: "fa-landmark",
    title: "Tesouro Direto Completo",
    desc: "O investimento mais seguro do Brasil, explicado do zero.",
    intro: "O Tesouro Direto é um programa do governo federal para venda de títulos públicos para pessoas físicas. É considerado o investimento mais seguro do Brasil.",
    topics: [
      { id: "3a", icon: "fa-chart-line", name: "Tesouro Selic", content: "Acompanha a taxa Selic. Ideal para reserva de emergência. Baixíssimo risco de perda. Liquidez diária (D+1). Rende próximo ao CDI." },
      { id: "3b", icon: "fa-lock", name: "Tesouro Prefixado", content: "Taxa de juros fixada na compra. Você já sabe exatamente quanto vai receber no vencimento. Risco: se a Selic subir, pode render menos que outros investimentos.", tip: "Bom quando a Selic está alta e você acredita que vai cair." },
      { id: "3c", icon: "fa-shield-halved", name: "Tesouro IPCA+", content: "Rende IPCA + taxa fixa. Protege seu dinheiro da inflação. Ideal para objetivos de longo prazo. Ex: IPCA+ 6% ao ano.", tip: "Melhor opção para aposentadoria e objetivos de mais de 5 anos." },
      { id: "3d", icon: "fa-cart-shopping", name: "Como comprar", content: "1. Abra conta em uma corretora (XP, Rico, NuInvest etc.). 2. Acesse o Tesouro Direto pelo app ou site. 3. Escolha o título. 4. Invista a partir de R$30!" },
      { id: "3e", icon: "fa-money-bill-transfer", name: "Tributação", content: "Tabela regressiva de IR: até 180 dias: 22,5% / 181 a 360 dias: 20% / 361 a 720 dias: 17,5% / Acima de 720 dias: 15%. IOF nos primeiros 30 dias." },
      { id: "3f", icon: "fa-bolt", name: "Riscos", content: "Risco de crédito: quase zero (garantido pelo governo federal). Risco de mercado: existe para prefixado e IPCA+ se vendidos antes do vencimento. Ao segurar até o vencimento, o retorno é garantido." }
    ],
    downloadUrl: null
  },
  {
    id: 4, level: "iniciante", emoji: "fa-gem",
    title: "Renda Fixa para Iniciantes",
    desc: "CDBs, LCIs, LCAs e como escolher o melhor para você.",
    intro: "A renda fixa é a porta de entrada para a maioria dos investidores. Você empresta dinheiro para bancos ou empresas e recebe de volta com juros.",
    topics: [
      { id: "4a", icon: "fa-building-columns", name: "CDB", content: "Certificado de Depósito Bancário. Você empresta dinheiro ao banco e recebe juros. Garante pelo FGC até R$250 mil por CPF/instituição. Pode ser pré ou pós-fixado." },
      { id: "4b", icon: "fa-house", name: "LCI", content: "Letra de Crédito Imobiliário. Isenta de IR para pessoa física. Recursos destinados ao setor imobiliário. Liquidez geralmente menor que CDB.", tip: "Por ser isenta de IR, um LCI de 90% CDI pode superar um CDB de 100% CDI." },
      { id: "4c", icon: "fa-wheat-awn", name: "LCA", content: "Letra de Crédito do Agronegócio. Isenta de IR para pessoa física. Recursos destinados ao agronegócio. Funciona de forma similar ao LCI." },
      { id: "4d", icon: "fa-clipboard", name: "Debêntures", content: "Títulos emitidos por empresas. Risco maior que CDB/LCI/LCA (sem FGC). As incentivadas (infraestrutura) são isentas de IR. Potencial de rendimento maior." },
      { id: "4e", icon: "fa-box", name: "Fundos de renda fixa", content: "Carteira diversificada de títulos de renda fixa. Gestor profissional toma as decisões. Cobra taxa de administração. Conveniente para quem não quer gerir." },
      { id: "4f", icon: "fa-lock", name: "Garantia do FGC", content: "Fundo Garantidor de Crédito protege CDB, LCI, LCA, poupança. Limite: R$250 mil por CPF por instituição financeira. Teto global: R$1 milhão por CPF a cada 4 anos." }
    ],
    downloadUrl: null
  },
  {
    id: 5, level: "iniciante", emoji: "fa-bullseye",
    title: "Como Montar sua Primeira Carteira",
    desc: "Diversificação, alocação e exemplos práticos para começar hoje.",
    intro: "Com os fundamentos aprendidos, é hora de montar uma carteira que combine com seus objetivos, horizonte de tempo e perfil de risco.",
    topics: [
      { id: "5a", icon: "fa-shuffle", name: "Diversificação", content: "Não colocar todos os ovos na mesma cesta. Diversificar reduz o risco sem necessariamente reduzir o retorno. Você pode diversificar por: tipo de ativo, emissor, prazo, indexador." },
      { id: "5b", icon: "fa-scale-balanced", name: "Distribuição de patrimônio", content: "Conservador: 80-100% renda fixa, 0-20% variável. Moderado: 60-70% renda fixa, 30-40% variável. Arrojado: 30-50% renda fixa, 50-70% variável.", tip: "Comece conservador e aumente exposição ao risco gradualmente." },
      { id: "5c", icon: "fa-pen-to-square", name: "Exemplos de carteiras", content: "Carteira conservadora inicial: 50% Tesouro Selic (reserva), 30% CDB liquidez, 20% CDB médio prazo. Carteira moderada: 40% renda fixa, 30% FIIs, 20% ações, 10% Tesouro IPCA+." }
    ],
    downloadUrl: null
  },

  //INTERMEDIÁRIO
  {
    id: 6, level: "intermediario", emoji: "fa-chart-column",
    title: "Introdução à Bolsa de Valores",
    desc: "Entenda como funciona o mercado de capitais brasileiro.",
    intro: "A bolsa de valores é onde compradores e vendedores negociam ativos como ações, FIIs e ETFs. No Brasil, a B3 é a única bolsa de valores.",
    topics: [
      { id: "6a", icon: "fa-building", name: "O que é a bolsa", content: "Mercado organizado onde ações de empresas são compradas e vendidas. No Brasil: B3 (Brasil, Bolsa, Balcão). As empresas captam recursos e os investidores participam dos lucros." },
      { id: "6b", icon: "fa-gear", name: "Como funciona", content: "Empresas abrem capital via IPO. Investidores compram ações no mercado secundário. Preços variam por oferta e demanda, resultados, expectativas e fatores macroeconômicos." },
      { id: "6c", icon: "fa-laptop", name: "Home broker", content: "Plataforma de negociação online das corretoras. Permite comprar e vender ativos em tempo real. Disponível em app, site e desktop." },
      { id: "6d", icon: "fa-clipboard", name: "Tipos de ordens", content: "Ordem a mercado: executa ao melhor preço disponível. Ordem limitada: define o preço máximo/mínimo. Ordem stop: ativada quando preço atinge determinado valor." }
    ],
    downloadUrl: null
  },
  {
    id: 7, level: "intermediario", emoji: "fa-chart-line",
    title: "Investindo em Ações",
    desc: "Dividendos, valorização e como analisar empresas.",
    intro: "Ao comprar uma ação, você se torna sócio de uma empresa. Você pode ganhar com a valorização das ações e com a distribuição de lucros (dividendos).",
    topics: [
      { id: "7a", icon: "fa-puzzle-piece", name: "O que são ações", content: "Fração do capital social de uma empresa. ON (ordinárias): direito a voto. PN (preferenciais): preferência no recebimento de dividendos. Units: combinação de ON e PN." },
      { id: "7b", icon: "fa-money-bill-wave", name: "Dividendos", content: "Distribuição de parte do lucro aos acionistas. No Brasil, empresas devem distribuir no mínimo 25% do lucro. Dividend Yield = Dividendo anual / Preço da ação." },
      { id: "7c", icon: "fa-rocket", name: "Valorização", content: "Além dos dividendos, ações podem se valorizar (ou desvalorizar). Ganho de capital = diferença entre preço de venda e compra. IR: 15% sobre ganho de capital para venda acima de R$20 mil/mês." },
      { id: "7d", icon: "fa-magnifying-glass", name: "Como analisar empresas", content: "Analise resultados trimestrais, posição de mercado, qualidade da gestão, setor de atuação, endividamento, histórico de dividendos e crescimento de receita." }
    ],
    downloadUrl: null
  },
  {
    id: 8, level: "intermediario", emoji: "fa-microscope",
    title: "Análise Fundamentalista",
    desc: "Os principais indicadores para avaliar se uma empresa vale o investimento.",
    intro: "A análise fundamentalista busca determinar o valor intrínseco de uma empresa analisando seus demonstrativos financeiros e indicadores de desempenho.",
    topics: [
      { id: "8a", icon: "fa-chart-column", name: "P/L (Preço/Lucro)", content: "Indica quantos anos de lucro você pagaria ao comprar a ação. P/L = Preço / Lucro por ação. P/L baixo pode indicar empresa barata. Compare sempre com o setor." },
      { id: "8b", icon: "fa-chart-line", name: "ROE", content: "Return on Equity = Lucro líquido / Patrimônio líquido. Mede a eficiência da empresa em gerar lucro com os recursos próprios. ROE acima de 15% é considerado bom." },
      { id: "8c", icon: "fa-money-bill-1", name: "Dividend Yield", content: "Retorno em dividendos em relação ao preço pago. DY = Dividendos por ação / Preço. Acima de 6% ao ano é considerado um bom pagador de dividendos." },
      { id: "8d", icon: "fa-chart-line", name: "Margens", content: "Margem bruta: lucro bruto / receita. Margem líquida: lucro líquido / receita. Margens crescentes indicam eficiência operacional aumentando." },
      { id: "8e", icon: "fa-dumbbell", name: "Endividamento", content: "Dívida líquida / EBITDA: mede capacidade de pagamento. Abaixo de 2x é saudável. Acima de 3x exige atenção. Empresa muito endividada tem risco financeiro maior." }
    ],
    downloadUrl: null
  },
  {
    id: 9, level: "intermediario", emoji: "fa-chart-line",
    title: "Análise Técnica para Iniciantes",
    desc: "Gráficos, suportes, resistências e padrões de preço.",
    intro: "A análise técnica estuda o comportamento passado dos preços para tentar prever movimentos futuros. É muito usada por traders de curto prazo.",
    topics: [
      { id: "9a", icon: "⬇️", name: "Suportes", content: "Região de preço onde historicamente há mais compradores que vendedores. O ativo 'bate' nesse nível e tende a subir. Violado o suporte, pode virar resistência." },
      { id: "9b", icon: "⬆️", name: "Resistências", content: "Região onde historicamente há mais vendedores. O ativo sobe até ali e cai. Rompida a resistência, pode virar suporte." },
      { id: "9c", icon: "fa-ruler-combined", name: "Tendência", content: "Alta: sequência de topos e fundos crescentes. Baixa: sequência de topos e fundos decrescentes. Lateral: oscilação entre suporte e resistência sem direção definida." },
      { id: "9d", icon: "fa-box", name: "Volume", content: "Quantidade de ativos negociados. Volume confirma movimentos: rompimento com alto volume é mais confiável. Movimentos sem volume são menos significativos." },
      { id: "9e", icon: "fa-chart-column", name: "Candlesticks", content: "Representação gráfica de preço. Cada candle mostra: abertura, fechamento, máxima e mínima. Verde/branco = fechou acima da abertura (alta). Vermelho/preto = fechou abaixo (baixa)." }
    ],
    downloadUrl: null
  },
  {
    id: 10, level: "intermediario", emoji: "fa-building",
    title: "Fundos Imobiliários (FIIs)",
    desc: "Invista em imóveis pagando dividendos mensais.",
    intro: "Os FIIs permitem que pequenos investidores invistam em imóveis comerciais, shoppings, galpões logísticos e outros ativos imobiliários com pouco capital.",
    topics: [
      { id: "10a", icon: "fa-helmet-safety", name: "O que são", content: "FIIs são fundos que investem em imóveis ou ativos imobiliários. Você compra cotas na bolsa. Rendimentos mensais geralmente isentos de IR para pessoa física." },
      { id: "10b", icon: "fa-folder-tree", name: "Tipos de FIIs", content: "Tijolo: imóveis físicos (lajes, shoppings, galpões). Papel: títulos imobiliários (CRI, LCI). Híbridos: combinação dos dois. FOFs: fundos de fundos imobiliários." },
      { id: "10c", icon: "fa-money-bill-transfer", name: "Dividendos mensais", content: "FIIs são obrigados a distribuir no mínimo 95% do resultado semestral. Na prática, pagam mensalmente. DY médio do mercado: 8% a 12% ao ano." },
      { id: "10d", icon: "fa-magnifying-glass", name: "Como escolher", content: "Analise: DY (Dividend Yield), P/VP (preço sobre valor patrimonial), vacância física, qualidade dos imóveis e contratos, gestora, liquidez das cotas e histórico de dividendos." }
    ],
    downloadUrl: null
  },
  {
    id: 11, level: "intermediario", emoji: "fa-basket-shopping",
    title: "ETFs",
    desc: "Invista em uma carteira diversificada com um único ativo.",
    intro: "ETFs (Exchange Traded Funds) são fundos negociados em bolsa que replicam índices, como o Ibovespa ou o S&P 500. São excelentes para diversificação com baixo custo.",
    topics: [
      { id: "11a", icon: "fa-box", name: "O que são", content: "ETFs replicam índices de mercado. Comprar um ETF é como comprar uma pequena fatia de todas as ações do índice. Gestão passiva = taxas baixíssimas." },
      { id: "11b", icon: "fa-flag", name: "ETFs brasileiros", content: "BOVA11: replica o Ibovespa (100+ empresas). IVVB11: replica o S&P 500 em reais. SMAL11: empresas de small caps brasileiras. DIVO11: empresas pagadoras de dividendos." },
      { id: "11c", icon: "fa-earth-americas", name: "ETFs internacionais", content: "Disponíveis nas bolsas americanas via BDR ou conta em corretora no exterior. VOO (S&P 500), QQQ (Nasdaq), VTI (mercado total EUA).", tip: "IVVB11 permite exposição ao S&P 500 sem precisar de conta no exterior." },
      { id: "11d", icon: "fa-scale-balanced", name: "Vantagens e desvantagens", content: '<i class="fa-solid fa-check" aria-hidden="true"></i> Diversificação instantânea. <i class="fa-solid fa-check" aria-hidden="true"></i> Taxas muito baixas. <i class="fa-solid fa-check" aria-hidden="true"></i> Simples de entender. <i class="fa-solid fa-xmark" aria-hidden="true"></i> Você não escolhe as ações individuais. <i class="fa-solid fa-xmark" aria-hidden="true"></i> Acompanha tanto as altas quanto as quedas do índice.'  }
    ],
    downloadUrl: null
  },

  //AVANÇADO
  {
    id: 12, level: "avancado", emoji: "fa-bolt",
    title: "Swing Trade vs Day Trade",
    desc: "Operações de curto prazo: diferenças, riscos e qual combina com você.",
    intro: "Estas estratégias envolvem negociação ativa, exigem muito estudo, disciplina e capital dedicado. Não são recomendadas para iniciantes.",
    topics: [
      { id: "12a", icon: "fa-arrows-rotate", name: "Diferenças", content: "Day trade: posição aberta e fechada no mesmo dia. Swing trade: posição mantida por dias ou semanas. Day trade exige mais tempo, atenção e estrutura técnica." },
      { id: "12b", icon: "fa-check", name: "Vantagens", content: "Day trade: resultado rápido, sem risco overnight, IRRF de 1% no lucro (compensável). Swing trade: menos estressante, permite análise mais cuidadosa, resultados menos voláteis." },
      { id: "12c", icon: "fa-triangle-exclamation", name: "Desvantagens", content: "Day trade: custos operacionais altos, necessita de capital maior, IR de 20% sobre lucro, estatísticas mostram que 80%+ perdem dinheiro. Swing trade: risco overnight, requer mais capital." },
      { id: "12d", icon: "fa-shield-halved", name: "Gestão de risco", content: "Defina antes de entrar: máximo de perda por operação (1-2% do capital), relação risco/retorno mínima de 1:2. Nunca opere sem stop." },
      { id: "12e", icon: "fa-brain", name: "Qual combina com cada perfil", content: "Day trade: requer dedicação integral, capital mínimo R$10-20k, perfil de alto risco. Swing trade: dá para conciliar com outro trabalho, capital mínimo R$5-10k, perfil de risco moderado-alto." }
    ],
    downloadUrl: null
  },
  {
    id: 13, level: "avancado", emoji: "fa-shield-halved",
    title: "Gestão de Risco",
    desc: "Como proteger seu capital e sobreviver no longo prazo.",
    intro: "Gestão de risco é o que separa traders profissionais dos amadores. Qualquer estratégia sem boa gestão de risco está condenada ao fracasso.",
    topics: [
      { id: "13a", icon: "fa-circle-stop", name: "Stop Loss", content: "Ordem que encerra automaticamente uma posição se o preço cair a um nível determinado. Protege de perdas maiores. Regra: nunca mover o stop para baixo (ampliando a perda)." },
      { id: "13b", icon: "fa-bullseye", name: "Stop Gain", content: "Ordem que realiza lucro quando o preço atinge um alvo. Garante que você trave os lucros. Define seu objetivo de saída antes de entrar na operação." },
      { id: "13c", icon: "fa-person", name: "Controle emocional", content: "Medo e ganância são os maiores inimigos. Tenha um plano e siga-o. Não tome decisões em momentos de euforia ou pânico. Journaling de operações ajuda a identificar padrões emocionais." },
      { id: "13d", icon: "fa-ruler", name: "Tamanho de posição", content: "Nunca arrisque mais de 1-2% do capital por operação. Se você tem R$20 mil, arrisque no máximo R$200-400 por trade. Isso garante que você sobreviva a uma sequência de perdas." }
    ],
    downloadUrl: null
  },
  {
    id: 14, level: "avancado", emoji: "fa-brain",
    title: "Psicologia do Investidor",
    desc: "Os vieses cognitivos que fazem você perder dinheiro.",
    intro: "Entender a própria mente é tão importante quanto entender o mercado. Nosso cérebro tem atalhos cognitivos que funcionam na vida, mas destroem carteiras.",
    topics: [
      { id: "14a", icon: "fa-face-smile", name: "Ganância", content: "Leva a assumir riscos excessivos, aumentar posições sem critério e segurar ativos valorizados por tempo demais esperando subir mais. Solução: plano de saída definido antes da entrada." },
      { id: "14b", icon: "fa-face-frown", name: "Medo", content: "Paralisa nas quedas, faz vender no pior momento e impede aproveitar oportunidades. O maior inimigo do investidor de longo prazo é vender bons ativos nas crises." },
      { id: "14c", icon: "fa-magnifying-glass", name: "Viés cognitivo", content: "Viés de confirmação: buscar informações que confirmem sua tese. Efeito manada: seguir o que todos fazem. Ancoragem: se prender ao preço de compra. Loss aversion: sentir a dor da perda 2x mais que a alegria do ganho." },
      { id: "14d", icon: "fa-scale-balanced", name: "Disciplina", content: "Siga seu plano independente das emoções. Documente suas operações e decisões. Revise periodicamente. Aceite que perdas fazem parte do processo. Invista em educação financeira continuamente." }
    ],
    downloadUrl: null
  },
  {
    id: 15, level: "avancado", emoji: "fa-money-bill-transfer",
    title: "Estratégias de Dividendos",
    desc: "Monte uma renda passiva crescente com ações e FIIs.",
    intro: "A estratégia de dividendos busca construir uma carteira de ativos que pague uma renda passiva crescente e previsível ao longo dos anos.",
    topics: [
      { id: "15a", icon: "fa-trophy", name: "Empresas pagadoras", content: "Características: histórico longo de pagamentos, lucros estáveis, baixo endividamento, modelo de negócio maduro. Setores: bancos, utilities, saneamento, telecom, seguros." },
      { id: "15b", icon: "fa-chart-column", name: "Dividend Yield", content: "Foco em DY consistente, não apenas o mais alto. DY muito alto pode ser sinal de empresa com problemas ou queda no preço. Busque DY sustentável entre 6-12% ao ano." },
      { id: "15c", icon: "fa-arrow-rotate-right", name: "Reinvestimento", content: "A mágica dos dividendos está no reinvestimento. Use os proventos recebidos para comprar mais ações/cotas. Isso acelera o efeito dos juros compostos e cresce exponencialmente." }
    ],
    downloadUrl: null
  },
  {
    id: 16, level: "avancado", emoji: "fa-lightbulb",
    title: "Value Investing",
    desc: "A filosofia de Buffett: comprar empresas boas por preços baratos.",
    intro: "Value Investing é a filosofia de investimento popularizada por Benjamin Graham e praticada por Warren Buffett: comprar empresas de qualidade abaixo do seu valor intrínseco.",
    topics: [
      { id: "16a", icon: "fa-book-open", name: "Filosofia de investimento", content: "Preço ≠ Valor. O mercado é irracional no curto prazo. Empresas de qualidade a preços justos superam o mercado no longo prazo. O tempo é aliado de boas empresas." },
      { id: "16b", icon: "fa-magnifying-glass-plus", name: "Empresas descontadas", content: "Buscar empresas com P/L, P/VP, EV/EBITDA abaixo da média histórica ou do setor. Razão para o desconto precisa ser temporária, não estrutural." },
      { id: "16c", icon: "fa-shield-halved", name: "Margem de segurança", content: "Comprar apenas quando o desconto for suficientemente grande. Ex: se o valor intrínseco é R$50, só comprar abaixo de R$35 (30% de desconto). Protege de erros de análise." }
    ],
    downloadUrl: null
  },
  {
    id: 17, level: "avancado", emoji: "fa-earth-europe",
    title: "Investimentos Internacionais",
    desc: "Como investir fora do Brasil e diversificar globalmente.",
    intro: "Investir no exterior protege de riscos específicos do Brasil (câmbio, política) e dá acesso a empresas e mercados que não existem aqui.",
    topics: [
      { id: "17a", icon: "fa-globe", name: "Como investir fora", content: "BDRs (Brazilian Depositary Receipts): certificados de ações estrangeiras negociados na B3. ETFs internacionais na B3 (como IVVB11). Conta em corretora no exterior (Avenue, Interactive Brokers)." },
      { id: "17b", icon: "fa-flag-usa", name: "ETFs americanos", content: "VOO: replica S&P 500, taxa 0,03%. QQQ: replica Nasdaq-100 (tech). VTI: mercado total dos EUA. VT: mercado global (50+ países). Disponíveis via corretoras como Avenue." },
      { id: "17c", icon: "fa-chart-line", name: "Stocks", content: "Ações individuais de empresas americanas: Apple (AAPL), Microsoft (MSFT), Amazon (AMZN). Requer mais pesquisa e acompanhamento. Risco de empresa específica." },
      { id: "17d", icon: "fa-money-bill-transfer", name: "Tributação", content: "BDRs na B3: isenção até R$20 mil/mês em vendas, IR 15% acima. Conta no exterior: bens devem ser declarados no IRPF. Remessas acima de US$20 mil por mês pagam IOF. Rendimentos tributados pelo carnê-leão." }
    ],
    downloadUrl: null
  }
];

let completedTopics = new Set();
let completedChapters = new Set();
let currentFilter = 'all';

function init() {
  renderChapters();
  setTimeout(() => {
    document.getElementById('main-nav').style.display = 'flex';
    document.getElementById('main-layout').style.display = 'grid';
  }, 300);
  window.addEventListener('scroll', () => {
    const cover = document.getElementById('cover');
    const rect = cover.getBoundingClientRect();
    if(rect.bottom < 0) {
      document.getElementById('main-nav').style.display = 'flex';
    }
  });
}

function renderChapters() {
  const container = document.getElementById('chapters-container');
  container.innerHTML = '';
  chapters.forEach(ch => {
    const el = createChapterEl(ch);
    container.appendChild(el);
  });
  applyFilter();
}

function createChapterEl(ch) {
  const div = document.createElement('div');
  div.className = 'chapter';
  div.id = 'ch-' + ch.id;
  div.setAttribute('data-level', ch.level);

  const topicsHTML = ch.topics.map(t => `
    <div class="topic-card ${completedTopics.has(t.id) ? 'done' : ''}" onclick="toggleTopic('${t.id}', ${ch.id}, event)">
      <div class="topic-icon">${faIcon(t.icon)}</div>
      <div class="topic-name">${t.name}</div>
      <div class="topic-status">${completedTopics.has(t.id) ? faIcon('fa-check') + ' Estudado' : ''}</div>
    </div>
  `).join('');

  const done = completedChapters.has(ch.id);

  div.innerHTML = `
    <div class="chapter-header" onclick="toggleChapter(${ch.id})">
      <div class="chapter-num">Cap. ${String(ch.id).padStart(2,'0')}</div>
      <div class="chapter-title-block">
        <span class="chapter-level-badge badge-${ch.level}">${ch.level === 'iniciante' ? faIcon('fa-book') + ' Iniciante' : ch.level === 'intermediario' ? faIcon('fa-chart-line') + ' Intermediário' : faIcon('fa-rocket') + ' Avançado'}</span>
        <h2>${faIcon(ch.emoji)} ${ch.title}</h2>
        <p class="chapter-desc">${ch.desc}</p>
      </div>
      <div class="chapter-toggle">▾</div>
    </div>
    <div class="chapter-body">
      <div class="chapter-intro">
        <div class="chapter-intro-icon">${faIcon(ch.emoji)}</div>
        <div>
          <h3>${ch.title}</h3>
          <p>${ch.intro}</p>
        </div>
      </div>
      <div class="topics-grid">${topicsHTML}</div>
      <div id="topic-panel-${ch.id}" style="display:none;"></div>
      <div class="chapter-download">
        <a class="btn btn-outline" href="${ch.downloadUrl || '#'}" ${ch.downloadUrl ? 'download' : ''} onclick="handleDownload(event, ${ch.id})">
          ${faIcon('fa-download')} Baixar capítulo em PDF
        </a>
      </div>
      <div class="chapter-complete" id="ch-done-${ch.id}" style="${done ? '' : 'display:none'}">
        <span class="complete-checkmark">${faIcon(ch.emoji)}</span>
        <h4>Capítulo concluído!</h4>
        <p>Você estudou todos os tópicos deste capítulo.</p>
        ${ch.id < 17 ? `<button class="btn btn-primary" onclick="goNext(${ch.id})">Próximo capítulo →</button>` : '<p style="color:var(--eco-green);font-weight:600;">' + faIcon('fa-trophy') + ' Você completou o eBook!</p>'}
      </div>
    </div>
  `;
  return div;
}

function toggleChapter(id) {
  const el = document.getElementById('ch-' + id);
  el.classList.toggle('expanded');
}

function toggleTopic(topicId, chapterId, e) {
  if(completedTopics.has(topicId)) {
    completedTopics.delete(topicId);
  } else {
    completedTopics.add(topicId);
    showTopicContent(topicId, chapterId);
  }
  updateCard(topicId);
  checkChapterComplete(chapterId);
  updateProgress();
}

function showTopicContent(topicId, chapterId) {
  const ch = chapters.find(c => c.id === chapterId);
  const t = ch.topics.find(t => t.id === topicId);
  if(!t) return;
  const panel = document.getElementById('topic-panel-' + chapterId);
  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="content-panel">
      <h4>${faIcon(t.icon)} ${t.name}</h4>
      <p>${t.content}</p>
      ${t.tip ? `<div class="callout callout-tip"><span class="callout-icon">${faIcon('fa-lightbulb')}</span><span>${t.tip}</span></div>` : ''}
    </div>
  `;
}

function updateCard(topicId) {
  document.querySelectorAll('.topic-card').forEach(card => {
    if(card.getAttribute('onclick') && card.getAttribute('onclick').includes(`'${topicId}'`)) {
      const done = completedTopics.has(topicId);
      card.className = 'topic-card' + (done ? ' done' : '');
      card.querySelector('.topic-status').innerHTML = done ? faIcon('fa-check') + ' Estudado' : '';
    }
  });
}

function checkChapterComplete(chapterId) {
  const ch = chapters.find(c => c.id === chapterId);
  const allDone = ch.topics.every(t => completedTopics.has(t.id));
  const doneEl = document.getElementById('ch-done-' + chapterId);
  if(allDone) {
    completedChapters.add(chapterId);
    doneEl.style.display = 'block';
  } else {
    completedChapters.delete(chapterId);
    doneEl.style.display = 'none';
  }
}

function updateProgress() {
  const totalTopics = chapters.reduce((acc, ch) => acc + ch.topics.length, 0);
  const done = completedTopics.size;
  const pct = Math.round((done / totalTopics) * 100);
  const bar = document.getElementById('sidebar-progress');
  const label = document.getElementById('progress-label');
  const nav = document.getElementById('progress-nav');
  if(bar) bar.style.width = pct + '%';
  if(label) label.textContent = pct + '% concluído';
  if(nav) nav.textContent = completedChapters.size + ' / 17 capítulos';
}

// Enquanto o PDF do capítulo não é publicado (ch.downloadUrl vazio), o clique
// não navega para lugar nenhum e só avisa o usuário. Assim que o eBook for
// produzido, basta preencher `downloadUrl` do capítulo correspondente em
// `chapters` (topo deste arquivo) com o link real do PDF.
function handleDownload(event, chapterId) {
  const ch = chapters.find(c => c.id === chapterId);
  if (!ch.downloadUrl) {
    event.preventDefault();
    alert('O PDF deste capítulo ainda não foi publicado.');
  }
}

function filterLevel(level) {
  currentFilter = level;
  document.querySelectorAll('#nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('nav-' + (level === 'all' ? 'all' : level === 'iniciante' ? 'iniciante' : level === 'intermediario' ? 'intermediario' : 'avancado')).classList.add('active');
  applyFilter();
}

function showOnly(level) {
  filterLevel(level);
}

function applyFilter() {
  document.querySelectorAll('.chapter').forEach(ch => {
    const lvl = ch.getAttribute('data-level');
    ch.classList.toggle('visible', currentFilter === 'all' || lvl === currentFilter);
  });
}

function goNext(id) {
  const next = document.getElementById('ch-' + (id + 1));
  if(next) {
    next.classList.add('visible', 'expanded');
    next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

window.onload = init;
