"use client"

import { useState } from "react"
import { Brain, Dumbbell, Zap, Heart, ArrowUp, ArrowDown, Lightbulb } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface AttributesSectionProps {
  attributes: CharacterData["attributes"]
  updateAttributes: (attributes: CharacterData["attributes"]) => void
  savingThrows: CharacterData["savingThrows"]
  updateSavingThrows: (savingThrows: CharacterData["savingThrows"]) => void
}

export default function AttributesSection({
  attributes,
  updateAttributes,
  savingThrows,
  updateSavingThrows,
}: AttributesSectionProps) {
  const [hoveredAttr, setHoveredAttr] = useState<string | null>(null)

  const attributeInfo = {
    forca: {
      name: "Força",
      abbr: "FOR",
      description: "Capacidade física, potência muscular e habilidade de levantar peso",
      color: "from-violet-900 to-violet-700",
      hoverColor: "group-hover:from-violet-800 group-hover:to-violet-600",
      icon: Dumbbell,
    },
    agilidade: {
      name: "Agilidade",
      abbr: "AGI",
      description: "Velocidade, reflexos e coordenação motora",
      color: "from-violet-800 to-violet-600",
      hoverColor: "group-hover:from-violet-700 group-hover:to-violet-500",
      icon: Zap,
    },
    intelecto: {
      name: "Intelecto",
      abbr: "INT",
      description: "Raciocínio, memória e capacidade de aprendizado",
      color: "from-violet-700 to-violet-500",
      hoverColor: "group-hover:from-violet-600 group-hover:to-violet-400",
      icon: Brain,
    },
    disposicao: {
      name: "Disposição",
      abbr: "DIS",
      description: "Força de vontade, carisma e presença social",
      color: "from-violet-800 to-violet-600",
      hoverColor: "group-hover:from-violet-700 group-hover:to-violet-500",
      icon: Lightbulb,
    },
    vigor: {
      name: "Vigor",
      abbr: "VIG",
      description: "Resistência física, saúde e vitalidade",
      color: "from-violet-900 to-violet-700",
      hoverColor: "group-hover:from-violet-800 group-hover:to-violet-600",
      icon: Heart,
    },
  }

  const adjustAttribute = (key: keyof typeof attributes, amount: number) => {
    const newValue = Math.min(10, Math.max(0, attributes[key] + amount))
    const newAttributes = { ...attributes }
    newAttributes[key] = newValue
    updateAttributes(newAttributes)
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-violet-500">Atributos</h2>
      <p className="text-center text-sm text-gray-400 mb-6">
        O valor do atributo (0-10) representa o número de dados que você joga em testes relacionados
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {Object.entries(attributes).map(([key, value]) => {
          const attrKey = key as keyof typeof attributeInfo
          const info = attributeInfo[attrKey]
          const Icon = info.icon
          const isHovered = hoveredAttr === key

          return (
            <div
              key={key}
              className="group relative"
              onMouseEnter={() => setHoveredAttr(key)}
              onMouseLeave={() => setHoveredAttr(null)}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-full h-32 rounded-lg bg-gradient-to-br shadow-lg transition-all duration-300 ${
                    info.color
                  } ${isHovered ? info.hoverColor : ""}`}
                >
                  <div className="h-full flex flex-col items-center justify-center relative">
                    <div className="absolute top-2 left-2">
                      <Icon className="h-6 w-6 text-white opacity-70" />
                    </div>
                    <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">{info.name}</div>
                    <div className="text-4xl font-bold text-white mb-1">{value}</div>
                    <div className="text-sm font-medium text-white/80">{info.abbr}</div>

                    {/* Botões de ajuste */}
                    <div className="absolute -right-3 inset-y-0 flex flex-col justify-center space-y-2">
                      <button
                        onClick={() => adjustAttribute(attrKey, 1)}
                        className="bg-gray-800 hover:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center border border-gray-700 shadow-md transition-transform hover:scale-110"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => adjustAttribute(attrKey, -1)}
                        className="bg-gray-800 hover:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center border border-gray-700 shadow-md transition-transform hover:scale-110"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    id={`save-${key}`}
                    checked={savingThrows[attrKey as keyof typeof savingThrows]}
                    onChange={(e) => {
                      const newSavingThrows = { ...savingThrows }
                      newSavingThrows[attrKey as keyof typeof savingThrows] = e.target.checked
                      updateSavingThrows(newSavingThrows)
                    }}
                    className="mr-2 h-4 w-4 accent-violet-600"
                  />
                  <label htmlFor={`save-${key}`} className="text-sm text-white">
                    Resistência
                  </label>
                </div>
              </div>

              {/* Tooltip de descrição */}
              <div
                className={`absolute -bottom-16 left-0 right-0 bg-gray-800 p-2 rounded text-xs text-white text-center z-10 shadow-lg border border-gray-700 transition-opacity duration-200 ${
                  isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {info.description}
              </div>
            </div>
          )
        })}
      </div>

      {/* Visualização de dados */}
      <div className="relative mt-8 mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-900 px-4 text-sm text-gray-400">Visualização de Dados</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {Object.entries(attributes).map(([key, value]) => {
          const attrKey = key as keyof typeof attributeInfo
          const info = attributeInfo[attrKey]

          return (
            <div key={key} className="flex flex-col items-center">
              <div className="text-sm font-medium text-white mb-2">
                {info.name} ({info.abbr})
              </div>
              <div className="flex items-center justify-center space-x-1">
                {Array.from({ length: value }).map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-full bg-gradient-to-br ${info.color}`}></div>
                ))}
                {Array.from({ length: 10 - value }).map((_, i) => (
                  <div key={i + value} className="w-4 h-4 rounded-full bg-gray-800 border border-gray-700"></div>
                ))}
              </div>
              <div className="mt-2 text-sm text-white">{value > 0 ? `${value}d20` : "0d20"}</div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 border border-gray-700 rounded bg-gray-800/50">
        <h3 className="text-center text-lg font-semibold mb-4 text-white">Sistema de Sucesso</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-gray-800 rounded-lg shadow-inner border border-gray-700">
            <div className="font-bold text-white text-lg">12+</div>
            <div className="text-sm text-gray-300">Sucesso Básico</div>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-inner border border-gray-700">
            <div className="font-bold text-violet-400 text-lg">15+</div>
            <div className="text-sm text-gray-300">Sucesso Garantido</div>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-inner border border-gray-700">
            <div className="font-bold text-violet-300 text-lg">18+</div>
            <div className="text-sm text-gray-300">Sucesso Alto</div>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-inner border border-gray-700">
            <div className="font-bold text-violet-200 text-lg">20</div>
            <div className="text-sm text-gray-300">Sucesso Extremo</div>
          </div>
        </div>
      </div>
    </div>
  )
}
