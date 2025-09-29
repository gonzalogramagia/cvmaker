"use client";

import { useResumeStore } from "@/lib/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Education } from "@/lib/validators/resume";

export function EducationForm() {
  const { resume, setResume } = useResumeStore();

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      description: "",
    };
    setResume({
      ...resume,
      education: [...resume.education, newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setResume({
      ...resume,
      education: resume.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setResume({
      ...resume,
      education: resume.education.filter((edu) => edu.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {resume.education.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p className="mb-4">No hay educación agregada</p>
          <Button onClick={addEducation} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Educación
          </Button>
        </div>
      ) : (
        <>
          {resume.education.map((edu, index) => {
            // Generar título dinámico
            let title = `Educación ${index + 1}`;
            if (edu.field && edu.institution) {
              title = `${edu.field} en ${edu.institution}`;
            } else if (edu.institution) {
              title = `En ${edu.institution}`;
            } else if (edu.field) {
              title = edu.field;
            }

            return (
            <div key={edu.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Institución
                  </label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    placeholder="Universidad de Buenos Aires"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Título
                  </label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Licenciatura"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Campo de Estudio</label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                    placeholder="Ciencias de la Computación"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Ubicación</label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                    placeholder="Buenos Aires, Argentina"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">GPA / Promedio</label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                    placeholder="9.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
                  <Input
                    type="date"
                    value={edu.startDate || ""}
                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fecha Fin</label>
                  <Input
                    type="date"
                    value={edu.endDate || ""}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                    disabled={edu.current}
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id={`current-edu-${edu.id}`}
                    checked={edu.current}
                    onChange={(e) => updateEducation(edu.id, "current", e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor={`current-edu-${edu.id}`} className="text-sm">
                    Actualmente estudio aquí
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                    placeholder="Menciones, logros académicos, proyectos destacados..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
            );
          })}

          <Button onClick={addEducation} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Otra Educación
          </Button>
        </>
      )}
    </div>
  );
}
