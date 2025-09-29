"use client";

import { useResumeStore } from "@/lib/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Experience } from "@/lib/validators/resume";

export function ExperienceForm() {
  const { resume, setResume } = useResumeStore();

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    };
    setResume({
      ...resume,
      experience: [...resume.experience, newExp],
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResume({
      ...resume,
      experience: resume.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setResume({
      ...resume,
      experience: resume.experience.filter((exp) => exp.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Experiencia Laboral</h2>
          <p className="text-sm text-slate-500">
            Tus trabajos, proyectos y experiencia profesional
          </p>
        </div>
      </div>
      {resume.experience.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p className="mb-4">No hay experiencia agregada</p>
          <Button onClick={addExperience} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Experiencia
          </Button>
        </div>
      ) : (
        <>
          {resume.experience.map((exp, index) => {
            // Generar título dinámico
            let title = `Experiencia ${index + 1}`;
            if (exp.position && exp.company) {
              title = `${exp.position} en ${exp.company}`;
            } else if (exp.company) {
              title = `En ${exp.company}`;
            } else if (exp.position) {
              title = exp.position;
            }

            return (
            <div key={exp.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4 text-[#6CACE4]" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Empresa
                  </label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    placeholder="Google"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Puesto
                  </label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    placeholder="Senior Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Ubicación</label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                    placeholder="Buenos Aires, Argentina"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Fecha Inicio
                  </label>
                  <Input
                    type="date"
                    value={exp.startDate || ""}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    placeholder="dd/mm/aaaa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fecha Fin</label>
                  <Input
                    type="date"
                    value={exp.endDate || ""}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    disabled={exp.current}
                    placeholder="dd/mm/aaaa"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-sm">
                    Actualmente trabajo aquí
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    placeholder="Describe tus responsabilidades y logros..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
            );
          })}

          <Button onClick={addExperience} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Otra Experiencia
          </Button>
        </>
      )}
    </div>
  );
}
