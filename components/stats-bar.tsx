"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Skull, ChevronUp, ChevronDown, Heart, Brain, Zap, Info } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StatsBarProps {
  health: {
    current: number
    maximum: number
    temporary: number
  }
  sanity: {
    current: number
    maximum: number
    traumas: Array<{
      id: string
      name: string
      description: string
      severity: "leve" | "moderado" | "severo"
      effect: string
      triggered: boolean
    }>
    resistances: Array<string>
    weaknesses: Array<string>
  }
  effortPoints: {
    current: number
    maximum: number
  }
  updateHealth: (health: {
    current: number
    maximum: number
    temporary: number
  }) => void
  updateSanity: (sanity: {
    current: number
    maximum: number
    traumas: Array<{
      id: string
      name: string
      description: string
      severity: "leve" | "moderado" | "severo"
      effect: string
      triggered: boolean
    }>
    resistances: Array<string>
    weaknesses: Array<string>
  }) => void
  updateEffortPoints: (effortPoints: {
    current: number
    maximum: number
  }) => void
}

export default function StatsBar({
  health,
  sanity,
  effortPoints,
  updateHealth,
  updateSanity,
  updateEffortPoints,
}: StatsBarProps) {
  const [showSanityResult, setShowSanityResult] = useState(false)
  const [sanityRoll, setSanityRoll] = useState(0)
  const [sanitySuccess, setSanitySuccess] = useState(false)
  const [showTooltips, setShowTooltips] = useState(true)

  const adjustHealth = (amount: number) => {
    const newCurrent = Math.max(0, Math.min(health.current + amount, health.maximum + health.temporary))
    updateHealth({
      ...health,
      current: newCurrent,
    })
  }

  const adjustSanity = (amount: number) => {
    const newCurrent = Math.max(0, Math.min(sanity.current + amount, sanity.maximum))
    updateSanity({
      ...sanity,
      current: newCurrent,
    })
  }

  const adjustEffortPoints = (amount: number) => {
    const newCurrent = Math.max(0, Math.min(effortPoints.current + amount, effortPoints.maximum))
    updateEffortPoints({
      ...effortPoints,
      current: newCurrent,
    })
  }

  const fillHealth = () => {
    updateHealth({
      ...health,
      current: health.maximum + health.temporary,
    })
  }

  const emptyHealth = () => {
    updateHealth({
      ...health,
      current: 0,
    })
  }

  const fillSanity = () => {
    updateSanity({
      ...sanity,
      current: sanity.maximum,
    })
  }

  const emptySanity = () => {
    updateSanity({
      ...sanity,
      current: 0,
    })
  }

  const fillEffortPoints = () => {
    updateEffortPoints({
      ...effortPoints,
      current: effortPoints.maximum,
    })
  }

  const emptyEffortPoints = () => {
    updateEffortPoints({
      ...effortPoints,
      current: 0,
    })
  }

  const getHealthColor = () => {
    const healthPercentage = health.current / health.maximum
    if (healthPercentage <= 0.25) return "bg-violet-900"
    if (healthPercentage <= 0.5) return "bg-violet-800"
    return "bg-violet-600"
  }

  const getSanityColor = () => {
    const sanityPercentage = sanity.current / sanity.maximum
    if (sanityPercentage <= 0.25) return "bg-purple-900"
    if (sanityPercentage <= 0.5) return "bg-purple-800"
    return "bg-purple-600"
  }

  const getEffortColor = () => {
    const effortPercentage = effortPoints.current / effortPoints.maximum
    if (effortPercentage <= 0.25) return "bg-blue-900"
    if (effortPercentage <= 0.5) return "bg-blue-800"
    return "bg-blue-600"
  }

  const rollSanityCheck = () => {
    const roll = Math.floor(Math.random() * 100) + 1
    const success = roll <= sanity.current
    setSanityRoll(roll)
    setSanitySuccess(success)
    setShowSanityResult(true)

    // Esconder o resultado após 5 segundos
    setTimeout(() => {
      setShowSanityResult(false)
    }, 5000)
  }

  return (
    <TooltipProvider>
      <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-violet-500">Status</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-white"
            onClick={() => setShowTooltips(!showTooltips)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Barra de Vida */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-violet-500 mr-2" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label className="text-sm font-medium text-violet-400 cursor-help">Pontos de Vida</label>
                  </TooltipTrigger>
                  {showTooltips && (
                    <TooltipContent side="top" className="bg-gray-900 border-gray-700 text-white">
                      <p className="max-w-xs">
                        Representa a saúde física do seu personagem. Ao chegar a 0, seu personagem fica inconsciente.
                      </p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={emptyHealth}
                  title="Zerar vida"
                >
                  <Skull className="h-3 w-3 text-violet-500" />
                </Button>
                <span className="text-sm font-bold text-white">
                  {health.current}/{health.maximum}
                  {health.temporary > 0 && <span className="text-green-400"> (+{health.temporary})</span>}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={fillHealth}
                  title="Encher vida"
                >
                  <RefreshCw className="h-3 w-3 text-green-500" />
                </Button>
              </div>
            </div>
            <div className="w-full bg-gray-800 h-8 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full ${getHealthColor()} transition-all duration-500 ease-out`}
                style={{
                  width: `${Math.min(100, (health.current / Math.max(1, health.maximum)) * 100)}%`,
                }}
              ></div>
            </div>

            <div className="mt-2 flex justify-center space-x-2">
              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700 text-white"
                  onClick={() => adjustHealth(-5)}
                  title="Reduzir 5 PV"
                >
                  -5
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700"
                  onClick={() => adjustHealth(-1)}
                  title="Reduzir 1 PV"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700"
                  onClick={() => adjustHealth(1)}
                  title="Aumentar 1 PV"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700 text-white"
                  onClick={() => adjustHealth(5)}
                  title="Aumentar 5 PV"
                >
                  +5
                </Button>
              </div>
            </div>
          </div>

          {/* Barra de Sanidade */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Brain className="h-5 w-5 text-purple-500 mr-2" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label className="text-sm font-medium text-purple-400 cursor-help">Sanidade</label>
                  </TooltipTrigger>
                  {showTooltips && (
                    <TooltipContent side="top" className="bg-gray-900 border-gray-700 text-white">
                      <p className="max-w-xs">
                        Representa a estabilidade mental. Testes de sanidade são feitos com d100 - você precisa rolar
                        igual ou abaixo do seu valor atual.
                      </p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={emptySanity}
                  title="Zerar sanidade"
                >
                  <Skull className="h-3 w-3 text-violet-500" />
                </Button>
                <span className="text-sm font-bold text-white">
                  {sanity.current}/{sanity.maximum}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={fillSanity}
                  title="Encher sanidade"
                >
                  <RefreshCw className="h-3 w-3 text-green-500" />
                </Button>
              </div>
            </div>
            <div className="w-full bg-gray-800 h-8 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full ${getSanityColor()} transition-all duration-500 ease-out`}
                style={{
                  width: `${Math.min(100, (sanity.current / Math.max(1, sanity.maximum)) * 100)}%`,
                }}
              ></div>
            </div>

            <div className="mt-2 flex justify-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 p-0 px-2 bg-gray-900 border-gray-700 text-white"
                    title="Teste de Sanidade"
                    onClick={rollSanityCheck}
                  >
                    d100
                  </Button>
                </TooltipTrigger>
                {showTooltips && (
                  <TooltipContent side="bottom" className="bg-gray-900 border-gray-700 text-white">
                    <p>Rolar teste de sanidade (d100)</p>
                  </TooltipContent>
                )}
              </Tooltip>
              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700 text-white"
                  onClick={() => adjustSanity(-5)}
                  title="Reduzir 5 Sanidade"
                >
                  -5
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700"
                  onClick={() => adjustSanity(-1)}
                  title="Reduzir 1 Sanidade"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700"
                  onClick={() => adjustSanity(1)}
                  title="Aumentar 1 Sanidade"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700 text-white"
                  onClick={() => adjustSanity(5)}
                  title="Aumentar 5 Sanidade"
                >
                  +5
                </Button>
              </div>
            </div>

            {/* Resultado do teste de sanidade */}
            {showSanityResult && (
              <div className="absolute right-0 -bottom-16 z-10 p-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg w-48">
                <div className="text-center">
                  <p className="text-sm text-gray-300">Rolagem d100:</p>
                  <p className="text-xl font-bold text-white">{sanityRoll}</p>
                  <div
                    className={`mt-1 p-1 rounded ${
                      sanitySuccess ? "bg-green-900/50 border-green-700" : "bg-violet-900/50 border-violet-700"
                    } border`}
                  >
                    <p className={`text-xs font-bold ${sanitySuccess ? "text-green-400" : "text-violet-400"}`}>
                      {sanitySuccess ? "SUCESSO" : "FALHA"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Barra de Pontos de Esforço */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-blue-500 mr-2" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label className="text-sm font-medium text-blue-400 cursor-help">Pontos de Esforço</label>
                  </TooltipTrigger>
                  {showTooltips && (
                    <TooltipContent side="top" className="bg-gray-900 border-gray-700 text-white">
                      <p className="max-w-xs">
                        Usados para ativar habilidades especiais e conjurar rituais. Recuperados com descanso.
                      </p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={emptyEffortPoints}
                  title="Zerar pontos de esforço"
                >
                  <Skull className="h-3 w-3 text-violet-500" />
                </Button>
                <span className="text-sm font-bold text-white">
                  {effortPoints.current}/{effortPoints.maximum}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={fillEffortPoints}
                  title="Encher pontos de esforço"
                >
                  <RefreshCw className="h-3 w-3 text-green-500" />
                </Button>
              </div>
            </div>
            <div className="w-full bg-gray-800 h-8 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full ${getEffortColor()} transition-all duration-500 ease-out`}
                style={{
                  width: `${Math.min(100, (effortPoints.current / Math.max(1, effortPoints.maximum)) * 100)}%`,
                }}
              ></div>
            </div>

            <div className="mt-2 flex justify-center space-x-2">
              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700 text-white"
                  onClick={() => adjustEffortPoints(-5)}
                  title="Reduzir 5 PE"
                >
                  -5
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700"
                  onClick={() => adjustEffortPoints(-1)}
                  title="Reduzir 1 PE"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700"
                  onClick={() => adjustEffortPoints(1)}
                  title="Aumentar 1 PE"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 bg-gray-900 border-gray-700 text-white"
                  onClick={() => adjustEffortPoints(5)}
                  title="Aumentar 5 PE"
                >
                  +5
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
