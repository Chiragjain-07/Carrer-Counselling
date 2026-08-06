"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Download, Eye, Sparkles, User, Briefcase, GraduationCap, Award, LoaderCircle, Wrench, Trophy } from "lucide-react"

// --- TEMPLATES (MOVED INSIDE THE COMPONENT FILE) ---
const templates = {
  beam: `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{{FULL_NAME}} — Resume</title>
<style>
  body{font-family:system-ui,Segoe UI,Roboto,Arial;color:#111;margin:0;padding:20px; background-color: #fff;}
  .page{max-width:800px;margin:0 auto;background:#fff;padding:24px;border-radius:6px}
  header{border-bottom:1px solid #eee;padding-bottom:12px;margin-bottom:16px}
  h3 { margin-bottom: 8px; font-size: 1.1rem; }
  .name{font-size:28px;font-weight:700}
  .meta{color:#666;font-size:13px;margin-top:6px}
  .section{margin-top:18px}
  .skill{display:inline-block;background:#f3f4f6;padding:6px 10px;border-radius:999px;margin:4px 6px 4px 0;font-size:13px}
  ul{margin:8px 0 0 18px; padding-left: 1rem;}
  p { margin: 0; }
</style>
</head>
<body>
  <div class="page">
    <header>
      <div class="name">{{FULL_NAME}}</div>
      <div class="meta">{{EMAIL}} · {{PHONE}} · {{LOCATION}} {{#if LINKEDIN_URL}}· <a href="{{LINKEDIN_URL}}">{{LINKEDIN_URL}}</a>{{/if}}</div>
    </header>

    {{#if SUMMARY}}
    <div class="section">
      <h3>Summary</h3>
      <p>{{SUMMARY}}</p>
    </div>
    {{/if}}

    <div class="section">
      <h3>Experience</h3>
      {{#each EXPERIENCE}}
        <div style="margin-bottom:12px">
          <strong>{{title}}</strong> — {{company}} <span style="color:#666">({{start}} {{#if end}}— {{end}}{{/if}})</span>
          {{#if bullets}}
            <ul>
              {{#each bullets}}<li>{{this}}</li>{{/each}}
            </ul>
          {{/if}}
        </div>
      {{/each}}
    </div>

    <div class="section">
      <h3>Education</h3>
      {{#each EDUCATION}}
        <div style="margin-bottom:10px">
          <strong>{{degree}}</strong> — {{institution}} <span style="color:#666">({{start}} {{#if end}}— {{end}}{{/if}})</span>
        </div>
      {{/each}}
    </div>

    <div class="section">
      <h3>Skills</h3>
      <div>
        {{#each SKILLS}}<span class="skill">{{this}}</span>{{/each}}
      </div>
    </div>

    {{#if PROJECTS}}
    <div class="section">
      <h3>Projects</h3>
      {{#each PROJECTS}}
        <div style="margin-bottom:10px">
          <strong>{{name}}</strong> — {{technologies}} {{#if link}}<div><a href="{{link}}">{{link}}</a></div>{{/if}}
          {{#if description}}<div>{{description}}</div>{{/if}}
        </div>
      {{/each}}
    </div>
    {{/if}}

    {{#if ACHIEVEMENTS}}
    <div class="section">
      <h3>Achievements</h3>
      <ul>
        {{#each ACHIEVEMENTS}}<li>{{this}}</li>{{/each}}
      </ul>
    </div>
    {{/if}}
  </div>
</body>
</html>
  `,

  elegant: `
<!doctype html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>{{FULL_NAME}} — Resume</title>
<style>
  body{font-family:Inter,system-ui,Segoe UI,Roboto;color:#0f172a;margin:0;padding:20px;background:#f8fafc}
  .page{max-width:920px;margin:0 auto;background:#fff;padding:28px;border-radius:10px}
  header{border-bottom:1px solid #eef2f7;padding-bottom:12px;margin-bottom:18px}
  h4 { margin-bottom: 8px; font-size: 1.1rem; }
  .name{font-size:32px;font-weight:800}
  .tag{color:#6b7280;margin-top:6px}
  .grid{display:flex;gap:28px}
  .left{flex:2}
  .right{flex:1}
  .card{background:#fbfbfd;padding:12px;border-radius:8px;border:1px solid #eef2f7}
  ul{margin:8px 0 0 18px; padding-left: 1rem;}
</style>
</head>
<body>
  <div class="page">
    <header>
      <div class="name">{{FULL_NAME}}</div>
      <div class="tag">{{TAGLINE}}</div>
      <div style="color:#6b7280;margin-top:8px">{{EMAIL}} · {{PHONE}} · {{LOCATION}}</div>
    </header>

    <div class="grid">
      <div class="left">
        <h4>Experience</h4>
        {{#each EXPERIENCE}}
          <div style="margin-bottom:12px">
            <strong>{{title}}</strong>, {{company}} <div style="color:#6b7280">{{start}} {{#if end}}— {{end}}{{/if}}</div>
            {{#if bullets}}<ul>{{#each bullets}}<li>{{this}}</li>{{/each}}</ul>{{/if}}
          </div>
        {{/each}}

        <h4>Education</h4>
        {{#each EDUCATION}}
          <div style="margin-bottom:10px"><strong>{{degree}}</strong> — {{institution}} <div style="color:#6b7280">{{start}} {{#if end}}— {{end}}{{/if}}</div></div>
        {{/each}}
      </div>

      <div class="right">
        <div class="card">
          <h4>Skills</h4>
          {{#each SKILLS}}<div>• {{this}}</div>{{/each}}
        </div>

        {{#if PROJECTS}}
        <div class="card" style="margin-top:12px">
          <h4>Projects</h4>
          {{#each PROJECTS}}<div style="margin-bottom:8px"><strong>{{name}}</strong><div style="color:#6b7280">{{technologies}}</div></div>{{/each}}
        </div>
        {{/if}}
      </div>
    </div>
  </div>
</body>
</html>
  `,

  professional: `
<!doctype html>
<html>
<head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{{FULL_NAME}} — Resume</title>
<style>
  body{font-family:Inter,system-ui;color:#111827;margin:0;padding:20px; background-color: #fff;}
  .page{max-width:850px;margin:0 auto;background:#fff;padding:24px;border-radius:6px}
  header{display:flex;align-items:center;gap:12px;border-bottom:1px solid #eee;padding-bottom:12px;margin-bottom:14px}
  h4 { margin-bottom: 8px; font-size: 1.1rem; }
  .name{font-size:26px;font-weight:800}
  .contact{margin-left:auto;color:#6b7280}
  .two{display:flex;gap:24px}
  .left{flex:1.2}
  .right{flex:0.8}
  ul{margin:6px 0 0 18px; padding-left: 1rem;}
</style>
</head>
<body>
  <div class="page">
    <header>
      <div>
        <div class="name">{{FULL_NAME}}</div>
        <div style="color:#6b7280">{{TAGLINE}}</div>
      </div>
      <div class="contact">{{EMAIL}} · {{PHONE}} · {{LOCATION}}</div>
    </header>

    <div class="two">
      <div class="left">
        <h4>Experience</h4>
        {{#each EXPERIENCE}}
          <div style="margin-bottom:12px">
            <strong>{{title}}</strong> — {{company}} <div style="color:#6b7280">{{start}} {{#if end}}— {{end}}{{/if}}</div>
            {{#if bullets}}<ul>{{#each bullets}}<li>{{this}}</li>{{/each}}</ul>{{/if}}
          </div>
        {{/each}}

        <h4>Projects</h4>
        {{#each PROJECTS}}
          <div style="margin-bottom:10px"><strong>{{name}}</strong> {{#if technologies}}— <span style="color:#6b7280">{{technologies}}</span>{{/if}}</div>
        {{/each}}
      </div>

      <div class="right">
        <h4>Education</h4>
        {{#each EDUCATION}}<div style="margin-bottom:10px"><strong>{{institution}}</strong><div style="color:#6b7280">{{start}} {{#if end}}— {{end}}{{/if}}</div></div>{{/each}}
        <h4>Skills</h4>
        {{#each SKILLS}}<div>• {{this}}</div>{{/each}}
      </div>
    </div>
  </div>
</body>
</html>
  `
};


