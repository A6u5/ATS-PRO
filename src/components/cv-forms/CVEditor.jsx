import React, { useState } from 'react';
import { Layout, Trash2, User, Briefcase, GraduationCap, Wrench, Award, Target, Camera, Plus } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import HarvardTemplate from '../preview/HarvardTemplate';
import ATSChecker from '../tools/ATSChecker';
import JobMatcher from '../tools/JobMatcher';

export default function CVEditor({
  data, setData, lang, setLang, t, handleReset, 
  profileImage, setProfileImage, handleImageUpload,
  addEntry, removeEntry, handleArrayChange
}) {
  // El tab activo ahora vive aquí
  const [activeTab, setActiveTab] = useState('personal');

  const inputStyle = "w-full bg-[#161f31] border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600";
  const labelStyle = "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block";
    return (
    <aside className="w-full lg:w-[480px] h-[50vh] lg:h-full bg-darkEditor border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col shrink-0 shadow-2xl font-sans">
        <div className="p-4 lg:p-6 border-b border-slate-800 flex justify-between items-center bg-[#090f1d] min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <h1 className="text-white font-black text-xl flex items-center gap-2 cursor-default">
              <Layout className="text-blue-500" size={22} /> ATS <span className="text-blue-500 hidden sm:inline">PRO</span>
            </h1>
            <div className="flex items-center gap-2">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)} 
                className="bg-slate-800 text-[10px] font-bold text-blue-400 border border-slate-700 rounded px-1.5 py-1 outline-none appearance-none cursor-pointer hover:bg-slate-700 transition-colors uppercase"
              >
                <option value="es">ES</option>
                <option value="en">EN</option>
              </select>
              <button 
                onClick={handleReset}
                className="text-[10px] font-bold text-slate-500 hover:text-red-400 transition-colors uppercase px-1"
                title={t.reset}
              >
                <Trash2 size={14} className='cursor-pointer'/>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 justify-end ml-2 overflow-visible">
            <PDFDownloadLink 
              document={<HarvardTemplate data={{...data, profileImage}} lang={lang} />} 
              fileName={`CV_${data.fullName.trim().replace(/\s+/g, '_') || (lang === "es" ? 'Sin_Nombre' : "No_Name")}.pdf`}
              className="bg-blue-600 text-white h-9 px-3 rounded-lg text-[10px] font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>📥</span> <span className="hidden sm:inline">{t.download}</span><span className="sm:hidden">PDF</span>
            </PDFDownloadLink>
            
            <ATSChecker data={data} t={t} />
          </div>
        </div>

        <div className="flex flex-nowrap overflow-x-auto no-scrollbar border-b border-slate-800 bg-[#0d1425]">
          {[
            { id: 'personal', label: t.personal, icon: <User size={14}/> },
            { id: 'experiencia', label: t.experience, icon: <Briefcase size={14}/> },
            { id: 'educación', label: t.education, icon: <GraduationCap size={14}/> },
            { id: 'Habilidades', label: t.skills, icon: <Wrench size={14}/> },
            { id: 'certificados', label: t.certs, icon: <Award size={14}/> },
            { id: 'match', label: t.match, icon: <Target size={14}/> }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 min-w-[80px] py-4 flex flex-col items-center gap-1 text-[9px] font-bold uppercase cursor-pointer tracking-tighter transition-all ${activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-500 bg-darkEditor' : 'text-slate-500 hover:text-slate-300'}`}>
              {tab.icon}<span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar bg-[#0b1221]">
          {activeTab === 'personal' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-4 bg-[#161f31] p-4 rounded-xl border border-slate-700/50">
                <div className="relative group w-16 h-16 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center overflow-hidden bg-slate-800 shrink-0">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="text-slate-500" size={24} />
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <div>
                  <p className={`${labelStyle} cursor-default`}>{t.photo}</p>
                  <button onClick={() => setProfileImage(null)} className="text-[10px] text-red-400 hover:underline uppercase cursor-pointer font-bold">Eliminar</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelStyle}>{t.name}</label><input className={inputStyle} placeholder="Agustín Torres" value={data.fullName} onChange={e => setData({...data, fullName: e.target.value})} /></div>
                <div><label className={labelStyle}>{t.title}</label><input className={inputStyle} placeholder={t.placeholderTitle} value={data.title} onChange={e => setData({...data, title: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelStyle}>Email</label><input className={inputStyle} placeholder="correo@ejemplo.com" value={data.email} onChange={e => setData({...data, email: e.target.value})} /></div>
                <div><label className={labelStyle}>Teléfono</label><input className={inputStyle} placeholder="+54 341..." value={data.phone} onChange={e => setData({...data, phone: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelStyle}>{t.location}</label><input className={inputStyle} placeholder="Rosario, Argentina" value={data.location} onChange={e => setData({...data, location: e.target.value})} /></div>
                <div><label className={labelStyle}>LinkedIn</label><input className={inputStyle} placeholder="linkedin.com/in/..." value={data.linkedin} onChange={e => setData({...data, linkedin: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelStyle}>Github</label><input className={inputStyle} placeholder="github.com/..." value={data.github} onChange={e => setData({...data, github: e.target.value})} /></div>
                <div><label className={labelStyle}>Gitlab</label><input className={inputStyle} placeholder="gitlab.com/..." value={data.gitlab} onChange={e => setData({...data, gitlab: e.target.value})} /></div>
              </div>
              <div>
                <label className={labelStyle}>{t.summary}</label>
                <textarea className={`${inputStyle} h-44 leading-relaxed`} placeholder={t.placeholderSummary} value={data.summary} onChange={e => setData({...data, summary: e.target.value})} />
              </div>
            </div>
          )}

          {(activeTab === 'experiencia' || activeTab === 'educación') && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {(activeTab === 'experiencia' ? data.experienceEntries : data.educationEntries).map((entry, idx) => (
                <div key={entry.id} className="group bg-[#161f31] rounded-xl border border-slate-700/50 overflow-hidden shadow-xl">
                  <div className="bg-slate-800/50 px-4 py-2 flex justify-between items-center border-b border-slate-700/50">
                    <span className="text-[10px] font-bold text-slate-500 uppercase cursor-default tracking-widest">{activeTab === 'experiencia' ? t.experience : t.education} #{idx + 1}</span>
                    <button onClick={() => removeEntry(entry.id, activeTab === 'experiencia' ? 'experienceEntries' : 'educationEntries')} className="text-slate-500 hover:text-red-400 p-1 cursor-pointer transition-colors"><Trash2 size={14}/></button>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input className={inputStyle} placeholder={activeTab === 'experiencia' ? t.company : t.school} value={activeTab === 'experiencia' ? entry.company : entry.school} onChange={e => handleArrayChange(entry.id, activeTab === 'experiencia' ? 'company' : 'school', e.target.value, activeTab === 'experiencia' ? 'experienceEntries' : 'educationEntries')} />
                      <input className={inputStyle} placeholder={activeTab === 'experiencia' ? t.role : t.degree} value={activeTab === 'experiencia' ? entry.role : entry.degree} onChange={e => handleArrayChange(entry.id, activeTab === 'experiencia' ? 'role' : 'degree', e.target.value, activeTab === 'experiencia' ? 'experienceEntries' : 'educationEntries')} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input className={inputStyle} placeholder={t.dates} value={entry.dates} onChange={e => handleArrayChange(entry.id, 'dates', e.target.value, activeTab === 'experiencia' ? 'experienceEntries' : 'educationEntries')} />
                      <input className={inputStyle} placeholder={t.location} value={entry.location} onChange={e => handleArrayChange(entry.id, 'location', e.target.value, activeTab === 'experiencia' ? 'experienceEntries' : 'educationEntries')} />
                    </div>
                    <textarea className={`${inputStyle} h-28`} placeholder={activeTab === 'experiencia' ? t.placeholderExp : t.placeholderEdu} value={activeTab === 'experiencia' ? entry.description : entry.courses} onChange={e => handleArrayChange(entry.id, activeTab === 'experiencia' ? 'description' : 'courses', e.target.value, activeTab === 'experiencia' ? 'experienceEntries' : 'educationEntries')} />
                  </div>
                </div>
              ))}
              <button onClick={() => activeTab === 'experiencia' ? addEntry('experienceEntries', {company:'', role:'', dates:'', location:'', description:''}) : addEntry('educationEntries', {school:'', degree:'', dates:'', location:'', courses:''})} className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 font-bold uppercase text-[10px]">
                <Plus size={16} /> {t.add} {activeTab}
              </button>
            </div>
          )}

          {activeTab === 'Habilidades' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-[#161f31] p-5 rounded-xl border border-slate-700/50 space-y-4">
                <div><label className={labelStyle}>{t.technical}</label><textarea className={`${inputStyle} h-24`} placeholder="React, Node.js, SQL..." value={data.strongSkills} onChange={e => setData({...data, strongSkills: e.target.value})} /></div>
                <div><label className={labelStyle}>{t.soft}</label><textarea className={`${inputStyle} h-24`} placeholder="Liderazgo..." value={data.softSkills} onChange={e => setData({...data, softSkills: e.target.value})} /></div>
                <div><label className={labelStyle}>{t.lang}</label><input className={inputStyle} placeholder="Español, Inglés..." value={data.languages} onChange={e => setData({...data, languages: e.target.value})} /></div>
              </div>
            </div>
          )}

          {activeTab === 'certificados' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex gap-3 items-center bg-[#161f31] p-3 rounded-lg border border-slate-700/50">
                  <input className={inputStyle} placeholder={t.certs} value={cert.name} onChange={e => handleArrayChange(cert.id, 'name', e.target.value, 'certifications')} />
                  <input className={`${inputStyle} w-1/3`} placeholder={t.dates} value={cert.date} onChange={e => handleArrayChange(cert.id, 'date', e.target.value, 'certifications')} />
                  <button onClick={() => removeEntry(cert.id, 'certifications')} className="text-slate-500 cursor-pointer hover:text-red-400 p-1"><Trash2 size={16}/></button>
                </div>
              ))}
              <button onClick={() => addEntry('certifications', {name:'', date:''})} className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 font-bold uppercase text-[10px]"><Plus size={14} className="inline mr-2"/>{t.add} {t.certs}</button>
            </div>
          )}

          {activeTab === 'match' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <JobMatcher cvData={data} lang={lang} />
            </div>
          )}
        </div>
      </aside>
    );
}