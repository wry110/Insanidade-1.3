import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="container mx-auto py-16 px-4 bg-black min-h-screen text-gray-200 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center mb-8 text-purple-500">Ficha de Personagem TTRPG</h1>

      <div className="max-w-md w-full space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
          <p className="mb-6 text-lg">Sistema de ficha de personagem 100% offline</p>

          <div className="space-y-4">
            <Link href="/offline" className="w-full block">
              <Button className="w-full bg-purple-900 hover:bg-purple-800 text-lg py-6">
                Iniciar Aplicação
                <span className="block text-sm mt-1 opacity-80">Salvamento local no navegador</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
