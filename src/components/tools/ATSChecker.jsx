import React, { useState, useEffect } from 'react';

const ATSChecker = ({ data, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const isEn = t.download.includes("Download");
  const modalT = {
    title: isEn ? "Elite ATS Validation" : "Validación ATS de Élite",
    perfect: isEn ? "Global Standard Achieved!" : "¡Estándar global alcanzado!",
    suggestions: isEn ? "Critical Quality Adjustments:" : "Ajustes críticos de calidad:",
    close: isEn ? "Close" : "Cerrar",
    analyze: isEn ? "Analyze CV" : "Analizar mi CV"
  };

  const analyze = () => {
    let score = 0;
    let recommendations = [];

    // 1. FUNDAMENTOS (20 pts) - Datos que no pueden faltar en ningún rubro
    if (data.email && data.phone && data.location) score += 10;
    else recommendations.push(isEn ? "Missing contact basics (Email/Phone/City)." : "Faltan datos básicos (Email/Teléfono/Ciudad).");
    
    if (data.linkedin?.includes('linkedin.com/')) score += 10;
    else recommendations.push(isEn ? "LinkedIn is mandatory for 90% of global ATS." : "LinkedIn es obligatorio para el 90% de los ATS globales.");

    // 2. RESUMEN: IMPACTO VS. RELLENO (20 pts)
    const summaryWords = data.summary?.trim().split(/\s+/).length || 0;
    const buzzwords = ['proactivo', 'apasionado', 'motivado', 'responsable', 'team player', 'hardworking', 'passionate'];
    const summaryLower = data.summary?.toLowerCase() || "";
    
    let buzzCount = buzzwords.filter(word => summaryLower.includes(word)).length;

    if (summaryWords >= 40 && summaryWords <= 120) {
      score += 20;
      if (buzzCount > 2) {
        score -= 10;
        recommendations.push(isEn ? "Summary: Replace generic clichés with concrete value." : "Resumen: Cambiá clichés genéricos por valor concreto.");
      }
    } else {
      recommendations.push(isEn ? "Summary should be between 40-120 words." : "El resumen debe tener entre 40 y 120 palabras.");
    }

    // 3. EXPERIENCIA: LA REGLA DEL VERBO DE ACCIÓN (30 pts)
    // Lista de verbos universales (Salud, Tech, Ventas, etc.)
    const actionVerbs = ['lideré', 'desarrollé', 'implementé', 'logré', 'gestioné', 'coordiné', 'reduje', 'incrementé', 'atendí', 'led', 'managed', 'developed', 'coordinated', 'achieved'];
    const weakStarts = ['encargado', 'ayudé', 'responsable', 'helping', 'responsible', 'tasks included'];

    if (data.experienceEntries?.length >= 2) {
      score += 15;
      const descriptions = data.experienceEntries.map(e => e.description.toLowerCase());
      
      const hasAction = actionVerbs.some(v => descriptions.join(' ').includes(v));
      const hasWeakStart = weakStarts.some(w => descriptions.some(d => d.trim().startsWith(w)));

      if (hasAction) score += 15;
      else recommendations.push(isEn ? "Use impact verbs (Managed, Led) instead of passive ones." : "Usá verbos de impacto (Gestioné, Lideré) en lugar de pasivos.");
      
      if (hasWeakStart) {
        score -= 10;
        recommendations.push(isEn ? "Don't start bullets with 'Responsible for'. Focus on actions." : "No empieces con 'Responsable de'. Enfocate en la acción.");
      }
    } else {
      recommendations.push(isEn ? "ATS requires at least 2 detailed professional roles." : "El ATS requiere al menos 2 roles profesionales detallados.");
    }

    // 4. MÉTRICAS Y RESULTADOS (20 pts) - Lo que diferencia un 80% de un 100%
    const hasNumbers = data.experienceEntries?.some(exp => /\d+/.test(exp.description));
    if (hasNumbers) {
      score += 20;
    } else {
      recommendations.push(isEn ? "Crucial: Add metrics (%, $, numbers) to prove your impact." : "Crítico: Agregá métricas (%, $, números) para probar tu impacto.");
    }

    // 5. SECCIONES COMPLEMENTARIAS (10 pts)
    if (data.strongSkills?.split(',').length >= 4 && data.languages) score += 10;
    else recommendations.push(isEn ? "Ensure you list skills and languages clearly." : "Asegúrate de listar habilidades e idiomas claramente.");

    return { score: Math.max(0, Math.min(100, score)), recommendations };
  };

  const { score, recommendations } = analyze();

  useEffect(() => {
    if (isOpen) {
      let start = 0;
      const duration = 1000;
      const increment = score / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= score) {
          setAnimatedScore(score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    } else {
      setAnimatedScore(0);
    }
  }, [isOpen, score]);

  const getScoreColor = () => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500 shadow-emerald-500/20';
    if (score >= 70) return 'text-blue-400 border-blue-500 shadow-blue-500/20';
    if (score >= 40) return 'text-amber-400 border-amber-500 shadow-amber-500/20';
    return 'text-rose-400 border-rose-500 shadow-rose-500/20';
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`relative border border-blue-500/50 cursor-pointer text-blue-400 h-9 px-4 rounded-lg text-[10px] font-bold hover:bg-blue-500/10 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 group ${score < 50 ? 'animate-pulse' : ''}`}
      >
        <span className="group-hover:rotate-12 transition-transform">🔍</span> 
        {modalT.analyze}
        {score < 60 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-[#090f1d]"></span>}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#0d1425] border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="p-8 text-center border-b border-slate-800 bg-gradient-to-b from-[#161f31] to-[#090f1d]">
              <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-[3px] mb-6">
                {modalT.title}
              </h3>
              
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" 
                    strokeDasharray={251.2} 
                    strokeDashoffset={251.2 - (251.2 * animatedScore) / 100}
                    className={`${getScoreColor()} transition-all duration-1000 ease-out`} 
                  />
                </svg>
                <span className={`absolute text-2xl font-black ${getScoreColor()}`}>
                  {animatedScore}%
                </span>
              </div>
              
              <p className="mt-6 text-slate-300 text-sm font-medium px-4 leading-relaxed">
                {score >= 90 ? modalT.perfect : modalT.suggestions}
              </p>
            </div>

            <div className="p-6 max-h-[300px] overflow-y-auto bg-[#0b1221] custom-scrollbar">
              <div className="space-y-3">
                {recommendations.length > 0 ? (
                  recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-[11px] text-slate-400 leading-relaxed hover:border-blue-500/30 transition-all group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-500 font-bold text-[10px] group-hover:bg-blue-500 group-hover:text-white transition-colors">!</span>
                      <div className="flex-1">{rec}</div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center animate-in zoom-in duration-500">
                    <div className="text-5xl mb-4">⭐</div>
                    <div className="text-emerald-400 font-black text-sm tracking-widest uppercase">
                      {isEn ? "Document Optimized" : "Documento Optimizado"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-[#090f1d] border-t border-slate-800">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white cursor-pointer py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/40 active:scale-[0.98]"
              >
                {modalT.close}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </>
  );
};

export default ATSChecker;