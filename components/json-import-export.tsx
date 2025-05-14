"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { CharacterData } from "@/lib/types"
import { migrateCharacterData, CURRENT_DATA_VERSION } from "@/lib/data-migration"

interface JsonImportExportProps {
  character: CharacterData
  onImport: (character: CharacterData) => void
}

export default function JsonImportExport({ character, onImport }: JsonImportExportProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)

  // Função para exportar o personagem como arquivo JSON
  const handleExport = () => {
    try {
      // Adicionar a versão atual ao personagem antes de exportar
      const characterToExport = {
        ...character,
        version: CURRENT_DATA_VERSION,
      }

      // Criar um objeto Blob com os dados do personagem
      const characterJson = JSON.stringify(characterToExport, null, 2)
      const blob = new Blob([characterJson], { type: "application/json" })

      // Criar uma URL para o Blob
      const url = URL.createObjectURL(blob)

      // Criar um elemento <a> para download
      const link = document.createElement("a")
      link.href = url
      link.download = `${character.name || "personagem"}.json`

      // Adicionar o link ao documento, clicar nele e removê-lo
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Liberar a URL
      URL.revokeObjectURL(url)

      setSuccess("Personagem exportado com sucesso!")
      setError(null)
      setWarning(null)

      // Limpar a mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error("Erro ao exportar personagem:", err)
      setError("Erro ao exportar personagem. Tente novamente.")
      setSuccess(null)
      setWarning(null)
    }
  }

  // Função para importar um personagem de um arquivo JSON
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          setWarning(
            `Personagem migrado da versão ${importedCharacter.version || 1} para a versão ${migratedData.version}. Recomendamos salvar novamente.`,
          )

          // Limpar a mensagem de aviso após 5 segundos
          setTimeout(() => setWarning(null), 5000)
        }

        // Chamar a função de callback com os dados importados
        onImport(migratedData)

        setSuccess("Personagem importado com sucesso!")
        setError(null)

        // Limpar a mensagem de sucesso após 3 segundos
        setTimeout(() => setSuccess(null), 3000)
      } catch (err) {
        console.error("Erro ao importar personagem:", err)
        setError("Erro ao importar personagem. Verifique se o arquivo é válido.")
        setSuccess(null)
        setWarning(null)
      }
    }

    reader.onerror = () => {
      setError("Erro ao ler o arquivo. Tente novamente.")
      setSuccess(null)
      setWarning(null)
    }

    reader.readAsText(file)

    // Limpar o valor do input para permitir selecionar o mesmo arquivo novamente
    event.target.value = ""
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleExport} className="bg-blue-700 hover:bg-blue-600 flex-1">
          <Download className="mr-2 h-4 w-4" /> Exportar Personagem (JSON)
        </Button>

        <div className="relative flex-1">
          <Button className="bg-purple-700 hover:bg-purple-600 w-full">
            <Upload className="mr-2 h-4 w-4" /> Importar Personagem (JSON)
          </Button>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Importar personagem de arquivo JSON"
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {warning && (
        <Alert className="bg-amber-900 border-amber-800">
          <AlertTitle>Aviso</AlertTitle>
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-900 border-green-800">
          <AlertTitle>Sucesso</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
