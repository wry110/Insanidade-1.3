"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CharacterData } from "@/lib/types"

interface CharacterBasicInfoProps {
  character: CharacterData
  updateCharacter: (updates: Partial<CharacterData>) => void
}

export default function CharacterBasicInfo({ character, updateCharacter }: CharacterBasicInfoProps) {
  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Informações Básicas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">
            Nome do Personagem
          </Label>
          <Input
            id="name"
            value={character.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="race" className="text-white">
            Raça
          </Label>
          <Input
            id="race"
            value={character.race}
            onChange={(e) => updateCharacter({ race: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="background" className="text-white">
            Histórico
          </Label>
          <Input
            id="background"
            value={character.background}
            onChange={(e) => updateCharacter({ background: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alignment" className="text-white">
            Tendência
          </Label>
          <Input
            id="alignment"
            value={character.alignment}
            onChange={(e) => updateCharacter({ alignment: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  )
}
