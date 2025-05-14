"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skull, Dices, ArrowRight } from "lucide-react"
import type { CharacterData } from "@/lib/types"
import CharacterSheet from "@/components/character-sheet"
import { migrateCharacterData, CURRENT_DATA_VERSION } from "@/lib/data-migration"
import Link from "next/link"

export default function OfflinePage() {
  const [showCreation, setShowCreation] = useState(true)
  const [creationStep, setCreationStep] = useState(1)
  const [character, setCharacter] = useState<CharacterData>({
    name: "",
    class: "",
    subclass: "",
    race: "",
    background: "",
    alignment: "",
    ntp: 5,
    origin: "",
    images: {
      normal: "/placeholder.svg?height=300&width=300",
      wounded: "/placeholder.svg?height=300&width=300",
      dying: "/placeholder.svg?height=300&width=300",
    },
    attributes: {
      forca: 1,
      agilidade: 1,
      intelecto: 1,
      disposicao: 1,
      vigor: 1,
    },
    skills: {
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
    inventory: [],
    rituals: [],
    abilities: [],
    notes: "",
    health: {
      current: 10,
      maximum: 10,
      temporary: 0,
    },
    sanity: {
      current: 10,
      maximum: 10,
    },
    effortPoints: {
      current: 1,
      maximum: 1,
    },
    savingThrows: {
      forca: false,
      agilidade: false,
      intelecto: false,
      disposicao: false,
      vigor: false,
    },
    armorClass: 10,
    initiative: 0,
    speed: 9,
    weapons: [],
    fearLevel: 0,
    traumaLevel: 0,
    version: CURRENT_DATA_VERSION,
  })

  const [savedCharacters, setSavedCharacters] = useState<CharacterData[]>([])
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null)

  // Carregar personagens salvos
  useEffect(() => {
    const loadSavedCharacters = () => {
      try {
        const savedData = localStorage.getItem("savedCharacters")
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          if (Array.isArray(parsedData)) {
            // Migrar dados antigos se necessário
            const migratedCharacters = parsedData.map((char) => migrateCharacterData(char))
            setSavedCharacters(migratedCharacters)
          }
        }
      } catch (error) {
        console.error("Erro ao carregar personagens salvos:", error)
      }
    }

    loadSavedCharacters()
  }, []) // Executar apenas uma vez na montagem

  const handleCreateCharacter = () => {
    // Inicializar valores baseados na classe
    let maxHealth = 10
    let maxSanity = 10
    let maxEffort = 1

    const { vigor, disposicao } = character.attributes

    switch (character.class) {
      case "Lutador":
        maxHealth = 20 + vigor
        maxSanity = 40 + disposicao
        maxEffort = 2 + disposicao
        break
      case "Prático":
        maxHealth = 16 + vigor
        maxSanity = 50 + disposicao
        maxEffort = 3 + disposicao
        break
      case "Ocultista":
        maxHealth = 12 + vigor
        maxSanity = 60 + disposicao
        maxEffort = 4 + disposicao
        break
      case "Mundano":
        maxHealth = 10 + vigor
        maxSanity = 10 + disposicao
        maxEffort = 1 + disposicao
        break
    }

    const newCharacter = {
      ...character,
      id: `char_${Date.now()}`,
      health: {
        current: maxHealth,
        maximum: maxHealth,
        temporary: 0,
      },
      sanity: {
        current: maxSanity,
        maximum: maxSanity,
      },
      effortPoints: {
        current: maxEffort,
        maximum: maxEffort,
      },
    }

    // Atualizar o personagem
    setCharacter(newCharacter)

    // Fechar a tela de criação
    setShowCreation(false)

    // Salvar o novo personagem
    const updatedCharacters = [...savedCharacters, newCharacter]
    setSavedCharacters(updatedCharacters)
    localStorage.setItem("savedCharacters", JSON.stringify(updatedCharacters))
    setSelectedCharacterId(newCharacter.id)
  }

  const handleLoadCharacter = (characterId: string) => {
    const selectedChar = savedCharacters.find((char) => char.id === characterId)
    if (selectedChar) {
      setCharacter(selectedChar)
      setShowCreation(false)
      setSelectedCharacterId(characterId)
    }
  }

  // Modificado para evitar loops de atualização
  const handleSaveCharacter = (updatedCharacter: CharacterData) => {
    // Verificar se o personagem realmente mudou para evitar atualizações desnecessárias
    if (JSON.stringify(character) === JSON.stringify(updatedCharacter)) {
      return // Sair se não houver mudanças
    }

    // Atualizar o personagem atual
    setCharacter(updatedCharacter)

    // Atualizar na lista de personagens salvos
    const updatedCharacters = savedCharacters.map((char) => (char.id === updatedCharacter.id ? updatedCharacter : char))

    setSavedCharacters(updatedCharacters)
    localStorage.setItem("savedCharacters", JSON.stringify(updatedCharacters))
  }

  const handleDeleteCharacter = (characterId: string) => {
    const updatedCharacters = savedCharacters.filter((char) => char.id !== characterId)
    setSavedCharacters(updatedCharacters)
    localStorage.setItem("savedCharacters", JSON.stringify(updatedCharacters))

    // Se o personagem atual foi excluído, voltar para a tela de criação
    if (selectedCharacterId === characterId) {
      setShowCreation(true)
      setSelectedCharacterId(null)
    }
  }

  const handleNewCharacter = () => {
    setCharacter({
      name: "",
      class: "",
      subclass: "",
      race: "",
      background: "",
      alignment: "",
      ntp: 5,
      origin: "",
      images: {
        normal: "/placeholder.svg?height=300&width=300",
        wounded: "/placeholder.svg?height=300&width=300",
        dying: "/placeholder.svg?height=300&width=300",
      },
      attributes: {
        forca: 1,
        agilidade: 1,
        intelecto: 1,
        disposicao: 1,
        vigor: 1,
      },
      skills: {
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
      inventory: [],
      rituals: [],
      abilities: [],
      notes: "",
      health: {
        current: 10,
        maximum: 10,
        temporary: 0,
      },
      sanity: {
        current: 10,
        maximum: 10,
      },
      effortPoints: {
        current: 1,
        maximum: 1,
      },
      savingThrows: {
        forca: false,
        agilidade: false,
        intelecto: false,
        disposicao: false,
        vigor: false,
      },
      armorClass: 10,
      initiative: 0,
      speed: 9,
      weapons: [],
      fearLevel: 0,
      traumaLevel: 0,
      version: CURRENT_DATA_VERSION,
    })
    setShowCreation(true)
    setSelectedCharacterId(null)
    setCreationStep(1)
  }

  const nextStep = () => {
    setCreationStep(creationStep + 1)
  }

  const prevStep = () => {
    setCreationStep(creationStep - 1)
  }

  return (
    <main className="min-h-screen bg-[#121212] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 flex items-center justify-center">
            <Skull className="h-8 w-8 mr-2" />
            Ficha de Personagem
            <Dices className="h-8 w-8 ml-2" />
          </h1>
          <p className="text-gray-400 mt-2">Sistema de RPG de Horror</p>
          <div className="mt-4">
            <Link href="/">
              <Button variant="outline" className="bg-gray-900 border-gray-700">
                Voltar para Início
              </Button>
            </Link>
          </div>
        </header>

        {/* Gerenciador de personagens */}
        {savedCharacters.length > 0 && (
          <div className="mb-6">
            <Card className="p-4 bg-[#1a1a1a] border-2 border-gray-800 text-gray-200">
              <h2 className="text-xl font-bold mb-4 text-center text-red-500">Personagens Salvos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedCharacters.map((char) => (
                  <div
                    key={char.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedCharacterId === char.id
                        ? "bg-red-900 border-2 border-red-700"
                        : "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                    }`}
                    onClick={() => handleLoadCharacter(char.id!)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{char.name || "Sem Nome"}</h3>
                      <span className="text-sm text-gray-400">{char.class}</span>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm("Tem certeza que deseja excluir este personagem?")) {
                            handleDeleteCharacter(char.id!)
                          }
                        }}
                        className="bg-red-800 hover:bg-red-700 h-7 text-xs"
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button onClick={handleNewCharacter} className="bg-red-900 hover:bg-red-800">
                  Criar Novo Personagem
                </Button>
              </div>
            </Card>
          </div>
        )}

        {showCreation ? (
          <Card className="p-6 bg-[#1a1a1a] border-2 border-gray-800 text-gray-200 mt-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-red-500">Criar Novo Personagem</h2>

            {creationStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome do Personagem</Label>
                    <Input
                      id="name"
                      value={character.name}
                      onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="class">Classe</Label>
                    <Select
                      value={character.class}
                      onValueChange={(value) => setCharacter({ ...character, class: value })}
                    >
                      <SelectTrigger id="class" className="bg-gray-900 border-gray-700 text-white">
                        <SelectValue placeholder="Selecione uma classe" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        <SelectItem value="Lutador">Lutador</SelectItem>
                        <SelectItem value="Ocultista">Ocultista</SelectItem>
                        <SelectItem value="Prático">Prático</SelectItem>
                        <SelectItem value="Mundano">Mundano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="background">Antecedente</Label>
                    <Input
                      id="background"
                      value={character.background}
                      onChange={(e) => setCharacter({ ...character, background: e.target.value })}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="alignment">Tendência</Label>
                    <Input
                      id="alignment"
                      value={character.alignment}
                      onChange={(e) => setCharacter({ ...character, alignment: e.target.value })}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button onClick={nextStep} className="bg-red-900 hover:bg-red-800">
                    Próximo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {creationStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {Object.entries(character.attributes).map(([key, value]) => (
                    <div key={key}>
                      <Label htmlFor={`attr-${key}`} className="capitalize">
                        {key === "forca"
                          ? "Força"
                          : key === "disposicao"
                            ? "Disposição"
                            : key.charAt(0).toUpperCase() + key.slice(1)}
                      </Label>
                      <Input
                        id={`attr-${key}`}
                        type="number"
                        min="0"
                        max="10"
                        value={value}
                        onChange={(e) => {
                          const newValue = Math.min(10, Math.max(0, Number.parseInt(e.target.value) || 0))
                          const newAttributes = { ...character.attributes }
                          newAttributes[key as keyof typeof character.attributes] = newValue
                          setCharacter({ ...character, attributes: newAttributes })
                        }}
                        className="bg-gray-900 border-gray-700 text-white"
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-gray-800 p-4 rounded-md border border-gray-700 mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-center text-white">Guia de Atributos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-red-400 font-medium">Força (FOR)</p>
                      <p className="text-gray-300">Capacidade física, potência muscular e dano corpo a corpo.</p>
                    </div>
                    <div>
                      <p className="text-green-400 font-medium">Agilidade (AGI)</p>
                      <p className="text-gray-300">Velocidade, reflexos, coordenação e precisão.</p>
                    </div>
                    <div>
                      <p className="text-blue-400 font-medium">Intelecto (INT)</p>
                      <p className="text-gray-300">Raciocínio, memória, conhecimento e capacidade de aprendizado.</p>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-medium">Disposição (DIS)</p>
                      <p className="text-gray-300">Carisma, força de vontade e resistência mental.</p>
                    </div>
                    <div>
                      <p className="text-purple-400 font-medium">Vigor (VIG)</p>
                      <p className="text-gray-300">Resistência física, saúde e vitalidade.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button onClick={prevStep} variant="outline" className="border-gray-700 text-gray-300">
                    Voltar
                  </Button>
                  <Button
                    onClick={handleCreateCharacter}
                    disabled={!character.name || !character.class}
                    className="bg-red-900 hover:bg-red-800"
                  >
                    Criar Personagem
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ) : (
          <CharacterSheet character={character} setCharacter={handleSaveCharacter} />
        )}
      </div>
    </main>
  )
}
