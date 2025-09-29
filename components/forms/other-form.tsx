"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeStore } from "@/lib/store/resume-store";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

export function OtherForm() {
  const { resume, setResume } = useResumeStore();
  const [newItem, setNewItem] = useState<{ [key: string]: string }>({});

  const addOtherSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      title: "",
      items: [],
    };
    setResume({
      ...resume,
      other: [...resume.other, newSection],
    });
  };

  const removeOtherSection = (id: string) => {
    setResume({
      ...resume,
      other: resume.other.filter((section) => section.id !== id),
    });
  };

  const updateSectionTitle = (id: string, title: string) => {
    setResume({
      ...resume,
      other: resume.other.map((section) =>
        section.id === id ? { ...section, title } : section
      ),
    });
  };

  const addItem = (sectionId: string) => {
    const item = newItem[sectionId]?.trim();
    if (!item) return;

    setResume({
      ...resume,
      other: resume.other.map((section) =>
        section.id === sectionId
          ? { ...section, items: [...section.items, item] }
          : section
      ),
    });
    setNewItem({ ...newItem, [sectionId]: "" });
  };

  const removeItem = (sectionId: string, itemIndex: number) => {
    setResume({
      ...resume,
      other: resume.other.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.filter((_, i) => i !== itemIndex),
            }
          : section
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Otros</h2>
          <p className="text-sm text-slate-500">
            Hobbies, intereses, idiomas, certificaciones, etc.
          </p>
        </div>
      </div>

      {resume.other.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p className="mb-4">No hay secciones agregadas</p>
          <Button onClick={addOtherSection} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Sección
          </Button>
        </div>
      ) : (
        <>
          {resume.other.map((section, index) => {
            // Generar título dinámico
            let displayTitle = section.title || `Sección ${index + 1}`;

            return (
              <div key={section.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{displayTitle}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOtherSection(section.id)}
                  >
                    <Trash2 className="h-4 w-4 text-[#6CACE4]" />
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Título de la Sección
                  </label>
                  <Input
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    placeholder="Ej: Hobbies, Idiomas, Certificaciones..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Items</label>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-2 rounded"
                      >
                        <span className="flex-1 text-sm">{item}</span>
                        <button
                          type="button"
                          onClick={() => removeItem(section.id, itemIndex)}
                          className="text-[#6CACE4] hover:text-[#5A9BD4]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newItem[section.id] || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, [section.id]: e.target.value })
                      }
                      placeholder="Agregar item..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem(section.id);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => addItem(section.id)}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

          <Button onClick={addOtherSection} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Otra Sección
          </Button>
        </>
      )}
    </div>
  );
}
