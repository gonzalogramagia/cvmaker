"use client";

import { useResumeStore } from "@/lib/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { Skill } from "@/lib/validators/resume";

export function SkillsForm() {
  const { resume, setResume } = useResumeStore();
  const [newSkillInputs, setNewSkillInputs] = useState<{ [key: string]: string }>({});

  const addSkillCategory = () => {
    const newCategory: Skill = {
      category: "",
      skills: [],
    };
    setResume({
      ...resume,
      skills: [...resume.skills, newCategory],
    });
  };

  const updateCategory = (index: number, category: string) => {
    const updatedSkills = [...resume.skills];
    updatedSkills[index] = { ...updatedSkills[index], category };
    setResume({ ...resume, skills: updatedSkills });
  };

  const addSkillToCategory = (index: number) => {
    const skillText = newSkillInputs[index]?.trim();
    if (!skillText) return;

    const updatedSkills = [...resume.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      skills: [...updatedSkills[index].skills, skillText],
    };
    setResume({ ...resume, skills: updatedSkills });
    setNewSkillInputs({ ...newSkillInputs, [index]: "" });
  };

  const removeSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const updatedSkills = [...resume.skills];
    updatedSkills[categoryIndex] = {
      ...updatedSkills[categoryIndex],
      skills: updatedSkills[categoryIndex].skills.filter((_, i) => i !== skillIndex),
    };
    setResume({ ...resume, skills: updatedSkills });
  };

  const removeCategory = (index: number) => {
    setResume({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Habilidades</h2>
          <p className="text-sm text-slate-500">
            Tus competencias técnicas y profesionales
          </p>
        </div>
      </div>

      {resume.skills.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p className="mb-4">No hay habilidades agregadas</p>
          <Button onClick={addSkillCategory} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Categoría
          </Button>
        </div>
      ) : (
        <>
          {resume.skills.map((skillGroup, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">
                  {skillGroup.category || `Categoría ${index + 1}`}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCategory(index)}
                >
                  <Trash2 className="h-4 w-4 text-[#6CACE4]" />
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Nombre de Categoría
                </label>
                <Input
                  value={skillGroup.category}
                  onChange={(e) => updateCategory(index, e.target.value)}
                  placeholder="Ej: Lenguajes de Programación, Frameworks, Herramientas..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Habilidades</label>
                
                {/* Lista de skills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkillFromCategory(index, skillIndex)}
                        className="hover:text-[#6CACE4] transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Input para agregar nueva skill */}
                <div className="flex gap-2">
                  <Input
                    value={newSkillInputs[index] || ""}
                    onChange={(e) =>
                      setNewSkillInputs({ ...newSkillInputs, [index]: e.target.value })
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkillToCategory(index);
                      }
                    }}
                    placeholder="Ej: React, TypeScript, Node.js..."
                  />
                  <Button
                    type="button"
                    onClick={() => addSkillToCategory(index)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Presiona Enter o el botón + para agregar
                </p>
              </div>
            </div>
          ))}

          <Button onClick={addSkillCategory} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Otra Categoría
          </Button>
        </>
      )}
    </div>
  );
}
