"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, BookOpen, Scroll, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { CharacterData } from "@/lib/types"
import { predefinedRituals } from "@/lib/rituals-data"

interface RitualsSectionProps {
  rituals: CharacterData["rituals"]
  updateRituals: (rituals: CharacterData["rituals"]) => void
  skills: CharacterData["skills"]
}

export default function RitualsSection({ rituals, updateRituals, skills }: RitualsSectionProps) {
  const [newRitual, setNewRitual] = useState({
    name: "",
    level: 0,
    type: "Conhecimento",
    castingTime: "",
    range: "",
    components: "",
    duration: "",
    description: "",
    damage: "",
    damageType: "Ocultismo",
  })

  const [diceResult, setDiceResult] = useState<{
    id: string
    castingRoll: number
    castingRawRoll: number
    damageRoll: number
    damageRawRoll: number
    isCritical: boolean
    version?: string
  } | null>(null)

  const [selectedRituals, setSelectedRituals] = useState<string[]>([])
  const [organizationMethod, setOrganizationMethod] = useState<"circle" | "element">("circle")
  const [ritualFilter, setRitualFilter] = useState("")

  const ritualLevels = [0, 1, 2, 3, 4, 5]
  const ritualTypes = ["Conhecimento", "Sangue", "Morte", "Energia", "Medo", "Outro"]
  const damageTypes = ["Ocultismo", "Mental", "Fogo", "Gelo", "Elétrico", "Ácido", "Necrótico", "Outro"]

  const addRitual = () => {
    if (newRitual.name.trim() === "") return

    updateRituals([...rituals, { ...newRitual, id: Date.now().toString() }])
    setNewRitual({
      name: "",
      level: 0,
      type: "Conhecimento",
      castingTime: "",
      range: "",
      components: "",
      duration: "",
      description: "",
      damage: "",
      damageType: "Ocultismo",
    })
  }

  const removeRitual = (id: string) => {
    updateRituals(rituals.filter((ritual) => ritual.id !== id))
  }

  const rollRitualCheck = (id: string, damageFormula = "", version = "Normal") => {
    try {
      // Usar a perícia de ocultismo para o teste
      const ocultismoSkill = skills.ocultismo
      const skillBonus = ocultismoSkill.bonus || 0
      const trainingBonus = getTrainingLevelBonus(ocultismoSkill.level)
      const totalBonus = skillBonus + trainingBonus

      // Rolar teste de ocultismo
      const castingRawRoll = Math.floor(Math.random() * 20) + 1
      const castingRoll = castingRawRoll + totalBonus

      // Verificar se é crítico (1 ou 20 no d20)
      const isCritical = castingRawRoll === 20

      // Rolar dano se houver fórmula de dano
      let damageRawRoll = 0
      let damageRoll = 0

      if (damageFormula) {
        // Exemplo simples para 2d6+3
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

          // Se for crítico, dobrar o dano
          if (isCritical) {
            damageRoll *= 2
          }
        }
      }

      setDiceResult({
        id,
        castingRoll,
        castingRawRoll,
        damageRoll,
        damageRawRoll,
        isCritical,
        version,
      })
    } catch (error) {
      console.error("Erro ao rolar teste de ritual:", error)
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

  const toggleRitualSelection = (id: string) => {
    if (selectedRituals.includes(id)) {
      setSelectedRituals(selectedRituals.filter((ritualId) => ritualId !== id))
    } else {
      setSelectedRituals([...selectedRituals, id])
    }
  }

  const addSelectedPredefinedRituals = () => {
    const newRituals = predefinedRituals
      .filter((ritual) => selectedRituals.includes(ritual.id))
      .map((ritual) => ({
        id: Date.now() + "-" + ritual.id,
        name: ritual.name,
        level: ritual.level,
        type: ritual.type,
        castingTime: ritual.castingTime,
        range: ritual.range,
        components: ritual.components || "",
        duration: ritual.duration,
        description: ritual.description,
        damage: ritual.damage || "",
        damageType: ritual.damageType || "Ocultismo",
      }))

    updateRituals([...rituals, ...newRituals])
    setSelectedRituals([])
  }

  // Extrair informações de dano para as diferentes versões do ritual
  const extractDamageInfo = (description: string) => {
    const result = {
      normal: { damage: "", damageType: "" },
      discente: { damage: "", damageType: "" },
      verdadeiro: { damage: "", damageType: "" },
    }

    // Procurar por padrões de dano no texto normal (antes de mencionar Discente)
    const normalDamageMatch = description
      .split(/Discente|discente/)[0]
      .match(
        /causa(?:ndo)?\s+(\d+d\d+(?:\+\d+)?)\s+(?:pontos\s+)?(?:de\s+)?(?:dano\s+)?(?:de\s+)?([A-Za-zôçãáéíóúÁÉÍÓÚÂÊÎÔÛâêîôû]+)/i,
      )

    if (normalDamageMatch) {
      result.normal.damage = normalDamageMatch[1]
      result.normal.damageType = normalDamageMatch[2]
    }

    // Procurar por padrões de dano na versão discente
    const discenteSection = description.match(/Discente[^V]*(?=Verdadeiro|$)/i)?.[0] || ""
    const discenteDamageMatch = discenteSection.match(
      /causa(?:ndo)?\s+(\d+d\d+(?:\+\d+)?)\s+(?:pontos\s+)?(?:de\s+)?(?:dano\s+)?(?:de\s+)?([A-Za-zôçãáéíóúÁÉÍÓÚÂÊÎÔÛâêîôû]+)/i,
    )

    if (discenteDamageMatch) {
      result.discente.damage = discenteDamageMatch[1]
      result.discente.damageType = discenteDamageMatch[2]
    } else if (discenteSection.match(/muda\s+o\s+dano\s+para\s+(\d+d\d+(?:\+\d+)?)/i)) {
      result.discente.damage = discenteSection.match(/muda\s+o\s+dano\s+para\s+(\d+d\d+(?:\+\d+)?)/i)![1]
      result.discente.damageType = result.normal.damageType // Assume mesmo tipo de dano
    }

    // Procurar por padrões de dano na versão verdadeiro
    const verdadeiroSection = description.match(/Verdadeiro[^]*/i)?.[0] || ""
    const verdadeiroDamageMatch = verdadeiroSection.match(
      /causa(?:ndo)?\s+(\d+d\d+(?:\+\d+)?)\s+(?:pontos\s+)?(?:de\s+)?(?:dano\s+)?(?:de\s+)?([A-Za-zôçãáéíóúÁÉÍÓÚÂÊÎÔÛâêîôû]+)/i,
    )

    if (verdadeiroDamageMatch) {
      result.verdadeiro.damage = verdadeiroDamageMatch[1]
      result.verdadeiro.damageType = verdadeiroDamageMatch[2]
    } else if (verdadeiroSection.match(/muda\s+o\s+dano\s+para\s+(\d+d\d+(?:\+\d+)?)/i)) {
      result.verdadeiro.damage = verdadeiroSection.match(/muda\s+o\s+dano\s+para\s+(\d+d\d+(?:\+\d+)?)/i)![1]
      result.verdadeiro.damageType = result.normal.damageType // Assume mesmo tipo de dano
    }

    return result
  }

  // Organizar rituais por círculo (nível)
  const ritualsByCircle = rituals.reduce(
    (acc, ritual) => {
      const level = ritual.level
      if (!acc[level]) {
        acc[level] = []
      }
      acc[level].push(ritual)
      return acc
    },
    {} as Record<number, typeof rituals>,
  )

  // Organizar rituais por elemento
  const ritualsByElement = rituals.reduce(
    (acc, ritual) => {
      const type = ritual.type
      if (!acc[type]) {
        acc[type] = []
      }
      acc[type].push(ritual)
      return acc
    },
    {} as Record<string, typeof rituals>,
  )

  // Determinar qual organização usar
  const groupedRituals = organizationMethod === "circle" ? ritualsByCircle : ritualsByElement

  // Função para renderizar os rituais agrupados
  const renderGroupedRituals = () => {
    if (organizationMethod === "circle") {
      return Object.entries(ritualsByCircle)
        .sort(([levelA], [levelB]) => Number.parseInt(levelA) - Number.parseInt(levelB))
        .map(([level, ritualList]) => (
          <div key={level} className="space-y-2">
            <h3 className="font-bold border-b border-gray-700 pb-1 text-purple-400">Rituais Nível {level}</h3>
            {renderRitualList(ritualList)}
          </div>
        ))
    } else {
      return Object.entries(ritualsByElement)
        .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
        .map(([type, ritualList]) => (
          <div key={type} className="space-y-2">
            <h3 className="font-bold border-b border-gray-700 pb-1 text-purple-400">Rituais de {type}</h3>
            {renderRitualList(ritualList)}
          </div>
        ))
    }
  }

  // Função para renderizar a lista de rituais
  const renderRitualList = (ritualList: typeof rituals) => {
    return ritualList.map((ritual) => {
      // Extrair informações de dano para as diferentes versões
      const damageInfo = extractDamageInfo(ritual.description)

      // Verificar se o ritual tem versões discente ou verdadeiro
      const hasDiscente = ritual.description.includes("Discente")
      const hasVerdadeiro = ritual.description.includes("Verdadeiro")

      // Verificar se as versões têm dano
      const hasNormalDamage = ritual.damage || damageInfo.normal.damage
      const hasDiscenteDamage = damageInfo.discente.damage
      const hasVerdadeiroDamage = damageInfo.verdadeiro.damage

      return (
        <div key={ritual.id} className="p-3 bg-gray-800 rounded-md border border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-lg text-white">{ritual.name}</h4>
                <div className="flex items-center space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-purple-500 hover:text-purple-400 hover:bg-gray-700"
                        title="Conjurar ritual"
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2 bg-gray-800 border-gray-700 text-white">
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => rollRitualCheck(ritual.id, hasNormalDamage, "Normal")}
                          className="bg-gray-700 hover:bg-gray-600 text-white"
                          size="sm"
                        >
                          Conjurar Normal
                        </Button>
                        {hasDiscente && (
                          <Button
                            onClick={() => rollRitualCheck(ritual.id, hasDiscenteDamage, "Discente")}
                            className="bg-gray-700 hover:bg-gray-600 text-white"
                            size="sm"
                          >
                            Conjurar Discente
                          </Button>
                        )}
                        {hasVerdadeiro && (
                          <Button
                            onClick={() => rollRitualCheck(ritual.id, hasVerdadeiroDamage, "Verdadeiro")}
                            className="bg-gray-700 hover:bg-gray-600 text-white"
                            size="sm"
                          >
                            Conjurar Verdadeiro
                          </Button>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRitual(ritual.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-gray-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {ritual.type} (Nível {ritual.level})
              </div>
              <div className="grid grid-cols-3 gap-2 mt-1 text-xs">
                <div>
                  <span className="font-medium text-gray-300">Tempo:</span> {ritual.castingTime}
                </div>
                <div>
                  <span className="font-medium text-gray-300">Alcance:</span> {ritual.range}
                </div>
                <div>
                  <span className="font-medium text-gray-300">Duração:</span> {ritual.duration}
                </div>
              </div>
              {ritual.components && (
                <div className="text-xs mt-1">
                  <span className="font-medium text-gray-300">Componentes:</span> {ritual.components}
                </div>
              )}
              {ritual.damage && (
                <div className="text-xs mt-1">
                  <span className="font-medium text-gray-300">Dano:</span>{" "}
                  <span className="text-red-400">{ritual.damage}</span> ({ritual.damageType})
                </div>
              )}
              {ritual.description && <p className="text-sm mt-2 text-gray-300">{ritual.description}</p>}

              {diceResult && diceResult.id === ritual.id && (
                <div className="mt-2 p-2 bg-gray-900 rounded border border-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <p className="text-sm text-white">
                        Teste de Ocultismo {diceResult.version && `(${diceResult.version})`}:
                      </p>
                      <p className="text-xl font-bold text-white">{diceResult.castingRoll}</p>
                      {diceResult.castingRoll !== diceResult.castingRawRoll && (
                        <p className="text-xs text-gray-400">
                          (Dado: {diceResult.castingRawRoll} + Bônus:{" "}
                          {diceResult.castingRoll - diceResult.castingRawRoll})
                        </p>
                      )}
                      {diceResult.isCritical && <p className="text-xs text-yellow-400">CRÍTICO!</p>}
                    </div>
                    {diceResult.damageRoll > 0 && (
                      <div className="text-center">
                        <p className="text-sm text-white">Dano:</p>
                        <p
                          className={`text-xl font-bold ${diceResult.isCritical ? "text-yellow-400" : "text-red-500"}`}
                        >
                          {diceResult.damageRoll}
                        </p>
                        {diceResult.isCritical && <p className="text-xs text-yellow-400">CRÍTICO! (x2)</p>}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Rituais</h2>

      <div className="flex justify-between mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gray-700 hover:bg-gray-600 text-white">
              <Scroll className="mr-1 h-4 w-4" /> Rituais Pré-definidos
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl text-center text-red-500">Rituais Pré-definidos</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-300">Selecione os rituais que deseja adicionar à sua ficha</div>
                  <Button
                    onClick={addSelectedPredefinedRituals}
                    disabled={selectedRituals.length === 0}
                    className="bg-red-900 hover:bg-red-800 text-white"
                  >
                    Adicionar Selecionados ({selectedRituals.length})
                  </Button>
                </div>

                <div className="relative">
                  <Input
                    placeholder="Buscar ritual por nome, tipo ou nível..."
                    value={ritualFilter}
                    onChange={(e) => setRitualFilter(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white pr-8"
                  />
                  {ritualFilter && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-white"
                      onClick={() => setRitualFilter("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {predefinedRituals
                  .filter((ritual) => {
                    if (!ritualFilter) return true
                    const searchTerm = ritualFilter.toLowerCase()
                    return (
                      ritual.name.toLowerCase().includes(searchTerm) ||
                      ritual.type.toLowerCase().includes(searchTerm) ||
                      `nível ${ritual.level}`.includes(searchTerm) ||
                      `nivel ${ritual.level}`.includes(searchTerm) ||
                      ritual.description.toLowerCase().includes(searchTerm)
                    )
                  })
                  .map((ritual) => (
                    <div
                      key={ritual.id}
                      className={`p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedRituals.includes(ritual.id)
                          ? "bg-gray-700 border-red-500"
                          : "bg-gray-800 border-gray-700 hover:border-gray-500"
                      }`}
                      onClick={() => toggleRitualSelection(ritual.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-lg text-white">{ritual.name}</h4>
                        <div className="text-sm text-gray-400">
                          {ritual.type} (Nível {ritual.level})
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-1 text-xs">
                        <div>
                          <span className="font-medium text-gray-300">Tempo:</span> {ritual.castingTime}
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Alcance:</span> {ritual.range}
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Duração:</span> {ritual.duration}
                        </div>
                      </div>
                      {ritual.resistance && (
                        <div className="text-xs mt-1">
                          <span className="font-medium text-gray-300">Resistência:</span> {ritual.resistance}
                        </div>
                      )}
                      {ritual.damage && (
                        <div className="text-xs mt-1">
                          <span className="font-medium text-gray-300">Dano:</span>{" "}
                          <span className="text-red-400">{ritual.damage}</span> ({ritual.damageType})
                        </div>
                      )}
                      <div className="mt-2 text-xs text-gray-300 line-clamp-2">
                        {ritual.description.split("\n\n")[0]}
                      </div>
                    </div>
                  ))}
              </div>
              {ritualFilter &&
                predefinedRituals.filter((ritual) => {
                  const searchTerm = ritualFilter.toLowerCase()
                  return (
                    ritual.name.toLowerCase().includes(searchTerm) ||
                    ritual.type.toLowerCase().includes(searchTerm) ||
                    `nível ${ritual.level}`.includes(searchTerm) ||
                    `nivel ${ritual.level}`.includes(searchTerm) ||
                    ritual.description.toLowerCase().includes(searchTerm)
                  )
                }).length === 0 && (
                  <div className="col-span-2 text-center py-8 text-gray-500">
                    Nenhum ritual encontrado para "{ritualFilter}"
                  </div>
                )}
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-2">
          <span className="text-white text-sm">Organizar por:</span>
          <Select
            value={organizationMethod}
            onValueChange={(value) => setOrganizationMethod(value as "circle" | "element")}
          >
            <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Organização" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="circle">Círculo</SelectItem>
              <SelectItem value="element">Elemento</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-700">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <Label htmlFor="ritual-name">Nome do Ritual</Label>
            <Input
              id="ritual-name"
              value={newRitual.name}
              onChange={(e) => setNewRitual({ ...newRitual, name: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="ritual-level">Nível</Label>
            <Select
              value={newRitual.level.toString()}
              onValueChange={(value) => setNewRitual({ ...newRitual, level: Number.parseInt(value) })}
            >
              <SelectTrigger id="ritual-level" className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {ritualLevels.map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-3">
            <Label htmlFor="ritual-type">Tipo</Label>
            <Select value={newRitual.type} onValueChange={(value) => setNewRitual({ ...newRitual, type: value })}>
              <SelectTrigger id="ritual-type" className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {ritualTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 flex items-end">
            <Button onClick={addRitual} className="w-full bg-gray-700 hover:bg-gray-600 text-white">
              <Plus className="mr-1 h-4 w-4" /> Adicionar
            </Button>
          </div>

          <div className="col-span-4">
            <Label htmlFor="ritual-casting-time">Tempo de Conjuração</Label>
            <Input
              id="ritual-casting-time"
              value={newRitual.castingTime}
              onChange={(e) => setNewRitual({ ...newRitual, castingTime: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-4">
            <Label htmlFor="ritual-range">Alcance</Label>
            <Input
              id="ritual-range"
              value={newRitual.range}
              onChange={(e) => setNewRitual({ ...newRitual, range: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-4">
            <Label htmlFor="ritual-duration">Duração</Label>
            <Input
              id="ritual-duration"
              value={newRitual.duration}
              onChange={(e) => setNewRitual({ ...newRitual, duration: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-6">
            <Label htmlFor="ritual-components">Componentes</Label>
            <Input
              id="ritual-components"
              value={newRitual.components}
              onChange={(e) => setNewRitual({ ...newRitual, components: e.target.value })}
              placeholder="Componentes necessários para o ritual"
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-3">
            <Label htmlFor="ritual-damage">Dano</Label>
            <Input
              id="ritual-damage"
              value={newRitual.damage}
              onChange={(e) => setNewRitual({ ...newRitual, damage: e.target.value })}
              placeholder="2d6+3"
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-3">
            <Label htmlFor="ritual-damage-type">Tipo de Dano</Label>
            <Select
              value={newRitual.damageType}
              onValueChange={(value) => setNewRitual({ ...newRitual, damageType: value })}
            >
              <SelectTrigger id="ritual-damage-type" className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Tipo de Dano" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {damageTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-12">
            <Label htmlFor="ritual-description">Descrição</Label>
            <Textarea
              id="ritual-description"
              value={newRitual.description}
              onChange={(e) => setNewRitual({ ...newRitual, description: e.target.value })}
              rows={2}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {rituals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhum ritual adicionado</div>
        ) : (
          renderGroupedRituals()
        )}
      </div>
    </div>
  )
}
