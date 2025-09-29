"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/lib/store/resume-store";
import { personalInfoSchema, type PersonalInfo } from "@/lib/validators/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";

export function PersonalInfoForm() {
  const { resume, updatePersonalInfo } = useResumeStore();
  const [photoPreview, setPhotoPreview] = useState<string>("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: resume.personalInfo,
  });

  useEffect(() => {
    reset(resume.personalInfo);
    setPhotoPreview(resume.personalInfo.photoUrl || "");
  }, [resume.personalInfo, reset]);

  const onSubmit = (data: PersonalInfo) => {
    updatePersonalInfo(data);
  };

  // Auto-save on every change
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setValue(field, value);
    const currentValues = { ...resume.personalInfo, [field]: value };
    updatePersonalInfo(currentValues);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        setValue("photoUrl", base64);
        handleSubmit(onSubmit)();
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview("");
    setValue("photoUrl", "");
    handleSubmit(onSubmit)();
  };

  return (
    <form className="space-y-4">
      {/* Photo Upload */}
      <div className="flex items-center gap-4 pb-4 border-b">
        {photoPreview ? (
          <div className="relative">
            <img
              src={photoPreview}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover border-2"
            />
            <button
              type="button"
              onClick={removePhoto}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center">
            <Upload className="h-6 w-6 text-slate-400" />
          </div>
        )}
        <div>
          <div className="text-sm font-medium mb-1">Foto de Perfil</div>
          <div className="text-xs text-slate-500 mb-2">
            Opcional. JPG o PNG, máx 2MB
          </div>
          <label htmlFor="photo-upload" className="cursor-pointer inline-block">
            <Button type="button" variant="outline" size="sm" className="cursor-pointer">
              <Upload className="h-3 w-3 mr-2" />
              {photoPreview ? "Cambiar foto" : "Subir foto"}
            </Button>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Nombre Completo
          </label>
          <Input
            {...register("fullName")}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Juan Pérez"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Título Profesional
          </label>
          <Input
            {...register("title")}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Desarrollador Full Stack"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            {...register("email")}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            placeholder="juan@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Teléfono
          </label>
          <Input
            {...register("phone")}
            onChange={(e) => handleChange("phone", e.target.value)}
            type="tel"
            placeholder="+54 11 1234-5678"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Ubicación
          </label>
          <Input
            {...register("location")}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Buenos Aires, Argentina"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            LinkedIn
          </label>
          <Input
            {...register("linkedin")}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            type="url"
            placeholder="https://linkedin.com/in/usuario"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            GitHub
          </label>
          <Input
            {...register("github")}
            onChange={(e) => handleChange("github", e.target.value)}
            type="url"
            placeholder="https://github.com/usuario"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Sitio Web
          </label>
          <Input
            {...register("website")}
            onChange={(e) => handleChange("website", e.target.value)}
            type="url"
            placeholder="https://miportfolio.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Resumen Profesional
          </label>
          <Textarea
            {...register("summary")}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="Breve descripción sobre ti, tus habilidades y experiencia..."
            rows={4}
          />
        </div>
      </div>
    </form>
  );
}
