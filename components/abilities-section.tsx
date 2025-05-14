"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react"
import type { CharacterData } from "@/lib/types"
import { subclassesData } from "@/lib/subclasses-data"
import { originsData } from "@/lib/origins-data"

interface AbilitiesSectionProps {
  character: CharacterData
  updateCharacter: (updates: Partial<CharacterData>) => void
}

export default function AbilitiesSection({ character, updateCharacter }: AbilitiesSectionProps) {
  const [expandedAbility, setExpandedAbility] = useState<string | null>(null)

  // Obter a subclasse atual do personagem
  const currentSubclass = character.subclass
    ? subclassesData.find((subclass) => subclass.id === character.subclass)
    : null

  // Obter a origem atual do personagem
  const currentOrigin = character.origin ? originsData.find((origin) => origin.id === character.origin) : null

  // Efeito para sincronizar as habilidades da subclasse quando a subclasse muda
  useEffect(() => {
    if (currentSubclass) {
      syncSubclassAbilities(currentSubclass.id)
    }
  }, [character.subclass]) // Executar apenas quando a subclasse mudar

  // Função para sincronizar as habilidades da subclasse
  const syncSubclassAbilities = (subclassId: string) => {
    const subclass = subclassesData.find((s) => s.id === subclassId)
    if (!subclass) return

    // Remover habilidades antigas da subclasse
    const filteredAbilities = character.abilities.filter((ability) => ability.source !== "subclass")

    // Criar novas habilidades da subclasse
    const subclassAbilities = subclass.abilities.map((ability) => ({
      id: `${subclassId}-${ability.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: ability.name,
      description: ability.description,
      ntpRequired: ability.ntpRequired,
      isActive: false,
      source: "subclass",
    }))

    // Atualizar o personagem com as novas habilidades
    updateCharacter({
      abilities: [...filteredAbilities, ...subclassAbilities],
    })
  }

  // Função para alternar a expansão de uma habilidade
  const toggleAbilityExpansion = (abilityId: string) => {
    if (expandedAbility === abilityId) {
      setExpandedAbility(null)
    } else {
      setExpandedAbility(abilityId)
    }
  }

  // Função para alternar o estado ativo de uma habilidade
  const toggleAbilityActive = (abilityId: string) => {
    const updatedAbilities = character.abilities.map((ability) => {
      if (ability.id === abilityId) {
        return { ...ability, isActive: !ability.isActive }
      }
      return ability
    })
    updateCharacter({ abilities: updatedAbilities })
  }

  // Função para adicionar uma habilidade ao personagem
  const addAbility = (name: string, description: string, ntpRequired: number, source: string) => {
    // Verificar se a habilidade já existe
    const abilityExists = character.abilities.some((ability) => ability.name === name && ability.source === source)
    if (abilityExists) return

    const newAbility = {
      id: `custom-${Date.now().toString()}`,
      name,
      description,
      ntpRequired,
      isActive: false,
      source,
    }

    updateCharacter({ abilities: [...character.abilities, newAbility] })
  }

  // Função para remover uma habilidade do personagem
  const removeAbility = (abilityId: string) => {
    const updatedAbilities = character.abilities.filter((ability) => ability.id !== abilityId)
    updateCharacter({ abilities: updatedAbilities })
  }

  // Função para mudar a subclasse do personagem
  const changeSubclass = (subclassId: string) => {
    // Atualizar a subclasse do personagem
    updateCharacter({ subclass: subclassId })
  }

  // Filtrar subclasses disponíveis para a classe atual
  const availableSubclasses = subclassesData.filter(
    (subclass) => subclass.parentClass === character.class || character.class === "",
  )

  // Filtrar habilidades de subclasse disponíveis para o NTP atual
  const availableSubclassAbilities = character.abilities.filter(
    (ability) => ability.source === "subclass" && ability.ntpRequired <= character.ntp,
  )

  // Filtrar habilidades de subclasse não disponíveis para o NTP atual
  const unavailableSubclassAbilities = character.abilities.filter(
    (ability) => ability.source === "subclass" && ability.ntpRequired > character.ntp,
  )

  // Filtrar outras habilidades (não de subclasse)
  const otherAbilities = character.abilities.filter((ability) => ability.source !== "subclass")

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Habilidades</h2>

      {/* Seleção de Subclasse */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-white">Subclasse</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {availableSubclasses.length > 0 ? (
            availableSubclasses.map((subclass) => (
              <Button
                key={subclass.id}
                onClick={() => changeSubclass(subclass.id)}
                className={`h-auto py-2 text-left flex flex-col items-start ${
                  currentSubclass?.id === subclass.id
                    ? "bg-amber-700 hover:bg-amber-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <span className="font-bold">{subclass.name}</span>
                <span className="text-xs opacity-80 mt-1 line-clamp-2">{subclass.description}</span>
              </Button>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-4">
              Selecione uma classe para ver as subclasses disponíveis
            </div>
          )}
        </div>
      </div>

      {/* Exibição da Subclasse Atual */}
      {currentSubclass && (
        <div className="mb-6 p-4 bg-gray-800 rounded-md border border-gray-700">
          <h3 className="text-lg font-semibold text-amber-400">{currentSubclass.name}</h3>
          <p className="text-gray-300 mt-1">{currentSubclass.description}</p>

          <div className="mt-4">
            <h4 className="font-medium text-white mb-2">Habilidades da Subclasse:</h4>
            <div className="space-y-2">
              {currentSubclass.abilities.map((ability) => (
                <div
                  key={ability.name}
                  className={`p-3 bg-gray-900 rounded-md border ${
                    character.ntp >= ability.ntpRequired ? "border-amber-600" : "border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-white">{ability.name}</h5>
                    <Badge
                      className={
                        character.ntp >= ability.ntpRequired
                          ? "bg-amber-700 hover:bg-amber-600"
                          : "bg-gray-700 hover:bg-gray-600"
                      }
                    >
                      {ability.ntpRequired}% NTP
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mt-1 whitespace-pre-line">{ability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exibição da Origem Atual */}
      {currentOrigin && (
        <div className="mb-6 p-4 bg-gray-800 rounded-md border border-amber-700">
          <h3 className="text-lg font-semibold text-amber-400">{currentOrigin.name}</h3>
          <p className="text-gray-300 mt-1">{currentOrigin.description}</p>

          <div className="mt-4">
            <h4 className="font-medium text-white mb-2">Habilidade de Origem:</h4>
            <div className="p-3 bg-gray-900 rounded-md border border-amber-600">
              <h5 className="font-medium text-white">{currentOrigin.ability.name}</h5>
              <p className="text-sm text-gray-300 mt-1 whitespace-pre-line">{currentOrigin.ability.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Habilidades Ativas */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-white">Habilidades Disponíveis</h3>

        {/* Habilidades de Origem */}
        {otherAbilities.filter((ability) => ability.source === "origin").length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-amber-400 mb-2 border-b border-gray-700 pb-1">Habilidades de Origem</h4>
            <div className="space-y-2">
              {otherAbilities
                .filter((ability) => ability.source === "origin")
                .map((ability) => (
                  <Card
                    key={ability.id}
                    className={`p-3 bg-gray-800 border ${
                      ability.isActive ? "border-green-600" : "border-gray-700"
                    } hover:border-gray-600 transition-colors`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => toggleAbilityExpansion(ability.id)}
                        >
                          <h4 className="font-medium text-white">{ability.name}</h4>
                          {expandedAbility === ability.id ? (
                            <ChevronUp className="h-4 w-4 ml-2" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-2" />
                          )}
                          <Badge className="ml-2 bg-amber-700">Origem</Badge>
                        </div>

                        {expandedAbility === ability.id && (
                          <p className="text-sm text-gray-300 mt-2 whitespace-pre-line">{ability.description}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleAbilityActive(ability.id)}
                          className={`h-8 w-8 ${
                            ability.isActive
                              ? "text-green-500 hover:text-green-400"
                              : "text-gray-500 hover:text-gray-400"
                          }`}
                          title={ability.isActive ? "Desativar habilidade" : "Ativar habilidade"}
                        >
                          {ability.isActive ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Habilidades de Subclasse Disponíveis */}
        {availableSubclassAbilities.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-amber-400 mb-2 border-b border-gray-700 pb-1">Habilidades de Subclasse</h4>
            <div className="space-y-2">
              {availableSubclassAbilities.map((ability) => (
                <Card
                  key={ability.id}
                  className={`p-3 bg-gray-800 border ${
                    ability.isActive ? "border-green-600" : "border-gray-700"
                  } hover:border-gray-600 transition-colors`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => toggleAbilityExpansion(ability.id)}
                      >
                        <h4 className="font-medium text-white">{ability.name}</h4>
                        {expandedAbility === ability.id ? (
                          <ChevronUp className="h-4 w-4 ml-2" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-2" />
                        )}
                        <Badge className="ml-2 bg-amber-700">{ability.ntpRequired}% NTP</Badge>
                        <Badge className="ml-2 bg-purple-700">Subclasse</Badge>
                      </div>

                      {expandedAbility === ability.id && (
                        <p className="text-sm text-gray-300 mt-2 whitespace-pre-line">{ability.description}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleAbilityActive(ability.id)}
                        className={`h-8 w-8 ${
                          ability.isActive ? "text-green-500 hover:text-green-400" : "text-gray-500 hover:text-gray-400"
                        }`}
                        title={ability.isActive ? "Desativar habilidade" : "Ativar habilidade"}
                      >
                        {ability.isActive ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Outras Habilidades */}
        {otherAbilities.filter((ability) => ability.source !== "origin").length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-amber-400 mb-2 border-b border-gray-700 pb-1">Outras Habilidades</h4>
            <div className="space-y-2">
              {otherAbilities
                .filter((ability) => ability.source !== "origin")
                .map((ability) => (
                  <Card
                    key={ability.id}
                    className={`p-3 bg-gray-800 border ${
                      ability.isActive ? "border-green-600" : "border-gray-700"
                    } hover:border-gray-600 transition-colors`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => toggleAbilityExpansion(ability.id)}
                        >
                          <h4 className="font-medium text-white">{ability.name}</h4>
                          {expandedAbility === ability.id ? (
                            <ChevronUp className="h-4 w-4 ml-2" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-2" />
                          )}
                          {ability.ntpRequired > 0 && (
                            <Badge className="ml-2 bg-amber-700">{ability.ntpRequired}% NTP</Badge>
                          )}
                          <Badge className="ml-2 bg-blue-700">{ability.source}</Badge>
                        </div>

                        {expandedAbility === ability.id && (
                          <p className="text-sm text-gray-300 mt-2 whitespace-pre-line">{ability.description}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleAbilityActive(ability.id)}
                          className={`h-8 w-8 ${
                            ability.isActive
                              ? "text-green-500 hover:text-green-400"
                              : "text-gray-500 hover:text-gray-400"
                          }`}
                          title={ability.isActive ? "Desativar habilidade" : "Ativar habilidade"}
                        >
                          {ability.isActive ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAbility(ability.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-400"
                          title="Remover habilidade"
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Habilidades de Subclasse Não Disponíveis */}
        {unavailableSubclassAbilities.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-400 mb-2 border-b border-gray-700 pb-1">
              Habilidades de Subclasse (NTP Insuficiente)
            </h4>
            <div className="space-y-2">
              {unavailableSubclassAbilities.map((ability) => (
                <Card key={ability.id} className="p-3 bg-gray-800 border border-gray-700 opacity-70">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => toggleAbilityExpansion(ability.id)}
                      >
                        <h4 className="font-medium text-gray-400">{ability.name}</h4>
                        {expandedAbility === ability.id ? (
                          <ChevronUp className="h-4 w-4 ml-2 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
                        )}
                        <Badge className="ml-2 bg-red-900">{ability.ntpRequired}% NTP</Badge>
                        <Badge className="ml-2 bg-gray-700">Subclasse</Badge>
                      </div>

                      {expandedAbility === ability.id && (
                        <p className="text-sm text-gray-400 mt-2 whitespace-pre-line">{ability.description}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {character.abilities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma habilidade adicionada. Selecione uma subclasse ou origem para adicionar habilidades.
          </div>
        )}
      </div>

      {/* Seção para adicionar habilidades personalizadas */}
      <div className="mt-6 p-4 border border-gray-700 rounded bg-gray-800/50">
        <h3 className="text-center text-lg font-semibold mb-2 text-white">Adicionar Habilidade Personalizada</h3>
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            placeholder="Nome da habilidade"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
            id="custom-ability-name"
          />
          <textarea
            placeholder="Descrição da habilidade"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white min-h-[100px]"
            id="custom-ability-description"
          ></textarea>
          <div className="flex items-center gap-2">
            <span className="text-white">NTP Requerido:</span>
            <input
              type="number"
              min="0"
              max="100"
              defaultValue="0"
              className="w-20 p-2 bg-gray-900 border border-gray-700 rounded text-white"
              id="custom-ability-ntp"
            />
            <Button
              onClick={() => {
                const nameEl = document.getElementById("custom-ability-name") as HTMLInputElement
                const descEl = document.getElementById("custom-ability-description") as HTMLTextAreaElement
                const ntpEl = document.getElementById("custom-ability-ntp") as HTMLInputElement

                if (nameEl && descEl && ntpEl && nameEl.value.trim()) {
                  addAbility(nameEl.value, descEl.value, Number.parseInt(ntpEl.value) || 0, "custom")
                  nameEl.value = ""
                  descEl.value = ""
                  ntpEl.value = "0"
                }
              }}
              className="ml-auto bg-amber-700 hover:bg-amber-600"
            >
              Adicionar Habilidade
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
