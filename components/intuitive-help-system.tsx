"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HelpCircle, X, ChevronRight, ChevronLeft } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface HelpTip {
  id: string
  title: string
  content: string
  section: string
}

const helpTips: HelpTip[] = [
  {
    id: "attributes",
    title: "Atributos",
    content:
      "Os atributos representam as capacidades básicas do seu personagem. O valor (0-10) indica quantos dados você joga em testes relacionados.",
    section: "attributes",
  },
  {
    id: "skills",
    title: "Perícias",
    content:
      "Perícias são habilidades específicas que seu personagem pode ter. O nível de treinamento (sem treino, treinado, veterano, expert) fornece bônus nos testes.",
    section: "skills",
  },
  {
    id: "sanity",
    title: "Sanidade",
    content:
      "A sanidade representa a estabilidade mental do seu personagem. Testes de sanidade são feitos com d100 - você precisa rolar igual ou abaixo do seu valor atual para ter sucesso.",
    section: "stats",
  },
  {
    id: "ntp",
    title: "Nível de Terror Presenciado (NTP)",
    content:
      "O NTP representa quanto seu personagem já enfrentou o sobrenatural. A cada 5% de NTP, seus pontos máximos de vida e esforço aumentam.",
    section: "combat",
  },
  {
    id: "rituals",
    title: "Rituais",
    content:
      "Rituais são poderes sobrenaturais. Alguns rituais têm versões mais poderosas (Discente e Verdadeiro) que custam mais PE para conjurar.",
    section: "rituals",
  },
  {
    id: "fear-trauma",
    title: "Medo e Trauma",
    content:
      "Níveis de medo representam o estado atual de seu personagem frente ao terror. Traumas são efeitos de longo prazo causados por experiências traumáticas.",
    section: "fear-trauma",
  },
]

export default function IntuitiveHelpSystem() {
  const [showHelp, setShowHelp] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [showTutorial, setShowTutorial] = useState(false)

  // Verificar se é a primeira vez que o usuário acessa a aplicação
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial")
    if (!hasSeenTutorial) {
      setShowTutorial(true)
    }
  }, [])

  const closeTutorial = () => {
    setShowTutorial(false)
    localStorage.setItem("hasSeenTutorial", "true")
  }

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % helpTips.length)
  }

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + helpTips.length) % helpTips.length)
  }

  const currentTip = helpTips[currentTipIndex]

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full h-12 w-12 shadow-lg z-50"
              onClick={() => setShowHelp(!showHelp)}
            >
              <HelpCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Ajuda e Dicas</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {showHelp && (
        <Card className="fixed bottom-20 right-4 w-80 p-4 bg-gray-800 border-gray-700 text-white shadow-lg z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{currentTip.title}</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowHelp(false)} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-300 mb-4">{currentTip.content}</p>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={prevTip} className="bg-gray-700 hover:bg-gray-600">
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <Button variant="outline" size="sm" onClick={nextTip} className="bg-gray-700 hover:bg-gray-600">
              Próximo <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Card>
      )}

      {showTutorial && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg p-6 bg-gray-800 border-gray-700 text-white">
            <h2 className="text-2xl font-bold text-center mb-4 text-red-500">Bem-vindo à Ficha de Personagem</h2>
            <p className="text-gray-300 mb-4">
              Esta é uma ficha de personagem interativa para seu TTRPG de horror. Aqui estão algumas dicas para começar:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  Use as <strong>abas</strong> para navegar entre diferentes seções da ficha
                </span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  Clique nos <strong>botões de dado</strong> para fazer rolagens automáticas
                </span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  Ajuste o <strong>NTP</strong> para aumentar seus pontos de vida e esforço
                </span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  Use o <strong>botão de ajuda</strong> (canto inferior direito) para ver dicas a qualquer momento
                </span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Button onClick={closeTutorial} className="bg-red-900 hover:bg-red-800">
                Entendi, vamos começar!
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
