"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Shield, Edit } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface InventorySectionProps {
  inventory: CharacterData["inventory"]
  updateInventory: (inventory: CharacterData["inventory"]) => void
  armorClass: number
  updateArmorClass: (armorClass: number) => void
  attributes?: CharacterData["attributes"]
}

export default function InventorySection({
  inventory,
  updateInventory,
  armorClass,
  updateArmorClass,
  attributes = { forca: 0, agilidade: 0, intelecto: 0, disposicao: 0, vigor: 0 },
}: InventorySectionProps) {
  // Estado para o novo item
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    loadPoints: 0,
    description: "",
    category: "Itens Gerais",
    defenseBonus: 0,
    // Propriedades para armas
    damage: "",
    damageType: "Físico",
    criticalThreshold: 20,
    criticalMultiplier: 2,
    range: "",
    properties: "",
  })

  // Estado para o item em edição
  const [editingItem, setEditingItem] = useState<null | (typeof newItem & { id: string })>(null)

  const itemCategories = ["Proteções", "Armas", "Itens Gerais", "Armas Amaldiçoadas"]

  // Adicionar os tipos de dano após a definição de itemCategories
  const damageTypes = [
    "Físico",
    "Balístico",
    "Cortante",
    "Perfurante",
    "Contundente",
    "Fogo",
    "Elétrico",
    "Químico",
    "Mental",
    "Ocultismo",
    "Conhecimento",
    "Sangue",
    "Morte",
    "Energia",
    "Outro",
  ]

  // Modificar a função addItem para incluir as propriedades de armas quando necessário
  const addItem = () => {
    if (newItem.name.trim() === "") return

    let newItemWithId = { ...newItem, id: Date.now().toString() }

    // Remover propriedades específicas de armas se não for uma arma
    if (newItem.category !== "Armas" && newItem.category !== "Armas Amaldiçoadas") {
      // @ts-ignore - Removendo propriedades que não são necessárias para itens não-armas
      const { damage, damageType, criticalThreshold, criticalMultiplier, range, properties, ...rest } = newItemWithId
      newItemWithId = { ...rest }
    }

    updateInventory([...inventory, newItemWithId])

    // Resetar o formulário
    setNewItem({
      name: "",
      quantity: 1,
      loadPoints: 0,
      description: "",
      category: "Itens Gerais",
      defenseBonus: 0,
      damage: "",
      damageType: "Físico",
      criticalThreshold: 20,
      criticalMultiplier: 2,
      range: "",
      properties: "",
    })
  }

  const removeItem = (id: string) => {
    updateInventory(inventory.filter((item) => item.id !== id))
  }

  // Iniciar edição de um item
  const startEditing = (item: any) => {
    setEditingItem(item)
  }

  // Salvar as alterações do item em edição
  const saveEditedItem = () => {
    if (!editingItem) return

    const updatedInventory = inventory.map((item) => (item.id === editingItem.id ? editingItem : item))

    updateInventory(updatedInventory)
    setEditingItem(null)
  }

  // Cancelar a edição
  const cancelEditing = () => {
    setEditingItem(null)
  }

  // Atualizar o item em edição
  const updateEditingItem = (field: string, value: any) => {
    if (!editingItem) return
    setEditingItem({ ...editingItem, [field]: value })
  }

  // Calcular pontos de carga total
  const totalLoadPoints = inventory.reduce((sum, item) => sum + item.loadPoints * item.quantity, 0)

  // Calcular capacidade máxima de carga baseada na força
  const maxLoadPoints = attributes.forca > 0 ? attributes.forca * 5 : 3

  // Agrupar itens por categoria
  const groupedItems = inventory.reduce(
    (acc, item) => {
      const category = item.category || "Itens Gerais"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, typeof inventory>,
  )

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Inventário</h2>

      {/* Formulário para adicionar novo item */}
      <div className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-700">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <Label htmlFor="item-name">Nome do Item</Label>
            <Input
              id="item-name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="item-quantity">Qtd</Label>
            <Input
              id="item-quantity"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 1 })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="item-load-points">Pontos de Carga</Label>
            <Input
              id="item-load-points"
              type="number"
              value={newItem.loadPoints}
              onChange={(e) => setNewItem({ ...newItem, loadPoints: Number.parseFloat(e.target.value) || 0 })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-3 flex items-end">
            <Button onClick={addItem} className="w-full bg-gray-700 hover:bg-gray-600">
              <Plus className="mr-1 h-4 w-4" /> Adicionar
            </Button>
          </div>

          <div className="col-span-6">
            <Label htmlFor="item-category">Categoria</Label>
            <Select
              value={newItem.category}
              onValueChange={(value) =>
                setNewItem({
                  ...newItem,
                  category: value,
                  // Resetar o bônus de defesa se não for uma proteção
                  defenseBonus: value === "Proteções" ? newItem.defenseBonus : 0,
                })
              }
            >
              <SelectTrigger id="item-category" className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {itemCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {newItem.category === "Proteções" && (
            <div className="col-span-6">
              <Label htmlFor="item-defense-bonus">Bônus de Defesa</Label>
              <Input
                id="item-defense-bonus"
                type="number"
                value={newItem.defenseBonus}
                onChange={(e) => setNewItem({ ...newItem, defenseBonus: Number.parseInt(e.target.value) || 0 })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          )}

          {(newItem.category === "Armas" || newItem.category === "Armas Amaldiçoadas") && (
            <>
              <div className="col-span-3">
                <Label htmlFor="item-damage">Dano</Label>
                <Input
                  id="item-damage"
                  value={newItem.damage}
                  onChange={(e) => setNewItem({ ...newItem, damage: e.target.value })}
                  placeholder="2d6+3"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div className="col-span-3">
                <Label htmlFor="item-damage-type">Tipo de Dano</Label>
                <Select
                  value={newItem.damageType}
                  onValueChange={(value) => setNewItem({ ...newItem, damageType: value })}
                >
                  <SelectTrigger id="item-damage-type" className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Tipo de Dano" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    {damageTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3">
                <Label htmlFor="item-critical-threshold">Crítico</Label>
                <Input
                  id="item-critical-threshold"
                  type="number"
                  value={newItem.criticalThreshold}
                  onChange={(e) => setNewItem({ ...newItem, criticalThreshold: Number.parseInt(e.target.value) || 20 })}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div className="col-span-3">
                <Label htmlFor="item-critical-multiplier">Multiplicador</Label>
                <Input
                  id="item-critical-multiplier"
                  type="number"
                  value={newItem.criticalMultiplier}
                  onChange={(e) => setNewItem({ ...newItem, criticalMultiplier: Number.parseInt(e.target.value) || 2 })}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div className="col-span-3">
                <Label htmlFor="item-range">Alcance</Label>
                <Input
                  id="item-range"
                  value={newItem.range}
                  onChange={(e) => setNewItem({ ...newItem, range: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div className="col-span-3">
                <Label htmlFor="item-properties">Propriedades</Label>
                <Input
                  id="item-properties"
                  value={newItem.properties}
                  onChange={(e) => setNewItem({ ...newItem, properties: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </>
          )}

          <div
            className={`col-span-${newItem.category === "Proteções" || newItem.category === "Armas" || newItem.category === "Armas Amaldiçoadas" ? "12" : "6"}`}
          >
            <Label htmlFor="item-description">Descrição</Label>
            <Input
              id="item-description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Editar Item</h3>

            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6">
                <Label htmlFor="edit-item-name">Nome do Item</Label>
                <Input
                  id="edit-item-name"
                  value={editingItem.name}
                  onChange={(e) => updateEditingItem("name", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="col-span-3">
                <Label htmlFor="edit-item-quantity">Quantidade</Label>
                <Input
                  id="edit-item-quantity"
                  type="number"
                  value={editingItem.quantity}
                  onChange={(e) => updateEditingItem("quantity", Number.parseInt(e.target.value) || 1)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="col-span-3">
                <Label htmlFor="edit-item-load-points">Pontos de Carga</Label>
                <Input
                  id="edit-item-load-points"
                  type="number"
                  value={editingItem.loadPoints}
                  onChange={(e) => updateEditingItem("loadPoints", Number.parseFloat(e.target.value) || 0)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="col-span-6">
                <Label htmlFor="edit-item-category">Categoria</Label>
                <Select value={editingItem.category} onValueChange={(value) => updateEditingItem("category", value)}>
                  <SelectTrigger id="edit-item-category" className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    {itemCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {editingItem.category === "Proteções" && (
                <div className="col-span-6">
                  <Label htmlFor="edit-item-defense-bonus">Bônus de Defesa</Label>
                  <Input
                    id="edit-item-defense-bonus"
                    type="number"
                    value={editingItem.defenseBonus}
                    onChange={(e) => updateEditingItem("defenseBonus", Number.parseInt(e.target.value) || 0)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              )}

              {(editingItem.category === "Armas" || editingItem.category === "Armas Amaldiçoadas") && (
                <>
                  <div className="col-span-4">
                    <Label htmlFor="edit-item-damage">Dano</Label>
                    <Input
                      id="edit-item-damage"
                      value={editingItem.damage}
                      onChange={(e) => updateEditingItem("damage", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="col-span-4">
                    <Label htmlFor="edit-item-damage-type">Tipo de Dano</Label>
                    <Select
                      value={editingItem.damageType}
                      onValueChange={(value) => updateEditingItem("damageType", value)}
                    >
                      <SelectTrigger id="edit-item-damage-type" className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Tipo de Dano" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        {damageTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-4">
                    <Label htmlFor="edit-item-critical-threshold">Crítico</Label>
                    <Input
                      id="edit-item-critical-threshold"
                      type="number"
                      value={editingItem.criticalThreshold}
                      onChange={(e) => updateEditingItem("criticalThreshold", Number.parseInt(e.target.value) || 20)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="col-span-4">
                    <Label htmlFor="edit-item-critical-multiplier">Multiplicador</Label>
                    <Input
                      id="edit-item-critical-multiplier"
                      type="number"
                      value={editingItem.criticalMultiplier}
                      onChange={(e) => updateEditingItem("criticalMultiplier", Number.parseInt(e.target.value) || 2)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="col-span-4">
                    <Label htmlFor="edit-item-range">Alcance</Label>
                    <Input
                      id="edit-item-range"
                      value={editingItem.range}
                      onChange={(e) => updateEditingItem("range", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="col-span-4">
                    <Label htmlFor="edit-item-properties">Propriedades</Label>
                    <Input
                      id="edit-item-properties"
                      value={editingItem.properties}
                      onChange={(e) => updateEditingItem("properties", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </>
              )}

              <div className="col-span-12">
                <Label htmlFor="edit-item-description">Descrição</Label>
                <Input
                  id="edit-item-description"
                  value={editingItem.description}
                  onChange={(e) => updateEditingItem("description", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={cancelEditing} className="border-gray-700 text-gray-300">
                Cancelar
              </Button>
              <Button onClick={saveEditedItem} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {inventory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhum item no inventário</div>
        ) : (
          Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h3 className="font-bold border-b border-gray-700 pb-1 text-yellow-400 mb-2">{category}</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-800 rounded-md border border-gray-700 flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="ml-2 text-sm text-gray-400">
                          Qtd: {item.quantity} | Carga: {item.loadPoints} pontos
                        </div>
                        {item.category === "Proteções" && item.defenseBonus && (
                          <div className="ml-2 text-sm text-green-400 flex items-center">
                            <Shield className="h-3 w-3 mr-1" /> +{item.defenseBonus} Defesa
                          </div>
                        )}
                      </div>

                      {/* Exibir informações de armas */}
                      {(item.category === "Armas" || item.category === "Armas Amaldiçoadas") && (
                        <div className="mt-1 grid grid-cols-2 gap-x-4 text-sm">
                          {item.damage && (
                            <div>
                              <span className="text-gray-400">Dano:</span>{" "}
                              <span className="text-red-400 font-medium">{item.damage}</span> ({item.damageType})
                            </div>
                          )}
                          {item.criticalThreshold && (
                            <div>
                              <span className="text-gray-400">Crítico:</span>{" "}
                              <span className="text-yellow-400">
                                {item.criticalThreshold}+ (x{item.criticalMultiplier || 2})
                              </span>
                            </div>
                          )}
                          {item.range && (
                            <div>
                              <span className="text-gray-400">Alcance:</span> {item.range}
                            </div>
                          )}
                          {item.properties && (
                            <div>
                              <span className="text-gray-400">Propriedades:</span> {item.properties}
                            </div>
                          )}
                        </div>
                      )}

                      {item.description && <p className="text-sm text-gray-400 mt-1">{item.description}</p>}
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(item)}
                        className="text-yellow-500 hover:text-yellow-400 hover:bg-gray-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-400 hover:bg-gray-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="font-medium">Pontos de Carga Total: {totalLoadPoints}</div>
        <div className={`font-medium ${totalLoadPoints > maxLoadPoints ? "text-red-500" : "text-green-500"}`}>
          Capacidade Máxima: {maxLoadPoints} pontos
          {totalLoadPoints > maxLoadPoints && (
            <span className="ml-2 text-xs text-red-400">(Sobrecarga: {totalLoadPoints - maxLoadPoints})</span>
          )}
        </div>
      </div>
      <div className="mt-1 text-xs text-gray-400">
        Capacidade baseada na Força:{" "}
        {attributes.forca > 0 ? `${attributes.forca} × 5 = ${attributes.forca * 5}` : "0 = 3"} pontos
      </div>
    </div>
  )
}
