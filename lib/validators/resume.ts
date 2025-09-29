import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().optional(),
  title: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
  summary: z.string().optional(),
  photoUrl: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().optional(),
  position: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  achievements: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().optional(),
  degree: z.string().optional(),
  field: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  gpa: z.string().optional(),
  description: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "El nombre del proyecto es requerido"),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  url: z.string().url("URL inválida").optional().or(z.literal("")),
  github: z.string().url("URL inválida").optional().or(z.literal("")),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const skillSchema = z.object({
  category: z.string().min(1, "La categoría es requerida"),
  skills: z.array(z.string()).min(1, "Agrega al menos una habilidad"),
});

export const otherSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  items: z.array(z.string()).default([]),
});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),
  skills: z.array(skillSchema).default([]),
  languages: z.array(z.object({
    language: z.string(),
    proficiency: z.string(),
  })).default([]),
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.string().optional(),
    url: z.string().optional(),
  })).default([]),
  other: z.array(otherSchema).default([]),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Other = z.infer<typeof otherSchema>;
export type Resume = z.infer<typeof resumeSchema>;
