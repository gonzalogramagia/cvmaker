import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Resume } from "@/lib/validators/resume";

interface ResumeState {
  resume: Resume;
  template: "modern" | "classic" | "minimal";
  setResume: (resume: Resume) => void;
  updatePersonalInfo: (info: Resume["personalInfo"]) => void;
  setTemplate: (template: "modern" | "classic" | "minimal") => void;
  resetResume: () => void;
  exportToJSON: () => string;
  importFromJSON: (json: string) => void;
}

const defaultResume: Resume = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
    photoUrl: "",
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
  languages: [],
  certifications: [],
  other: [],
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resume: defaultResume,
      template: "modern",
      setResume: (resume) => set({ resume }),
      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: { ...state.resume, personalInfo: info },
        })),
      setTemplate: (template) => set({ template }),
      resetResume: () => set({ resume: defaultResume, template: "modern" }),
      exportToJSON: () => {
        const state = get();
        return JSON.stringify(
          { resume: state.resume, template: state.template },
          null,
          2
        );
      },
      importFromJSON: (json) => {
        try {
          const data = JSON.parse(json);
          // Asegurar que el resume tenga el campo 'other'
          const resume = {
            ...data.resume,
            other: data.resume.other || [],
          };
          set({ resume, template: data.template || "modern" });
        } catch (error) {
          console.error("Error importing JSON:", error);
        }
      },
    }),
    {
      name: "cvmaker-storage",
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        // Migración para agregar el campo 'other' a datos antiguos
        const state = persistedState as ResumeState;
        if (version === 0 || !state.resume?.other) {
          return {
            ...state,
            resume: {
              ...state.resume,
              other: [],
            },
          };
        }
        return state;
      },
    }
  )
);
