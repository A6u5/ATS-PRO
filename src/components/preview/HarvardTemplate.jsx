import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

Font.register({
  family: 'Times-Roman',
  src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-roman@1.0.4/output/Times-Roman.ttf'
});
Font.register({
  family: 'Times-Bold',
  src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-bold@1.0.4/output/Times-Bold.ttf'
});
Font.register({
  family: 'Times-Italic',
  src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-italic@1.0.4/output/Times-Italic.ttf'
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: 'Times-Roman',
    color: '#000',
    lineHeight: 1.1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  photo: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginBottom: 5,
  },
  name: {
    fontSize: 19,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 11,
    fontFamily: 'Times-Italic',
    marginBottom: 2,
  },
  contact: {
    fontSize: 8,
    marginBottom: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 7,
    marginBottom: 4,
    paddingBottom: 1,
  },
  entry: {
    marginBottom: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bold: { fontSize: 9.5, fontFamily: 'Times-Bold' },
  italic: { fontSize: 9, fontFamily: 'Times-Italic' },
  dateBold: { fontSize: 9, fontFamily: 'Times-Bold' }, 
  desc: { 
    fontSize: 8.5, 
    textAlign: 'justify', 
    marginTop: 1,
  },
  skill: { 
    fontSize: 8.5, 
    marginBottom: 1 
  }
});

const HarvardTemplate = ({ data, lang }) => {
  const isEn = lang === 'en';
  const s = (val) => val || "";

  // Filtro para saber si una sección tiene contenido real
  const hasContent = (val) => val && val.trim().length > 0;

  return (
    <Document title={`CV - ${s(data.fullName)}`}>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          {data.profileImage && <Image src={data.profileImage} style={styles.photo} />}
          <Text style={styles.name}>{s(data.fullName)}</Text>
          <Text style={styles.title}>{s(data.title)}</Text>
          <Text style={styles.contact}>
            {`${s(data.email)}${data.phone ? ' • ' + data.phone : ''}${data.location ? ' • ' + data.location : ''}`}
          </Text>
          <Text style={styles.contact}>
            {`${s(data.linkedin)}${data.github ? ' • ' + data.github : ''}${data.gitlab ? ' • ' + data.gitlab : ''}`}
          </Text>
        </View>

        {/* RESUMEN - Solo si hay texto real */}
        {hasContent(data.summary) && (
          <View>
            <Text style={styles.sectionTitle}>{isEn ? "Professional Summary" : "Resumen Profesional"}</Text>
            <Text style={styles.desc}>{data.summary}</Text>
          </View>
        )}

        {/* EXPERIENCIA */}
        {data.experienceEntries?.some(exp => hasContent(exp.role)) && (
          <View>
            <Text style={styles.sectionTitle}>{isEn ? "Work Experience" : "Experiencia Laboral"}</Text>
            {data.experienceEntries.filter(exp => hasContent(exp.role)).map((exp, i) => (
              <View key={i} style={styles.entry}>
                <View style={styles.rowBetween}>
                  <Text style={styles.bold}>{s(exp.role)}</Text>
                  <Text style={styles.dateBold}>{s(exp.dates)}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={styles.italic}>{s(exp.company)}</Text>
                  <Text style={{fontSize: 8.5}}>{s(exp.location)}</Text>
                </View>
                <Text style={styles.desc}>{s(exp.description)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* EDUCACIÓN */}
        {data.educationEntries?.some(edu => hasContent(edu.school)) && (
          <View>
            <Text style={styles.sectionTitle}>{isEn ? "Education" : "Educación"}</Text>
            {data.educationEntries.filter(edu => hasContent(edu.school)).map((edu, i) => (
              <View key={i} style={styles.entry}>
                <View style={styles.rowBetween}>
                  <Text style={styles.bold}>{s(edu.school)}</Text>
                  <Text style={styles.dateBold}>{s(edu.dates)}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={styles.italic}>{s(edu.degree)}</Text>
                  <Text style={{fontSize: 8.5}}>{s(edu.location)}</Text>
                </View>
                {hasContent(edu.courses) && (
                  <Text style={styles.desc}>
                    <Text style={{fontFamily: 'Times-Bold'}}>{isEn ? "Key Courses: " : "Materias clave: "}</Text>
                    {edu.courses}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* HABILIDADES */}
        {(hasContent(data.strongSkills) || hasContent(data.softSkills) || hasContent(data.languages)) && (
          <View>
            <Text style={styles.sectionTitle}>{isEn ? "Skills" : "Habilidades"}</Text>
            {hasContent(data.strongSkills) && (
              <Text style={styles.skill}>
                <Text style={{fontFamily: 'Times-Bold'}}>{isEn ? "Technical Skills: " : "Habilidades Técnicas: "}</Text>{data.strongSkills}
              </Text>
            )}
            {hasContent(data.softSkills) && (
              <Text style={styles.skill}>
                <Text style={{fontFamily: 'Times-Bold'}}>{isEn ? "Soft Skills: " : "Habilidades Blandas: "}</Text>{data.softSkills}
              </Text>
            )}
            {hasContent(data.languages) && (
              <Text style={styles.skill}>
                <Text style={{fontFamily: 'Times-Bold'}}>{isEn ? "Languages: " : "Idiomas: "}</Text>{data.languages}
              </Text>
            )}
          </View>
        )}

        {/* CERTIFICACIONES */}
        {data.certifications?.some(cert => hasContent(cert.name)) && (
          <View>
            <Text style={styles.sectionTitle}>{isEn ? "Certifications" : "Certificaciones"}</Text>
            {data.certifications.filter(cert => hasContent(cert.name)).map((cert, i) => (
              <View key={i} style={[styles.rowBetween, {marginBottom: 1}]}>
                <Text style={{fontSize: 8.5}}>• {s(cert.name)}</Text>
                <Text style={styles.dateBold}>{s(cert.date)}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
};

export default HarvardTemplate;