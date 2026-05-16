export default function CVPreview({ data, t, profileImage, currentScale, windowWidth }) {
    return (
      <main className="flex-1 bg-[#050a15] overflow-auto custom-scrollbar h-[50vh] lg:h-full flex flex-col items-center">
        <div className="flex-1 w-full flex items-start lg:items-center justify-center p-4 lg:p-12">
          <div 
            className="origin-top transition-all duration-300 shadow-[0_0_50px_rgba(0,0,0,0.8)] shrink-0"
            style={{
              transform: `scale(${currentScale})`,
              width: '210mm',
              minHeight: '297mm',
              height: 'auto',
              marginBottom: windowWidth < 1024 ? `calc(297mm * (${currentScale} - 1) + 2rem)` : '20mm',
              marginLeft: windowWidth < 1024 ? `calc(210mm * (${currentScale} - 1) / 2)` : '0',
              marginRight: windowWidth < 1024 ? `calc(210mm * (${currentScale} - 1) / 2)` : '0',
              marginTop: windowWidth < 640 ? '1rem' : '0',
            }}
          >
            {/* El Papel Blanco del CV */}
            <div className="bg-white w-full h-full p-[15mm_20mm] flex flex-col font-cv text-black leading-tight border border-slate-200 min-h-[297mm]">
              
              {/* Header */}
              <div className="flex flex-col items-center mb-6">
                {profileImage && (
                  <div className="mb-4">
                    <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border border-slate-200" />
                  </div>
                )}
                <div className="text-center">
                  <h1 className="text-[22pt] font-bold uppercase tracking-wider mb-1">{data.fullName || t.name.toUpperCase()}</h1>
                  <p className="text-[12pt] font-medium mb-2 italic pb-2 inline-block">{data.title || t.title}</p>
                  <div className="text-[9pt] flex justify-center flex-wrap gap-x-2 font-sans mt-2">
                    {data.email && <span>{data.email}</span>}{data.phone && <span>• {data.phone}</span>}{data.location && <span>• {data.location}</span>}
                  </div>
                  <div className="text-[8.5pt] flex justify-center flex-wrap gap-x-2 font-sans mt-1">
                    {data.linkedin && <span>{data.linkedin}</span>}{data.github && <span>• {data.github}</span>}{data.gitlab && <span>• {data.gitlab}</span>}
                  </div>
                </div>
              </div>

              {/* Secciones */}
              <section className="mb-6">
                <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black pb-0.5 mb-2 tracking-widest">{t.summary}</h2>
                <p className="text-[10pt] leading-[1.4] text-justify">{data.summary}</p>
              </section>

              <section className="mb-6">
                <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black pb-0.5 mb-3 tracking-widest">{t.workHeader}</h2>
                <div className="space-y-4">
                  {data.experienceEntries.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline font-bold">
                        <h3 className="text-[10.5pt]">{exp.role}</h3><span className="text-[9.5pt] italic">{exp.dates}</span>
                      </div>
                      <div className="flex justify-between items-baseline mb-1">
                        <p className="text-[10pt] italic font-medium">{exp.company}</p><span className="text-[9pt]">{exp.location}</span>
                      </div>
                      <div className="text-[9.5pt] leading-[1.3] whitespace-pre-line text-justify pl-1">{exp.description}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-6">
                <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black pb-0.5 mb-3 tracking-widest">{t.education}</h2>
                <div className="space-y-4">
                  {data.educationEntries.map((edu) => (
                    <div key={edu.id} className="leading-tight">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[10.5pt] font-bold">{edu.school}</h3><span className="text-[9.5pt] font-bold italic shrink-0 ml-4">{edu.dates}</span>
                      </div>
                      <div className="flex justify-between items-start italic">
                        <p className="text-[10pt] font-medium">{edu.degree}</p><span className="text-[9pt] shrink-0 ml-4 not-italic font-normal">{edu.location}</span>
                      </div>
                      {/* CORRECCIÓN: Renderizar cursos clave */}
                      {edu.courses && (
                        <p className="text-[9.5pt] mt-1 leading-[1.3] whitespace-pre-line text-justify pl-1">
                          <span className="font-bold">{t.courses}:</span> {edu.courses}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-6">
                <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black pb-0.5 mb-2 tracking-widest">{t.skills}</h2>
                <div className="text-[9.5pt] space-y-1.5 mt-1">
                  {data.strongSkills && <p><span className="font-bold">{t.technical}:</span> {data.strongSkills}</p>}
                  {data.softSkills && <p><span className="font-bold">{t.soft}:</span> {data.softSkills}</p>}
                  {/* CORRECCIÓN: Renderizar Idiomas */}
                  {data.languages && <p><span className="font-bold">{t.lang}:</span> {data.languages}</p>}
                </div>
              </section>

              <section className="pb-10">
                <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black pb-0.5 mb-2 tracking-widest">{t.certHeader}</h2>
                <div className="text-[9.5pt] space-y-1 mt-1">
                  {data.certifications.map(cert => (
                    <div key={cert.id} className="flex justify-between italic">
                      {cert.name && <span className="not-italic">• {cert.name}</span>}<span className='font-bold'>{cert.date}</span>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      );
}