import type { Resume } from "@/lib/validators/resume";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface ResumePreviewProps {
  resume: Resume;
  template: "modern" | "classic" | "minimal";
}

export function ResumePreview({ resume, template }: ResumePreviewProps) {
  // Destructure resume for potential future use
  const { personalInfo, experience, education, projects, skills } = resume; // eslint-disable-line @typescript-eslint/no-unused-vars

  if (template === "modern") {
    return <ModernTemplate resume={resume} />;
  }

  // Default to modern for now
  return <ModernTemplate resume={resume} />;
}

function ModernTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, experience, education, skills, other } = resume;

  return (
    <div className="space-y-6" style={{ color: '#000000' }}>
      {/* Header */}
      <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-4">
        <div className="flex gap-4 items-start mb-3">
          {personalInfo.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-900 dark:border-slate-100 flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">
              {personalInfo.fullName || "Tu Nombre"}
            </h1>
            <p className="text-lg mb-3" style={{ color: '#000000' }}>
              {personalInfo.title || "Tu Título Profesional"}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: '#000000' }}>
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-1" style={{ color: '#000000' }}>
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              <a href={personalInfo.linkedin} className="hover:underline" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-3 w-3" />
              <a href={personalInfo.github} className="hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <a href={personalInfo.website} className="hover:underline" target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
            Resumen Profesional
          </h2>
          <p className="leading-relaxed" style={{ color: '#000000' }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3" style={{ color: '#000000' }}>
            Experiencia Laboral
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p style={{ color: '#000000' }}>{exp.company}</p>
                  </div>
                  <div className="text-right text-sm" style={{ color: '#000000' }}>
                    <p>{exp.startDate} - {exp.current ? "Presente" : exp.endDate}</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-1" style={{ color: '#000000' }}>{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: '#000000' }}>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3" style={{ color: '#000000' }}>
            Educación
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p style={{ color: '#000000' }}>{edu.institution}</p>
                    {edu.field && (
                      <p className="text-sm" style={{ color: '#000000' }}>{edu.field}</p>
                    )}
                  </div>
                  <div className="text-right text-sm" style={{ color: '#000000' }}>
                    {edu.startDate && (
                      <p>{edu.startDate} - {edu.current ? "Presente" : edu.endDate}</p>
                    )}
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3" style={{ color: '#000000' }}>
            Habilidades
          </h2>
          <div className="space-y-2">
            {skills.map((skillGroup, idx) => (
              <div key={idx}>
                <span className="font-semibold">{skillGroup.category}: </span>
                <span style={{ color: '#000000' }}>
                  {skillGroup.skills.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Sections */}
      {other && other.length > 0 && other.map((section, idx) => (
        section.title && section.items.length > 0 && (
          <div key={idx}>
            <h2 className="text-lg font-bold mb-3" style={{ color: '#000000' }}>
              {section.title}
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: '#000000' }}>
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          </div>
        )
      ))}

    </div>
  );
}
