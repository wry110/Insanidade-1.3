import type { CharacterData } from "./types"

/**
 * Versão atual do formato de dados
 * Incrementar sempre que houver mudanças estruturais no CharacterData
 */
export const CURRENT_DATA_VERSION = 3

/**
 * Migra dados de personagens de versões antigas para a versão atual
 */
export function migrateCharacterData(data: any): CharacterData {
  // Se não tiver versão, assume que é versão 1 (original)
  const version = data.version || 1

  // Clone os dados para não modificar o original
  let migratedData = { ...data }

  // Migração da versão 1 para 2
  if (version < 2) {
    console.log("Migrando dados da versão 1 para 2...")

    // Adiciona campos da versão 2
    migratedData = {
      ...migratedData,
      version: 2,
      subclass: migratedData.subclass || "",
      abilities: migratedData.abilities || [],
    }

    // Garantir que todas as habilidades tenham os campos necessários
    if (migratedData.abilities && Array.isArray(migratedData.abilities)) {
      migratedData.abilities = migratedData.abilities.map((ability: any) => ({
        id: ability.id || `legacy-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: ability.name || "Habilidade Desconhecida",
        description: ability.description || "",
        ntpRequired: ability.ntpRequired || 0,
        isActive: ability.isActive || false,
        source: ability.source || "legacy",
      }))
    }
  }

  // Migração da versão 2 para 3
  if (version < 3) {
    console.log("Migrando dados da versão 2 para 3...")

    // Adiciona campos da versão 3
    migratedData = {
      ...migratedData,
      version: 3,
      origin: migratedData.origin || "",
    }
  }

  // Aqui você pode adicionar mais migrações no futuro
  // if (version < 4) { ... }

  // Garantir que todos os campos obrigatórios existam
  return ensureRequiredFields(migratedData)
}

/**
 * Garante que todos os campos obrigatórios existam no objeto
 */
function ensureRequiredFields(data: any): CharacterData {
  // Valores padrão para campos que podem estar faltando
  const defaults: Partial<CharacterData> = {
    name: data.name || "Personagem Migrado",
    class: data.class || "",
    subclass: data.subclass || "",
    origin: data.origin || "",
    race: data.race || "",
    background: data.background || "",
    alignment: data.alignment || "",
    ntp: data.ntp || 5,
    images: data.images || {
      normal: "",
      wounded: "",
      dying: "",
    },
    attributes: data.attributes || {
      forca: 1,
      agilidade: 1,
      intelecto: 1,
      disposicao: 1,
      vigor: 1,
    },
    skills: data.skills || {
      atletismo: { trained: false, bonus: 0 },
      culinaria: { trained: false, bonus: 0 },
      conhecimento: { trained: false, bonus: 0 },
      destreza: { trained: false, bonus: 0 },
      diplomacia: { trained: false, bonus: 0 },
      fortitude: { trained: false, bonus: 0 },
      furtividade: { trained: false, bonus: 0 },
      intimidacao: { trained: false, bonus: 0 },
      intuicao: { trained: false, bonus: 0 },
      investigacao: { trained: false, bonus: 0 },
      labia: { trained: false, bonus: 0 },
      luta: { trained: false, bonus: 0 },
      medicina: { trained: false, bonus: 0 },
      ocultismo: { trained: false, bonus: 0 },
      percepcao: { trained: false, bonus: 0 },
      profissao: { trained: false, bonus: 0, attribute: "intelecto" },
      pontaria: { trained: false, bonus: 0 },
      reflexos: { trained: false, bonus: 0 },
      religiao: { trained: false, bonus: 0 },
      sobrevivencia: { trained: false, bonus: 0 },
      tecnologia: { trained: false, bonus: 0 },
      vontade: { trained: false, bonus: 0 },
    },
    inventory: data.inventory || [],
    rituals: data.rituals || [],
    abilities: data.abilities || [],
    notes: data.notes || "",
    health: data.health || {
      current: 10,
      maximum: 10,
      temporary: 0,
    },
    sanity: data.sanity || {
      current: 12,
      maximum: 12,
    },
    effortPoints: data.effortPoints || {
      current: 2,
      maximum: 2,
    },
    savingThrows: data.savingThrows || {
      forca: false,
      agilidade: false,
      intelecto: false,
      disposicao: false,
      vigor: false,
    },
    armorClass: data.armorClass || 10,
    initiative: data.initiative || 0,
    speed: data.speed || 30,
    weapons: data.weapons || [],
    fearLevel: data.fearLevel || 0,
    traumaLevel: data.traumaLevel || 0,
    version: CURRENT_DATA_VERSION,
  }

  // Mesclar os dados com os valores padrão
  return { ...defaults, ...data, version: CURRENT_DATA_VERSION } as CharacterData
}
