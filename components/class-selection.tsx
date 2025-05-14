"use client"

import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CharacterData } from "@/lib/types"
import { subclassesData } from "@/lib/subclasses-data"

interface ClassSelectionProps {
  character: CharacterData
  updateCharacter: (updates: Partial<CharacterData>) => void
}

export default function ClassSelection({ character, updateCharacter }: ClassSelectionProps) {
  // Filtrar subclasses disponíveis para a classe atual
  const availableSubclasses = subclassesData.filter(
    (subclass) => subclass.parentClass === character.class || character.class === "",
  )

  // Verificar se a subclasse atual é válida para a classe selecionada
  useEffect(() => {
    if (character.class && character.subclass) {
      const isValidSubclass = availableSubclasses.some((subclass) => subclass.id === character.subclass)
      if (!isValidSubclass) {
        // Se a subclasse não for válida para a classe atual, limpar a subclasse
        updateCharacter({ subclass: "" })
      }
    }
  }, [character.class, character.subclass, availableSubclasses])

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-blue-500">Classe</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="class" className="text-white">
            Classe
          </Label>
          <select
            value={character.class}
            onChange={(e) => {
              const newClass = e.target.value as "Lutador" | "Prático" | "Ocultista" | "Mundano" | ""
              // Se mudar de classe, limpar a subclasse
              if (newClass !== character.class) {
                updateCharacter({ class: newClass, subclass: "" })
              } else {
                updateCharacter({ class: newClass })
              }
            }}
            className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-white"
          >
            <option value="">Selecione uma classe</option>
            {character.ntp === 0 && <option value="Mundano">Mundano</option>}
            {character.ntp >= 5 && (
              <>
                <option value="Lutador">Lutador</option>
                <option value="Prático">Prático</option>
                <option value="Ocultista">Ocultista</option>
              </>
            )}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subclass" className="text-white">
            Subclasse
          </Label>
          <Select
            value={character.subclass || ""}
            onValueChange={(value) => updateCharacter({ subclass: value })}
            disabled={!character.class || availableSubclasses.length === 0}
          >
            <SelectTrigger id="subclass" className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Selecione uma subclasse" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              {availableSubclasses.map((subclass) => (
                <SelectItem key={subclass.id} value={subclass.id}>
                  {subclass.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="ntp" className="text-white">
            NTP (Nível de Terror Presenciado)
          </Label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={character.ntp}
              onChange={(e) => updateCharacter({ ntp: Number.parseInt(e.target.value) || 0 })}
              className="flex-1 accent-yellow-600"
            />
            <div className="w-16 text-center text-xl font-bold text-yellow-500">{character.ntp}%</div>
          </div>
        </div>

        {character.class && character.subclass && (
          <div className="md:col-span-2 mt-2">
            <div className="p-4 bg-gray-800 rounded-md border border-blue-700">
              <h3 className="font-bold text-blue-400 mb-2">
                {subclassesData.find((s) => s.id === character.subclass)?.name}
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                {subclassesData.find((s) => s.id === character.subclass)?.description}
              </p>

              <h4 className="text-sm font-medium text-blue-400 mb-2">Habilidades de Classe:</h4>
              <div className="space-y-2">
                {subclassesData
                  .find((s) => s.id === character.subclass)
                  ?.abilities.map((ability, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-md border border-blue-600">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-medium text-white">{ability.name}</h5>
                        <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded">
                          NTP: {ability.ntpRequired}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">{ability.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
