"use client"

import { useState } from "react"
import { Dice1, Dice3, Dice5, Dice6 } from "lucide-react"

interface DiceRollerProps {
  sanityMax?: number
}

export default function DiceRoller({ sanityMax = 0 }: DiceRollerProps) {
  const [result, setResult] = useState<number | null>(null)
  const [diceType, setDiceType] = useState<number>(20)
  const [modifier, setModifier] = useState<number>(0)
  const [rolling, setRolling] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [rollHistory, setRollHistory] = useState<
    Array<{
      diceType: number
      result: number
      modifier: number
      total: number
      timestamp: Date
    }>
  >([])
  const [diceResults, setDiceResults] = useState<{ dice: string; result: number; timestamp: number }[]>([])

  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1
    setDiceResults([
      { dice: `d${sides}`, result, timestamp: Date.now() },
      ...diceResults.slice(0, 9), // Manter apenas os últimos 10 resultados
    ])
  }

  const rollDiceWithModifier = () => {
    setRolling(true)

    // Simulate rolling animation
    const rolls = 10
    let currentRoll = 0

    const rollInterval = setInterval(() => {
      const randomResult = Math.floor(Math.random() * diceType) + 1
      setResult(randomResult)

      currentRoll++
      if (currentRoll >= rolls) {
        clearInterval(rollInterval)
        setRolling(false)

        // Add to history
        const newRoll = {
          diceType,
          result: randomResult,
          modifier,
          total: randomResult + modifier,
          timestamp: new Date(),
        }

        setRollHistory((prev) => [newRoll, ...prev].slice(0, 10))
      }
    }, 100)
  }

  const clearHistory = () => {
    setRollHistory([])
  }

  const getDiceIcon = () => {
    switch (diceType) {
      case 4:
        return <Dice1 className="h-6 w-6" />
      case 6:
        return <Dice6 className="h-6 w-6" />
      case 8:
        return <Dice1 className="h-6 w-6 transform rotate-45" />
      case 10:
        return <Dice5 className="h-6 w-6" />
      case 12:
        return <Dice3 className="h-6 w-6" />
      case 20:
      default:
        return <Dice5 className="h-6 w-6 transform rotate-45" />
    }
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-violet-500">Rolagem de Dados</h2>

      <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-4">
        <button onClick={() => rollDice(4)} className="bg-gray-800 hover:bg-gray-700 text-white">
          d4
        </button>
        <button onClick={() => rollDice(6)} className="bg-gray-800 hover:bg-gray-700 text-white">
          d6
        </button>
        <button onClick={() => rollDice(8)} className="bg-gray-800 hover:bg-gray-700 text-white">
          d8
        </button>
        <button onClick={() => rollDice(10)} className="bg-gray-800 hover:bg-gray-700 text-white">
          d10
        </button>
        <button onClick={() => rollDice(12)} className="bg-gray-800 hover:bg-gray-700 text-white">
          d12
        </button>
        <button onClick={() => rollDice(20)} className="bg-gray-800 hover:bg-gray-700 text-white">
          d20
        </button>
        <button onClick={() => rollDice(100)} className="bg-gray-800 hover:bg-gray-700 text-white">
          d100
        </button>
      </div>

      <div>
        {/* Resultados dos dados normais */}
        <div className="bg-gray-800 rounded-md p-3 border border-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-white">Resultados</h3>
          {diceResults.length > 0 ? (
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {diceResults.map((roll, index) => (
                <div
                  key={roll.timestamp + index}
                  className="flex justify-between items-center p-2 bg-gray-900 rounded border border-gray-700"
                >
                  <span className="text-gray-300">Dado: {roll.dice}</span>
                  <span className="text-xl font-bold text-white">{roll.result}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400">Nenhum dado rolado ainda</div>
          )}
        </div>
      </div>
    </div>
  )
}
