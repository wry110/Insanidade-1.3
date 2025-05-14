// Lista de traumas psicológicos possíveis
import type { SanityTrauma, HorrorType } from "./types"

export const TRAUMA_TYPES: SanityTrauma[] = [
  {
    id: "paranoia",
    name: "Paranoia",
    description: "Você sente que está sendo observado ou perseguido constantemente.",
    severity: "leve",
    effect: "Desvantagem em testes de Percepção quando sozinho.",
    triggered: false,
  },
  {
    id: "pesadelos",
    name: "Pesadelos Recorrentes",
    description: "Sonhos vívidos e perturbadores que impedem um descanso adequado.",
    severity: "leve",
    effect: "Recupera apenas metade dos pontos de esforço ao descansar.",
    triggered: false,
  },
  {
    id: "fobia-escuro",
    name: "Fobia: Escuridão",
    description: "Medo intenso e irracional da escuridão.",
    severity: "moderado",
    effect: "Desvantagem em todos os testes quando em ambientes escuros.",
    triggered: false,
  },
  {
    id: "flashbacks",
    name: "Flashbacks Traumáticos",
    description: "Revive momentos traumáticos quando exposto a gatilhos específicos.",
    severity: "moderado",
    effect: "Teste de Vontade CD 15 quando exposto a situações similares ao trauma ou fica paralisado por 1 rodada.",
    triggered: false,
  },
  {
    id: "alucinacoes",
    name: "Alucinações",
    description: "Vê ou ouve coisas que não estão realmente lá.",
    severity: "severo",
    effect: "Teste de Sanidade CD 15 em situações de estresse ou age com base na alucinação.",
    triggered: false,
  },
  {
    id: "dissociacao",
    name: "Dissociação",
    description: "Sensação de desconexão da realidade ou do próprio corpo.",
    severity: "severo",
    effect: "Em situações de estresse, teste de Vontade CD 15 ou perde uma ação enquanto se reconecta com a realidade.",
    triggered: false,
  },
  {
    id: "mania-perseguicao",
    name: "Mania de Perseguição",
    description: "Obsessão com a ideia de que entidades malignas estão perseguindo você.",
    severity: "moderado",
    effect: "Deve gastar 1 ponto de esforço para se concentrar em tarefas que não envolvam vigilância.",
    triggered: false,
  },
  {
    id: "fobia-sangue",
    name: "Fobia: Sangue",
    description: "Medo intenso e irracional de sangue.",
    severity: "moderado",
    effect: "Teste de Vontade CD 15 quando vê grandes quantidades de sangue ou fica nauseado (-2 em todos os testes).",
    triggered: false,
  },
  {
    id: "desconfianca",
    name: "Desconfiança Patológica",
    description: "Incapacidade de confiar em qualquer pessoa, mesmo aliados próximos.",
    severity: "leve",
    effect: "Não pode receber benefícios de ações de ajuda de outros personagens.",
    triggered: false,
  },
  {
    id: "compulsao-rituais",
    name: "Compulsão: Rituais de Proteção",
    description: "Necessidade de realizar rituais específicos para se sentir seguro.",
    severity: "leve",
    effect: "Deve gastar 10 minutos realizando rituais após cada descanso ou sofre -1 em todos os testes.",
    triggered: false,
  },
  {
    id: "fobia-multidoes",
    name: "Fobia: Multidões",
    description: "Medo intenso e irracional de multidões ou espaços lotados.",
    severity: "moderado",
    effect: "Desvantagem em todos os testes sociais quando em locais com muitas pessoas.",
    triggered: false,
  },
  {
    id: "insonia",
    name: "Insônia Crônica",
    description: "Dificuldade extrema para dormir devido a ansiedade e medo.",
    severity: "moderado",
    effect: "Precisa de 10 horas para obter os benefícios de um descanso completo.",
    triggered: false,
  },
  {
    id: "surto-violento",
    name: "Surtos Violentos",
    description: "Episódios de violência descontrolada quando sob estresse extremo.",
    severity: "severo",
    effect: "Teste de Vontade CD 18 quando reduzido a menos de 25% dos PV ou ataca o alvo mais próximo.",
    triggered: false,
  },
  {
    id: "catatonia",
    name: "Catatonia",
    description: "Episódios onde o corpo congela completamente, incapaz de se mover ou falar.",
    severity: "severo",
    effect: "Teste de Vontade CD 18 quando testemunha horror extremo ou fica incapacitado por 1d4 rodadas.",
    triggered: false,
  },
  {
    id: "negacao",
    name: "Negação da Realidade",
    description: "Recusa-se a acreditar em eventos sobrenaturais, mesmo quando testemunhados.",
    severity: "leve",
    effect: "Desvantagem em testes de Ocultismo e Religião relacionados a eventos sobrenaturais.",
    triggered: false,
  },
]

// Tipos de horror e seus impactos na sanidade
export const HORROR_TYPES: Record<
  HorrorType,
  {
    name: string
    description: string
    baseSanityLoss: number
  }
> = {
  violência: {
    name: "Horror de Violência",
    description: "Atos de violência extrema, tortura ou brutalidade",
    baseSanityLoss: 1,
  },
  sobrenatural: {
    name: "Horror Sobrenatural",
    description: "Manifestações de entidades ou fenômenos sobrenaturais",
    baseSanityLoss: 2,
  },
  cósmico: {
    name: "Horror Cósmico",
    description: "Revelações sobre a insignificância humana ou entidades além da compreensão",
    baseSanityLoss: 3,
  },
  psicológico: {
    name: "Horror Psicológico",
    description: "Manipulação mental, perda de controle ou realidade distorcida",
    baseSanityLoss: 2,
  },
  morte: {
    name: "Horror da Morte",
    description: "Confronto com a mortalidade, cadáveres ou não-mortos",
    baseSanityLoss: 1,
  },
  desconhecido: {
    name: "Horror do Desconhecido",
    description: "Enfrentar o completamente desconhecido ou incompreensível",
    baseSanityLoss: 2,
  },
  paranormal: {
    name: "Horror Paranormal",
    description: "Fantasmas, possessões e fenômenos inexplicáveis",
    baseSanityLoss: 2,
  },
  corpo: {
    name: "Horror Corporal",
    description: "Mutações, transformações corporais e violações da integridade física",
    baseSanityLoss: 2,
  },
  existencial: {
    name: "Horror Existencial",
    description: "Questionamentos sobre a natureza da realidade e propósito da existência",
    baseSanityLoss: 3,
  },
}

// Funções auxiliares para o sistema de sanidade
export function getRandomTrauma(severity?: "leve" | "moderado" | "severo"): SanityTrauma {
  let eligibleTraumas = TRAUMA_TYPES

  if (severity) {
    eligibleTraumas = TRAUMA_TYPES.filter((trauma) => trauma.severity === severity)
  }

  const randomIndex = Math.floor(Math.random() * eligibleTraumas.length)
  return { ...eligibleTraumas[randomIndex], id: `${eligibleTraumas[randomIndex].id}-${Date.now()}`, triggered: false }
}

export function getSeverityByRoll(roll: number): "leve" | "moderado" | "severo" {
  if (roll <= 5) return "leve"
  if (roll <= 15) return "moderado"
  return "severo"
}

export function getSanityLossBySeverity(severity: "leve" | "moderado" | "severo"): number {
  switch (severity) {
    case "leve":
      return 1
    case "moderado":
      return 2
    case "severo":
      return 4
    default:
      return 1
  }
}
