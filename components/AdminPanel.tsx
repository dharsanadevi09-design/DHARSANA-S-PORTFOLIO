
import React, { useState } from 'react';
import { PortfolioData, Skill, Project, ExperienceItem, Certificate, ServiceItem, ConsultationTopic, SocialLink } from '../types';

interface AdminPanelProps {
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ data, onSave, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState<PortfolioData>(data);

  const handleChange = (field: keyof PortfolioData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (field: keyof PortfolioData, index: number, subField: string, value: any) => {
    const arr = [...(formData[field] as any[])];
    arr[index] = { ...arr[index], [subField]: value };
    setFormData({ ...formData, [field]: arr });
  };

  const addItem = (field: keyof PortfolioData, newItem: any) => {
    setFormData({ ...formData, [field]: [...(formData[field] as any[]), newItem] });
  };

  const removeItem = (field: keyof PortfolioData, index: number) => {
    const arr = [...(formData[field] as any[])];
    arr.splice(index, 1);
    setFormData({ ...formData, [field]: arr });
  };

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-neutral-900 border-r border-white/10 flex flex-col h-auto md:h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white">CMS Admin</h2>
          <p className="text-xs text-neutral-500 font-mono mt-2">Manage Content</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full bg-transparent text-white border border-white/20 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto h-screen bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-6">
            <div>
                 <h1 className="text-3xl font-black uppercase text-white mb-2">{tabs.find(t => t.id === activeTab)?.label}</h1>
                 <p className="text-neutral-500 font-mono text-sm">Edit your website content below.</p>
            </div>
          </div>

          <div className="space-y-12">
            
            {/* HOME TAB */}
            {activeTab === 'home' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Name</label>
                    <input className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Role</label>
                    <input className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl" value={formData.role} onChange={e => handleChange('role', e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Intro</label>
                    <textarea className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl h-32" value={formData.intro} onChange={e => handleChange('intro', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Hero Background Image URL</label>
                    <input className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl font-mono text-sm" value={formData.heroBackgroundImage || ''} onChange={e => handleChange('heroBackgroundImage', e.target.value)} placeholder="https://..." />
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">About Me</label>
                    <textarea className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl h-48" value={formData.aboutMe} onChange={e => handleChange('aboutMe', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Profile Image URL</label>
                    <input className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl font-mono text-sm" value={formData.aboutImage} onChange={e => handleChange('aboutImage', e.target.value)} />
                </div>
                
                 <div>
                    <h3 className="text-xl font-bold uppercase text-white mb-6 border-b border-white/10 pb-2">Education</h3>
                    {formData.education.map((edu, idx) => (
                        <div key={idx} className="bg-neutral-900/50 p-6 rounded-2xl mb-4 border border-white/5 relative group">
                            <button onClick={() => removeItem('education', idx)} className="absolute top-4 right-4 text-white hover:text-neutral-400 text-xs uppercase font-bold">Delete</button>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Degree" value={edu.degree} onChange={e => handleArrayChange('education', idx, 'degree', e.target.value)} />
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Institution" value={edu.institution} onChange={e => handleArrayChange('education', idx, 'institution', e.target.value)} />
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Year" value={edu.year} onChange={e => handleArrayChange('education', idx, 'year', e.target.value)} />
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Score" value={edu.score} onChange={e => handleArrayChange('education', idx, 'score', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem('education', { degree: '', institution: '', year: '', score: '', details: '' })} className="text-xs font-bold uppercase bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">+ Add Education</button>
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-12 animate-fade-in">
                 {/* Shared Settings */}
                 <div className="bg-neutral-900/30 p-6 rounded-2xl border border-white/10">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Resume Link</label>
                        <input className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl font-mono text-sm" value={formData.resumeLink} onChange={e => handleChange('resumeLink', e.target.value)} />
                    </div>
                     <div className="space-y-2 mt-4">
                        <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Payment Instructions (Used for both)</label>
                        <textarea className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl h-32 font-mono text-sm" value={formData.paymentDetails} onChange={e => handleChange('paymentDetails', e.target.value)} placeholder="Bank Details, UPI ID, etc." />
                    </div>
                 </div>

                 {/* Offered Services (Service Page) */}
                 <div>
                    <h3 className="text-xl font-bold uppercase text-white mb-6 border-b border-white/10 pb-2">Offered Services (Service Page)</h3>
                    <p className="text-neutral-500 text-xs mb-4">These appear on the main Services page.</p>
                    {formData.offeredServices?.map((service, idx) => (
                         <div key={idx} className="bg-neutral-900/50 p-6 rounded-2xl mb-4 border border-white/5 relative">
                            <button onClick={() => removeItem('offeredServices', idx)} className="absolute top-4 right-4 text-white hover:text-neutral-400 text-xs uppercase font-bold">Delete</button>
                            <div className="space-y-3">
                                <input className="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-bold" placeholder="Service Title (e.g. Web Dev)" value={service.title} onChange={e => handleArrayChange('offeredServices', idx, 'title', e.target.value)} />
                                <textarea className="w-full bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Description" value={service.description} onChange={e => handleArrayChange('offeredServices', idx, 'description', e.target.value)} />
                                <input className="w-full bg-black border border-white/10 p-3 rounded-lg text-white text-sm font-mono" placeholder="Price (e.g. ₹15000)" value={service.price} onChange={e => handleArrayChange('offeredServices', idx, 'price', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem('offeredServices', { title: 'New Service', description: '', price: '' })} className="text-xs font-bold uppercase bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">+ Add Service</button>
                 </div>

                 {/* Consultation Topics (Let's Talk Page) */}
                 <div>
                    <h3 className="text-xl font-bold uppercase text-white mb-6 border-b border-white/10 pb-2">Consultation Topics (Let's Talk Page)</h3>
                     <p className="text-neutral-500 text-xs mb-4">These appear on the separate 'Let's Talk' page.</p>
                    {formData.consultationTopics.map((topic, idx) => (
                         <div key={idx} className="bg-neutral-900/50 p-6 rounded-2xl mb-4 border border-white/5 relative">
                            <button onClick={() => removeItem('consultationTopics', idx)} className="absolute top-4 right-4 text-white hover:text-neutral-400 text-xs uppercase font-bold">Delete</button>
                            <div className="space-y-3">
                                <input className="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-bold" placeholder="Topic Title" value={topic.title} onChange={e => handleArrayChange('consultationTopics', idx, 'title', e.target.value)} />
                                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest block">Content / Description</label>
                                <textarea className="w-full bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Enter Content / Description" value={topic.description} onChange={e => handleArrayChange('consultationTopics', idx, 'description', e.target.value)} />
                                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest block">Amount / Price</label>
                                <input className="w-full bg-black border border-white/10 p-3 rounded-lg text-white text-sm font-mono" placeholder="Enter Amount (e.g. ₹499)" value={topic.price} onChange={e => handleArrayChange('consultationTopics', idx, 'price', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem('consultationTopics', { id: Date.now().toString(), title: 'New Topic', description: '', price: '' })} className="text-xs font-bold uppercase bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">+ Add Topic</button>
                 </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="animate-fade-in">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.skills.map((skill, idx) => (
                        <div key={idx} className="bg-neutral-900/50 p-4 rounded-xl border border-white/5 relative group">
                            <button onClick={() => removeItem('skills', idx)} className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            <input className="w-full bg-black border border-white/10 p-2 rounded text-white text-xs font-bold mb-2 text-center" value={skill.name} onChange={e => handleArrayChange('skills', idx, 'name', e.target.value)} placeholder="Skill Name" />
                            <input className="w-full bg-black border border-white/10 p-2 rounded text-white/50 text-[10px] font-mono text-center" value={skill.icon} onChange={e => handleArrayChange('skills', idx, 'icon', e.target.value)} placeholder="Icon URL" />
                        </div>
                    ))}
                    <button onClick={() => addItem('skills', { name: 'New Skill', icon: '' })} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center min-h-[100px] text-white font-bold uppercase text-xs transition-colors">+ Add Skill</button>
                 </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
               <div className="animate-fade-in space-y-6">
                 {formData.projects.map((project, idx) => (
                    <div key={idx} className="bg-neutral-900/50 p-6 rounded-2xl border border-white/5 relative">
                        <button onClick={() => removeItem('projects', idx)} className="absolute top-4 right-4 text-white hover:text-neutral-400 text-xs uppercase font-bold">Delete</button>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <input className="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-bold" placeholder="Project Title" value={project.title} onChange={e => handleArrayChange('projects', idx, 'title', e.target.value)} />
                                <textarea className="w-full bg-black border border-white/10 p-3 rounded-lg text-white text-sm h-32" placeholder="Description" value={project.description} onChange={e => handleArrayChange('projects', idx, 'description', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <input className="w-full bg-black border border-white/10 p-3 rounded-lg text-white text-sm font-mono" placeholder="Image URL" value={project.image} onChange={e => handleArrayChange('projects', idx, 'image', e.target.value)} />
                                <input className="w-full bg-black border border-white/10 p-3 rounded-lg text-white text-sm font-mono" placeholder="Project Link" value={project.link} onChange={e => handleArrayChange('projects', idx, 'link', e.target.value)} />
                                <input className="w-full bg-black border border-white/10 p-3 rounded-lg text-white text-sm font-mono" placeholder="Technologies (comma separated)" value={project.technologies.join(', ')} onChange={e => handleArrayChange('projects', idx, 'technologies', e.target.value.split(',').map((t: string) => t.trim()))} />
                            </div>
                        </div>
                    </div>
                 ))}
                 <button onClick={() => addItem('projects', { title: 'New Project', description: '', technologies: [], link: '', image: '' })} className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold uppercase text-xs transition-colors">+ Add Project</button>
               </div>
            )}

            {/* EXPERIENCE TAB */}
             {activeTab === 'experience' && (
               <div className="animate-fade-in space-y-12">
                 <div>
                    <h3 className="text-xl font-bold uppercase text-white mb-6 border-b border-white/10 pb-2">Work Experience</h3>
                    {formData.experience.map((exp, idx) => (
                        <div key={idx} className="bg-neutral-900/50 p-6 rounded-2xl mb-4 border border-white/5 relative">
                             <button onClick={() => removeItem('experience', idx)} className="absolute top-4 right-4 text-white hover:text-neutral-400 text-xs uppercase font-bold">Delete</button>
                             <div className="grid md:grid-cols-2 gap-4 mb-3">
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white font-bold" placeholder="Role" value={exp.role} onChange={e => handleArrayChange('experience', idx, 'role', e.target.value)} />
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white" placeholder="Company" value={exp.company} onChange={e => handleArrayChange('experience', idx, 'company', e.target.value)} />
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Duration" value={exp.duration} onChange={e => handleArrayChange('experience', idx, 'duration', e.target.value)} />
                             </div>
                             <textarea className="w-full bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Description" value={exp.description} onChange={e => handleArrayChange('experience', idx, 'description', e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => addItem('experience', { role: '', company: '', duration: '', description: '' })} className="text-xs font-bold uppercase bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">+ Add Work</button>
                 </div>

                 <div>
                    <h3 className="text-xl font-bold uppercase text-white mb-6 border-b border-white/10 pb-2">Certificates</h3>
                    {formData.certificates.map((cert, idx) => (
                        <div key={idx} className="bg-neutral-900/50 p-6 rounded-2xl mb-4 border border-white/5 relative">
                             <button onClick={() => removeItem('certificates', idx)} className="absolute top-4 right-4 text-white hover:text-neutral-400 text-xs uppercase font-bold">Delete</button>
                             <div className="space-y-3">
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white font-bold w-full" placeholder="Certificate Title" value={cert.title} onChange={e => handleArrayChange('certificates', idx, 'title', e.target.value)} />
                                <div className="grid grid-cols-2 gap-4">
                                     <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Issuer" value={cert.issuer} onChange={e => handleArrayChange('certificates', idx, 'issuer', e.target.value)} />
                                     <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm" placeholder="Year" value={cert.year} onChange={e => handleArrayChange('certificates', idx, 'year', e.target.value)} />
                                </div>
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm font-mono w-full" placeholder="Issuer Logo URL" value={cert.issuerLogo} onChange={e => handleArrayChange('certificates', idx, 'issuerLogo', e.target.value)} />
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm font-mono w-full" placeholder="Certificate Image URL" value={cert.certificateImage} onChange={e => handleArrayChange('certificates', idx, 'certificateImage', e.target.value)} />
                             </div>
                        </div>
                    ))}
                    <button onClick={() => addItem('certificates', { title: '', issuer: '', year: '', issuerLogo: '', certificateImage: '' })} className="text-xs font-bold uppercase bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">+ Add Certificate</button>
                 </div>
               </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-6 animate-fade-in">
                 <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Contact Email</label>
                    <input className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl" value={formData.contactEmail} onChange={e => handleChange('contactEmail', e.target.value)} />
                </div>
                 {/* Location Field Removed as requested */}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
                <div className="space-y-8 animate-fade-in">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Header Logo URL</label>
                        <input className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl font-mono text-sm" value={formData.headerLogo} onChange={e => handleChange('headerLogo', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Footer Title</label>
                        <input className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl" value={formData.footerTitle || ''} onChange={e => handleChange('footerTitle', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Footer Text</label>
                        <textarea className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white rounded-xl" value={formData.footerText || ''} onChange={e => handleChange('footerText', e.target.value)} />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold uppercase text-white mb-6 border-b border-white/10 pb-2">Social Links</h3>
                        {formData.socialLinks.map((social, idx) => (
                            <div key={idx} className="bg-neutral-900/50 p-4 rounded-xl mb-4 border border-white/5 relative flex gap-4">
                                <button onClick={() => removeItem('socialLinks', idx)} className="absolute top-2 right-2 text-white hover:text-neutral-400 text-xs uppercase font-bold">×</button>
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm w-1/3" placeholder="Platform" value={social.platform} onChange={e => handleArrayChange('socialLinks', idx, 'platform', e.target.value)} />
                                <input className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm font-mono w-2/3" placeholder="URL" value={social.url} onChange={e => handleArrayChange('socialLinks', idx, 'url', e.target.value)} />
                            </div>
                        ))}
                        <button onClick={() => addItem('socialLinks', { platform: '', url: '' })} className="text-xs font-bold uppercase bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">+ Add Social</button>
                    </div>
                </div>
            )}

            <div className="pt-8 border-t border-white/10 sticky bottom-0 bg-black pb-8">
                <button 
                  onClick={() => onSave(formData)}
                  className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] py-5 hover:bg-neutral-300 transition-all rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Save {tabs.find(t => t.id === activeTab)?.label} Changes
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
