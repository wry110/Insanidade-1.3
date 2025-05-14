"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Trash2 } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface CharacterImageProps {
  images: CharacterData["images"]
  updateImages: (images: CharacterData["images"]) => void
  health: CharacterData["health"]
}

export default function CharacterImage({ images, updateImages, health }: CharacterImageProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<"normal" | "wounded" | "dying">("normal")

  // Determinar qual imagem mostrar com base na saúde atual
  useEffect(() => {
    const healthPercentage = health.maximum > 0 ? health.current / health.maximum : 0

    if (health.current <= 0) {
      setActiveType("dying")
      setActiveImage(images.dying || images.wounded || images.normal || null)
    } else if (healthPercentage <= 0.5) {
      setActiveType("wounded")
      setActiveImage(images.wounded || images.normal || null)
    } else {
      setActiveType("normal")
      setActiveImage(images.normal || null)
    }
  }, [health.current, health.maximum, images])

  const handleImageUpload = (type: "normal" | "wounded" | "dying", event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const newImages = { ...images }
      newImages[type] = e.target?.result as string
      updateImages(newImages)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = (type: "normal" | "wounded" | "dying") => {
    const newImages = { ...images }
    newImages[type] = ""
    updateImages(newImages)
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Imagem do Personagem</h2>

      <div className="flex flex-col items-center">
        {/* Exibição da imagem atual */}
        <div className="w-full aspect-square max-w-xs mb-4 bg-gray-800 border border-gray-700 rounded-md overflow-hidden flex items-center justify-center">
          {activeImage ? (
            <img
              src={activeImage || "/placeholder.svg"}
              alt="Personagem"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-gray-500 text-center p-4">
              <p>Nenhuma imagem</p>
              <p className="text-sm">Faça upload abaixo</p>
            </div>
          )}
        </div>

        {/* Status da imagem atual */}
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-400">
            Estado atual:
            <span
              className={`ml-1 font-medium ${
                activeType === "normal"
                  ? "text-green-400"
                  : activeType === "wounded"
                    ? "text-yellow-400"
                    : "text-red-500"
              }`}
            >
              {activeType === "normal" ? "Normal" : activeType === "wounded" ? "Ferido" : "Morrendo"}
            </span>
          </p>
        </div>

        {/* Upload de imagens */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {[
            { type: "normal" as const, label: "Normal", color: "bg-green-900 hover:bg-green-800" },
            { type: "wounded" as const, label: "Ferido", color: "bg-yellow-900 hover:bg-yellow-800" },
            { type: "dying" as const, label: "Morrendo", color: "bg-red-900 hover:bg-red-800" },
          ].map((item) => (
            <div key={item.type} className="flex flex-col items-center">
              <div className="relative w-full">
                <Button
                  className={`w-full ${item.color}`}
                  disabled={!images[item.type]}
                  onClick={() => removeImage(item.type)}
                >
                  {images[item.type] ? (
                    <>
                      <Trash2 className="h-4 w-4 mr-1" /> Remover
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-1" /> {item.label}
                    </>
                  )}
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(item.type, e)}
                  className={`absolute inset-0 opacity-0 cursor-pointer ${images[item.type] ? "hidden" : ""}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
