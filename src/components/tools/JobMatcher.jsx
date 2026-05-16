import React, { useState, useMemo } from 'react';
import { Target, AlertCircle, CheckCircle2, Search } from 'lucide-react';

const JobMatcher = ({ cvData, lang }) => {
  const [jobDescription, setJobDescription] = useState('');
  
  const analysis = useMemo(() => {
    if (!jobDescription.trim()) return null;

    // 1. Limpieza y Tokenización Mejorada
    const cleanText = (text) => {
      return text.toLowerCase()
        // Eliminamos símbolos de moneda y porcentajes primero
        .replace(/[$%]/g, "")
        // Reemplazamos símbolos de puntuación por espacios, 
        // pero preservamos el '#' para C# y el '.' si va seguido de letras (ej: .net)
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, (match) => {
          if (match === '#' || match === '.') return match; 
          return " ";
        })
        .split(/\s+/)
        .filter(word => {
          // FILTRO CRÍTICO: 
          // 1. Debe tener al menos 2 caracteres.
          // 2. NO puede ser solo un número (esto elimina el 45, 95, 000, 100).
          const isJustNumber = /^\d+$/.test(word);
          return word.length >= 2 && !isJustNumber;
        });
    };

    // Palabras comunes (Stopwords)
    const stopWords = [
  // Conectores y Preposiciones (ES/EN)
  'para', 'todo', 'sobre', 'este', 'esta', 'con', 'desde', 'entre', 'como', 'pero', 
  'unas', 'ellos', 'ellas', 'esto', 'hacer', 'tener', 'with', 'from', 'this', 'that', 
  'about', 'have', 'your', 'será', 'está', 'esto', 'estos', 'estas', 'aquellos', 'unas',
  'los', 'las', 'una', 'uno', 'unos', 'del', 'al', 'por', 'que', 'than', 'then',

  // Palabras de Reclutamiento / Metadatos de Vacante
  'puesto', 'ubicación', 'título', 'contrato', 'días', 'tipo', 'híbrido', 'remoto',
  'vacante', 'perfil', 'buscamos', 'empresa', 'líder', 'equipo', 'incorporar', 'unirse',
  'nuestro', 'nuestra', 'ofrecemos', 'beneficios', 'requisitos', 'responsabilidades',
  'principal', 'principales', 'misión', 'objetivo', 'rol', 'cargo', 'cliente', 
  'senior', 'junior', 'full-time', 'part-time', 'mensuales', 'salario', 'sueldo',
  'experience', 'requirements', 'responsibilities', 'benefits', 'apply', 'join',

  // Verbos de Relleno y Acciones Genéricas
  'realizar', 'llevar', 'cabo', 'formar', 'parte', 'trabajar', 'manejar', 'asegurar',
  'garantizar', 'brindar', 'apoyar', 'colaborar', 'crear', 'desarrollar', 'usar',
  'conocimiento', 'experiencia', 'capacidad', 'habilidad', 'aptitud', 'herramientas',
  'knowledge', 'skills', 'ability', 'work', 'using', 'tools', 'performing',

  // Adjetivos "Buzzwords" (Relleno de RRHH)
  'apasionado', 'dinámico', 'proactivo', 'excelente', 'buenas', 'fuertes', 'enfocado',
  'orientado', 'detalle', 'creativo', 'innovador', 'soluciones', 'productos',
  'passionate', 'dynamic', 'proactive', 'excellent', 'strong', 'focused', 'creative'
];
    
    const jdWords = cleanText(jobDescription).filter(w => !stopWords.includes(w));
    
    // 2. Extracción de Keywords (Frecuencia)
    const wordFreq = {};
    jdWords.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Tomamos las 20 palabras más importantes
    const keywords = Object.keys(wordFreq)
      .sort((a, b) => wordFreq[b] - wordFreq[a])
      .slice(0, 20);

    if (keywords.length === 0) {
      return { score: 0, matches: [], missing: [] };
    }

    // Convertimos todo el CV a un string para buscar
    const cvText = JSON.stringify(cvData).toLowerCase();

    // 3. Match Checking
    const matches = keywords.filter(kw => cvText.includes(kw));
    const missing = keywords.filter(kw => !cvText.includes(kw)).slice(0, 8);
    
    const score = Math.round((matches.length / keywords.length) * 100);

    return { score, matches, missing };
  }, [jobDescription, cvData]);

  const t = {
    es: {
      title: "Comparar con Vacante",
      placeholder: "Pegá aquí la descripción del puesto (Job Description)...",
      match: "Compatibilidad",
      missing: "Keywords faltantes en tu CV:",
      good: "¡Excelente coincidencia!",
      neutral: "Podrías optimizar más.",
      bad: "Compatibilidad baja."
    },
    en: {
      title: "Job Matcher",
      placeholder: "Paste the job description here...",
      match: "Match Rate",
      missing: "Missing keywords in your CV:",
      good: "Excellent match!",
      neutral: "Could be optimized.",
      bad: "Low compatibility."
    }
  }[lang];

  return (
    <div className="bg-[#161f31] rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="p-4 border-b border-slate-700/50 bg-slate-800/30 flex items-center gap-2">
        <Target size={18} className="text-blue-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest cursor-default text-slate-300">{t.title}</h3>
      </div>

      <div className="p-4 space-y-4">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder={t.placeholder}
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-300 focus:border-blue-500 outline-none transition-all resize-none"
        />

        {analysis && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-bold">{t.match}</span>
                <span className={`text-2xl font-black ${analysis.score > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {analysis.score}%
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-medium">
                  {analysis.score > 70 ? t.good : analysis.score > 40 ? t.neutral : t.bad}
                </p>
              </div>
            </div>

            {analysis.missing.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase">{t.missing}</p>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.missing.map((word, i) => (
                    <span key={i} className="px-2 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[9px] rounded-md font-bold">
                      + {word}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={14} />
                <span className="text-[10px] font-bold uppercase">¡Tienes todas las keywords clave!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatcher;