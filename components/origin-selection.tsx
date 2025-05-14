"use client"

import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CharacterData } from "@/lib/types"
import { originsData } from "@/lib/origins-data"

interface OriginSelectionProps {
  character: CharacterData
  updateCharacter: (updates: Partial<CharacterData>) => void
}

export default function OriginSelection({ character, updateCharacter }: OriginSelectionProps) {
  // Adicionar habilidade de origem quando a origem for selecionada
  useEffect(() => {
    if (character.origin) {
      const origin = originsData.find((o) => o.id === character.origin)
      if (origin) {
        // Verificar se a habilidade de origem já existe
        const hasOriginAbility = character.abilities.some(
          (ability) => ability.source === "origin" && ability.name === origin.ability.name,
        )

        if (!hasOriginAbility) {
          // Remover qualquer habilidade de origem anterior
          const filteredAbilities = character.abilities.filter((ability) => ability.source !== "origin")

          // Adicionar a nova habilidade de origem
          const originAbility = {
            id: `origin-${origin.id}`,
            name: origin.ability.name,
            description: origin.ability.description,
            ntpRequired: 0, // Habilidades de origem não têm requisito de NTP
            isActive: true,
            source: "origin",
          }

          updateCharacter({
            abilities: [...filteredAbilities, originAbility],
          })
        }
      }
    }
  }, [character.origin])

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-amber-500">Origem</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="origin" className="text-white">
            Selecione sua Origem
          </Label>
          <Select value={character.origin || ""} onValueChange={(value) => updateCharacter({ origin: value })}>
            <SelectTrigger id="origin" className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Selecione uma origem" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-[300px]">
              {originsData.map((origin) => (
                <SelectItem key={origin.id} value={origin.id}>
                  {origin.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {character.origin && (
          <div className="mt-4">
            <div className="p-4 bg-gray-800 rounded-md border border-amber-700">
              <h3 className="font-bold text-amber-400 mb-2">
                {originsData.find((o) => o.id === character.origin)?.name}
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                {originsData.find((o) => o.id === character.origin)?.description}
              </p>

              <div className="bg-gray-900 p-3 rounded-md border border-amber-600">
                <h4 className="text-sm text-amber-400 font-medium">
                  {originsData.find((o) => o.id === character.origin)?.ability.name}
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  {originsData.find((o) => o.id === character.origin)?.ability.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
