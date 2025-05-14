"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { originsData } from "@/lib/origins-data"
import type { CharacterData } from "@/lib/types"

interface OriginsSectionProps {
  character: CharacterData
  updateCharacter: (updates: Partial<CharacterData>) => void
}

export default function OriginsSection({ character, updateCharacter }: OriginsSectionProps) {
  const [expandedOrigin, setExpandedOrigin] = useState<string | null>(null)
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null)

  // Função para alternar a expansão de uma origem
  const toggleOriginExpansion = (originId: string) => {
    if (expandedOrigin === originId) {
      setExpandedOrigin(null)
    } else {
      setExpandedOrigin(originId)
    }
  }

  // Função para selecionar uma origem
  const selectOrigin = (originId: string) => {
    const origin = originsData.find((o) => o.id === originId)
    if (origin) {
      setSelectedOrigin(originId)
      updateCharacter({ race: origin.name })
    }
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Origens</h2>

      {/* Origem selecionada */}
      {selectedOrigin && (
        <div className="mb-6 p-4 bg-gray-800 rounded-md border border-amber-700">
          <h3 className="text-lg font-semibold text-amber-400">
            {originsData.find((o) => o.id === selectedOrigin)?.name}
          </h3>
          <div className="mt-2">
            <h4 className="font-medium text-white mb-1">Habilidade de Origem:</h4>
            <div className="p-3 bg-gray-900 rounded-md border border-amber-600">
              <h5 className="font-medium text-white">
                {originsData.find((o) => o.id === selectedOrigin)?.ability.name}
              </h5>
              <p className="text-sm text-gray-300 mt-1 whitespace-pre-line">
                {originsData.find((o) => o.id === selectedOrigin)?.ability.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de origens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {originsData.map((origin) => (
          <Card
            key={origin.id}
            className={`p-3 bg-gray-800 border ${
              selectedOrigin === origin.id ? "border-amber-600" : "border-gray-700"
            } hover:border-gray-600 transition-colors`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium text-white">{origin.name}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleOriginExpansion(origin.id)}
                    className="h-6 w-6 ml-1 text-gray-400 hover:text-white"
                  >
                    {expandedOrigin === origin.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {expandedOrigin === origin.id && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-300 mb-2">{origin.description}</p>
                    <div className="p-2 bg-gray-900 rounded-md border border-gray-700">
                      <h5 className="font-medium text-white text-sm flex items-center">
                        <Info className="h-3 w-3 mr-1" /> {origin.ability.name}
                      </h5>
                      <p className="text-xs text-gray-400 mt-1">{origin.ability.description}</p>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => selectOrigin(origin.id)}
                className={`ml-2 ${
                  selectedOrigin === origin.id
                    ? "bg-amber-700 hover:bg-amber-600 border-amber-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {selectedOrigin === origin.id ? "Selecionada" : "Selecionar"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
