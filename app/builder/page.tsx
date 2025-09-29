"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Save, Upload } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume-store";
import { PersonalInfoForm } from "@/components/forms/personal-info-form";
import { ExperienceForm } from "@/components/forms/experience-form";
import { EducationForm } from "@/components/forms/education-form";
import { SkillsForm } from "@/components/forms/skills-form";
import { OtherForm } from "@/components/forms/other-form";
import { ResumePreview } from "@/components/resume/resume-preview";

export default function BuilderPage() {
  const { resume, template, exportToJSON, importFromJSON } = useResumeStore();
  const [activeSection, setActiveSection] = useState<"personal" | "experience" | "education" | "skills" | "other">("personal");

  const handleExportJSON = () => {
    const json = exportToJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cv-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target?.result as string;
        importFromJSON(json);
      };
      reader.readAsText(file);
    }
  };

  const handleExportPDF = () => {
    // Crear una ventana nueva con el CV para imprimir
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const previewElement = document.querySelector('.resume-preview-content');
    if (!previewElement) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resume.personalInfo.fullName || 'CV'}</title>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
              line-height: 1.5;
              color: #0f172a;
              background: white;
            }
            .resume-preview-content { padding: 2rem; }
            
            /* Typography */
            h1 { font-size: 1.875rem; font-weight: 700; line-height: 1.1; margin-bottom: 0.25rem; }
            h2 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.75rem; color: #0f172a; }
            h3 { font-size: 1rem; font-weight: 600; }
            p { font-size: 0.875rem; }
            
            /* Spacing */
            .space-y-6 > * + * { margin-top: 1.5rem; }
            .space-y-4 > * + * { margin-top: 1rem; }
            .space-y-3 > * + * { margin-top: 0.75rem; }
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .space-y-1 > * + * { margin-top: 0.25rem; }
            .mb-1 { margin-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mt-1 { margin-top: 0.25rem; }
            .mt-2 { margin-top: 0.5rem; }
            .pb-4 { padding-bottom: 1rem; }
            
            /* Borders */
            .border-b-2 { border-bottom: 2px solid #0f172a; }
            
            /* Flexbox */
            .flex { display: flex; }
            .flex-wrap { flex-wrap: wrap; }
            .flex-1 { flex: 1; }
            .flex-shrink-0 { flex-shrink: 0; }
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            .justify-between { justify-content: space-between; }
            .gap-1 { gap: 0.25rem; }
            .gap-2 { gap: 0.5rem; }
            .gap-4 { gap: 1rem; }
            .gap-x-4 { column-gap: 1rem; }
            .gap-y-1 { row-gap: 0.25rem; }
            
            /* Images */
            img { 
              width: 5rem; 
              height: 5rem; 
              border-radius: 9999px; 
              object-fit: cover; 
              border: 2px solid #0f172a;
            }
            
            /* Text colors */
            .text-slate-600 { color: #475569; }
            .text-slate-700 { color: #334155; }
            
            /* Text sizes */
            .text-sm { font-size: 0.875rem; }
            .text-lg { font-size: 1.125rem; }
            .text-xl { font-size: 1.25rem; }
            .text-3xl { font-size: 1.875rem; }
            
            /* Font weights */
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            
            /* Lists */
            .list-disc { list-style-type: disc; }
            .list-inside { list-style-position: inside; }
            
            /* Links */
            a { color: inherit; text-decoration: none; }
            a:hover { text-decoration: underline; }
            
            /* Icons (hide them in print) */
            svg { display: none; }
            
            /* Text alignment */
            .text-right { text-align: right; }
            
            /* Leading */
            .leading-relaxed { line-height: 1.625; }
            
            @media print {
              body { padding: 0; }
              @page { 
                margin: 1.5cm;
                size: A4;
              }
              .resume-preview-content { padding: 0; }
              
              /* Ocultar headers y footers del navegador */
              @page {
                margin: 1.5cm;
              }
            }
            
            /* Ocultar título y URL en impresión */
            @page { margin: 1.5cm; }
            html { 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          </style>
        </head>
        <body>
          ${previewElement.innerHTML}
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 100);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold">
            CVMaker
          </Link>
          
          <div className="flex items-center gap-2">
            <label 
              htmlFor="import-json" 
              className="cursor-pointer"
              title="Cargar un CV previamente guardado desde un archivo JSON"
            >
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Cargar
              </Button>
            </label>
            <input
              id="import-json"
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportJSON}
            />
            
            <Button 
              onClick={handleExportJSON} 
              variant="outline" 
              size="sm"
              title="Guardar tu CV como archivo JSON para continuar editándolo más tarde"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
            
            <Button 
              size="sm" 
              onClick={handleExportPDF}
              title="Exportar tu CV como PDF para imprimir o compartir"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Editor Panel */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Editor</h1>
              <p className="text-slate-600 dark:text-slate-400">Completá tu información</p>
            </div>
            
            {/* Section Tabs */}
            <div className="flex gap-2 border-b pb-2">
              <button
                className={`text-sm px-3 py-1.5 rounded transition-colors ${
                  activeSection === "personal" 
                    ? "bg-slate-100 dark:bg-slate-800" 
                    : "hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
                onClick={() => setActiveSection("personal")}
              >
                Personal
              </button>
              <button
                className={`text-sm px-3 py-1.5 rounded transition-colors ${
                  activeSection === "experience" 
                    ? "bg-slate-100 dark:bg-slate-800" 
                    : "hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
                onClick={() => setActiveSection("experience")}
              >
                Experiencia
              </button>
              <button
                className={`text-sm px-3 py-1.5 rounded transition-colors ${
                  activeSection === "education" 
                    ? "bg-slate-100 dark:bg-slate-800" 
                    : "hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
                onClick={() => setActiveSection("education")}
              >
                Educación
              </button>
              <button
                onClick={() => setActiveSection("skills")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeSection === "skills"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Habilidades
              </button>
              <button
                onClick={() => setActiveSection("other")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeSection === "other"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Otros
              </button>
            </div>

            {/* Form Content */}
            <div>
              {activeSection === "personal" && <PersonalInfoForm />}
              {activeSection === "experience" && <ExperienceForm />}
              {activeSection === "education" && <EducationForm />}
              {activeSection === "skills" && <SkillsForm />}
              {activeSection === "other" && <OtherForm />}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Vista Previa</h2>
              <p className="text-xs text-slate-500">Tamaño A4 - Como se verá al imprimir</p>
            </div>
            
            {/* A4 Paper Simulation - Scaled to fit screen */}
            <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-lg">
              <div className="bg-white shadow-lg mx-auto overflow-hidden" style={{ 
                width: '100%', 
                maxWidth: '400px',
                height: '565px',
                maxHeight: '85vh'
              }}>
                <div className="resume-preview-content" style={{
                  padding: '0.5cm',
                  transform: 'scale(0.48)',
                  transformOrigin: 'top left',
                  width: '208%',
                  height: '208%'
                }}>
                  <ResumePreview resume={resume} template={template} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <p>💻 🧉 Desarrollado por Gonza</p>
          <p>© 2025 | CVMaker</p>
        </div>
      </footer>
    </div>
  );
}