export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    personalInfo: { fullName: "Ashwani Vahal", email: "ashwani.vahal@example.com", phone: "+91 98765 43210", address: "New Delhi, India", linkedin: "https://linkedin.com/in/ashwanivahal", portfolio: "", tagline: "Aspiring Full Stack Developer" },
    summary: "Aspiring software developer with a strong foundation in computer science principles and hands-on experience in web development through academic projects. Passionate about creating efficient, scalable, and user-friendly applications.",
    education: [{ degree: "B.Tech in Computer Science", institution: "Delhi Technological University", start: "2021", end: "2025" }],
    experience: [{ title: "Web Development Intern", company: "Tech Solutions Pvt. Ltd.", start: "June 2024", end: "Aug 2024", bullets: "Developed and maintained responsive user interfaces using React.\nCollaborated with backend team to integrate APIs." }],
    skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Git"],
    projects: [{ name: "Career Guide Portal", technologies: "Next.js, Tailwind CSS", description: "A comprehensive platform for career guidance.", link: "https://github.com/ashwani/career-guide" }],
    achievements: ["Dean's List 2023", "Winner, University Hackathon 2024"],
  });

  const [activeSection, setActiveSection] = useState("personal");
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("beam");
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const loadScript = (src, id) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) return resolve();
        const script = document.createElement("script");
        script.src = src; script.id = id;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script);
      });
    };
    Promise.all([
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js", "handlebars-script"),
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js", "html2canvas-script"),
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", "jspdf-script")
    ]).then(() => setScriptsLoaded(true)).catch(error => console.error(error));
  }, []);

  const buildTemplateData = () => ({
    FULL_NAME: resumeData.personalInfo.fullName, TAGLINE: resumeData.personalInfo.tagline, EMAIL: resumeData.personalInfo.email, PHONE: resumeData.personalInfo.phone, LOCATION: resumeData.personalInfo.address, LINKEDIN_URL: resumeData.personalInfo.linkedin, SUMMARY: resumeData.summary, EDUCATION: resumeData.education,
    EXPERIENCE: resumeData.experience.map(exp => ({ ...exp, bullets: exp.bullets.split('\n').filter(line => line.trim() !== '') })),
    SKILLS: resumeData.skills.filter(s => s.trim() !== ""), PROJECTS: resumeData.projects.filter(p => p.name.trim() !== ""), ACHIEVEMENTS: resumeData.achievements.filter(a => a.trim() !== "")
  });

  const generatePreviewHtml = () => {
    if (!scriptsLoaded || !window.Handlebars) return "<div>Loading...</div>";
    const template = window.Handlebars.compile(templates[selectedTemplate]);
    return template(buildTemplateData());
  };
  
  const handleDownloadPdf = async () => {
    if (!scriptsLoaded) {
      setDownloadError("Libraries are loading, please try again in a moment.");
      return;
    }
    setDownloadError("");
    setIsDownloading(true);

    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.width = '850px'; 
    iframe.style.height = '1100px'; 
    document.body.appendChild(iframe);

    try {
        iframe.contentDocument.open();
        iframe.contentDocument.write(generatePreviewHtml());
        iframe.contentDocument.close();

        await new Promise(resolve => {
            const checkReady = () => {
                if (iframe.contentDocument.readyState === 'complete') {
                    setTimeout(resolve, 100); 
                } else {
                    setTimeout(checkReady, 50);
                }
            };
            checkReady();
        });
        
        const pageElement = iframe.contentDocument.querySelector('.page');
        if (!pageElement) throw new Error("Could not find '.page' element in the template.");

        const canvas = await window.html2canvas(pageElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
        });
        
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${resumeData.personalInfo.fullName || 'resume'}.pdf`);

    } catch (err) {
        console.error("Failed to generate PDF:", err);
        setDownloadError("An error occurred creating the PDF. Please try again.");
    } finally {
        document.body.removeChild(iframe);
        setIsDownloading(false);
    }
  };
  
  const updatePersonalInfo = (field, value) => setResumeData(p => ({ ...p, personalInfo: { ...p.personalInfo, [field]: value }}));
  const updateSummary = value => setResumeData(p => ({ ...p, summary: value }));
  const updateField = (section, index, field, value) => setResumeData(p => ({ ...p, [section]: p[section].map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  const addSectionItem = (section) => {
    const newItem = {
        education: { degree: "", institution: "", start: "", end: "" },
        experience: { title: "", company: "", start: "", end: "", bullets: "" },
        skills: "", projects: { name: "", technologies: "", description: "", link: "" },
        achievements: ""
    }[section];
    setResumeData(p => ({ ...p, [section]: [...p[section], newItem] }));
  };
  const removeSectionItem = (section, index) => setResumeData(p => ({ ...p, [section]: p[section].filter((_, i) => i !== index) }));
  const updateSimpleList = (section, index, value) => setResumeData(p => ({ ...p, [section]: p[section].map((item, i) => i === index ? value : item) }));

  const sections = [
    { id: "personal", name: "Personal Info", icon: <User className="h-4 w-4" /> }, 
    { id: "summary", name: "Summary", icon: <Sparkles className="h-4 w-4" /> }, 
    { id: "education", name: "Education", icon: <GraduationCap className="h-4 w-4" /> }, 
    { id: "experience", name: "Experience", icon: <Briefcase className="h-4 w-4" /> }, 
    { id: "skills", name: "Skills", icon: <Wrench className="h-4 w-4" /> },
    { id: "projects", name: "Projects", icon: <Award className="h-4 w-4" /> },
    { id: "achievements", name: "Achievements", icon: <Trophy className="h-4 w-4" /> },
  ];
  
  const Card = ({ children, className }) => <div className={`bg-card border border-border rounded-lg ${className}`}>{children}</div>;
  const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
  const Label = ({ children, ...props }) => <label className="text-sm font-medium text-card-foreground block mb-2" {...props}>{children}</label>;
  const Input = (props) => <input {...props} className="w-full h-10 rounded-md border border-input bg-input px-3 py-2 text-sm" />;
  const Textarea = (props) => <textarea {...props} className="w-full rounded-md border border-input bg-input px-3 py-2 text-sm" />;
  const SectionButton = ({ onClick, children }) => <button onClick={onClick} className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium"><Plus className="h-4 w-4 mr-2" />{children}</button>;
  const RemoveButton = ({ onClick }) => <button onClick={onClick} className="text-destructive hover:text-destructive/80 p-1 absolute top-2 right-2"><Trash2 className="h-4 w-4" /></button>;
  
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8"><h1 className="text-4xl font-bold text-foreground mb-4">AI Resume Builder</h1><p className="text-xl text-muted-foreground max-w-2xl mx-auto">Create a professional resume with AI-powered suggestions and modern templates</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="p-4 border-b border-border"><h3 className="text-lg font-semibold text-card-foreground">Resume Sections</h3></div>
              <div className="p-4 space-y-2">
                {sections.map(s => (
                    <button key={s.id} className={`w-full justify-start text-left p-2 rounded-md flex items-center transition-colors ${activeSection === s.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`} onClick={() => setActiveSection(s.id)}>
                        {s.icon}
                        <span className="ml-2">{s.name}</span>
                    </button>
                ))}
                <div className="pt-4 space-y-2">
                  <div className="flex gap-2">
                    <select value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)} className="w-full h-10 rounded-md border border-input bg-input px-3 py-2 text-sm"><option value="beam">Beam</option><option value="elegant">Elegant</option><option value="professional">Professional</option></select>
                    <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium" onClick={() => setIsPreviewOpen(true)} disabled={!scriptsLoaded}><Eye className="h-4 w-4 mr-2" />Preview</button>
                  </div>
                  {isPreviewOpen && <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center" onClick={() => setIsPreviewOpen(false)}><div className="bg-white rounded-lg w-[8.5in] max-w-[90vw] max-h-[90vh] overflow-auto shadow-2xl" onClick={e => e.stopPropagation()}><div dangerouslySetInnerHTML={{ __html: generatePreviewHtml() }} /></div></div>}
                  {downloadError && <p className="text-xs text-red-500 text-center mt-2">{downloadError}</p>}
                  <button onClick={handleDownloadPdf} disabled={isDownloading || !scriptsLoaded} className="w-full border border-border bg-transparent h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed">
                    {isDownloading ? <><LoaderCircle className="h-4 w-4 mr-2 animate-spin" />Downloading...</> : !scriptsLoaded ? <><LoaderCircle className="h-4 w-4 mr-2 animate-spin" />Loading Libs...</> : <><Download className="h-4 w-4 mr-2" />Download PDF</>}
                  </button>
                </div>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardContent>
                {activeSection === "personal" && <div className="space-y-6"><h2 className="text-2xl font-semibold">Personal Information</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Full Name</Label><Input value={resumeData.personalInfo.fullName} onChange={e => updatePersonalInfo("fullName", e.target.value)} /></div>
                  <div><Label>Email</Label><Input type="email" value={resumeData.personalInfo.email} onChange={e => updatePersonalInfo("email", e.target.value)} /></div>
                  <div><Label>Phone</Label><Input value={resumeData.personalInfo.phone} onChange={e => updatePersonalInfo("phone", e.target.value)} /></div>
                  <div><Label>Address</Label><Input value={resumeData.personalInfo.address} onChange={e => updatePersonalInfo("address", e.target.value)} /></div>
                  <div><Label>LinkedIn URL</Label><Input value={resumeData.personalInfo.linkedin} onChange={e => updatePersonalInfo("linkedin", e.target.value)} /></div>
                  <div><Label>Tagline</Label><Input value={resumeData.personalInfo.tagline} onChange={e => updatePersonalInfo("tagline", e.target.value)} /></div>
                </div></div>}
                {activeSection === "summary" && <div className="space-y-6"><h2 className="text-2xl font-semibold">Summary</h2><Textarea value={resumeData.summary} onChange={e => updateSummary(e.target.value)} rows={8} /></div>}
                {activeSection === "education" && <div className="space-y-6"><div className="flex justify-between items-center"><h2 className="text-2xl font-semibold">Education</h2><SectionButton onClick={() => addSectionItem('education')}>Add Education</SectionButton></div>{resumeData.education.map((edu, i) => <Card key={i} className="relative p-4 pt-8"><RemoveButton onClick={() => removeSectionItem('education', i)} /><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Degree</Label><Input value={edu.degree} onChange={e => updateField('education', i, 'degree', e.target.value)} /></div>
                  <div><Label>Institution</Label><Input value={edu.institution} onChange={e => updateField('education', i, 'institution', e.target.value)} /></div>
                  <div><Label>Start Year</Label><Input value={edu.start} onChange={e => updateField('education', i, 'start', e.target.value)} /></div>
                  <div><Label>End Year</Label><Input value={edu.end} onChange={e => updateField('education', i, 'end', e.target.value)} /></div>
                </div></Card>)}</div>}
                {activeSection === "experience" && <div className="space-y-6"><div className="flex justify-between items-center"><h2 className="text-2xl font-semibold">Experience</h2><SectionButton onClick={() => addSectionItem('experience')}>Add Experience</SectionButton></div>{resumeData.experience.map((exp, i) => <Card key={i} className="relative p-4 pt-8"><RemoveButton onClick={() => removeSectionItem('experience', i)} /><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Title</Label><Input value={exp.title} onChange={e => updateField('experience', i, 'title', e.target.value)} /></div>
                  <div><Label>Company</Label><Input value={exp.company} onChange={e => updateField('experience', i, 'company', e.target.value)} /></div>
                  <div><Label>Start Date</Label><Input value={exp.start} onChange={e => updateField('experience', i, 'start', e.target.value)} /></div>
                  <div><Label>End Date</Label><Input value={exp.end} onChange={e => updateField('experience', i, 'end', e.target.value)} /></div>
                  <div className="md:col-span-2"><Label>Description / Bullet Points (one per line)</Label><Textarea value={exp.bullets} onChange={e => updateField('experience', i, 'bullets', e.target.value)} rows={4} /></div>
                </div></Card>)}</div>}
                {activeSection === "skills" && <div className="space-y-6"><div className="flex justify-between items-center"><h2 className="text-2xl font-semibold">Skills</h2><SectionButton onClick={() => addSectionItem('skills')}>Add Skill</SectionButton></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{resumeData.skills.map((skill, i) => <div key={i} className="flex gap-2"><Input value={skill} onChange={e => updateSimpleList('skills', i, e.target.value)} /><RemoveButton onClick={() => removeSectionItem('skills', i)} /></div>)}</div></div>}
                {activeSection === "projects" && <div className="space-y-6"><div className="flex justify-between items-center"><h2 className="text-2xl font-semibold">Projects</h2><SectionButton onClick={() => addSectionItem('projects')}>Add Project</SectionButton></div>{resumeData.projects.map((proj, i) => <Card key={i} className="relative p-4 pt-8"><RemoveButton onClick={() => removeSectionItem('projects', i)} /><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Project Name</Label><Input value={proj.name} onChange={e => updateField('projects', i, 'name', e.target.value)} /></div>
                  <div><Label>Technologies</Label><Input value={proj.technologies} onChange={e => updateField('projects', i, 'technologies', e.target.value)} /></div>
                  <div className="md:col-span-2"><Label>Link</Label><Input value={proj.link} onChange={e => updateField('projects', i, 'link', e.target.value)} /></div>
                  <div className="md:col-span-2"><Label>Description</Label><Textarea value={proj.description} onChange={e => updateField('projects', i, 'description', e.target.value)} rows={3} /></div>
                </div></Card>)}</div>}
                {activeSection === "achievements" && <div className="space-y-6"><div className="flex justify-between items-center"><h2 className="text-2xl font-semibold">Achievements</h2><SectionButton onClick={() => addSectionItem('achievements')}>Add Achievement</SectionButton></div><div className="grid grid-cols-1 gap-4">{resumeData.achievements.map((ach, i) => <div key={i} className="flex gap-2"><Input value={ach} onChange={e => updateSimpleList('achievements', i, e.target.value)} /><RemoveButton onClick={() => removeSectionItem('achievements', i)} /></div>)}</div></div>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

