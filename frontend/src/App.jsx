import React, { useState, Suspense, Component } from 'react'
import { motion } from 'framer-motion'
import { Users, Rocket, Cpu, Mail, ChevronDown, Menu, X, Box as LucideBox, Layers, Settings } from 'lucide-react'

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.5-1.6-.1-3.3 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6 2.4 4.8 2.8 4.8 2.8c-.6 1.7-.2 3-.1 3.3-1 .9-1.5 2-1.5 3.4 0 5 3 6.2 6 6.5-.4.4-.7 1-.8 1.9-.9.4-3.2 1.3-4.6-1.3 0 0-.8-1.5-2.3-1.6 0 0-1.5 0-1.5.1s1.1.8 1.5 1.5c0 0 1.2 2.6 4.3 1.9v2" />
  </svg>
)

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#0066ff] to-[#00b4d8] rounded-xl flex items-center justify-center shadow-lg shadow-[#0066ff]/20">
      <Cpu size={20} className="text-white md:w-6 md:h-6" />
    </div>
    <span className="text-xl md:text-2xl font-bold font-space tracking-tight text-slate-900">ROBO<span className="text-gradient">TECH</span></span>
  </div>
)

const TeamMember = ({ name, role, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass-card glow-on-hover p-6 rounded-2xl flex flex-col items-center text-center group"
  >
    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden mb-4 group-hover:border-[#0066ff] transition-colors">
      <div className="w-full h-full flex items-center justify-center text-slate-400 group-hover:text-[#0066ff] transition-colors">
         <Users size={32} className="md:w-10 md:h-10" />
      </div>
    </div>
    <h3 className="text-lg md:text-xl font-bold font-space mb-1 text-slate-800">{name}</h3>
    <p className="text-gradient text-xs md:text-sm font-medium mb-4 uppercase tracking-wider">{role}</p>
    <div className="flex gap-3 mt-auto">
      <a href="#" className="p-2 rounded-lg bg-slate-50 hover:bg-[#0066ff]/10 text-slate-400 hover:text-[#0066ff] transition-all"><GithubIcon size={18} /></a>
      <a href="#" className="p-2 rounded-lg bg-slate-50 hover:bg-[#00b4d8]/10 text-slate-400 hover:text-[#00b4d8] transition-all"><LinkedinIcon size={18} /></a>
      <a href="#" className="p-2 rounded-lg bg-slate-50 hover:bg-[#9d4edd]/10 text-slate-400 hover:text-[#9d4edd] transition-all"><Mail size={18} /></a>
    </div>
  </motion.div>
)

const MaterialCard = ({ title, description, imagePlaceholder, sketchfabId, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="w-full"
    >
      <div className="glass-card glow-on-hover p-5 rounded-3xl border border-slate-200 bg-white/70">
        {/* Viewer area */}
        <div style={{ width: '100%', height: '250px', borderRadius: '1rem', overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)' }} className="mb-4 shadow-inner border border-slate-200/50">
          {sketchfabId ? (
            <iframe 
              title={title}
              style={{ width: '100%', height: '100%', border: 'none' }}
              src={`https://sketchfab.com/models/${sketchfabId}/embed?autostart=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_hint=2&ui_help=0&ui_settings=0&ui_ar=0&ui_fullscreen=0&ui_annotations=0`} 
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-slate-300 hover:text-[#00b4d8] hover:scale-110 transition-all duration-500">
               {imagePlaceholder}
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold font-space mb-2 text-slate-900">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
};

function App() {
  const [title, setTitle] = useState("COMPÉTITION ROBOTECH 2026")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const team = [
    { name: "Ahmed Ben Ali", role: "Chef d'Équipe / Mécanique" },
    { name: "Sara Mansour", role: "Architecte Logiciel" },
    { name: "Yassine Toumi", role: "Spécialiste en Électronique" },
    { name: "Meriem Dridi", role: "Ingénieur IA & Vision" },
    { name: "Omar Kassab", role: "Conception 3D & CAO" },
    { name: "Lina Trabelsi", role: "Communication & Tech" },
  ]

  const materials = [
    { title: "Écran OLED SSD1306", description: "Écran I2C 128x32 pour le diagnostic en temps réel du système.", sketchfabId: "7c6f63e7a62b4b2a895b52778426a7ed" },
    { title: "Châssis en Aluminium 7075", description: "Léger et ultra-résistant pour endurer les impacts intenses.", icon: <LucideBox size={60} strokeWidth={1} /> },
    { title: "Moteurs Brushless BLDC", description: "Couple extrême et précision de déplacement au millimètre.", icon: <Settings size={60} strokeWidth={1} /> },
    { title: "Capteurs LiDAR 360°", description: "Cartographie de l'arène en temps réel avec IA embarquée.", icon: <Layers size={60} strokeWidth={1} /> },
  ]

  return (
    <div className="min-h-screen selection:bg-[#0066ff]/20 selection:text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-4 py-4 md:px-6 border-b border-black/5 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#hero" className="hover:text-slate-900 transition-colors">Accueil</a>
            <a href="#team" className="hover:text-slate-900 transition-colors">Équipe</a>
            <a href="#vision" className="hover:text-slate-900 transition-colors">Vision</a>
          </div>
          
          <button className="hidden md:block px-6 py-2 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00b4d8] text-white font-bold shadow-lg shadow-[#0066ff]/20 hover:scale-105 transition-all">
            Contactez-nous
          </button>

          <button 
            className="md:hidden text-slate-800 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-slate-200 py-4 px-6 flex flex-col gap-4 shadow-xl">
            <a href="#hero" className="text-slate-700 font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Accueil</a>
            <a href="#team" className="text-slate-700 font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Équipe</a>
            <a href="#vision" className="text-slate-700 font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Vision</a>
            <button className="w-full mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00b4d8] text-white font-bold shadow-lg shadow-[#0066ff]/20">
              Contactez-nous
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-32 md:pb-20 px-4 md:px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#0066ff]/10 rounded-full blur-[100px] md:blur-[120px] -z-10 animate-float" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left mt-8 lg:mt-0"
          >
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 rounded-full bg-[#0066ff]/10 border border-[#0066ff]/20 text-[#0066ff] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6">
              <Rocket size={14} /> Équipe de Robotique d'Élite
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-slate-900">
              Concevoir <br className="hidden sm:block lg:hidden" /> l'<span className="text-gradient">Avenir</span> de <br />
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                className="bg-transparent border-b-2 border-dashed border-slate-300 outline-none w-full lg:w-[120%] lg:-mx-2 text-center lg:text-left focus:border-[#0066ff] transition-colors overflow-hidden text-ellipsis text-slate-800"
                spellCheck="false"
              />
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Nous repoussons les limites de l'ingénierie mécanique et de l'intelligence artificielle pour offrir des solutions robotiques de nouvelle génération pour les compétitions mondiales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-6 py-3.5 md:py-4 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all text-sm md:text-base border border-slate-800">
                Explorer le Projet <ChevronDown size={20} />
              </button>
              <button className="px-6 py-3.5 md:py-4 rounded-2xl glass-card font-bold hover:bg-white text-slate-800 transition-all border border-slate-200 text-sm md:text-base">
                Notre Robot
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md aspect-square bg-gradient-to-br from-[#0066ff]/10 to-[#00b4d8]/10 rounded-3xl overflow-hidden border border-slate-200/60 flex items-center justify-center animate-float group shadow-xl shadow-[#0066ff]/5 bg-white/40">
              <div className="absolute inset-0 bg-slate-50/40 group-hover:bg-transparent transition-all" />
              <div className="flex flex-col items-center gap-4 text-slate-300 group-hover:text-[#0066ff]/50 transition-all">
                <Cpu size={80} className="md:w-[120px] md:h-[120px]" strokeWidth={1} />
                <p className="font-space text-xs md:text-sm tracking-widest">[ APERÇU DU ROBOT ]</p>
              </div>
            </div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-2 md:-top-10 md:-right-10 glass-card p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-100"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                </div>
                <div>
                  <div className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-tighter">État du Système</div>
                  <div className="text-xs md:text-sm font-bold text-slate-800">OPÉRATIONNEL</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 px-4 md:px-6 relative bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space mb-4 text-slate-900">Les <span className="text-gradient">Innovateurs</span> de la machine</h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto px-4">Notre équipe combine l'expertise en conception mécanique, en ingénierie électrique et en programmation avancée pour créer le meilleur robot pour la compétition.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-lg sm:max-w-none mx-auto">
            {team.map((m, i) => (
              <TeamMember key={i} name={m.name} role={m.role} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Materials / 3D Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative bg-white/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-[#00b4d8]/10 border border-[#00b4d8]/20 text-[#00b4d8] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4">
              Technologies Avancées
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space mb-4 text-slate-900">
              Matériaux & <span className="text-gradient">Équipements</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto px-4">
              Survolez les différents composants pour découvrir notre modélisation 3D interactive utilisant de simples images haute résolution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-lg sm:max-w-none mx-auto">
            {materials.map((mat, i) => (
              <MaterialCard 
                key={i} 
                title={mat.title} 
                description={mat.description} 
                imagePlaceholder={mat.icon}
                delay={i * 0.15} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <Logo />
          <p className="text-slate-500 text-xs md:text-sm text-center">© 2026 Présentation Robotech. Conçu pour l'Excellence.</p>
          <div className="flex gap-4 md:gap-6 text-slate-500 text-sm md:text-base font-medium">
            <a href="#" className="hover:text-[#0066ff] transition-colors underline decoration-[#0066ff]/20 decoration-2 underline-offset-4">LinkedIn</a>
            <a href="#" className="hover:text-[#00b4d8] transition-colors underline decoration-[#00b4d8]/20 decoration-2 underline-offset-4">GitHub</a>
            <a href="#" className="hover:text-[#9d4edd] transition-colors underline decoration-[#9d4edd]/20 decoration-2 underline-offset-4">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
