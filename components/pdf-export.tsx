"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { CharacterData } from "@/lib/types"
import { jsPDF } from "jspdf"
import "jspdf-autotable"

interface PdfExportProps {
  character: CharacterData
}

// Adicionar a declaração de tipos para jsPDF-autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export default function PdfExport({ character }: PdfExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  const [exportSuccess, setExportSuccess] = useState<boolean>(false)

  const exportToPdf = async () => {
    setIsExporting(true)
    setExportError(null)
    setExportSuccess(false)

    try {
      // Criar um novo documento PDF
      const doc = new jsPDF()

      // Configurações de fonte
      doc.setFont("helvetica", "bold")
      doc.setFontSize(20)

      // Título do documento
      doc.text(`Ficha de Personagem: ${character.name}`, 14, 22)

      // Informações básicas
      doc.setFontSize(16)
      doc.text("Informações Básicas", 14, 35)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(12)
      doc.text(`Classe: ${character.class}`, 14, 45)
      doc.text(`Subclasse: ${character.subclass || "Nenhuma"}`, 14, 52)
      doc.text(`Origem: ${character.race}`, 14, 59)
      doc.text(`Histórico: ${character.background}`, 14, 66)
      doc.text(`Tendência: ${character.alignment}`, 14, 73)
      doc.text(`NTP: ${character.ntp}%`, 14, 80)

      // Status
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.text("Status", 14, 95)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(12)
      doc.text(`Pontos de Vida: ${character.health.current}/${character.health.maximum}`, 14, 105)
      doc.text(`Sanidade: ${character.sanity.current}/${character.sanity.maximum}`, 14, 112)
      doc.text(`Pontos de Esforço: ${character.effortPoints.current}/${character.effortPoints.maximum}`, 14, 119)
      doc.text(`Defesa: ${character.armorClass}`, 14, 126)
      doc.text(`Iniciativa: ${character.initiative}`, 14, 133)
      doc.text(`Deslocamento: ${character.speed}`, 14, 140)

      // Atributos
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.text("Atributos", 14, 155)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(12)
      doc.text(`Força: ${character.attributes.forca}`, 14, 165)
      doc.text(`Agilidade: ${character.attributes.agilidade}`, 14, 172)
      doc.text(`Intelecto: ${character.attributes.intelecto}`, 14, 179)
      doc.text(`Disposição: ${character.attributes.disposicao}`, 14, 186)
      doc.text(`Vigor: ${character.attributes.vigor}`, 14, 193)

      // Armas
      if (character.weapons.length > 0) {
        doc.addPage()
        doc.setFont("helvetica", "bold")
        doc.setFontSize(16)
        doc.text("Armas", 14, 22)

        const weaponsData = character.weapons.map((weapon) => [
          weapon.name,
          weapon.type,
          weapon.damage,
          weapon.damageType,
          weapon.range || "-",
          `${weapon.criticalThreshold || 20}+ (x${weapon.criticalMultiplier || 2})`,
        ])

        doc.autoTable({
          startY: 30,
          head: [["Nome", "Tipo", "Dano", "Tipo de Dano", "Alcance", "Crítico"]],
          body: weaponsData,
        })
      }

      // Inventário
      if (character.inventory.length > 0) {
        doc.addPage()
        doc.setFont("helvetica", "bold")
        doc.setFontSize(16)
        doc.text("Inventário", 14, 22)

        const inventoryData = character.inventory.map((item) => [
          item.name,
          item.quantity,
          item.weight,
          item.category || "-",
          item.description || "-",
        ])

        doc.autoTable({
          startY: 30,
          head: [["Nome", "Qtd", "Peso", "Categoria", "Descrição"]],
          body: inventoryData,
        })
      }

      // Rituais
      if (character.rituals.length > 0) {
        doc.addPage()
        doc.setFont("helvetica", "bold")
        doc.setFontSize(16)
        doc.text("Rituais", 14, 22)

        const ritualsData = character.rituals.map((ritual) => [
          ritual.name,
          ritual.level,
          ritual.type,
          ritual.damage || "-",
          ritual.description || "-",
        ])

        doc.autoTable({
          startY: 30,
          head: [["Nome", "Nível", "Tipo", "Dano", "Descrição"]],
          body: ritualsData,
        })
      }

      // Habilidades
      if (character.abilities.length > 0) {
        doc.addPage()
        doc.setFont("helvetica", "bold")
        doc.setFontSize(16)
        doc.text("Habilidades", 14, 22)

        const abilitiesData = character.abilities.map((ability) => [
          ability.name,
          ability.ntpRequired + "%",
          ability.source,
          ability.isActive ? "Sim" : "Não",
          ability.description || "-",
        ])

        doc.autoTable({
          startY: 30,
          head: [["Nome", "NTP Req.", "Fonte", "Ativa", "Descrição"]],
          body: abilitiesData,
        })
      }

      // Notas
      if (character.notes) {
        doc.addPage()
        doc.setFont("helvetica", "bold")
        doc.setFontSize(16)
        doc.text("Anotações", 14, 22)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(12)

        // Quebrar o texto em linhas para caber na página
        const splitText = doc.splitTextToSize(character.notes, 180)
        doc.text(splitText, 14, 32)
      }

      // Salvar o PDF
      doc.save(`${character.name || "personagem"}.pdf`)

      setExportSuccess(true)
      setTimeout(() => setExportSuccess(false), 3000)
    } catch (error) {
      console.error("Erro ao exportar PDF:", error)
      setExportError("Ocorreu um erro ao exportar o PDF. Tente novamente.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Exportar Ficha</h2>

      <div className="flex flex-col items-center">
        <p className="text-gray-300 mb-4 text-center">
          Exporte sua ficha de personagem para um arquivo PDF editável que pode ser compartilhado ou impresso.
        </p>

        <Button
          onClick={exportToPdf}
          disabled={isExporting}
          className="bg-red-900 hover:bg-red-800 text-white w-full max-w-xs"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exportando...
            </>
          ) : (
            <>
              <FileDown className="mr-2 h-4 w-4" /> Exportar PDF Editável
            </>
          )}
        </Button>

        {exportError && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{exportError}</AlertDescription>
          </Alert>
        )}

        {exportSuccess && (
          <Alert className="mt-4 bg-green-900 border-green-800">
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription>Ficha exportada com sucesso!</AlertDescription>
          </Alert>
        )}

        <div className="mt-4 text-sm text-gray-400">
          <p>O PDF exportado contém:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Informações básicas do personagem</li>
            <li>Atributos e perícias</li>
            <li>Inventário e equipamentos</li>
            <li>Habilidades de classe e subclasse</li>
            <li>Rituais e anotações</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
