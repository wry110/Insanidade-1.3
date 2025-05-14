export interface CharacterData {
  id?: string
  name: string
  class: "Lutador" | "Prático" | "Ocultista" | "Mundano" | ""
  subclass?: string
  race: string
  background: string
  alignment: string
  ntp: number // Nível de Terror Presenciado (%)
  images: {
    normal: string
    wounded: string
    dying: string
  }
  attributes: {
    forca: number // Força (FOR)
    agilidade: number // Agilidade (AGI)
    intelecto: number // Intelecto (INT)
    disposicao: number // Disposição (DIS)
    vigor: number // VIG)
  }
  skills: {
    atletismo: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // FOR
    culinaria: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // AGI
    conhecimento: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // INT
    destreza: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // AGI
    diplomacia: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // DIS
    fortitude: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // VIG
    furtividade: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // AGI
    intimidacao: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // DIS
    intuicao: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // DIS
    investigacao: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // INT
    labia: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // DIS
    luta: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // FOR
    medicina: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // INT
    ocultismo: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // INT
    percepcao: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // DIS
    profissao: { trained: boolean; bonus: number; attribute: string; level?: "treinado" | "veterano" | "expert" } // VAR
    pontaria: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // AGI
    reflexos: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // AGI
    religiao: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // INT
    sobrevivencia: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // INT
    tecnologia: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // INT
    vontade: { trained: boolean; bonus: number; level?: "treinado" | "veterano" | "expert" } // DIS
  }
  inventory: Array<{
    id: string
    name: string
    quantity: number
    loadPoints: number
    description: string
    category?: string
    defenseBonus?: number // Bônus de defesa para itens de proteção
    // Propriedades para armas
    damage?: string
    damageType?: string
    criticalThreshold?: number
    criticalMultiplier?: number
    range?: string
    properties?: string
  }>
  rituals: Array<{
    id: string
    name: string
    level: number
    type: string
    castingTime: string
    range: string
    components: string
    duration: string
    description: string
    damage?: string
    damageType?: string
  }>
  abilities: Array<{
    id: string
    name: string
    description: string
    ntpRequired: number
    isActive: boolean
    source: string // "subclass", "item", "ritual", etc.
  }>
  notes: string
  health: {
    current: number
    maximum: number
    temporary: number
  }
  sanity: {
    current: number
    maximum: number
    traumas: Array<{
      id: string
      name: string
      description: string
      severity: "leve" | "moderado" | "severo"
      effect: string
      triggered: boolean
    }>
    resistances: Array<string> // Tipos de horror que o personagem é mais resistente
    weaknesses: Array<string> // Tipos de horror que afetam mais o personagem
  }
  effortPoints: {
    current: number
    maximum: number
  }
  savingThrows: {
    forca: boolean
    agilidade: boolean
    intelecto: boolean
    disposicao: boolean
    vigor: boolean
  }
  armorClass: number
  initiative: number
  speed: number
  weapons: Array<{
    id: string
    name: string
    type: string
    damage: string
    damageType: string
    range: string
    properties: string
    ammo?: number
    maxAmmo?: number
    criticalThreshold?: number // Valor a partir do qual ocorre crítico (ex: 17)
    criticalMultiplier?: number // Multiplicador de dano crítico (ex: 4)
  }>
  fearLevel: number // Nível de medo (0-4)
  traumaLevel: number // Nível de trauma (0-3)
  version?: number // Versão do formato de dados
  origin?: string // ID da origem selecionada
}

// Interface simplificada apenas para o gerenciamento de sessão
export interface UserSession {
  user: any | null
  isLoading: boolean
}

export interface SubclassAbility {
  name: string
  description: string
  ntpRequired: number
}

export interface SubclassData {
  id: string
  name: string
  description: string
  parentClass: "Lutador" | "Prático" | "Ocultista" | "Mundano"
  abilities: SubclassAbility[]
}

export interface OriginData {
  id: string
  name: string
  description: string
  ability: {
    name: string
    description: string
  }
}

export interface SanityTrauma {
  id: string
  name: string
  description: string
  severity: "leve" | "moderado" | "severo"
  effect: string
  triggered: boolean
}

export interface SanityTestResult {
  success: boolean
  roll: number
  threshold: number
  traumaGained?: SanityTrauma | null
  sanityLost: number
}

export type HorrorType =
  | "violência"
  | "sobrenatural"
  | "cósmico"
  | "psicológico"
  | "morte"
  | "desconhecido"
  | "paranormal"
  | "corpo"
  | "existencial"
