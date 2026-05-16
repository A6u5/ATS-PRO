import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CVEditor from './components/cv-forms/CVEditor';
import CVPreview from './components/preview/CVPreview';
import HarvardTemplate from './components/preview/HarvardTemplate';
import ATSChecker from './components/tools/ATSChecker'
import JobMatcher from './components/tools/JobMatcher'; // Importación añadida
import translations from './utils/languajes';
import * as Lucide from "lucide-react";


export default function App() {
  // 1. Estados de Idioma y Ventana
  const [lang, setLang] = useState('es');
  const t = translations[lang];
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // 2. Estado inicial del CV
  const initialData = {
    fullName: '', title: '', email: '', phone: '', location: '',
    linkedin: '', github: '', gitlab: '', summary: '',
    strongSkills: '', softSkills: '', languages: '',
    experienceEntries: [{ id: 1, company: '', role: '', dates: '', location: '', description: '' }],
    educationEntries: [{ id: 1, school: '', degree: '', dates: '', location: '', courses: '' }],
    certifications: [{ id: 1, name: '', date: '' }]
  };

  // 3. Estados de Datos e Imagen (con LocalStorage)
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('ats_pro_data');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('ats_pro_image') || null;
  });

  // 4. Efectos de Autoguardado y Resize
  useEffect(() => {
    localStorage.setItem('ats_pro_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('ats_pro_image', profileImage);
    } else {
      localStorage.removeItem('ats_pro_image');
    }
  }, [profileImage]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 5. Funciones de Ayuda (Helpers)
  const handleReset = () => {
    const confirmMsg = lang === 'es' ? "¿Borrar todo?" : "Clear all?";
    if (window.confirm(confirmMsg)) {
      setData(initialData);
      setProfileImage(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleArrayChange = (id, field, value, arrayName) => {
    const updated = data[arrayName].map(entry => entry.id === id ? { ...entry, [field]: value } : entry);
    setData({ ...data, [arrayName]: updated });
  };

  const addEntry = (arrayName, emptyObj) => {
    const newId = data[arrayName].length > 0 ? Math.max(...data[arrayName].map(e => e.id)) + 1 : 1;
    setData({ ...data, [arrayName]: [...data[arrayName], { ...emptyObj, id: newId }] });
  };

  const removeEntry = (id, arrayName) => {
    setData({ ...data, [arrayName]: data[arrayName].filter(e => e.id !== id) });
  };

  const currentScale = windowWidth < 640 
    ? Math.min(0.35, (windowWidth / 920)) 
    : windowWidth < 1024 ? 0.75 : 1.1;

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-[#090f1d] overflow-hidden text-slate-300">
      <CVEditor 
        data={data} 
        setData={setData} 
        lang={lang} 
        setLang={setLang} 
        t={t}
        handleReset={handleReset}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        handleImageUpload={handleImageUpload}
        addEntry={addEntry}
        removeEntry={removeEntry}
        handleArrayChange={handleArrayChange}
      />

      <CVPreview 
        data={data} 
        t={t} 
        profileImage={profileImage} 
        currentScale={currentScale} 
        windowWidth={windowWidth} 
      /> 
    </div>
  );
}