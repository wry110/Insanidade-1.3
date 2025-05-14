"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sword, Shield, Crosshair, Skull, Edit, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CharacterData } from "@/lib/types"

interface PredefinedWeaponsProps {
  updateInventory: (inventory: CharacterData["inventory"]) => void
  updateWeapons: (weapons: CharacterData["weapons"]) => void
  inventory: CharacterData["inventory"]
  weapons: CharacterData["weapons"]
  updateArmorClass: (armorClass: number) => void
  armorClass: number
}

export default function PredefinedWeapons({
  updateInventory,
  updateWeapons,
  inventory,
  weapons,
  updateArmorClass,
  armorClass,
}: PredefinedWeaponsProps) {
  const [activeTab, setActiveTab] = useState("melee")
  const [editingItem, setEditingItem] = useState<any | null>(null)

  // Armas corpo a corpo
  const meleeWeapons = [
    {
      name: "Acha",
      category: "Armas",
      damage: "1d12",
      damageType: "Impacto",
      criticalThreshold: 20,
      criticalMultiplier: 2,
      range: "Curto",
      properties: "C - Impacto",
      loadPoints: 2,
    },
    {
      name: "Gadanho",
      category: "Armas",
      damage: "4d4",
      damageType: "Corte",
      criticalThreshold: 20,
      criticalMultiplier: 3,
      range: "Curto",
      properties: "C - Corte",
      loadPoints: 1,
    },
    {
      name: "Katana",
      category: "Armas",
      damage: "1d10",
      damageType: "Perfuração",
      criticalThreshold: 19,
      criticalMultiplier: 2,
      range: "Curto",
      properties: "C - Perfuração",
      loadPoints: 1,
    },
    {
      name: "Montante",
      category: "Armas",
      damage: "2d6",
      damageType: "Perfuração",
      criticalThreshold: 19,
      criticalMultiplier: 2,
      range: "Curto",
      properties: "C - Perfuração",
      loadPoints: 2,
    },
    {
      name: "Motosserra",
      category: "Armas",
      damage: "3d6",
      damageType: "Corte",
      criticalThreshold: 18,
      criticalMultiplier: 2,
      range: "Curto",
      properties: "C - Corte",
      loadPoints: 2,
    },
    {
      name: "Faca",
      category: "Armas",
      damage: "1d4+FOR",
      damageType: "Perfuração",
      criticalThreshold: 20,
      criticalMultiplier: 3,
      range: "Curto",
      properties: "C - Perfuração",
      loadPoints: 1,
    },
    {
      name: "Soqueira",
      category: "Armas",
      damage: "1d6+FOR",
      damageType: "Impacto",
      criticalThreshold: 18,
      criticalMultiplier: 2,
      range: "Curto",
      properties: "C - Impacto",
      loadPoints: 1,
    },
    {
      name: "Nunchaku",
      category: "Armas",
      damage: "2d6+FOR",
      damageType: "Impacto",
      criticalThreshold: 17,
      criticalMultiplier: 4,
      range: "Curto",
      properties: "C - Impacto",
      loadPoints: 1,
    },
    {
      name: "Foice",
      category: "Armas",
      damage: "1d10",
      damageType: "Corte",
      criticalThreshold: 20,
      criticalMultiplier: 3,
      range: "Curto",
      properties: "C - Corte",
      loadPoints: 2,
    },
  ]

  // Armas de longa distância
  const rangedWeapons = [
    {
      name: "Espingarda",
      category: "Armas",
      damage: "4d6",
      damageType: "Balístico",
      criticalThreshold: 20,
      criticalMultiplier: 3,
      range: "Curto",
      properties: "Balístico",
      loadPoints: 2,
    },
    {
      name: "Fuzil De Assalto",
      category: "Armas",
      damage: "2d10",
      damageType: "Balístico",
      criticalThreshold: 19,
      criticalMultiplier: 2,
      range: "Médio",
      properties: "Balístico",
      loadPoints: 2,
    },
    {
      name: "Fuzil De Precisão",
      category: "Armas",
      damage: "4d6",
      damageType: "Balístico",
      criticalThreshold: 18,
      criticalMultiplier: 2,
      range: "Longo",
      properties: "Balístico",
      loadPoints: 2,
    },
    {
      name: "Pistola",
      category: "Armas",
      damage: "1d12",
      damageType: "Balístico",
      criticalThreshold: 18,
      criticalMultiplier: 2,
      range: "Curto",
      properties: "Balístico",
      loadPoints: 1,
    },
    {
      name: "Revólver",
      category: "Armas",
      damage: "3d6",
      damageType: "Balístico",
      criticalThreshold: 18,
      criticalMultiplier: 3,
      range: "Médio",
      properties: "Balístico",
      loadPoints: 1,
    },
    {
      name: "Submetralhadora",
      category: "Armas",
      damage: "2d6",
      damageType: "Balístico",
      criticalThreshold: 20,
      criticalMultiplier: 2,
      range: "Médio",
      properties: "Balístico",
      loadPoints: 2,
    },
    {
      name: "Fuzil De Caça",
      category: "Armas",
      damage: "2d8",
      damageType: "Balístico",
      criticalThreshold: 19,
      criticalMultiplier: 3,
      range: "Médio",
      properties: "Balístico",
      loadPoints: 2,
    },
  ]

  // Armas amaldiçoadas
  const cursedWeapons = [
    {
      name: "Machado Do Flagelo",
      category: "Armas Amaldiçoadas",
      damage: "2d10+5",
      damageType: "Corte",
      criticalThreshold: 20,
      criticalMultiplier: 2,
      range: "Curto",
      properties: "C - Corte",
      loadPoints: 2,
    },
    {
      name: "Dentadura Monstruosa",
      category: "Armas Amaldiçoadas",
      damage: "1d8+5",
      damageType: "Perfuração",
      criticalThreshold: 20,
      criticalMultiplier: 3,
      range: "Curto",
      properties: "C - Perfuração",
      loadPoints: 1,
    },
    {
      name: "Garras Do Diabo",
      category: "Armas Amaldiçoadas",
      damage: "4d6+10",
      damageType: "Corte",
      criticalThreshold: 17,
      criticalMultiplier: 4,
      range: "Curto",
      properties: "C - Corte",
      loadPoints: 1,
    },
    {
      name: "Faca Do Hiu",
      category: "Armas Amaldiçoadas",
      damage: "4d6+5",
      damageType: "Perfuração",
      criticalThreshold: 18,
      criticalMultiplier: 2,
      range: "Curto",
      properties: "C - Perfuração",
      loadPoints: 1,
    },
    {
      name: "Lâminas Do Caçador",
      category: "Armas Amaldiçoadas",
      damage: "7d6+3",
      damageType: "Perfuração",
      criticalThreshold: 17,
      criticalMultiplier: 3,
      range: "Médio",
      properties: "C - Perfuração",
      loadPoints: 1,
    },
    {
      name: "Espingarda Caótica",
      category: "Armas Amaldiçoadas",
      damage: "4d6+10",
      damageType: "Balístico",
      criticalThreshold: 18,
      criticalMultiplier: 3,
      range: "Curto",
      properties: "B - Balístico",
      loadPoints: 2,
    },
  ]

  // Proteções
  const protections = [
    {
      name: "Proteção Leve",
      category: "Proteções",
      defenseBonus: 5,
      loadPoints: 3,
      description: "Proteção leve que oferece mobilidade e defesa básica.",
    },
    {
      name: "Proteção Pesada",
      category: "Proteções",
      defenseBonus: 10,
      loadPoints: 5,
      description: "Proteção pesada que oferece boa defesa com alguma restrição de mobilidade.",
    },
    {
      name: "Proteção Militar",
      category: "Proteções",
      defenseBonus: 15,
      loadPoints: 7,
      description: "Proteção militar de alta qualidade com excelente defesa.",
    },
    {
      name: "Proteção Elite",
      category: "Proteções",
      defenseBonus: 20,
      loadPoints: 10,
      description: "Proteção de elite com a melhor defesa disponível.",
    },
  ]

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

  const addToInventory = (item: any) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      quantity: 1,
    }

    updateInventory([...inventory, newItem])
  }

  const handleEditItem = (item: any) => {
    setEditingItem({ ...item })
  }

  const saveEditedItem = () => {
    if (!editingItem) return

    // Adicionar o item editado ao inventário
    addToInventory(editingItem)

    // Limpar o item em edição
    setEditingItem(null)
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Armas e Proteções Pré-definidas</h2>

      <Tabs defaultValue="melee" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4 bg-gray-800">
          <TabsTrigger value="melee" className="data-[state=active]:bg-gray-700">
            <Sword className="h-4 w-4 mr-2" /> Corpo a Corpo
          </TabsTrigger>
          <TabsTrigger value="ranged" className="data-[state=active]:bg-gray-700">
            <Crosshair className="h-4 w-4 mr-2" /> Distância
          </TabsTrigger>
          <TabsTrigger value="cursed" className="data-[state=active]:bg-gray-700">
            <Skull className="h-4 w-4 mr-2" /> Amaldiçoadas
          </TabsTrigger>
          <TabsTrigger value="protection" className="data-[state=active]:bg-gray-700">
            <Shield className="h-4 w-4 mr-2" /> Proteções
          </TabsTrigger>
        </TabsList>

        <TabsContent value="melee" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {meleeWeapons.map((weapon, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>{weapon.name}</span>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => handleEditItem(weapon)}
                            className="bg-blue-900 hover:bg-blue-800 h-7"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle>Editar Arma</DialogTitle>
                          </DialogHeader>
                          {editingItem && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                  <Label htmlFor="edit-name">Nome</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingItem.name}
                                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-damage">Dano</Label>
                                  <Input
                                    id="edit-damage"
                                    value={editingItem.damage}
                                    onChange={(e) => setEditingItem({ ...editingItem, damage: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-damage-type">Tipo de Dano</Label>
                                  <Select
                                    value={editingItem.damageType}
                                    onValueChange={(value) => setEditingItem({ ...editingItem, damageType: value })}
                                  >
                                    <SelectTrigger id="edit-damage-type" className="bg-gray-800 border-gray-700">
                                      <SelectValue placeholder="Tipo de Dano" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-gray-700">
                                      {damageTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          {type}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="edit-crit-threshold">Crítico</Label>
                                  <Input
                                    id="edit-crit-threshold"
                                    type="number"
                                    value={editingItem.criticalThreshold}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, criticalThreshold: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-crit-multiplier">Multiplicador</Label>
                                  <Input
                                    id="edit-crit-multiplier"
                                    type="number"
                                    value={editingItem.criticalMultiplier}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, criticalMultiplier: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-range">Alcance</Label>
                                  <Input
                                    id="edit-range"
                                    value={editingItem.range}
                                    onChange={(e) => setEditingItem({ ...editingItem, range: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-load-points">Pontos de Carga</Label>
                                  <Input
                                    id="edit-load-points"
                                    type="number"
                                    value={editingItem.loadPoints}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, loadPoints: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Label htmlFor="edit-properties">Propriedades</Label>
                                  <Input
                                    id="edit-properties"
                                    value={editingItem.properties}
                                    onChange={(e) => setEditingItem({ ...editingItem, properties: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                              </div>
                              <Button onClick={saveEditedItem} className="bg-green-900 hover:bg-green-800">
                                <Plus className="h-4 w-4 mr-1" /> Adicionar ao Inventário
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        onClick={() => addToInventory(weapon)}
                        className="bg-red-900 hover:bg-red-800 h-7"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Adicionar
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <div className="grid grid-cols-2 gap-x-2 text-sm">
                    <div>
                      <span className="text-gray-400">Dano:</span>{" "}
                      <span className="text-red-400 font-medium">{weapon.damage}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Tipo:</span> <span>{weapon.damageType}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Crítico:</span>{" "}
                      <span className="text-yellow-400">
                        {weapon.criticalThreshold}+ (x{weapon.criticalMultiplier})
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Alcance:</span> <span>{weapon.range}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Carga:</span> <span>{weapon.loadPoints} pontos</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Propriedades:</span> <span>{weapon.properties}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ranged" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {rangedWeapons.map((weapon, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>{weapon.name}</span>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => handleEditItem(weapon)}
                            className="bg-blue-900 hover:bg-blue-800 h-7"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle>Editar Arma</DialogTitle>
                          </DialogHeader>
                          {editingItem && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                  <Label htmlFor="edit-name">Nome</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingItem.name}
                                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-damage">Dano</Label>
                                  <Input
                                    id="edit-damage"
                                    value={editingItem.damage}
                                    onChange={(e) => setEditingItem({ ...editingItem, damage: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-damage-type">Tipo de Dano</Label>
                                  <Select
                                    value={editingItem.damageType}
                                    onValueChange={(value) => setEditingItem({ ...editingItem, damageType: value })}
                                  >
                                    <SelectTrigger id="edit-damage-type" className="bg-gray-800 border-gray-700">
                                      <SelectValue placeholder="Tipo de Dano" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-gray-700">
                                      {damageTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          {type}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="edit-crit-threshold">Crítico</Label>
                                  <Input
                                    id="edit-crit-threshold"
                                    type="number"
                                    value={editingItem.criticalThreshold}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, criticalThreshold: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-crit-multiplier">Multiplicador</Label>
                                  <Input
                                    id="edit-crit-multiplier"
                                    type="number"
                                    value={editingItem.criticalMultiplier}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, criticalMultiplier: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-range">Alcance</Label>
                                  <Input
                                    id="edit-range"
                                    value={editingItem.range}
                                    onChange={(e) => setEditingItem({ ...editingItem, range: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-load-points">Pontos de Carga</Label>
                                  <Input
                                    id="edit-load-points"
                                    type="number"
                                    value={editingItem.loadPoints}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, loadPoints: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Label htmlFor="edit-properties">Propriedades</Label>
                                  <Input
                                    id="edit-properties"
                                    value={editingItem.properties}
                                    onChange={(e) => setEditingItem({ ...editingItem, properties: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                              </div>
                              <Button onClick={saveEditedItem} className="bg-green-900 hover:bg-green-800">
                                <Plus className="h-4 w-4 mr-1" /> Adicionar ao Inventário
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        onClick={() => addToInventory(weapon)}
                        className="bg-red-900 hover:bg-red-800 h-7"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Adicionar
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <div className="grid grid-cols-2 gap-x-2 text-sm">
                    <div>
                      <span className="text-gray-400">Dano:</span>{" "}
                      <span className="text-red-400 font-medium">{weapon.damage}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Tipo:</span> <span>{weapon.damageType}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Crítico:</span>{" "}
                      <span className="text-yellow-400">
                        {weapon.criticalThreshold}+ (x{weapon.criticalMultiplier})
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Alcance:</span> <span>{weapon.range}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Carga:</span> <span>{weapon.loadPoints} pontos</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Propriedades:</span> <span>{weapon.properties}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cursed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {cursedWeapons.map((weapon, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>{weapon.name}</span>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => handleEditItem(weapon)}
                            className="bg-blue-900 hover:bg-blue-800 h-7"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle>Editar Arma</DialogTitle>
                          </DialogHeader>
                          {editingItem && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                  <Label htmlFor="edit-name">Nome</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingItem.name}
                                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-damage">Dano</Label>
                                  <Input
                                    id="edit-damage"
                                    value={editingItem.damage}
                                    onChange={(e) => setEditingItem({ ...editingItem, damage: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-damage-type">Tipo de Dano</Label>
                                  <Select
                                    value={editingItem.damageType}
                                    onValueChange={(value) => setEditingItem({ ...editingItem, damageType: value })}
                                  >
                                    <SelectTrigger id="edit-damage-type" className="bg-gray-800 border-gray-700">
                                      <SelectValue placeholder="Tipo de Dano" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-gray-700">
                                      {damageTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          {type}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="edit-crit-threshold">Crítico</Label>
                                  <Input
                                    id="edit-crit-threshold"
                                    type="number"
                                    value={editingItem.criticalThreshold}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, criticalThreshold: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-crit-multiplier">Multiplicador</Label>
                                  <Input
                                    id="edit-crit-multiplier"
                                    type="number"
                                    value={editingItem.criticalMultiplier}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, criticalMultiplier: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-range">Alcance</Label>
                                  <Input
                                    id="edit-range"
                                    value={editingItem.range}
                                    onChange={(e) => setEditingItem({ ...editingItem, range: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-load-points">Pontos de Carga</Label>
                                  <Input
                                    id="edit-load-points"
                                    type="number"
                                    value={editingItem.loadPoints}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, loadPoints: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Label htmlFor="edit-properties">Propriedades</Label>
                                  <Input
                                    id="edit-properties"
                                    value={editingItem.properties}
                                    onChange={(e) => setEditingItem({ ...editingItem, properties: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                              </div>
                              <Button onClick={saveEditedItem} className="bg-green-900 hover:bg-green-800">
                                <Plus className="h-4 w-4 mr-1" /> Adicionar ao Inventário
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        onClick={() => addToInventory(weapon)}
                        className="bg-purple-900 hover:bg-purple-800 h-7"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Adicionar
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <div className="grid grid-cols-2 gap-x-2 text-sm">
                    <div>
                      <span className="text-gray-400">Dano:</span>{" "}
                      <span className="text-red-400 font-medium">{weapon.damage}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Tipo:</span> <span>{weapon.damageType}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Crítico:</span>{" "}
                      <span className="text-yellow-400">
                        {weapon.criticalThreshold}+ (x{weapon.criticalMultiplier})
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Alcance:</span> <span>{weapon.range}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Carga:</span> <span>{weapon.loadPoints} pontos</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Propriedades:</span> <span>{weapon.properties}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="protection" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {protections.map((protection, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>{protection.name}</span>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => handleEditItem(protection)}
                            className="bg-blue-900 hover:bg-blue-800 h-7"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle>Editar Proteção</DialogTitle>
                          </DialogHeader>
                          {editingItem && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                  <Label htmlFor="edit-name">Nome</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingItem.name}
                                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-defense-bonus">Bônus de Defesa</Label>
                                  <Input
                                    id="edit-defense-bonus"
                                    type="number"
                                    value={editingItem.defenseBonus}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, defenseBonus: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-load-points">Pontos de Carga</Label>
                                  <Input
                                    id="edit-load-points"
                                    type="number"
                                    value={editingItem.loadPoints}
                                    onChange={(e) =>
                                      setEditingItem({ ...editingItem, loadPoints: Number(e.target.value) })
                                    }
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Label htmlFor="edit-description">Descrição</Label>
                                  <Input
                                    id="edit-description"
                                    value={editingItem.description}
                                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                    className="bg-gray-800 border-gray-700"
                                  />
                                </div>
                              </div>
                              <Button onClick={saveEditedItem} className="bg-green-900 hover:bg-green-800">
                                <Plus className="h-4 w-4 mr-1" /> Adicionar ao Inventário
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        onClick={() => addToInventory(protection)}
                        className="bg-green-900 hover:bg-green-800 h-7"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Adicionar
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <div className="grid grid-cols-2 gap-x-2 text-sm">
                    <div>
                      <span className="text-gray-400">Defesa:</span>{" "}
                      <span className="text-green-400 font-medium">+{protection.defenseBonus}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Carga:</span> <span>{protection.loadPoints} pontos</span>
                    </div>
                    <div className="col-span-2 mt-1">
                      <span className="text-gray-400">Descrição:</span> <span>{protection.description}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
