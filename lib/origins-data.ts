import type { OriginData } from "./types"

export const originsData: OriginData[] = [
  {
    id: "amnesico",
    name: "Amnésico",
    description: "Você perdeu suas memórias, mas elas retornam aos poucos quando você se aproxima da morte.",
    ability: {
      name: "Doces Lembranças",
      description:
        "Suas memórias estão retornando pouco a pouco, tendo vislumbres delas quando se aproxima da morte. Caso sofra um Dano Massivo, você irá relembrar parte de seu passado, lhe motivando a seguir lutando. Por isso, você recupera 1 PE +1 para cada 30% de NEX que possuir.",
    },
  },
  {
    id: "artista",
    name: "Artista",
    description: "Você é um artista com uma base de fãs engajada que pode ser útil em diversas situações.",
    ability: {
      name: "Fandom Engajado",
      description:
        "Você possui muitos fãs, podendo usufruir deles e de sua boa-vontade. Existem diversas maneiras de utilizá-los, como para criar tumulto, para obter informações, ou dificultar a vida de uma pessoa, cancelando-a. Fazer isso exige duas ações de interlúdio e um teste de Diplomacia (DT 20 +5 para cada vez que tiver utilizado isso anteriormente). Caso falhe, não poderá utilizar novamente esta habilidade. É possível fazer a DT retornar a 20 e poder utilizar novamente esta habilidade ao gastar seu tempo além da ordem e passar em um teste de Diplomacia (DT 25 +5 para cada vez que fizer isso)",
    },
  },
  {
    id: "astronauta",
    name: "Astronauta",
    description: "Você foi treinado para sobreviver em condições extremas do espaço.",
    ability: {
      name: "Treinamento Espacial",
      description:
        "Astronautas são treinados para sobreviver à hostilidade do cosmos, se preparando para falta de oxigênio e condições extremas. Por isso, você recebe +2 em testes de Fortitude e pode segurar o fôlego pelo dobro do tempo",
    },
  },
  {
    id: "agente-de-saude",
    name: "Agente de Saúde",
    description: "Você trabalha na área da saúde e sabe como prevenir e tratar ferimentos.",
    ability: {
      name: "Tratamento Preventivo",
      description:
        "Você pode gastar uma Ação de Interlúdio para realizar um tratamento preventivo em um número de aliados igual ao seu Intelecto, na próxima vez que entrarem em morrendo, deverão rolar 1d4. Caso tirem 4, irão em vez de cair, ficar com 1 PV.",
    },
  },
  {
    id: "atleta",
    name: "Atleta",
    description: "Você é um atleta treinado que pode superar seus limites físicos.",
    ability: {
      name: "Indo Além do Limite",
      description:
        "Ao falhar em um teste baseado em um Atributo Físico, pode gastar 1 PE para refazê-lo. Caso falhe novamente, fica Fatigado até o fim da cena.",
    },
  },
  {
    id: "amigo-dos-animais",
    name: "Amigo dos Animais",
    description: "Você tem uma conexão especial com animais e a natureza.",
    ability: {
      name: "Vínculo Natural",
      description:
        "Sua conexão com a natureza é tamanha ao ponto de se tornar algo quase irreal. Você recebe +1d20 em testes de Diplomacia e caso esteja em um terreno natural, pode convocar animais para lhe auxiliar, se comunicando com eles de forma abstrata, podendo utilizar diplomacia para se comunicar com animais.",
    },
  },
  {
    id: "blaster",
    name: "Blaster",
    description: "Você é especialista em explosivos e sabe como usá-los de forma eficiente.",
    ability: {
      name: "Plantando Explosivos",
      description:
        "Para usufruir o máximo de seus explosivos, você é capaz de programá-los para explodir nos momentos mais oportunos. Você pode gastar uma ação padrão para programar um de seus explosivos. Defina um número de rodadas para isso, o explosivo irá ser detonado no exato momento que o número for alcançado. Independente de onde ele estiver, explodirá. Alternativamente, você pode programar o explosivo para que ao ser segurado ou sofrer algum movimento brusco (como estar na área de uma explosão) exploda automaticamente.",
    },
  },
  {
    id: "body-builder",
    name: "Body Builder",
    description: "Você dedicou anos ao aprimoramento físico e possui um corpo escultural.",
    ability: {
      name: "Corpo Escultural",
      description:
        "Após anos de treino e um aprimoramento corporal impecável, você está em seu ápice físico e estético. Por isso, você pode ao realizar um teste de Adestramento, Diplomacia, Enganação ou Intimidação, gastar 1 PE para utilizar Força em vez de presença",
    },
  },
  {
    id: "colegial",
    name: "Colegial",
    description: "Você ainda está na escola, cheio de sonhos e potencial.",
    ability: {
      name: "Sonhos Vivos",
      description:
        "A juventude é tão boa e revigorante, tantos sonhos e potencial para serem destruídos e desperdiçados. Viver essa ilusão é revigorante e motivante. Escolha uma habilidade que possui, o gasto em PE para utilizá-la é diminuído em 1. Este bônus permanece ativo até que falhe em um teste relacionado a esta habilidade. É possível recuperá-lo caso gaste uma ação de interlúdio para mudar a habilidade escolhida, entretanto nunca poderá adicioná-lo novamente a uma habilidade que já perdeu o bônus.",
    },
  },
  {
    id: "cosplayer",
    name: "Cosplayer",
    description: "Você é especialista em criar e usar fantasias elaboradas.",
    ability: {
      name: "Apresentação Estressante",
      description:
        "O peso (tanto literal quanto figurado) de se apresentar com roupas tão bem produzidas é demais para a maioria das pessoas aguentar, mas não para você. Por isso, soma sua Presença ao seu limite de carga e recebe +2 em testes para resistir a calor e Frio Extremo.",
    },
  },
  {
    id: "chefe",
    name: "Chefe",
    description: "Você é um chef talentoso que sabe como preparar refeições eficientes.",
    ability: {
      name: "Cozinha Eficiente",
      description:
        "Caso gaste uma ação de interlúdio, é capaz de criar pratos rápidos e deliciosos para seu grupo. Nesta cena de interlúdio todos podem receber os benefícios da ação alimentar-se sem gastar uma ação de interlúdio para isso.",
    },
  },
  {
    id: "chef-do-outro-lado",
    name: "Chef do Outro Lado",
    description: "Você tem experiência com culinária paranormal.",
    ability: {
      name: "Neutralização Paranormal",
      description:
        "Suas experiências na culinária paranormal lhe permitiram utilizar os ingredientes do outro lado para dizimar os perigos do nosso. Você pode como uma ação de movimento, gastar 1 ingrediente paranormal para remover qualquer doença ou veneno presente no alimento, sendo devorada pelo outro lado.",
    },
  },
  {
    id: "cultista-arrependido",
    name: "Cultista Arrependido",
    description: "Você já fez parte de uma organização paranormal, mas saiu e teve seu conhecimento selado.",
    ability: {
      name: "Conhecimento Selado",
      description:
        "Ao sair da organização paranormal que você fazia parte, seu conhecimento em relação ao outro lado foi selado, lhe deixando apenas com resquícios do poder que um dia já possuiu. Escolha um ritual de 1° círculo, você sabe utilizá-lo e não sofre efeitos do Custo do Paranormal por usá-lo. Alternativamente, pode aprender a utilizar três manifestações primárias à sua escolha",
    },
  },
  {
    id: "cientista-forense",
    name: "Cientista Forense",
    description: "Você é especialista em analisar cenas de crime e reconstruir eventos.",
    ability: {
      name: "Reconstrução de Cena",
      description:
        "Tendo experiência na obtenção de pistas, você é capaz de recriar cenas em sua mente. Caso você esteja em posse de uma pista incompleta (como um papel rasgado), você pode gastar 1 PE para fazer um teste de Investigação (DT 20). Se passar, irá conseguir reconstruir parte da pista, auxiliando em sua investigação. Caso supere a DT em 10, recupera completamente a pista (caso seja possível e faça sentido).",
    },
  },
  {
    id: "criminoso",
    name: "Criminoso",
    description: "Você tem um passado criminoso e mantém contatos no submundo.",
    ability: {
      name: "Contatos no Submundo",
      description:
        "Em seus tempos de crime você adquiriu contatos úteis, sempre tendo um alguém para chamar caso precisasse. Você pode gastar uma ação de Interlúdio para pedir ajuda de um de seus contatos.",
    },
  },
  {
    id: "desgarrado",
    name: "Desgarrado",
    description: "Você aprendeu a se virar sozinho, fora dos padrões da sociedade.",
    ability: {
      name: "Adaptado ao Ambiente",
      description:
        "Você aprendeu a se virar sozinho, estando fora dos padrões da sociedade. Você recebe +2 em testes de perícias nas quais você não é treinado.",
    },
  },
  {
    id: "diplomata",
    name: "Diplomata",
    description: "Você é habilidoso em negociações e faz amigos facilmente.",
    ability: {
      name: "Sangue Bom",
      description:
        "Você faz amigos por todos os lugares onde passa, todos gostam de te ter ao redor. Graças a isso, todos os NPCs tem um nível melhor de atitude para com você. Por fim, ao fazer um teste de Diplomacia para mudar a atitude de um NPC mesmo que falhe por 5, a atitude dele não irá piorar.",
    },
  },
  {
    id: "duble",
    name: "Dublê",
    description: "Você trabalha como dublê e sabe como minimizar danos físicos.",
    ability: {
      name: "Explosões e Quedas",
      description:
        "Acostumado em ter que se machucar no lugar dos atores, você desenvolveu diversas formas de amenizar tais danos. Ao sofrer um dano proveniente de uma arma (exceto armas naturais), explosão ou uma queda, você pode gastar 1 PE para receber 5 + seu Vigor de RD contra ele.",
    },
  },
  {
    id: "engenheiro",
    name: "Engenheiro",
    description: "Você é especialista em projetar e construir itens.",
    ability: {
      name: "Projetos Patenteados",
      description:
        "Você recebe +1d20 em testes para fabricar itens gerais e não sofre penalidade por tentar fabricá-los sem um kit. Caso utilize um kit, recebe +2 em seu teste",
    },
  },
  {
    id: "escritor",
    name: "Escritor",
    description: "Você tem talento para criar histórias memoráveis.",
    ability: {
      name: "Cenas Marcantes",
      description:
        "Por seu domínio na escrita, suas obras grudam nas mentes daqueles que as leem. Fazendo suas frases marcantes mexerem com as pessoas. Sempre que realizar um teste de perícia baseada em Presença que forneça um efeito com duração determinada, esta duração será dobrada (para efeitos que realizam rolagens para determinar rodadas, dobre o número de dados).",
    },
  },
  {
    id: "executivo",
    name: "Executivo",
    description: "Você está acostumado com rotinas cansativas e repetitivas.",
    ability: {
      name: "Rotina Cansativa",
      description:
        "Acostumado a fazer trabalhos extremamente repetitivos, você acabou por se acostumar com uma rotina. A cada vez que é atingido por um efeito, você recebe +1 em seus próximos testes para resistir a ele (cumulativo, mas limitado por seu Vigor). Tais bônus permanecem até o fim da cena ou até falhar duas vezes seguidas contra este efeito.",
    },
  },
  {
    id: "explorador",
    name: "Explorador",
    description: "Você está acostumado a viver em ambientes selvagens.",
    ability: {
      name: "Vivência Selvagem",
      description:
        "Acostumado a viver em ambientes selvagens para realizar suas pesquisas, você aprendeu a se acomodar em qualquer local. Ao descansar, sua recuperação sempre conta como sendo de uma categoria superior.",
    },
  },
  {
    id: "experimento",
    name: "Experimento",
    description: "Você foi submetido a experimentos que lhe deram habilidades especiais.",
    ability: {
      name: "Adaptação Inata",
      description:
        "Seus experimentos lhe forneceram uma capacidade que só deveria ser alcançada após muito treino, ou até mesmo com o paranormal. Escolha um poder geral, você o aprende, desde que cumpra seus pré-requisitos.",
    },
  },
  {
    id: "fanatico-por-criaturas",
    name: "Fanático por Criaturas",
    description: "Você é obcecado por estudar criaturas paranormais.",
    ability: {
      name: "Identificando Padrões",
      description:
        "Após muito estudo das criaturas advindas do outro lado, você se tornou capaz de perceber padrões entre elas. Ao ver uma criatura paranormal pela primeira vez, deve realizar um teste de Investigação (DT 20 +1 para cada 20 de VD que ela possuir). Caso passe, irá receber +1d20 em testes de resistência contra ela.",
    },
  },
  {
    id: "fotografo",
    name: "Fotógrafo",
    description: "Você tem talento para capturar momentos especiais em fotografias.",
    ability: {
      name: "Capturando a Beleza",
      description:
        "Quando usa a ação relaxar, você pode gastar 2 PE para analisar o local em volta, adquirir uma bela passagem e tirar uma foto com seu grupo, capturando a beleza nestes pequenos momentos de calmaria em meio a tensão. Todos que participarem da foto recuperam 1d4 de Sanidade.",
    },
  },
  {
    id: "ginasta",
    name: "Ginasta",
    description: "Você é um acrobata habilidoso e impressionante.",
    ability: {
      name: "Acrobata Impressionante",
      description:
        "Ao se movimentar você pode gastar 1 PE para se deslocar de forma acrobática, tornando sua movimentação menos previsível. Faça um teste de Acrobacia (DT 20), se passar, você receberá +1d20 no próximo teste de Iniciativa, Luta ou Reflexos que realizar nesta rodada. Além disso, pode utilizar a ação Impressionar de Artes com Acrobacia.",
    },
  },
  {
    id: "inventor-paranormal",
    name: "Inventor Paranormal",
    description: "Você cria invenções malucas que nem sempre funcionam como planejado.",
    ability: {
      name: "Gambiarra Inventiva",
      description:
        "Suas invenções malucas nem sempre funcionam como o planejado, por isso, às vezes é necessário fazer pequenas gambiarras. Você pode gastar uma ação de movimento e 2 PE para consertar um item enguiçado ou quebrado até o fim da cena, fazendo uma gambiarra mirabolante.",
    },
  },
  {
    id: "investigador",
    name: "Investigador",
    description: "Você é persistente na busca por pistas e respostas.",
    ability: {
      name: "Detetive Insistente",
      description:
        "Quando falha em um teste de investigação, você recebe 1 PE temporário, lhe motivando a seguir e buscar por mais pistas.",
    },
  },
  {
    id: "jovem-mistico",
    name: "Jovem Místico",
    description: "Você percebe padrões e coincidências significativas em sua vida.",
    ability: {
      name: "Coincidência? Acho Que Não!",
      description:
        "Existem padrões em sua vida que se repetem e eles pareceram sempre significar algo para você. Escolha um símbolo, combinação numérica, ou frase para ser este padrão. Sempre que este padrão aparecer, você irá receber +2 em testes de Iniciativa, Reflexos, Percepção e 1d4 PE temporários.",
    },
  },
  {
    id: "jornalista",
    name: "Jornalista",
    description: "Você já ouviu inúmeras histórias trágicas e desenvolveu resistência mental.",
    ability: {
      name: "Histórias Incontáveis",
      description:
        "Em sua profissão você já escutou milhares de relatos de pessoas em seus piores momentos, sendo capaz de permanecer firme e apático, para poder sempre relatar a história da melhor maneira possível. Isso, acabou por lhe fazer desenvolver uma tolerância enorme ao que ocorre em seu entorno. Você recebe RD 2 a dano mental e soma sua Presença ao seu total de SAN.",
    },
  },
  {
    id: "legista-do-turno-da-noite",
    name: "Legista do Turno da Noite",
    description: "Você já viu centenas de mortes e conhece os pontos fracos do corpo humano.",
    ability: {
      name: "Registro de 1000 Mortes",
      description:
        "Por seu trabalho, você já viu centenas de mortes serem causadas das maneiras mais criativas e cruéis que se possa imaginar. Por mais triste que isso seja, isso lhe forneceu um repertório poderoso para utilizar em combate. Você pode gastar uma ação de movimento e 1 PE para analisar um alvo, tentando decifrar qual dos métodos seria mais efetivo contra ele. Ao fazer isso, o próximo ataque que o acertar, será automaticamente um crítico.",
    },
  },
  {
    id: "lutador",
    name: "Lutador",
    description: "Você é especialista em combate desarmado.",
    ability: {
      name: "Domínio do Octógono",
      description:
        "Você possui um vasto conhecimento no combate de mãos nuas. Uma vez por rodada, quando realiza um ataque desarmado em uma ação de agredir, pode gastar 1 PE para fazer um segundo ataque.",
    },
  },
  {
    id: "magnata",
    name: "Magnata",
    description: "Você tem acesso a recursos financeiros consideráveis.",
    ability: {
      name: "Carteirada",
      description:
        "Uma vez por cena você pode usar o poder econômico seu ou de sua família para dar uma carteirada. Isso lhe fornece +5 em um teste de perícia baseada em Presença (exceto Vontade).",
    },
  },
  {
    id: "mercenario",
    name: "Mercenário",
    description: "Você é um profissional contratado para missões específicas.",
    ability: {
      name: "Alvo Marcado",
      description:
        "No início de uma missão, defina um objeto, organização ou pessoa para ser seu alvo e revele a pessoa que está narrando. Até o fim da missão, você recebe +2 em testes que sejam diretamente relacionados a encontrar, neutralizar ou recuperar o alvo (como testes de ataque, testes para atravessar obstáculos, ou testes para adquirir pistas). Ao encontrar seu alvo, você recebe 1d4 PE.",
    },
  },
  {
    id: "mateiro",
    name: "Mateiro",
    description: "Você conhece bem a selva e sabe como lidar com seus perigos.",
    ability: {
      name: "Ervas Medicinais",
      description:
        "Acostumado com o mato e a selva, você sabe como lidar com seus maiores perigos e já tem bastante experiência com eles. Você recebe +2 em testes de Fortitude contra Doenças e Venenos. Além disso, caso esteja em terreno natural, pode gastar uma ação de interlúdio para recolher ervas e criar o antidoto de uma doença ou veneno à sua escolha. Cada antidoto ocupa 1 de espaço.",
    },
  },
  {
    id: "nerd-entusiasta",
    name: "Nerd Entusiasta",
    description: "Você tem conhecimento aprofundado em áreas específicas.",
    ability: {
      name: "Conhecimento Super Aprofundado",
      description: "Escolha uma perícia baseada em Intelecto que já é treinado, você se torna Veterano nela.",
    },
  },
  {
    id: "operario",
    name: "Operário",
    description: "Seus músculos se desenvolveram para realizar tarefas específicas.",
    ability: {
      name: "Força Direcionada",
      description:
        "Por ter passando tanto tempo realizando movimentos repetitivos, seus músculos se desenvolveram para realizar uma tarefa específica. Você recebe +1d20 Fortitude e pode gastar uma ação de movimento para se posicionar e executar os mesmos movimentos que fazia em seu trabalho, mas desta vez para atacar. Ao fazer isso, você soma o dobro de sua Força ao dano do ataque.",
    },
  },
  {
    id: "personal-trainer",
    name: "Personal Trainer",
    description: "Você sabe como motivar os outros a superarem seus limites.",
    ability: {
      name: "Até a Falha",
      description:
        "O limite de seu potencial está apenas em sua mente. Uma vez por rodada quando um aliado em alcance curto falhar em um teste baseado em atributos físicos, você pode gastar 1 PE para que ele role novamente o teste.",
    },
  },
  {
    id: "policial",
    name: "Policial",
    description: "Você desenvolveu resistência mental e percepção aguçada durante as vigílias noturnas.",
    ability: {
      name: "Vigília Noturna",
      description:
        "As vigias noturnas lhe forneceram uma resiliência mental e uma concentração impecável, além de uma ótima percepção. Você recebe +2 em testes de Vontade e Visão na Penumbra.",
    },
  },
  {
    id: "professor",
    name: "Professor",
    description: "Você sabe como transmitir conhecimento de forma eficiente.",
    ability: {
      name: "Aula de Reforço",
      description:
        "Você é capaz de rapidamente condensar seus aprendizados para que possa auxiliar outros a aprender algo. Ao gastar uma ação de Interlúdio, você pode tornar até 3 personagens treinados em uma perícia na qual seja Veterano. Caso seja Expert nela, pode tornar até 10 personagens treinados.",
    },
  },
  {
    id: "profetizado",
    name: "Profetizado",
    description: "Seu destino está ligado a uma profecia específica.",
    ability: {
      name: "Não Morrerei Aqui",
      description:
        "Caso entre em morrendo por um efeito não relacionado ao que causará sua morte, você pode realizar um teste de Vigor (DT 15) no início de cada um de seus turnos. Se for bem-sucedido, irá desfazer a condição, recobrando a consciência e ficando com 1 PV.",
    },
  },
  {
    id: "psicologo",
    name: "Psicólogo",
    description: "Você sabe como ajudar os outros a lidar com traumas mentais.",
    ability: {
      name: "Sessão de Terapia",
      description:
        "Por toda a sua experiência em lidar com o mental das pessoas, você consegue levar um pouco de sanidade as suas mentes por breves momentos. Ao utilizar o uso de perícia Diplomacia, sua DT sempre será 20, entretanto a cada vez que falhar em tais testes irá sofrer uma penalidade permanente e cumulativa de -1 em Vontade.",
    },
  },
  {
    id: "religioso",
    name: "Religioso",
    description: "Sua fé lhe dá força para enfrentar desafios.",
    ability: {
      name: "Força, Foco e Fé",
      description:
        "Sua fé te guia para sempre avançar. Você pode gastar 2 PE para substituir um teste de resistência por um teste de Religião.",
    },
  },
  {
    id: "reporter-investigativo",
    name: "Repórter Investigativo",
    description: "Você sempre busca ser o primeiro a obter informações.",
    ability: {
      name: "Notícias em Primeira Mão",
      description:
        "Para proliferar em sua área foi necessário buscar formas de sempre ser o primeiro a adquirir informações. Por isso, recebe +5 em Iniciativa e caso seja o primeiro a na Iniciativa em uma cena de investigação, receberá uma ação extra no primeiro turno da cena.",
    },
  },
  {
    id: "revoltado",
    name: "Revoltado",
    description: "Você está insatisfeito com os padrões estabelecidos e busca mudança.",
    ability: {
      name: "Insatisfeito Com os Padrões",
      description:
        "Existe um motivo para você ter se revoltado, algo que você queria que fosse melhor, mas por algum motivo nunca melhorou. A cada vez que você falha em um teste em sequência, você recebe +1 para realizar este teste contra este alvo, ou nesta mesma situação (cumulativamente). Caso passe no teste, ou acumule 5 pontos e falhe, o acúmulo será perdido, retornando a 0. Nesta segunda ocasião, além de perder o acúmulo, você também perde 1d4 PE.",
    },
  },
  {
    id: "servidor-publico",
    name: "Servidor Público",
    description: "Você trabalhou para o governo e conhece seus segredos.",
    ability: {
      name: "Resgate de Benefícios",
      description:
        "Por mais desgastante e estressante que seja trabalhar para o governo, fazer isso traz muitos benefícios e normalmente o conhecimento de segredos sujos. Caso esteja na cidade em que trabalhou para o governo, pode fazer um teste de Diplomacia (DT 25 para pedidos simples, como adquirir um documento. DT 35 para pedidos complexos, como entrar em locais secretos ou importantes para o governo. Ou, DT 45 para pedidos quase impossíveis, como pedir que desvie dinheiro para financiar sua missão) para conseguir o favor de um político ou funcionário importante dentro de sua área.",
    },
  },
  {
    id: "teorico-da-conspiracao",
    name: "Teórico da Conspiração",
    description: "Você cria teorias para explicar fenômenos paranormais.",
    ability: {
      name: "Explicações Infundadas",
      description:
        "Suas teorias regem seu mundo, sendo seu alicerce. Ao se deparar com algo inexplicável, criado pelo paranormal, você pode criar uma teoria tentando explicar tal funcionamento. Apresente sua teoria a narradora, enquanto esta teoria não for refutada, você irá receber +5 em testes de Vontade contra aquele efeito. Quando sua teoria é desbancada, você fica Frustrado até o fim da cena",
    },
  },
  {
    id: "ti",
    name: "T.I.",
    description: "Você é especialista em pesquisas detalhadas e exaustivas.",
    ability: {
      name: "Pesquisa Direcionada",
      description:
        "Acostumado a realizar pesquisas detalhadas e exaustivas, você consegue saber o básico sobre algo com facilidade (caso tenha tempo para se preparar). Ao gastar uma ação de interlúdio, pode até o fim da missão se tornar treinado em uma perícia a sua escolha",
    },
  },
  {
    id: "trabalhador-rural",
    name: "Trabalhador Rural",
    description: "Você possui conhecimentos passados de geração em geração que são essenciais para a sobrevivência.",
    ability: {
      name: "Conhecimento Geracional",
      description:
        "Vivendo longe dos grandes centros, o conhecimento passado de geração em geração se torna um fator essencial para a sobrevivência. Por isso, pode utilizar de tais ensinamentos para desbravar áreas desconhecidas. Você pode realizar testes de perícias somente treinadas mesmo sem ter treinamento com elas.",
    },
  },
  {
    id: "trambiqueiro",
    name: "Trambiqueiro",
    description: "Você sabe como dobrar as regras a seu favor.",
    ability: {
      name: "Jogando Sujo",
      description:
        "Você não chegou onde está seguindo as regras, muito pelo contrário, você dobrou elas ao seu favor. Ao realizar um teste contra um ser, pode gastar 1 PE para fingir que falhou, diminuindo o resultado de seu teste em 10 pontos. Caso o valor original seja realmente menor do que o necessário para passar, nada acontece. Entretanto, caso seja suficiente para passar, o efeito irá ocorrer apenas ao fim desta rodada, impedindo que qualquer habilidade de reação ou de rolar novamente o teste seja utilizada contra ele.",
    },
  },
  {
    id: "universitario",
    name: "Universitário",
    description: "Você aprendeu a se adaptar a uma rotina puxada e a se recuperar rapidamente.",
    ability: {
      name: "Sem Tempo Irmão",
      description:
        "Após ter vivido uma rotina extremamente puxada tendo que estagiar e estudar ao mesmo tempo, enquanto ainda tenta manter uma vida social, se adaptando a ter que se recuperar rapidamente. Em cenas de interlúdio, você pode Relaxar e Descansar ao mesmo tempo gastando apenas uma ação de interlúdio",
    },
  },
  {
    id: "vitima",
    name: "Vítima",
    description: "Você foi afetado pelo paranormal no passado e carrega traumas.",
    ability: {
      name: "Passado Assombrando",
      description:
        "O paranormal afetou sua mente em seu passado, aterrorizando seus sonhos desde então, colhendo seu medo como um fruto nutritivo e delicioso. Escolha uma fonte para ser a origem deste medo, como: Cultistas, Criaturas de Energia, Criaturas de Morte, etc. Quando encontra sua fonte de seu medo, você fica Apavorado (Vontade anula). A DT do teste e os benefícios recebidos por passar nele são definidos pelo quão aterrorizado por tais efeitos você foi ao longo de sua vida. Caso seja um medo simples, algo mais próximo de um desconforto, a DT será 20 e o benefício por passar no teste será +2 em testes de Vontade até o fim da missão. Se for uma fobia, ou um medo difícil de controlar, a DT será 30, e caso passe, receberá +2 em testes e rolagens de dano até o fim da missão. Por fim, caso seja o maior medo que você possui, sendo algo capaz de te, literalmente, matar de susto, a DT será 40 e ao passar você recebe imunidade a efeitos mentais até o fim da missão e +5 em testes de perícia.",
    },
  },
]
