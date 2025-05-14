"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface FearTraumaSectionProps {
  fearLevel: number
  traumaLevel: number
  updateFearLevel: (level: number) => void
  updateTraumaLevel: (level: number) => void
}

export default function FearTraumaSection({
  fearLevel,
  traumaLevel,
  updateFearLevel,
  updateTraumaLevel,
}: FearTraumaSectionProps) {
  const maxFearLevel = 4
  const maxTraumaLevel = 3

  const toggleFearLevel = (level: number) => {
    if (fearLevel === level) {
      updateFearLevel(level - 1)
    } else {
      updateFearLevel(level)
    }
  }

  const toggleTraumaLevel = (level: number) => {
    if (traumaLevel === level) {
      updateTraumaLevel(level - 1)
    } else {
      updateTraumaLevel(level)
    }
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h3 className="text-lg font-bold text-center mb-4 text-purple-400">Condições</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <Label className="text-sm font-medium mb-2 text-white">Medo</Label>
          <div className="flex justify-center space-x-2">
            {Array.from({ length: maxFearLevel }).map((_, i) => {
              const level = i + 1
              const isFilled = fearLevel >= level
              return (
                <button
                  key={`fear-${level}`}
                  onClick={() => toggleFearLevel(level)}
                  className={`w-6 h-6 border rounded-full transition-colors ${
                    isFilled ? "bg-purple-500 border-purple-400" : "border-purple-500 bg-transparent"
                  }`}
                  title={`Nível de Medo ${level}`}
                />
              )
            })}
          </div>
          <div className="mt-2 text-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateFearLevel(0)}
              className="text-xs bg-gray-800 border-gray-700 text-white"
            >
              Limpar
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Label className="text-sm font-medium mb-2 text-white">Trauma</Label>
          <div className="flex justify-center space-x-2">
            {Array.from({ length: maxTraumaLevel }).map((_, i) => {
              const level = i + 1
              const isFilled = traumaLevel >= level
              return (
                <button
                  key={`trauma-${level}`}
                  onClick={() => toggleTraumaLevel(level)}
                  className={`w-6 h-6 border rounded-full transition-colors ${
                    isFilled ? "bg-red-500 border-red-400" : "border-red-500 bg-transparent"
                  }`}
                  title={`Nível de Trauma ${level}`}
                />
              )
            })}
          </div>
          <div className="mt-2 text-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateTraumaLevel(0)}
              className="text-xs bg-gray-800 border-gray-700 text-white"
            >
              Limpar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
