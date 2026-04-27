import React, { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Users, Rocket, Cpu, Mail, ChevronDown, Menu, X, Maximize2, RotateCw, BrainCircuit, Wifi, Wrench, Monitor, Database } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Bounds, Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ background: 'rgba(255,255,255,0.8)', padding: '6px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, color: '#475569', backdropFilter: 'blur(8px)' }}>
        {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

const Model = ({ path }) => {
  const { scene } = useGLTF(path)
  const cloned = React.useMemo(() => scene.clone(), [scene])
  return <primitive object={cloned} />
}

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
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white overflow-hidden shadow-md border border-slate-100 flex items-center justify-center">
      <img src="/images/logo.jpeg" alt="Robotech Logo" className="w-full h-full object-cover" />
    </div>
    <span className="text-xl md:text-2xl font-bold font-space tracking-tight text-slate-900">ROBO<span className="text-gradient">TECH</span></span>
  </div>
)

const TeamMember = ({ name, role, delay, image }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass-card glow-on-hover p-6 rounded-2xl flex flex-col items-center text-center group"
  >
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-100 border-4 border-slate-200 overflow-hidden mb-4 group-hover:border-[#0066ff] transition-colors relative">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-400 group-hover:text-[#0066ff] transition-colors">
           <Users size={32} className="md:w-10 md:h-10" />
        </div>
      )}
    </div>
    <h3 className="text-lg md:text-xl font-bold font-space mb-1 text-slate-800">{name}</h3>
    <p className="text-gradient text-xs md:text-sm font-medium uppercase tracking-wider">{role}</p>
  </motion.div>
)

const ThreeScene = ({ modelPath }) => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={4} />
    <directionalLight position={[10, 10, 5]} intensity={2.5} />
    <directionalLight position={[-5, -5, -5]} intensity={1} />
    <Suspense fallback={<Loader />}>
      <Bounds fit clip observe margin={1.4}>
        <Center>
          <Model path={modelPath} />
        </Center>
      </Bounds>
    </Suspense>
    {/* Disabled zoom and pan to prevent scroll trapping on the webpage. Users must expand to zoom. */}
    <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} enablePan={false} />
  </Canvas>
)

