"use client"

import { ArrowUp, ArrowDown } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface CircularAttributesProps {
  attributes: CharacterData["attributes"]
  updateAttributes: (attributes: CharacterData["attributes"]) => void
  savingThrows: CharacterData["savingThrows"]
  updateSavingThrows: (savingThrows: CharacterData["savingThrows"]) => void
}

export default function CircularAttributes({
  attributes,
  updateAttributes,
  savingThrows,
  updateSavingThrows,
}: CircularAttributesProps) {
  const attributeNames = {
    forca: { name: "FORÇA", abbr: "FOR" },
    agilidade: { name: "AGILIDADE", abbr: "AGI" },
    intelecto: { name: "INTELECTO", abbr: "INT" },
    disposicao: { name: "DISPOSIÇÃO", abbr: "DIS" },
    vigor: { name: "VIGOR", abbr: "VIG" },
  }

  const adjustAttribute = (key: keyof typeof attributes, amount: number) => {
    const newValue = Math.min(10, Math.max(0, attributes[key] + amount))
    const newAttributes = { ...attributes }
    newAttributes[key] = newValue
    updateAttributes(newAttributes)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-5 gap-4 w-full max-w-3xl mt-4">
        {Object.entries(attributes).map(([key, value]) => {
          const attrKey = key as keyof typeof attributeNames
          const info = attributeNames[attrKey]

          return (
            <div key={key} className="flex flex-col items-center">
              <div className="text-lg font-bold">{value}</div>
              <div className="text-xs text-gray-400">{info.name}</div>
              <div className="text-sm font-bold text-purple-400">{info.abbr}</div>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => adjustAttribute(attrKey, -1)}
                  className="bg-gray-800 hover:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <ArrowDown className="h-3 w-3" />
                </button>
                <button
                  onClick={() => adjustAttribute(attrKey, 1)}
                  className="bg-gray-800 hover:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <ArrowUp className="h-3 w-3" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
