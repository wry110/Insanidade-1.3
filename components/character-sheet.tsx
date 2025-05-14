"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CharacterInfo from "./character-info"
import AttributesSection from "./attributes-section"
import SkillsSection from "./skills-section"
import InventorySection from "./inventory-section"
import RitualsSection from "./rituals-section"
import NotesSection from "./notes-section"
import WeaponsSection from "./weapons-section"
import StatsBar from "./stats-bar"
import DiceRoller from "./dice-roller"
import CharacterImage from "./character-image"
import FearTraumaSection from "./fear-trauma-section"
import AbilitiesSection from "./abilities-section"
import PredefinedWeapons from "./predefined-weapons"
import type { CharacterData } from "@/lib/types"
import { subclassesData } from "@/lib/subclasses-data"
import { Button } from "@/components/ui/button"
import { Swords, Shield, Zap, Footprints } from "lucide-react"
import { useState } from "react"

interface CharacterSheetProps {
  character: CharacterData
  setCharacter: (character: CharacterData) => void
}

export default function CharacterSheet({ character, setCharacter }: CharacterSheetProps) {
  const [attackResult, setAttackResult] = useState<{
    weaponName: string
    attackRoll: number
    attackRawRoll: number
    damageRoll: number
    damageRawRoll: number
    isCritical: boolean
    criticalMultiplier: number
  } | null>(null)

  // Inicializar o novo sistema de sanidade se necessário
  useEffect(() => {
    if (!character.sanity.traumas) {
      setCharacter({
        ...character,
        sanity: {
          ...character.sanity,
          traumas: [],
          resistances: [],
          weaknesses: [],
        },
      })
    }
  }, [character, setCharacter])

  useEffect(() => {
    if (!character.class) return

    const { vigor, disposicao, forca } = character.attributes
    const ntpMultiplier = Math.floor(character.ntp / 5)

    let maxHealth = 0
    let maxSanity = 0
    let maxEffort = 0

    switch (character.class) {
      case "Mundano":
        maxHealth = 10 + vigor
        maxSanity = 10 + disposicao
        maxEffort = 1 + disposicao
        break
      case "Lutador":
        maxHealth = 20 + vigor + ntpMultiplier * (4 + vigor)
        maxSanity = 40 + disposicao
        maxEffort = 2 + disposicao + ntpMultiplier * (2 + disposicao)
        break
      case "Prático":
        maxHealth = 16 + vigor + ntpMultiplier * (3 + vigor)
        maxSanity = 50 + disposicao
        maxEffort = 3 + disposicao + ntpMultiplier * (3 + disposicao)
        break
      case "Ocultista":
        maxHealth = 12 + vigor + ntpMultiplier * (2 + vigor)
        maxSanity = 60 + disposicao
        maxEffort = 4 + disposicao + ntpMultiplier * (4 + disposicao)
        break
    }

    // Calcular defesa base (10 + força)
    const baseArmorClass = 10 + forca

    // Calcular bônus total de proteções
    const protectionBonus = character.inventory
      .filter((item) => item.category === "Proteções" && item.defenseBonus)
      .reduce((total, item) => total + (item.defenseBonus || 0), 0)

    // Defesa total = base + bônus de proteções
    const totalArmorClass = baseArmorClass + protectionBonus

    setCharacter({
      ...character,
      health: {
        ...character.health,
        maximum: maxHealth,
        current: character.health.current > maxHealth ? maxHealth : character.health.current,
      },
      sanity: {
        ...character.sanity,
        maximum: maxSanity,
        current: character.sanity.current > maxSanity ? maxSanity : character.sanity.current,
        traumas: character.sanity.traumas || [],
        resistances: character.sanity.resistances || [],
        weaknesses: character.sanity.weaknesses || [],
      },
      effortPoints: {
        ...character.effortPoints,
        maximum: maxEffort,
        current: character.effortPoints.current > maxEffort ? maxEffort : character.effortPoints.current,
      },
      armorClass: totalArmorClass,
    })
  }, [character, setCharacter])

  // Verificar se a subclasse é válida e inicializar habilidades
  useEffect(() => {
    if (character.subclass) {
      const subclass = subclassesData.find((s) => s.id === character.subclass)

      // Se a subclasse existe e é válida para a classe atual
      if (subclass && subclass.parentClass === character.class) {
        // Verificar se as habilidades da subclasse já estão presentes
        const hasSubclassAbilities = character.abilities.some(
          (ability) =>
            ability.source === "subclass" && subclass.abilities.some((subAbility) => subAbility.name === ability.name),
        )

        // Se não tiver as habilidades da subclasse, adicionar
        if (!hasSubclassAbilities) {
          const subclassAbilities = subclass.abilities.map((ability) => ({
            id: `${subclass.id}-${ability.name.toLowerCase().replace(/\s+/g, "-")}`,
            name: ability.name,
            description: ability.description,
            ntpRequired: ability.ntpRequired,
            isActive: false,
            source: "subclass" as const,
          }))

          // Remover habilidades antigas de subclasse
          const filteredAbilities = character.abilities.filter((ability) => ability.source !== "subclass")

          // Adicionar novas habilidades
          setCharacter({
            ...character,
            abilities: [...filteredAbilities, ...subclassAbilities],
          })
        }
      }
    }
  }, [character, setCharacter])

  const updateCharacter = (updates: Partial<CharacterData>) => {
    setCharacter({ ...character, ...updates })
  }

  const updateImages = (images: string[]) => {
    updateCharacter({ images })
  }

  const updateHealth = (health: { current: number; maximum: number }) => {
    updateCharacter({ health })
  }

  const updateSanity = (sanity: CharacterData["sanity"]) => {
    updateCharacter({ sanity })
  }

  const updateEffortPoints = (effortPoints: { current: number; maximum: number }) => {
    updateCharacter({ effortPoints })
  }

  const updateFearLevel = (fearLevel: number) => {
    updateCharacter({ fearLevel })
  }

  const updateTraumaLevel = (traumaLevel: number) => {
    updateCharacter({ traumaLevel })
  }

  const updateAttributes = (attributes: CharacterData["attributes"]) => {
    updateCharacter({ attributes })
  }

  const updateSavingThrows = (savingThrows: CharacterData["savingThrows"]) => {
    updateCharacter({ savingThrows })
  }

  const updateSkills = (skills: CharacterData["skills"]) => {
    updateCharacter({ skills })
  }

  const updateWeapons = (weapons: CharacterData["weapons"]) => {
    updateCharacter({ weapons })
  }

  const updateInventory = (inventory: CharacterData["inventory"]) => {
    updateCharacter({ inventory })
  }

  const updateArmorClass = (armorClass: number) => {
    updateCharacter({ armorClass })
  }

  const updateRituals = (rituals: CharacterData["rituals"]) => {
    updateCharacter({ rituals })
  }

  const updateNotes = (notes: string) => {
    updateCharacter({ notes })
  }

  // Função para rolar ataque com uma arma do inventário
  const rollAttackWithWeapon = (weapon: any) => {
    try {
      // Determinar qual perícia usar para o ataque
      let attackSkill = character.skills.luta // Padrão para armas corpo a corpo
      if (weapon.damageType === "Balístico" || weapon.type === "Balístico") {
        attackSkill = character.skills.pontaria
      }

      // Calcular bônus de ataque
      const attackBonus = attackSkill.bonus || 0
      const trainingBonus = getTrainingLevelBonus(attackSkill.level)
      const totalAttackBonus = attackBonus + trainingBonus

      // Rolar ataque
      const attackRawRoll = Math.floor(Math.random() * 20) + 1
      const attackRoll = attackRawRoll + totalAttackBonus

      // Verificar se é crítico (baseado apenas no valor puro do dado)
      const critThreshold = weapon.criticalThreshold || 20
      const isCritical = attackRawRoll >= critThreshold

      // Rolar dano
      let damageRawRoll = 0
      let damageRoll = 0

      // Exemplo simples para 2d6+3
      const damageFormula = weapon.damage || "1d6"
      const match = damageFormula.match(/(\d+)d(\d+)(?:\+(\d+))?/)
      if (match) {
        const [_, diceCount, diceSides, bonus] = match

        for (let i = 0; i < Number(diceCount); i++) {
          const roll = Math.floor(Math.random() * Number(diceSides)) + 1
          damageRawRoll += roll
        }

        damageRoll = damageRawRoll

        if (bonus) {
          damageRoll += Number(bonus)
        }

        // Se for crítico, multiplicar o dano pelo multiplicador
        if (isCritical) {
          damageRoll *= weapon.criticalMultiplier || 2
        }
      }

      setAttackResult({
        weaponName: weapon.name,
        attackRoll,
        attackRawRoll,
        damageRoll,
        damageRawRoll,
        isCritical,
        criticalMultiplier: weapon.criticalMultiplier || 2,
      })
    } catch (error) {
      console.error("Erro ao rolar ataque e dano:", error)
    }
  }

  const getTrainingLevelBonus = (level?: string) => {
    switch (level) {
      case "treinado":
        return 5
      case "veterano":
        return 10
      case "expert":
        return 15
      default:
        return 0
    }
  }

  // Calcular defesa base (10 + força)
  const baseArmorClass = 10 + character.attributes.forca

  // Calcular bônus total de proteções
  const protectionBonus = character.inventory
    .filter((item) => item.category === "Proteções" && item.defenseBonus)
    .reduce((total, item) => total + (item.defenseBonus || 0), 0)

  // Defesa total = base + bônus de proteções
  const totalArmorClass = baseArmorClass + protectionBonus

  return (
    <Card className="p-4 bg-[#1a1a1a] border-2 border-gray-800 text-gray-200">
      <div className="mb-6">
        <CharacterInfo character={character} updateCharacter={updateCharacter} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <CharacterImage images={character.images} updateImages={updateImages} health={character.health} />
        <div className="flex flex-col gap-4">
          <StatsBar
            health={character.health}
            sanity={character.sanity}
            effortPoints={character.effortPoints}
            updateHealth={updateHealth}
            updateSanity={updateSanity}
            updateEffortPoints={updateEffortPoints}
          />
          <FearTraumaSection
            fearLevel={character.fearLevel}
            traumaLevel={character.traumaLevel}
            updateFearLevel={updateFearLevel}
            updateTraumaLevel={updateTraumaLevel}
          />
        </div>
      </div>

      {/* Novo HUD de Combate */}
      <div className="mb-6 bg-gray-900 border-2 border-gray-700 rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-purple-500">Status de Combate</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-900 mb-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-gray-400">Defesa</span>
            <span className="text-2xl font-bold text-white">{totalArmorClass}</span>
            <span className="text-xs text-gray-500">
              Base: {baseArmorClass} | Bônus: +{protectionBonus}
            </span>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-800 mb-2">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-gray-400">Iniciativa</span>
            <span className="text-2xl font-bold text-white">{character.initiative}</span>
            <span className="text-xs text-gray-500">Bônus de Agilidade</span>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-700 mb-2">
              <Footprints className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-gray-400">Deslocamento</span>
            <span className="text-2xl font-bold text-white">{character.speed}</span>
            <span className="text-xs text-gray-500">Metros por turno</span>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-900 mb-2">
              <Swords className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-gray-400">NTP</span>
            <span className="text-2xl font-bold text-white">{character.ntp}%</span>
            <span className="text-xs text-gray-500">Nível de Terror</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <DiceRoller sanityMax={character.sanity.maximum} />
      </div>

      <Tabs defaultValue="attributes" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-8 mb-4 bg-gray-800">
          <TabsTrigger value="attributes" className="data-[state=active]:bg-purple-900">
            Atributos
          </TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-purple-900">
            Perícias
          </TabsTrigger>
          <TabsTrigger value="abilities" className="data-[state=active]:bg-purple-900">
            Habilidades
          </TabsTrigger>
          <TabsTrigger value="combat" className="data-[state=active]:bg-purple-900">
            Combate
          </TabsTrigger>
          <TabsTrigger value="weapons" className="data-[state=active]:bg-purple-900">
            Armas
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-purple-900">
            Inventário
          </TabsTrigger>
          <TabsTrigger value="rituals" className="data-[state=active]:bg-purple-900">
            Rituais
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-purple-900">
            Anotações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attributes" className="mt-0">
          <AttributesSection
            attributes={character.attributes}
            updateAttributes={updateAttributes}
            savingThrows={character.savingThrows}
            updateSavingThrows={updateSavingThrows}
          />
        </TabsContent>

        <TabsContent value="skills" className="mt-0">
          <SkillsSection skills={character.skills} attributes={character.attributes} updateSkills={updateSkills} />
        </TabsContent>

        <TabsContent value="abilities" className="mt-0">
          <AbilitiesSection character={character} updateCharacter={updateCharacter} />
        </TabsContent>

        <TabsContent value="combat" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
              <h3 className="text-lg font-bold text-center mb-4 text-purple-500">Estatísticas de Combate</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-sm font-medium text-white">Defesa</label>
                  <div className="w-full p-2 border rounded text-center bg-gray-800 border-gray-700 text-white">
                    {totalArmorClass}
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-1">10 + FOR + Proteções</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Iniciativa</label>
                  <input
                    type="number"
                    value={character.initiative}
                    onChange={(e) =>
                      updateCharacter({
                        initiative: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border rounded text-center bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Deslocamento</label>
                  <input
                    type="number"
                    value={character.speed}
                    onChange={(e) =>
                      updateCharacter({
                        speed: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border rounded text-center bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
              <h3 className="text-lg font-bold text-center mb-4 text-purple-400">Rolagem de Ataque Rápido</h3>
              <p className="text-center text-sm text-gray-400 mb-4">
                Use esta seção para fazer rolagens rápidas de ataque com suas armas do inventário
              </p>

              {/* Lista de armas do inventário para rolagem rápida */}
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {character.inventory
                  .filter((item) => item.category === "Armas" || item.category === "Armas Amaldiçoadas")
                  .map((weapon) => (
                    <div
                      key={weapon.id}
                      className="p-2 bg-gray-800 rounded-md border border-gray-700 flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{weapon.name}</span>
                        {weapon.damage && (
                          <span className="ml-2 text-sm text-purple-400">
                            {weapon.damage} ({weapon.damageType})
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => rollAttackWithWeapon(weapon)}
                        className="bg-purple-900 hover:bg-purple-800"
                      >
                        <Swords className="h-4 w-4 mr-1" /> Atacar
                      </Button>
                    </div>
                  ))}

                {character.inventory.filter(
                  (item) => item.category === "Armas" || item.category === "Armas Amaldiçoadas",
                ).length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    Nenhuma arma no inventário. Adicione armas na aba Inventário.
                  </div>
                )}
              </div>

              {/* Resultado do ataque */}
              {attackResult && (
                <div className="mt-4 p-3 bg-gray-800 rounded-md border border-gray-700">
                  <h4 className="font-bold text-center mb-2">Ataque com {attackResult.weaponName}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm">Rolagem de Ataque:</p>
                      <p className="text-xl font-bold">{attackResult.attackRoll}</p>
                      {attackResult.attackRoll !== attackResult.attackRawRoll && (
                        <p className="text-xs text-gray-400">
                          (Dado: {attackResult.attackRawRoll} + Bônus:{" "}
                          {attackResult.attackRoll - attackResult.attackRawRoll})
                        </p>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm">Dano:</p>
                      <p
                        className={`text-xl font-bold ${attackResult.isCritical ? "text-purple-400" : "text-purple-500"}`}
                      >
                        {attackResult.damageRoll}
                      </p>
                      {attackResult.isCritical && (
                        <p className="text-xs text-purple-400">CRÍTICO! (x{attackResult.criticalMultiplier})</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900 md:col-span-2">
              <h3 className="text-lg font-bold text-center mb-4 text-purple-400">Nível de Terror Presenciado (NTP)</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={character.ntp}
                  onChange={(e) => updateCharacter({ ntp: Number.parseInt(e.target.value) })}
                  className="flex-1 accent-purple-600"
                />
                <div className="w-16 text-center text-xl font-bold">{character.ntp}%</div>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                Cada 5% de NTP aumenta seus pontos máximos de vida e esforço.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weapons" className="mt-0">
          <div className="space-y-4">
            <WeaponsSection weapons={character.weapons} updateWeapons={updateWeapons} skills={character.skills} />
            <PredefinedWeapons
              updateInventory={updateInventory}
              updateWeapons={updateWeapons}
              inventory={character.inventory}
              weapons={character.weapons}
              updateArmorClass={updateArmorClass}
              armorClass={character.armorClass}
            />
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="mt-0">
          <InventorySection
            inventory={character.inventory}
            updateInventory={updateInventory}
            armorClass={character.armorClass}
            updateArmorClass={updateArmorClass}
            attributes={character.attributes}
          />
        </TabsContent>

        <TabsContent value="rituals" className="mt-0">
          <RitualsSection rituals={character.rituals} updateRituals={updateRituals} skills={character.skills} />
        </TabsContent>

        <TabsContent value="notes" className="mt-0">
          <NotesSection notes={character.notes} updateNotes={updateNotes} />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
