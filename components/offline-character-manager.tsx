"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { CharacterData } from "@/lib/types"
import { migrateCharacterData, CURRENT_DATA_VERSION } from "@/lib/data-migration"

interface OfflineCharacterManagerProps {
  onLoadCharacter: (characterId: string) => void
  onDeleteCharacter: (characterId: string) => void
  onNewCharacter: () => void
  currentCharacter: CharacterData | null
  selectedCharacterId?: string | null
}

export default function OfflineCharacterManager({
  onLoadCharacter,
  onDeleteCharacter,
  onNewCharacter,
  currentCharacter,
  selectedCharacterId,
}: OfflineCharacterManagerProps) {
  const [savedCharacters, setSavedCharacters] = useState<CharacterData[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedData = localStorage.getItem("savedCharacters")
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          if (Array.isArray(parsedData)) {
            return parsedData
          }
        }
      } catch (error) {
        console.error("Erro ao carregar personagens salvos:", error)
      }
    }
    return []
  })
  const [message, setMessage] = useState<{ type: "success" | "error" | "warning"; text: string } | null>(null)

  // Carregar personagens salvos do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("savedCharacters")
    if (saved) {
      try {
        setSavedCharacters(JSON.parse(saved))
      } catch (error) {
        console.error("Erro ao carregar personagens salvos:", error)
        setSavedCharacters([])
      }
    }
  }, [])

  // Função para salvar o personagem atual no localStorage
  const saveCurrentCharacter = () => {
    if (!currentCharacter) {
      setMessage({
        type: "error",
        text: "Nenhum personagem para salvar",
      })
      return
    }

    try {
      // Adicionar a versão atual ao personagem antes de salvar
      const characterToSave = {
        ...currentCharacter,
        version: CURRENT_DATA_VERSION,
      }

      const characterName = characterToSave.name || "Personagem sem nome"
      const characterData = JSON.stringify(characterToSave)

      // Verificar se já existe um personagem com este nome
      const newSavedCharacters = [
        ...savedCharacters.filter((char) => char.name !== characterName),
        { name: characterName, data: characterData },
      ]

      // Salvar no localStorage
      localStorage.setItem("savedCharacters", JSON.stringify(newSavedCharacters))
      setSavedCharacters(newSavedCharacters)

      setMessage({
        type: "success",
        text: `Personagem "${characterName}" salvo com sucesso!`,
      })

      // Limpar a mensagem após 3 segundos
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Erro ao salvar personagem:", error)
      setMessage({
        type: "error",
        text: "Erro ao salvar personagem",
      })
    }
  }

  // Função para carregar um personagem do localStorage
  const loadCharacter = (savedData: string) => {
    try {
      const parsedData = JSON.parse(savedData)

      // Migrar dados para a versão atual se necessário
      const migratedData = migrateCharacterData(parsedData)

      // Verificar se houve migração
      if (parsedData.version !== migratedData.version) {
        setMessage({
          type: "warning",
          text: `Personagem migrado da versão ${parsedData.version || 1} para a versão ${migratedData.version}. Recomendamos salvar novamente.`,
        })

        // Limpar a mensagem após 5 segundos
        setTimeout(() => setMessage(null), 5000)
      } else {
        setMessage({
          type: "success",
          text: "Personagem carregado com sucesso!",
        })

        // Limpar a mensagem após 3 segundos
        setTimeout(() => setMessage(null), 3000)
      }

      onLoadCharacter(migratedData.id)
    } catch (error) {
      console.error("Erro ao carregar personagem:", error)
      setMessage({
        type: "error",
        text: "Erro ao carregar personagem",
      })
    }
  }

  // Função para excluir um personagem do localStorage
  const deleteCharacter = (name: string) => {
    if (!confirm(`Tem certeza que deseja excluir o personagem "${name}"?`)) return

    try {
      const newSavedCharacters = savedCharacters.filter((char) => char.name !== name)
      localStorage.setItem("savedCharacters", JSON.stringify(newSavedCharacters))
      setSavedCharacters(newSavedCharacters)

      setMessage({
        type: "success",
        text: `Personagem "${name}" excluído com sucesso!`,
      })

      // Limpar a mensagem após 3 segundos
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Erro ao excluir personagem:", error)
      setMessage({
        type: "error",
        text: "Erro ao excluir personagem",
      })
    }
  }

  // Função para exportar um personagem como arquivo JSON
  const exportCharacter = (name: string, data: string) => {
    try {
      const blob = new Blob([data], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${name}.json`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)

      setMessage({
        type: "success",
        text: `Personagem "${name}" exportado com sucesso!`,
      })

      // Limpar a mensagem após 3 segundos
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Erro ao exportar personagem:", error)
      setMessage({
        type: "error",
        text: "Erro ao exportar personagem",
      })
    }
  }

  // Função para importar um personagem de um arquivo JSON
  const importCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importedCharacter = JSON.parse(content)

        // Migrar dados para a versão atual se necessário
        const migratedData = migrateCharacterData(importedCharacter)

        // Verificar se houve migração
        if (importedCharacter.version !== migratedData.version) {
          setMessage({
            type: "warning",
            text: `Personagem migrado da versão ${importedCharacter.version || 1} para a versão ${migratedData.version}. Recomendamos salvar novamente.`,
          })

          // Limpar a mensagem após 5 segundos
          setTimeout(() => setMessage(null), 5000)
        }

        // Salvar no localStorage e carregar o personagem
        const characterName = migratedData.name || "Personagem importado"
        const characterData = JSON.stringify(migratedData)

        const newSavedCharacters = [
          ...savedCharacters.filter((char) => char.name !== characterName),
          { name: characterName, data: characterData },
        ]

        localStorage.setItem("savedCharacters", JSON.stringify(newSavedCharacters))
        setSavedCharacters(newSavedCharacters)

        // Carregar o personagem
        onLoadCharacter(migratedData.id)
      } catch (error) {
        console.error("Erro ao importar personagem:", error)
        setMessage({
          type: "error",
          text: "Erro ao importar personagem. Verifique se o arquivo é válido.",
        })
      }
    }

    reader.onerror = () => {
      setMessage({
        type: "error",
        text: "Erro ao ler o arquivo. Tente novamente.",
      })
    }

    reader.readAsText(file)

    // Limpar o valor do input para permitir selecionar o mesmo arquivo novamente
    event.target.value = ""
  }

  if (savedCharacters.length === 0) {
    return (
      <Card className="p-4 bg-[#1a1a1a] border-2 border-gray-800 text-gray-200">
        <div className="text-center">
          <p className="mb-4 text-gray-400">Nenhum personagem salvo ainda.</p>
          <Button onClick={onNewCharacter} className="bg-red-900 hover:bg-red-800">
            Criar Novo Personagem
          </Button>
        </div>
      </Card>
    )
  }

  return null // Não renderizar nada, pois o gerenciamento foi movido para a página principal
}
