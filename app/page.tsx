import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold">
            CVMaker
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/builder">
              <Button size="sm">Empezar</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <h1 className="text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              Creá tu CV.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Una forma simple y rápida de crear CVs profesionales.
              <br />
              Sin registro. Exportá a PDF al instante.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/builder">
                <Button size="lg" className="gap-2">
                  Empezar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <p>
            💻 🧉{" "}
            <a 
              href="https://gonza.gr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Desarrollado por Gonza
            </a>
          </p>
          <p>© 2025 | CVMaker</p>
        </div>
      </footer>
    </div>
  );
}
