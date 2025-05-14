import type { SubclassData } from "./types"

export const subclassesData: SubclassData[] = [
  // Lutador - Pugilista
  {
    id: "pugilista",
    name: "Pugilista",
    description:
      "Você resolve tudo na base do SOCO, sem armas de fogo, sem armas corpo-a-corpo, apenas você, seu punho e seu inimigo, sem conversar, apenas socos.",
    parentClass: "Lutador",
    abilities: [
      {
        name: "Porradeiro",
        description:
          'Você recebe a habilidade "Artes Marciais", seu dano corpo a corpo sobe de 1d8 para 3d8 e além disso, você soma sua força no seu ataque. Além disso, soma seu vigor na sua defesa.',
        ntpRequired: 10,
      },
      {
        name: "Punhos Enraivecidos",
        description:
          "Você não consegue parar de dar socos, após acertar um ataque, você pode gastar 2PE para dar um ataque extra. Isso é infinito, porém, a cada ataque, o PE dobra, por exemplo: 2PE, 4PE, 8PE…. O dano é de 2d6 por ataque.",
        ntpRequired: 30,
      },
      {
        name: "Acerto Garantido",
        description:
          "A cada ataque falho, você ganha 1 dado a mais de dano e ataque até acertar o inimigo, podendo juntar até 5 dados de dano e ataque.",
        ntpRequired: 65,
      },
      {
        name: "Rei Do Ringue",
        description:
          "O bônus em defesa que você recebe pelo seu vigor é dobrado. Além disso, quando usa a ação atacar para fazer um ataque desarmado, você pode fazer um ataque extra, indo para um total de 2.",
        ntpRequired: 99,
      },
    ],
  },
  // Lutador - Furioso
  {
    id: "furioso",
    name: "Furioso",
    description:
      "Você se move pelo ódio, você vai fazer o possível para que todos seus inimigos morram da maneira mais dolorosa possível, você pode querer vingança ou apenas nutrir um ódio extremo pelo paranormal, mas uma coisa é certa, piedade é para os fracos, você não é fraco…",
    parentClass: "Lutador",
    abilities: [
      {
        name: "Modo fúria",
        description:
          "Quando receber a condição Machucado você entra no Modo Fúria, recebendo 1 de FOR temporária, você também pode gastar 2PE para receber um dos seguintes efeitos:\n\n•Ódio perceptível: você marca um alvo para dar um ataque bônus utilizando sua ação de movimento, após esse ataque você no final da cena ganha a condição Exausto (caso tenha 5 ou mais de FOR, essa condição é anulada)\n\n•Ataque calculado: você soma sua FOR nas rolagens de ataque.\n\n•Movido pela raiva: agora você recebe RD mental com base na sua FOR",
        ntpRequired: 10,
      },
      {
        name: "Ódio Interno",
        description:
          "Você agora recebe +2 de FOR temporária quando entrar no Modo Fúria, agora caso um aliado morra, você entra no Modo Fúria. Você pode gastar +2PE para pegar 2 efeitos do Modo Fúria. O Modo Fúria recebe 2 novas opções de efeitos:\n\n•Fúria mundana: agora o dano da sua FOR é dobrado para ataques corpo a corpo.\n\n•Força vital: você recebe cura acelerada como ½ da sua FOR. Essa cura não pode te tirar da condição Machucado",
        ntpRequired: 30,
      },
      {
        name: "MORRE LOGO!",
        description:
          "Você recebe +3 de FOR temporariamente quando entrar no Modo Fúria. Você agora pode gastar +2PE para receber um efeito do Modo Fúria. O Modo Fúria agora recebe 3 novas opções de efeitos:\n\n•Carapaça dura: você soma sua FOR na sua defesa, também recebendo RD de dano físico no mesmo valor. (Não dá RD mental)\n\n•Ataque é a melhor defesa: você pode gastar sua Reação defensiva para fazer um ataque adicional.\n\n•Ataque giratório: você pode utilizar sua ação Agredir para dar um ataque em uma área circular, esse ataque terá uma penalidade de -1D.",
        ntpRequired: 65,
      },
      {
        name: "Fúria",
        description:
          "Você pode gastar 2PE para ativar o Modo Fúria, você também recebe +4 de FOR adicional nesse modo. Você pode gastar +2PE para receber um efeito adicional no Modo Fúria:\n\n•O Humano mais forte: você ganha +1 ação completa até o final da cena.\n\n•BERSERK: você pode utilizar sua ação Agredir para utilizar o ataque BERSERK, esse ataque é equivalente a 10 ataques corpo a corpo com sua arma, depois de realizar esse golpe, você fica Inconsciente.\n\n•Apenas Ódio: você esvazia sua mente, perceptível em você a apenas ódio, você recebe RD Mental igual sua FOR + 5",
        ntpRequired: 99,
      },
    ],
  },
  // Lutador - Militar
  {
    id: "militar",
    name: "Militar",
    description: "Você tem treinamento militar e é especialista em armas de fogo e táticas de combate.",
    parentClass: "Lutador",
    abilities: [
      {
        name: "Mira de Elite",
        description:
          'Escolha uma arma sua para ganhar o benefício "modificado". Essa arma ganhará -2 em sua margem de crítico e +3 em testes de ataque com essa arma(a cada 20% de NTP, você pode escolher mais uma arma para transformar em "modificada").',
        ntpRequired: 10,
      },
      {
        name: "Combater Com Duas Armas",
        description:
          "Você agora é tipo o rambo, consegue usar 2 armas pesadas sem precisar de teste de força ou coordenação. E para atacar com as duas armas, você utiliza uma ação padrão.",
        ntpRequired: 30,
      },
      {
        name: "Piromaníaco",
        description:
          "Você agora tem a habilidade de conseguir manusear DUAS armas com balas especiais de escolha do mestre, ao rodar um d20 Você tem chances de soltar uma munição especial bônus, porém, em pelo menos em um de seus tiros, uma munição especial aleatória garantida.",
        ntpRequired: 65,
      },
      {
        name: "Headshot",
        description:
          "A partir de agora, toda vez que acertar um crítico, sua arma dará o maior dano possível, por exemplo, caso o dano da arma seja de 7d12, o dano será de 84 e além disso, o acerto é completamente garantido.",
        ntpRequired: 99,
      },
    ],
  },
  // Lutador - Gladiador
  {
    id: "gladiador",
    name: "Gladiador",
    description: "Você é um especialista em combate com armas corpo a corpo e proteções pesadas.",
    parentClass: "Lutador",
    abilities: [
      {
        name: "Arma Favorita",
        description:
          "Você tem algum tipo de maça, espada, machado que você gosta bastante, essa arma tem +1 dado de dano.",
        ntpRequired: 10,
      },
      {
        name: "Proteção Natural",
        description:
          "Você é um gladiador, já está acostumado a sofrer danos e golpes poderosos, por isso, você ganha +3 de defesa base a cada 30% de nex que evoluir, e você recebe proficiências com proteções pesadas, além de ganhar +12 com elas.",
        ntpRequired: 30,
      },
      {
        name: "Cura Natural",
        description:
          "Depois de uma batalha, o Gladiador recupera uma quantidade pequena de Pontos de Vida(1d10). Além disso, caso ele não seja curado em batalha, o valor dos dados aumenta PERMANENTEMENTE(limite de 5d10).",
        ntpRequired: 65,
      },
      {
        name: "Duelo",
        description:
          "Qualquer monstro que você lutar contra perde 3 dados em qualquer teste. Esses 3 dados perdidos vão pra você!!! você ganha 3 dados em tudo que for fazer, além disso, pode pegar parte do treino do monstro para si, se deixando cada vez mais forte.",
        ntpRequired: 99,
      },
    ],
  },
  // Lutador - Monstruoso (NOVA SUBCLASSE)
  {
    id: "monstruoso",
    name: "Monstruoso",
    description:
      "Você estudou um pouco de ocultismo, por isso, sabe usar alguns rituais meio fracos, mas que podem te ajudar ao longo do tempo.",
    parentClass: "Lutador",
    abilities: [
      {
        name: "Sabedoria Paranormal",
        description:
          'Você pode aprender uma maldição de primeiro círculo qualquer, dependendo do ritual, você pode colocá-lo na sua arma, como por exemplo "Decadência", quando bater em um inimigo, o ritual será automaticamente conjurado.',
        ntpRequired: 10,
      },
      {
        name: "Conjuração Marcial",
        description:
          "Após fazer um ataque, pode conjurar um ritual como ação livre, porém, o ritual gasta o DOBRO de PE, e, caso falhe ao conjurar o ritual, não conjura, nem perde sanidade, apenas perde PE.",
        ntpRequired: 30,
      },
      {
        name: "Forma Do Outro Lado",
        description:
          'Agora, além de aprender 1 ritual de primeiro e segundo círculo, pode gastar 4 de PE para se transformar em "monstruoso", dependendo do seu elemento, você pode se transformar em algo diferente, ganhando assim, +3d6 de dano do seu elemento e 10RD à danos desse elemento e 5RD de balístico e Impacto.',
        ntpRequired: 65,
      },
      {
        name: "Formação Completa",
        description:
          "Agora, a sua forma monstruosa é permanente e mais forte. A RD de elementos sobe para 30 e as resistências de balístico e impacto sobem para 20. Além disso, a resistência mental do seu personagem diminui a 0, tornando-o mais propício à enlouquecer.",
        ntpRequired: 99,
      },
    ],
  },
  // Prático - Técnico
  {
    id: "tecnico",
    name: "Técnico",
    description:
      "Você tem um grande conhecimento sobre tecnologias, armas e jogos. Você costuma ser o que mais tenta achar um computador com informações do grupo.",
    parentClass: "Prático",
    abilities: [
      {
        name: "Conhecimento Aplicado",
        description:
          'Você finalmente vai usar o que aprendeu para ajudar seu grupo. Você pode gastar 2PE para trocar o atributo de qualquer perícia para "INT".',
        ntpRequired: 10,
      },
      {
        name: "Dispositivo De Distração",
        description:
          "O Técnico é especializado em criar dispositivos que geram distrações ou confundem os inimigos, criando oportunidades para um ataque surpresa. Gastando 3PE, O Técnico pode lançar um dispositivo de distração (como uma bomba de fumaça, um holograma ou um ruído alto) em um ponto de até 18 metros de distância. Esse dispositivo cria uma área de dificuldade de visão ou confusão em um raio de 6 metros ao redor do ponto de impacto, proporcionando -1d20 em todos os testes, e -10 de esquiva por uma rodada.",
        ntpRequired: 30,
      },
      {
        name: "Torretas",
        description:
          'Agora, você pode usar recursos limitados para criar "aliados robóticos" como, uma torreta improvisada, você gasta uma ação padrão e 4 de PE para criar um tipo de torreta. temos 3 torretas por enquanto. A torreta explosiva, a de energia e a de tiros, cada uma dando seu próprio dano e tiros.\n\n- Torreta explosiva: 8d6 num raio de 3x3M²\n- Torreta De Energia: 5d6 de Dano De Energia(Alvo único)\n- Torreta Balistica: 4d6 de Dano Balístico(Alvo único)',
        ntpRequired: 65,
      },
      {
        name: "Técnico De Contenção",
        description:
          "Você se torna mestre em construção e tecnologia. Ninguém é tão bom quanto você. Por isso, você pode construir até 5 torretas como ação livre. Além disso, você pode construir novas torretas.\n\n- Torretas De Fogo\n- Torretas de Lodo",
        ntpRequired: 99,
      },
    ],
  },
  // Prático - Inventor
  {
    id: "inventor",
    name: "Inventor",
    description:
      "Você é algum cientista, alquimista, ou apenas cria coisas que vem na mente, você tem conhecimento sobre misturas científicas, você usa disso para lutar contra o paranormal.",
    parentClass: "Prático",
    abilities: [
      {
        name: "Misturas Explosivas",
        description:
          'Dando um teste de "Profissão(INT)" e com alguns recursos próximos você consegue fazer com que componentes dilatem entre si, causando grandes explosões. Causando 2d8 de dano.',
        ntpRequired: 10,
      },
      {
        name: "Remédios",
        description:
          'Dando um teste de "Conhecimento (INT)", você pode usar alguns recursos da sua bolsa ou próximos, para criar componentes que restauram a vida do alvo, você cura 2d8 de vida de um aliado utilizando seus "remédios".',
        ntpRequired: 30,
      },
      {
        name: "Equipamentos Alucinógenos",
        description:
          'Com mais um teste de "Conhecimento(INT)", você usa suas últimas misturas, criando um líquido que, quando ingerido, o alvo fica com uma percepção fora do comum, o alvo ganha mais uma ação padrão no turno e +5 em percepção.',
        ntpRequired: 65,
      },
      {
        name: "Invenções Ilimitadas",
        description:
          "Você se torna o mestre quando o assunto é invenções. Suas misturas tem o DOBRO do efeito, e você pode fazê-las com qualquer coisa que achar, QUALQUER COISA… Sim, você é capaz de fazer suas misturas com tudo que achar pela frente: Lama, galho de árvore, fogo etc…",
        ntpRequired: 99,
      },
    ],
  },
  // Prático - Mochileiro
  {
    id: "mochileiro",
    name: "Mochileiro",
    description:
      "Mesmo sendo magrinho, tu anda com uma mochila ENORME cheia de coisas úteis. A sua maior arma, é a sorte, até porque, você nem se lembra direito o que tem na sua mochila.",
    parentClass: "Prático",
    abilities: [
      {
        name: "Inventário Otimizado",
        description:
          "Você tem um corpo diferente, parece que carrega as coisas com o cérebro, seu inventário é completamente diferente. Você, ao invés de ganhar +5 de espaço por FOR, você soma esse número a seu INT, ou seja 3 INT + 1 FOR = 5x4 = 20.",
        ntpRequired: 10,
      },
      {
        name: "Bolsinho Da Sorte",
        description:
          "Você tem uma parte da sua bolsa onde guarda várias coisinhas diversas, com um teste de Investigação(INT) e o critério do mestre, você pode puxar um item aleatório, seja ele um talismã da sorte, ou simplesmente um chiclete mascado na sua bolsa, lembrando, que esse item tem que ter alguma utilidade mínima na cena.",
        ntpRequired: 30,
      },
      {
        name: "Equipamento Sob Medida",
        description:
          "O Mochileiro carrega um arsenal de ferramentas, peças e objetos únicos que foram ajustados para atender a qualquer situação. Sua criatividade e preparo tornam-no capaz de improvisar soluções que surpreendem aliados e confundem os inimigos. O Mochileiro pode gastar 3-5 pontos de esforço para usar ou criar um equipamento personalizado.",
        ntpRequired: 65,
      },
      {
        name: "Equipamento Completo",
        description:
          "Você tem absolutamente tudo que precisa na sua bolsa, desde um selador de demônios geral, ou um rifle de precisão, ou até mesmo um item amaldiçoado! Agora, você tem absolutamente tudo de necessário para você e seus aliados, gastando 10 PE e um teste de investigação(caso esteja em combate, uma ação completa).",
        ntpRequired: 99,
      },
    ],
  },
  // Prático - Detetive
  {
    id: "detetive",
    name: "Detetive",
    description: "Você sempre usou a sua curiosidade para aperfeiçoar sua busca por pistas e soluções de desafios.",
    parentClass: "Prático",
    abilities: [
      {
        name: "Descobertas",
        description: "Sempre que encontrar uma pista durante uma cena de investigação, você recebe 1PE.",
        ntpRequired: 10,
      },
      {
        name: "Ponto Fraco",
        description:
          "Você pode, com uma ação padrão, gastar 3PE, para analisar o inimigo e identificar falhas na defesa do alvo. Todos os ataques causados no alvo até sua próxima rodada somam o seu intelecto no acerto e no Dano.",
        ntpRequired: 35,
      },
      {
        name: "Investigador Tático",
        description:
          "Você pode gastar 3PE para substituir testes de Intuição, Sobrevivência, Lábia e Destreza por um teste de investigação.",
        ntpRequired: 65,
      },
      {
        name: "Mestre Detetive",
        description:
          "Sempre que fizer um teste de Investigação ou Percepção, qualquer resultado menor que 10 no dado é sempre considerado 10. Adicionalmente, sempre que usar a habilidade ponto fraco, invés de somar apenas seu intelecto, soma sua Investigação no dano, mas só uma vez na rodada por pessoa.",
        ntpRequired: 99,
      },
    ],
  },
  // Prático - Estudioso
  {
    id: "estudioso",
    name: "Estudioso",
    description:
      "Você passou horas se aprofundando em seus conhecimentos, tentando entender os mistérios do mundo, o desconhecido ou até mesmo, a própria realidade, você foi escolhido para lutar com o paranormal pelo seu amplo conhecimento e fonte de informação.",
    parentClass: "Prático",
    abilities: [
      {
        name: "Campo de Estudo",
        description:
          "Quando você faz um teste usando a perícia de seu Campo de estudo para ajudar seus aliados, você pode gastar 2PE, e o aliado recebendo ajuda recebe +1D em testes de perícia até o fim da cena.",
        ntpRequired: 10,
      },
      {
        name: "Estudos Gerais",
        description:
          "Sempre que ajudar com a perícia de seu Campo de Estudo, você pode gastar 2 PE, e o aliado recebendo ajuda recebe +4 em testes desta perícia até o fim da cena.",
        ntpRequired: 35,
      },
      {
        name: "Aprenda Com Seus Erros",
        description:
          "Sempre que falhar em um teste de perícia, você recebe um bônus cumulativo de +1 em seu próximo teste de perícia, este bônus cumulativo só se esgota quando você for bem sucedido em um teste usando essa perícia.",
        ntpRequired: 65,
      },
      {
        name: "Enciclopédia Humana",
        description:
          "Todo início de cena, você pode, como uma reação, gastar 4PE para receber +3D em testes de perícia até o fim da cena. Adicionalmente, pode escolher uma perícia adicional para colocar em veterano(até o fim da cena).",
        ntpRequired: 99,
      },
    ],
  },
  // Ocultista - Demonologista
  {
    id: "demonologista",
    name: "Demonologista",
    description: "Especialistas em invocar e controlar demônios, usando a força dessas entidades para ganhar poder.",
    parentClass: "Ocultista",
    abilities: [
      {
        name: "Favorzinho",
        description:
          'Você pode gastar 2 PE e uma ação padrão para contatar um demônio e pedir um "favorzinho", algo como uma arma simples ou uma substância estimulante.',
        ntpRequired: 10,
      },
      {
        name: "Invocação Aliada",
        description:
          "Você pode invocar um monstro para lhe ajudar em alguma coisa, por exemplo, você pode invocar um monstro numa cena de investigação para fazer uma ação adicional; Ou em batalha, usando-o para atacar. Custo: 3PE, um monstro por vez.",
        ntpRequired: 35,
      },
      {
        name: "Imbuir Ritual(Monstros)",
        description:
          "Agora, você pode invocar até 3 monstros por vez. Além disso, você pode imbuir um ritual em um monstro e decidir quando esse ritual será ativado, por exemplo, vou usar o ritual Decadência nos monstros, esse ritual será ativado quando os monstros atacarem. Além do custo dos 3 monstros(9PE), temos o custo de ritual, que será explicado mais à frente.",
        ntpRequired: 65,
      },
      {
        name: "Mestre Dos Monstros",
        description:
          'Você pode invocar até 10 monstros, e o custo de PE deles foi reduzido à um, você pode invocar (quase) qualquer monstro do seu desejo, porém, você pode invocar apenas monstros irracionais, selvagens. Agora, você tem seu próprio "exército" pessoal.',
        ntpRequired: 99,
      },
    ],
  },
  // Ocultista - Amaldiçoado
  {
    id: "amaldicoado",
    name: "Amaldiçoado",
    description:
      "Você mexe principalmente com maldições, sempre as usando para benefício seu, ou de algum companheiro.",
    parentClass: "Ocultista",
    abilities: [
      {
        name: "Ritual Inconsequente",
        description:
          "Você pode escolher um ritual de classe I para retirar seu preço, podendo usá-la livremente, sem nenhum custo.",
        ntpRequired: 10,
      },
      {
        name: "Livro de Maldições",
        description:
          "Você pode invocar um livro de maldições. Gastando 1 ação completa para conjurá-lo, você pode ganhar Número de Maldições + INT. O limite de Grau de maldição é 1 à menos do seu.",
        ntpRequired: 35,
      },
      {
        name: "Maldição Avançado",
        description:
          "A cada preço de maldição que você pagar, você ganhará um buff aleátorio, entre eles: Dano: você ganha 1 dado de dano +5, Defesa: você ganha 1d20 de defesa.",
        ntpRequired: 65,
      },
      {
        name: "Maldição Graduada",
        description:
          "Você se torna o rei das maldições. Tem acesso a todos os níveis de maldição, e a cada 3 cenas pode escolher uma maldição para aprender permanentemente.",
        ntpRequired: 99,
      },
    ],
  },
  // Ocultista - Conduíte
  {
    id: "conduite",
    name: "Conduíte",
    description:
      "Você conduz sua energia para seus companheiros, seu trabalho é disponibilizar maldições ou Pontos de Esforço.",
    parentClass: "Ocultista",
    abilities: [
      {
        name: "Condução",
        description:
          'Você conduz energia amaldiçoada para seus amigos. Usando a ação "Conduzir" você gasta uma ação padrão para conduzir Pontos de esforço para seus aliados. o limite é o número de PE.',
        ntpRequired: 10,
      },
      {
        name: "Maldição Compartilhada",
        description:
          'Usando uma maldição usando a ação "Conduzir", agora, você consegue conduzir um ritual ao seu amigo(1 Vez por cena), ele pagará o preço da maldição  você consegue conduzir um ritual ao seu amigo(1 Vez por cena), ele pagará o preço da maldição, porém, ele ganhará os benefícios também.',
        ntpRequired: 30,
      },
      {
        name: "Condução Heróica",
        description:
          'Agora, você pode usar maldições dos seus amigos. Fazendo uma ação completa, você pode utilizar a ação "Compartilhar Maldição", assim, você pagará o preço da maldição, porém, seu amigo receberá ela, e ganhará alguns buffs escolhidos pelo conduíte, sendo eles: +1 Dado De Dano, +5 Defesa, 1d8 Esquiva. Lembrando, eles duram 1 cena apenas.',
        ntpRequired: 65,
      },
      {
        name: "Condução Imparável",
        description:
          "Bem, a partir daqui você pode conduzir todo tipo de ritual para seus aliados, pagando metade do preço, e dando mais buffs para seus amigos, sendo eles: +2 Dados De Dano, +2d8 De Esquiva, +5 Defesa.",
        ntpRequired: 99,
      },
    ],
  },
  // Ocultista - Exorcista
  {
    id: "exorcista",
    name: "Exorcista",
    description:
      "Você usa coisas do paranormal para acabar… com o paranormal! Bem, você usa armas(tanto corpo-a-corpo, ou armas de fogo mesmo), e usa seus rituais para potencializar e exorcizar esses monstros.",
    parentClass: "Ocultista",
    abilities: [
      {
        name: "Exorcizar",
        description:
          'Você ganha a ação "Exorcizar", essa ação pode ser usada para finalizar um inimigo, gastando 2PE, você pode usar a ação "Exorcizar". Fazendo isso, você recupera +1d6 de sanidade.',
        ntpRequired: 10,
      },
      {
        name: "Água Benta",
        description:
          "Você ganha um frasco de água benta, que se jogado em algum monstro ou inimigo, cria uma poça de água, que se alguém ficar preso lá, causa 3d8 de dano por rodada, além disso, se alguém pisar sofre 1d8 de dano.",
        ntpRequired: 35,
      },
      {
        name: "Bloquear Paranormal",
        description:
          "1 Vez por sessão, você pode ANULAR completamente a perda de sanidade de seu grupo, gastando 4PE, você pode fazer com que seu grupo não tome aquele dano de sanidade.",
        ntpRequired: 65,
      },
      {
        name: "Exorcismo Completo",
        description:
          "Caso gaste 8PE e toque em uma criatura, ela deve fazer um teste de vontade contra seu ocultismo, caso ela passe, tomara 10d12 de dano, caso falhe, um círculo brilhante com vários símbolos aparece abaixo dela, dentro dele, saem correntes douradas que prendem e puxam a criatura para baixo, apagando-a completamente da existência.",
        ntpRequired: 99,
      },
    ],
  },
  // Ocultista - Fantasmagórico
  {
    id: "fantasmagorico",
    name: "Fantasmagórico",
    description:
      "Você aprendeu a controlar uma forte identidade do outro lado, Ela não parece gostar de ser controlada por você, mas como a mente de vocês é uma só, ela vai ter que lutar para sobreviver.",
    parentClass: "Ocultista",
    abilities: [
      {
        name: "Invocar Espírito",
        description:
          'Você pode gastar uma ação padrão e 2PE para "Invocar Espírito". Seu espírito tem uma ficha própria que será criada por você e pelo mestre. Além disso você deve escolher o tipo de seu espírito, sendo eles:\n\n♦ Espírito De Luta: Ele tem um ataque mais alto, mas defesa baixa.\n\n♦ Espírito De Defesa: Ele tem uma defesa mais alta. Porém, um ataque menor\n\n♦ Espírito Ágil: Ele tem uma velocidade mais alta, mas um ataque mais baixo.',
        ntpRequired: 10,
      },
      {
        name: "Espírito Paranormal",
        description:
          "O espírito ganha mais dano, ataque e ganham a capacidade de usar rituais também, mas, apenas de grau l, por enquanto.",
        ntpRequired: 35,
      },
      {
        name: "Espírito Indomável",
        description:
          "Além dos buffs convencionais(dano, defesa, pontos de atributo etc..). Ele ganha uma habilidade especial, dependendo da escolha do tipo de seu espírito.",
        ntpRequired: 65,
      },
      {
        name: "Espírito Duplicado",
        description:
          "Agora, você pode ter os 3 espíritos de uma vez, em seus níveis máximos, assim, tendo as 3 fichas e podendo atacar com os 3 de uma vez. E podendo usar um ritual em cada um.",
        ntpRequired: 99,
      },
    ],
  },
]