const MaterialCard = ({ title, description, modelPath, index, delay, onExpand }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(delay, 0.6) }}
      className="w-full group"
    >
      <div className="relative rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 hover:shadow-[#0066ff]/10 transition-all duration-300 overflow-hidden group/card">
        {/* Number badge */}
        <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700 shadow-md">
          <span className="text-[#00b4d8] text-xs font-mono font-bold tracking-wider">{String(index + 1).padStart(2, '0')}</span>
        </div>
        
        {/* Fullscreen button — always visible on mobile (no hover), hover-reveal on desktop */}
        <button 
          onClick={() => onExpand({ title, description, modelPath })}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-white/80 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0066ff] hover:bg-white hover:border-[#0066ff]/30 transition-all cursor-pointer shadow-sm md:opacity-0 md:group-hover:opacity-100"
          title="Plein écran"
        >
          <Maximize2 size={14} />
        </button>

        {/* 3D Viewer — Extra large with CAD blueprint background */}
        <div 
          className="relative w-full h-[280px] sm:h-[400px]" 
          style={{ 
            backgroundColor: '#f8fafc',
            backgroundImage: 'linear-gradient(rgba(0, 102, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '-1px -1px'
          }}
        >
          {modelPath && <ThreeScene modelPath={modelPath} />}
          
          {/* Subtle interaction hint overlay */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="px-3 py-1.5 rounded-full bg-white/60 backdrop-blur border border-slate-200/50 text-xs font-medium text-slate-500 shadow-sm flex items-center gap-1.5">
              <RotateCw size={12} className="animate-[spin_4s_linear_infinite]" /> Rotation manuelle
            </span>
          </div>
        </div>
        
        {/* Info */}
        <div className="p-5 sm:p-6 border-t border-slate-100 bg-white group-hover:bg-slate-50/50 transition-colors duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold font-space text-slate-900 mb-1 leading-tight flex items-center gap-2">
                {title} 
                <span className="w-1.5 h-1.5 bg-[#00b4d8] rounded-full hidden sm:block"></span>
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mt-1">{description}</p>
            </div>
            <div className="flex-shrink-0 mt-0.5">
              <button 
                onClick={() => onExpand({ title, description, modelPath })}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0066ff] hover:text-white flex items-center justify-center text-slate-400 transition-all cursor-pointer"
                title="Agrandir ce composant"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Fullscreen 3D Modal
const FullscreenModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      
      {/* Modal — full screen on mobile, constrained on desktop */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full h-full sm:w-[95vw] sm:h-[85vh] max-w-6xl bg-white rounded-xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header — stacks on mobile */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white/90 backdrop-blur-lg border-b border-slate-100 gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-xl font-bold font-space text-slate-900 truncate">{item.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* 3D Canvas full area */}
        <div className="w-full h-full pt-[60px] sm:pt-[72px]" style={{ background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)' }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={5} />
            <directionalLight position={[10, 10, 5]} intensity={3} />
            <directionalLight position={[-10, -10, -5]} intensity={1.5} />
            <pointLight position={[0, -10, 0]} intensity={1} />
            <Suspense fallback={<Loader />}>
              <Bounds fit clip observe margin={1.2}>
                <Center>
                  <Model path={item.modelPath} />
                </Center>
              </Bounds>
            </Suspense>
            <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} enablePan={false} />
          </Canvas>
        </div>
        
        {/* Hint — adaptive for touch vs mouse */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-[10px] sm:text-xs text-slate-500 font-medium shadow-lg whitespace-nowrap">
          <span className="hidden sm:inline">🖱️ Cliquez et glissez pour tourner · Molette pour zoomer</span>
          <span className="sm:hidden">👆 Glissez pour tourner · Pincez pour zoomer</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [title] = useState("COMPÉTITION ROBOTECH 2026")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [fullscreenItem, setFullscreenItem] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['hero', 'team', 'materials', 'technologies']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const jury = [
    { name: "Mme Salwa Senhaji", role: "Membre du Jury", image: "/images/jury1.png" },
    { name: "Mme Naouar Belghini", role: "Membre du Jury", image: "/images/jury4.jpeg" },
    { name: "Mme Imane Halkhams", role: "Membre du Jury", image: "/images/jury5.jpeg" },
    { name: "Mme Sanae El Bouassi", role: "Membre du Jury", image: "/images/jury3.png" },
    { name: "Mme Naoual Boukil", role: "Membre du Jury", image: "/images/jury2.png" },
    { name: "Mme Zineb Bounoua", role: "Membre du Jury", image: "/images/jury6.jpeg" },
    { name: "M. Saad Motahhir", role: "Membre du Jury", image: "/images/jury7.jpeg" },
  ]

  const materials = [
    { title: "Écran OLED SSD1306", description: "Écran I2C 128x32 pour le diagnostic en temps réel du système.", modelPath: "/models/oled.glb" },
    { title: "Carte ESP32", description: "Microcontrôleur Wi-Fi/Bluetooth pour la communication et le contrôle intelligent.", modelPath: "/models/esp32.glb" },
    { title: "Raspberry Pi 4B", description: "Mini-ordinateur embarqué pour le traitement IA et la vision par ordinateur.", modelPath: "/models/raspberry_pi_3_model_b.glb" },
    { title: "Moteur DC", description: "Moteur à courant continu pour la propulsion du robot.", modelPath: "/models/Moteur.glb" },
    { title: "Driver Moteur", description: "Module de puissance L298N pour le contrôle précis des moteurs.", modelPath: "/models/Driver_moteur.glb" },
    { title: "Servo Moteur", description: "Actionneur de précision pour les mécanismes et bras robotiques.", modelPath: "/models/serveau_moteur.glb" },
    { title: "Capteur Ultrason", description: "Détection d'obstacles et mesure de distance par ondes ultrasoniques.", modelPath: "/models/UltraSon.glb" },
    { title: "Module GPS", description: "Géolocalisation en temps réel pour la navigation autonome.", modelPath: "/models/gps_module.glb" },
    { title: "Suiveur de Ligne", description: "Capteur infrarouge pour le suivi automatique de trajectoire.", modelPath: "/models/suiveur_de_ligne.glb" },
    // { title: "Capteur de Ligne Arduino", description: "Détecteur analogique de ligne pour parcours de compétition.", modelPath: "/models/arduino_analog_line_sensor.glb" },
    { title: "Breadboard Arduino", description: "Platine d'expérimentation pour le prototypage rapide des circuits.", modelPath: "/models/arduino_breadboard_-_low_poly.glb" },
    { title: "Batterie LiPo", description: "Source d'alimentation rechargeable haute capacité pour l'autonomie.", modelPath: "/models/Batrie.glb" },
    { title: "Roue Motrice", description: "Roue caoutchoutée pour l'adhérence et la mobilité sur tout terrain.", modelPath: "/models/roue.glb" },
    { title: "Powerbank", description: "Batterie externe portable pour l'alimentation autonome des modules.", modelPath: "/models/htc_powerbank_low_poly.glb" },
    { title: "Caméra Raspberry Pi", description: "Module caméra v2.1 pour la vision par ordinateur et la détection d'objets.", modelPath: "/models/raspberry_pi_cam_v2.1.glb" },
  ]

  return (
    <div className="min-h-screen selection:bg-[#0066ff]/20 selection:text-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 md:py-3 px-4 md:px-6 bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-900/10 border-b border-slate-200/80'
          : 'py-4 md:py-5 px-4 md:px-6 bg-white/80 backdrop-blur-md border-b border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {[['#hero','Accueil','hero'],['#team','Jury','team'],['#materials','Composants 3D','materials'],['#technologies','Technologies','technologies']].map(([href, label, id]) => (
              <a
                key={id}
                href={href}
                className={`relative py-1 transition-colors duration-200 ${
                  activeSection === id
                    ? 'text-[#0066ff]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0066ff] to-[#00b4d8] rounded-full" />
                )}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-b border-slate-200 py-4 px-6 flex flex-col gap-1 shadow-2xl">
            {[['#hero','Accueil','hero'],['#team','Jury','team'],['#materials','Composants 3D','materials'],['#technologies','Technologies','technologies']].map(([href, label, id]) => (
              <a
                key={id}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-3 px-3 rounded-xl font-medium transition-all ${
                  activeSection === id
                    ? 'bg-[#0066ff]/10 text-[#0066ff]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {activeSection === id && <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />}
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-32 md:pb-20 px-4 md:px-6 overflow-hidden min-h-[95vh] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 -z-10">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Advanced Overlay for visibility */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] md:bg-white/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/90" />
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-8 lg:mt-0 w-full max-w-4xl flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#0066ff]/10 border border-[#0066ff]/20 text-[#0066ff] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6">
              <Rocket size={14} /> Équipe de Robotique d'Élite
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-slate-900">
              Concevoir l'<span className="text-gradient">Avenir</span> de <br />
              <span className="text-slate-800 break-words">{title}</span>
            </h1>
            <p className="text-base md:text-xl text-slate-600 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
              Nous repoussons les limites de l'ingénierie mécanique et de l'intelligence artificielle pour offrir des solutions robotiques de nouvelle génération pour les compétitions mondiales.
            </p>
          </motion.div>


        </div>
      </section>


      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 relative bg-slate-50/50 border-t border-slate-100">
        <div className="w-full">
          <div className="text-center mb-12 md:mb-20 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space mb-4 text-slate-900">Membres du <span className="text-gradient">Jury</span></h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto px-4">Nous avons l'honneur de présenter notre projet devant ce comité d'experts en conception mécanique et intelligence artificielle.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-none px-4 lg:px-6 mx-auto">
            {jury.map((m, i) => (
              <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] flex">
                <div className="w-full">
                  <TeamMember name={m.name} role={m.role} image={m.image} delay={i * 0.1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials / 3D Section */}
      <section id="materials" className="py-12 sm:py-16 md:py-24 relative bg-slate-50/50 border-t border-slate-100">
        <div className="w-full">
          <div className="text-center mb-12 md:mb-20 max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-[#00b4d8]/10 border border-[#00b4d8]/20 text-[#00b4d8] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4">
              Technologies Avancées
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space mb-4 text-slate-900">
              Matériaux & <span className="text-gradient">Équipements</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto px-4">
              Découvrez les 13 composants clés de notre robot, modélisés en 3D interactive. Cliquez et faites glisser pour explorer chaque pièce.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-none px-4 lg:px-6 mx-auto">
            {materials.map((mat, i) => (
              <MaterialCard 
                key={i}
                index={i}
                title={mat.title} 
                description={mat.description} 
                modelPath={mat.modelPath}
                delay={i * 0.08} 
                onExpand={setFullscreenItem}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 md:py-28 relative bg-white border-t border-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#0066ff06,transparent_55%),radial-gradient(ellipse_at_bottom_left,#00b4d806,transparent_55%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0066ff]/4 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full relative">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-16 max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066ff]/10 border border-[#0066ff]/20 text-[#0066ff] text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" /> Stack Technique
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space mb-4 text-slate-900">
              Technologies & <span className="text-gradient">Bibliothèques</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              L'ensemble des outils, frameworks et bibliothèques qui propulsent notre robot de compétition.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12 max-w-7xl mx-auto px-4">
            {[
              { value: "4", label: "Systèmes", gradient: "from-[#0066ff] to-[#00b4d8]" },
              { value: "15+", label: "Librairies", gradient: "from-[#0066ff] to-[#00b4d8]" },
              { value: "115k", label: "Baud Rate", gradient: "from-[#0066ff] to-[#00b4d8]" },
              { value: "6", label: "Classes IA", gradient: "from-[#0066ff] to-[#00b4d8]" },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className={`text-2xl md:text-3xl font-extrabold font-space bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>{s.value}</div>
                <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Bento 2x2 panel grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full max-w-none px-4 lg:px-6 mx-auto">
            {[
              {
                category: "Software Raspberry Pi", icon: <Cpu size={44} strokeWidth={1.5} />, num: "01",
                gradient: "from-[#0066ff] to-[#00b4d8]",
                glow: "hover:shadow-[#0066ff]/20",
                border: "hover:border-[#00b4d8]/40",
                items: [
                  { name: "Système", desc: "Pi OS (Debian) | Python 3.11 | SSH VS Code Remote" },
                  { name: "picamera2", desc: "Capture caméra matérielle IMX219" },
                  { name: "flask", desc: "Serveur web (stream + API backend)" },
                  { name: "opencv-cv2", desc: "Traitement d'images et stream en temps réel" },
                  { name: "luma.oled", desc: "Contrôle d'écran OLED SH1106 embarqué" },
                  { name: "pyserial & requests", desc: "Comm. USB ESP32 & envois HTTP sons PC" },
                ]
              },
              {
                category: "Software Windows PC", icon: <Monitor size={44} strokeWidth={1.5} />, num: "02",
                gradient: "from-[#0066ff] to-[#00b4d8]",
                glow: "hover:shadow-[#00b4d8]/20",
                border: "hover:border-[#0066ff]/40",
                items: [
                  { name: "Système", desc: "Windows 10/11 | Python 3.12 | IDE: VS Code" },
                  { name: "ultralytics & torch", desc: "YOLO v8 détection objets + Moteur Deep Learning" },
                  { name: "opencv-cv2", desc: "Affichage UI stream client + Scanneur QR" },
                  { name: "gtts", desc: "Google Text-to-Speech (Génération voix FR)" },
                  { name: "playsound", desc: "Lecteur natif de fichiers audio MP3" },
                  { name: "flask & requests", desc: "Reçoit sons (port 5050) & Envoie commandes Pi" },
                ]
              },
              {
                category: "IA : Modèles & Dataset", icon: <BrainCircuit size={44} strokeWidth={1.5} />, num: "03",
                gradient: "from-[#0066ff] to-[#00b4d8]",
                glow: "hover:shadow-[#0066ff]/20",
                border: "hover:border-[#00b4d8]/40",
                items: [
                  { name: "Modèle", desc: "YOLOv8l (large) — fichier yolov8l.pt" },
                  { name: "Dataset Annoté", desc: "6 classes (stop, feux_rouge, vert, orange, vitesse_80, bart)" },
                  { name: "Roboflow", desc: "Outil d'annotation des images export format YOLO" },
                  { name: "Google Colab", desc: "Environnement d'entraînement GPU gratuit hébergé" },
                  { name: "Entraînement", desc: "yolo train model=yolov8l.pt data=dataset.yaml epochs=100" },
                  { name: "Résultat", desc: "robot_final.pt généré prêt à l'inférence" },
                ]
              },
              {
                category: "Embarqué & Connectivité", icon: <Database size={44} strokeWidth={1.5} />, num: "04",
                gradient: "from-[#0066ff] to-[#00b4d8]",
                glow: "hover:shadow-[#00b4d8]/20",
                border: "hover:border-[#0066ff]/40",
                items: [
                  { name: "Arduino IDE 2.3.8", desc: "Développement C++ embarqué (115200 Baud)" },
                  { name: "ESP32 Dev Module", desc: "Microcontrôleur moteur principal" },
                  { name: "ESP32Servo", desc: "Contrôle servo, suiveur de ligne et capteurs Ultrasons" },
                  { name: "Hotspot PC ←→ Pi", desc: "LAN WiFi Windows (192.168.137.x) | HTTP port 5000" },
                  { name: "USB Pi ←→ ESP32", desc: "Câble Serial direct (Pyserial 115200 baud)" },
                ]
              },
            ].map((group, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: gi * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className={`relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl ${group.glow} ${group.border} transition-all duration-300`}
              >
                {/* Card header */}
                <div className={`bg-gradient-to-br ${group.gradient} p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.2)_0%,transparent_60%)]" />
                  <div className="flex items-start justify-between relative">
                    <div>
                      <span className="text-white/60 text-xs font-mono font-bold tracking-widest">{group.num} / 04</span>
                      <h3 className="text-white text-xl md:text-2xl font-bold font-space mt-1">{group.category}</h3>
                    </div>
                    <span className="opacity-90 select-none text-white/90 drop-shadow-sm">{group.icon}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5">
                    {group.items.map((_, i) => (
                      <div key={i} className="flex-1 h-1 rounded-full bg-white/30" />
                    ))}
                  </div>
                </div>

                {/* Tech list */}
                <div className="p-5 space-y-3">
                  {group.items.map((tech, ti) => (
                    <div key={ti} className="flex items-center gap-3 group/item">
                      <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${group.gradient} opacity-80 flex items-center justify-center flex-shrink-0`}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-slate-800 text-sm font-semibold">{tech.name}</span>
                        <span className="text-slate-400 text-xs ml-2 hidden sm:inline">{tech.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen 3D Modal */}
      {fullscreenItem && (
        <FullscreenModal item={fullscreenItem} onClose={() => setFullscreenItem(null)} />
      )}

      {/* Footer */}
      <footer className="py-6 sm:py-8 md:py-12 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between md:gap-8">
          <Logo />
          <p className="text-slate-500 text-[10px] sm:text-xs md:text-sm text-center">© 2026 Présentation Robotech. Conçu pour l'Excellence.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
