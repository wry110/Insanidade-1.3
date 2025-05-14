"use client"

import type { CharacterData } from "@/lib/types"
import CharacterBasicInfo from "./character-basic-info"
import OriginSelection from "./origin-selection"
import ClassSelection from "./class-selection"
import CircularAttributes from "./circular-attributes"

interface CharacterInfoProps {
  character: CharacterData
  updateCharacter: (updates: Partial<CharacterData>) => void
}

export default function CharacterInfo({ character, updateCharacter }: CharacterInfoProps) {
  const updateAttributes = (attributes: CharacterData["attributes"]) => {
    updateCharacter({ attributes })
  }

  const updateSavingThrows = (savingThrows: CharacterData["savingThrows"]) => {
    updateCharacter({ savingThrows })
  }

  return (
    <div className="space-y-6">
      <CharacterBasicInfo character={character} updateCharacter={updateCharacter} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OriginSelection character={character} updateCharacter={updateCharacter} />
        <ClassSelection character={character} updateCharacter={updateCharacter} />
      </div>

      <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
        <CircularAttributes
          attributes={character.attributes}
          updateAttributes={updateAttributes}
          savingThrows={character.savingThrows}
          updateSavingThrows={updateSavingThrows}
        />
      </div>
    </div>
  )
}
