import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Mail, Menu, X, ArrowUpRight, Download, Send,
  ChevronLeft, ChevronRight, Maximize2,
} from "lucide-react";

/* Icônes de marques en SVG (retirées des versions récentes de lucide-react) */
const Github = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const Linkedin = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
);

/* ============ CONTENU À PERSONNALISER ============ */
const PROFILE = {
  name: "KUIDJA NANA Mauger",
  photo: "/boos.jpg", // photo à placer dans public/ (ex : public/boos.jpg)
  roles: [
    "Ingénieur des travaux en informatique",
    "Développeur full-stack",
  ],
  intro:
    "Je conçois et développe des applications web et mobiles rapides, accessibles et soignées, de la maquette jusqu'à la mise en ligne.",
  email: "maugernana7@gmail.com",
  github: "https://github.com/maugernana",
  linkedin: "https://linkedin.com/", // remplacez par l'adresse de votre profil
  // CV à placer dans le dossier public/ (le nom doit être identique, majuscules comprises)
  cv: "/cv/CV KUIDJA NANA.pdf",
  cvFileName: "CV KUIDJA NANA.pdf", // nom du fichier une fois téléchargé
  about: [
    "Ingénieur des travaux en informatique formé à l'IAI Cameroun, je développe des applications web et mobiles depuis 2 ans.",
    "J'ai effectué deux stages de trois mois, chez ReaxDigitech en 2025 puis chez AFRIK TECH en 2026, où j'ai transformé des idées en produits concrets au sein d'équipes techniques.",
    "J'aime le code propre, les interfaces claires et les petits détails d'animation qui rendent une application agréable à utiliser.",
  ],
};

const STATS = [
  ["2 ans", "d'expérience en développement"],
  ["6 mois", "de stage en entreprise"],
  ["2", "projets présentés"],
  ["Full-stack", "web et mobile"],
];

const SKILLS = [
  { name: "Flutter / Dart", level: 96 },
  { name: "JavaScript / TypeScript", level: 70 },
  { name: "React.js", level: 80 },
  { name: "Django / API REST", level: 80 },
  { name: "Node.js / API REST", level: 50 },
  { name: "Java / Spring Boot", level: 50 },
];

const TOOLS = ["Git & GitHub", "Firebase"];

/* Images : lues dans src/images/ (à côté de ce fichier).
   Si une image n'y est pas, on essaie public/images/ en secours. */
const IMAGES = import.meta.glob("./images/*.{png,jpg,jpeg,webp,svg}", { eager: true, import: "default" });
const img = (name) => IMAGES[`./images/${name}`] ?? `/images/${name}`;

const PROJECTS = [
  {
    title: "Bovin CM",
    type: "Mobile",
    subtitle: "Application mobile de suivi et d'appui à l'élevage bovin",
    desc: "Une application pour les éleveurs et les vétérinaires camerounais : suivi du troupeau, santé et vaccination, alimentation, et un assistant virtuel qui répond aux questions d'élevage 24h/24.",
    points: [
      "Deux espaces distincts : éleveur et vétérinaire",
      "Fiches de santé, calendrier de vaccination et alertes",
      "Chatbot IA pour des diagnostics instantanés",
    ],
    tags: ["Flutter", "Firebase", "Chatbot IA"],
    links: [],
    fit: "contain",
    bg: "from-amber-100 via-orange-50 to-emerald-100",
    slides: [
      { src: img("bovin-1.png"), caption: "Accueil : suivi et bien-être du troupeau" },
      { src: img("bovin-2.png"), caption: "Une prise en main simple" },
      { src: img("bovin-3.png"), caption: "Santé vétérinaire et protocoles de vaccination" },
      { src: img("bovin-4.png"), caption: "Assistant virtuel disponible 24h/24" },
      { src: img("selection.png"), caption: "Choix du compte : éleveur ou vétérinaire" },
      { src: img("Inscrip.png"), caption: "Inscription d'un éleveur" },
      { src: img("vet.png"), caption: "Inscription d'un vétérinaire" },
      { src: img("acc_1.png"), caption: "Tableau de bord de l'éleveur" },
      { src: img("bord2.png"), caption: "Espace du vétérinaire" },
    ],
  },
  {
    title: "VisitCM",
    type: "Web",
    subtitle: "Site de tourisme du Cameroun avec visites virtuelles 360°",
    desc: "Une plateforme pour découvrir les destinations du Cameroun en réalité virtuelle, préparer son voyage et trouver des guides locaux.",
    points: [
      "Visites guidées virtuelles en 360°",
      "Présentation des destinations et des guides locaux",
      "Interface responsive et rapide",
    ],
    tags: ["Django", "react js", "Tailwind CSS"],
    links: [{ label: "Code source", url: "https://github.com/maugernana/cameroun_tourisme" }],
    fit: "cover",
    bg: "from-indigo-100 via-sky-50 to-emerald-100",
    // Chaque "src" doit être unique : le diaporama s'en sert comme identifiant
    slides: [
      { src: img("visitcm-1.png"), caption: "Page d'accueil : découvrir le Cameroun en réalité virtuelle" },
      { src: img("Accueil2.png"), caption: "Présentation des visites immersives 360°" },
      { src: img("connexion.png"), caption: "Page de connexion" },
      { src: img("dashboard 1.png"), caption: "Tableau de bord du touriste" },
      { src: img("dashbord2.png"), caption: "Tableau de bord du touriste : suite" },
    ],
  },
];

const EXPERIENCE = [
  {
    period: "2026",
    duration: "Stage de 3 mois",
    role: "Stagiaire développeur",
    place: "AFRIK TECH",
    text: "Stage de trois mois au sein de l'équipe technique : développement de fonctionnalités, intégration d'interfaces et collaboration avec les développeurs sur des projets réels.",
  },
  {
    period: "Juillet – Septembre 2025",
    duration: "Stage de 3 mois",
    role: "Stagiaire développeur",
    place: "ReaxDigitech",
    text: "Première immersion en entreprise informatique : participation au développement d'applications, intégration d'interfaces et découverte des méthodes de travail d'une équipe de développement.",
  },
];

const NAV = [
  ["À propos", "about"],
  ["Compétences", "skills"],
  ["Projets", "projects"],
  ["Parcours", "experience"],
  ["Contact", "contact"],
];
const NAV_IDS = NAV.map(([, id]) => id);

/* ============ HOOKS ============ */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function useTypewriter(words, speed = 70, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) setDel(true);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) { setDel(false); setI(i + 1); }
        }
      },
      del ? speed / 2 : text.length === word.length ? pause : speed
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ============ COMPOSANTS ============ */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, seen] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <Reveal className="mb-12">
      <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
      {sub && <p className="mt-3 max-w-xl text-slate-600">{sub}</p>}
    </Reveal>
  );
}

function SkillBar({ name, level, delay }) {
  const [ref, seen] = useInView(0.5);
  return (
    <div ref={ref}>
      <div className="mb-2 flex justify-between text-sm font-medium text-slate-800">
        <span>{name}</span>
        <span className="text-slate-500">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-sky-400 transition-[width] duration-1000 ease-out motion-reduce:transition-none"
          style={{ width: seen ? `${level}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_IDS);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-white/90 shadow-sm backdrop-blur" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-bold text-slate-900">{PROFILE.name}</a>
        <ul className="hidden gap-8 md:flex">
          {NAV.map(([label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`group relative text-sm font-medium transition-colors hover:text-indigo-600 ${active === id ? "text-indigo-600" : "text-slate-700"}`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full ${active === id ? "w-full" : "w-0"}`} />
              </a>
            </li>
          ))}
        </ul>
        <button aria-label="Menu" aria-expanded={open} className="rounded-lg p-1 md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div className={`overflow-hidden bg-white transition-[max-height] duration-300 md:hidden ${open ? "max-h-80 border-t" : "max-h-0"}`}>
        {NAV.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block px-6 py-3 text-slate-700 hover:bg-slate-50">
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}

function Avatar({ className = "" }) {
  const [failed, setFailed] = useState(false);
  const initials = PROFILE.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return failed ? (
    <div className={`relative flex items-center justify-center rounded-full border-4 border-white bg-indigo-100 font-display text-7xl font-bold text-indigo-600 ${className}`}>
      {initials}
    </div>
  ) : (
    <img
      src={PROFILE.photo}
      alt={`Portrait de ${PROFILE.name}`}
      onError={() => setFailed(true)}
      className={`relative rounded-full border-4 border-white object-cover object-top shadow-xl ${className}`}
    />
  );
}

/* Bouton de téléchargement du CV : vérifie que le fichier existe avant de le télécharger */
function CvButton() {
  const [msg, setMsg] = useState("");

  const download = async (e) => {
    e.preventDefault();
    try {
      // Si le fichier est absent, le serveur renvoie la page d'accueil (text/html) : on l'ignore
      const res = await fetch(PROFILE.cv, { method: "HEAD" });
      const type = res.headers.get("content-type") || "";
      if (!res.ok || type.includes("text/html")) throw new Error("introuvable");

      const a = document.createElement("a");
      a.href = PROFILE.cv;
      a.download = PROFILE.cvFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMsg("");
    } catch {
      setMsg("Mon CV n'est pas encore disponible. Écrivez-moi pour le recevoir.");
    }
  };

  return (
    <div>
      <a
        href={PROFILE.cv}
        download={PROFILE.cvFileName}
        onClick={download}
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3 font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-indigo-600 hover:text-indigo-600"
      >
        <Download size={18} /> Télécharger mon CV
      </a>
      {msg && <p role="status" className="mt-2 text-sm text-red-600">{msg}</p>}
    </div>
  );
}

function Hero() {
  const typed = useTypewriter(PROFILE.roles);
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 animate-float rounded-full bg-gradient-to-br from-indigo-300 to-sky-200 opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 animate-float-slow rounded-full bg-gradient-to-br from-violet-200 to-pink-200 opacity-60 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="hero-in text-sm font-medium text-indigo-600" style={{ animationDelay: "100ms" }}>Bonjour, je suis</p>
          <h1 className="hero-in mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" style={{ animationDelay: "250ms" }}>
            {PROFILE.name}
          </h1>
          <p className="hero-in mt-5 min-h-[3.5rem] text-xl font-medium text-slate-700 sm:min-h-[2.5rem] sm:text-2xl lg:text-3xl" style={{ animationDelay: "450ms" }} aria-label={PROFILE.roles.join(", ")}>
            {typed}
            <span className="ml-0.5 inline-block w-0.5 animate-blink bg-indigo-600">&nbsp;</span>
          </p>
          <p className="hero-in mt-4 max-w-xl text-lg text-slate-600" style={{ animationDelay: "650ms" }}>{PROFILE.intro}</p>
          <div className="hero-in mt-6 flex flex-wrap gap-2" style={{ animationDelay: "750ms" }}>
            {["Flutter", "React", "Django", "Spring Boot"].map((t) => (
              <span key={t} className="rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-sm font-medium text-indigo-700">{t}</span>
            ))}
          </div>
          <div className="hero-in mt-9 flex flex-wrap items-start gap-4" style={{ animationDelay: "850ms" }}>
            <a href="#projects" className="rounded-full bg-indigo-600 px-7 py-3 font-medium text-white shadow-lg shadow-indigo-600/25 transition hover:-translate-y-0.5 hover:bg-indigo-700">
              Voir mes projets
            </a>
            <CvButton />
            <div className="flex gap-3 text-slate-600">
              <a aria-label="GitHub" href={PROFILE.github} target="_blank" rel="noreferrer" className="p-2 transition hover:-translate-y-0.5 hover:text-indigo-600"><Github /></a>
              <a aria-label="LinkedIn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="p-2 transition hover:-translate-y-0.5 hover:text-indigo-600"><Linkedin /></a>
            </div>
          </div>
        </div>
        {/* Photo : cercle agrandi (h-64 → lg:h-[26rem]) */}
        <div className="hero-in relative order-first mx-auto md:order-last" style={{ animationDelay: "500ms" }}>
          <div
            className="animate-orbit absolute -inset-3 rounded-full opacity-80 blur-[2px]"
            style={{ background: "conic-gradient(from 0deg, #4f46e5, #38bdf8, #8b5cf6, #4f46e5)" }}
          />
          <Avatar className="h-64 w-64 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]" />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionTitle>À propos</SectionTitle>
      <div className="grid gap-10 md:grid-cols-5">
        <Reveal className="space-y-5 text-lg leading-relaxed text-slate-700 md:col-span-3">
          {PROFILE.about.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
        <Reveal delay={150} className="grid grid-cols-2 gap-4 md:col-span-2">
          {STATS.map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="font-display text-2xl font-bold text-indigo-600 sm:text-3xl">{n}</div>
              <div className="mt-1 text-sm text-slate-600">{l}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle sub="Les technologies que j'utilise au quotidien.">Compétences</SectionTitle>
        <div className="grid gap-x-16 gap-y-6 md:grid-cols-2">
          {SKILLS.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 120} />)}
        </div>
        <Reveal className="mt-12">
          <p className="mb-3 text-sm font-medium text-slate-500">Outils</p>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700">{t}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Diaporama des captures d'un projet ---------- */
function Slideshow({ slides, fit, bg, title }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(false);
  const startX = useRef(null);
  const [broken, setBroken] = useState({});
  const n = slides.length;
  const go = useCallback((d) => setI((v) => (v + d + n) % n), [n]);

  // Précharge toutes les images : le chargement différé (lazy) ne fonctionne pas
  // pour les images cachées à droite dans le diaporama, d'où les images blanches
  useEffect(() => {
    slides.forEach((s) => { const im = new Image(); im.src = s.src; });
  }, [slides]);

  // Défilement automatique (désactivé si l'utilisateur réduit les animations)
  useEffect(() => {
    if (paused || zoom || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 3800);
    return () => clearInterval(t);
  }, [paused, zoom, n, go, i]);

  // Plein écran : touches Échap / flèches, et blocage du scroll de la page
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoom, go]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };

  const arrow = "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 shadow-md transition hover:bg-white focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100";

  return (
    <div
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      role="region"
      aria-roledescription="diaporama"
      aria-label={`Captures du projet ${title}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${bg}`}>
        <div
          className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {slides.map((s, k) => (
            <div key={s.src} className="flex h-full w-full shrink-0 items-center justify-center" aria-hidden={k !== i}>
              {broken[s.src] ? (
                <p className="px-6 text-center text-sm text-red-600">Image introuvable : {s.src}</p>
              ) : (
                <img
                  src={s.src}
                  alt={s.caption}
                  draggable={false}
                  loading="eager"
                  onError={() => setBroken((b) => ({ ...b, [s.src]: true }))}
                  className={
                    fit === "contain"
                      ? "h-[calc(100%-2rem)] w-auto max-w-full rounded-2xl shadow-2xl ring-1 ring-black/10"
                      : "h-full w-full object-cover object-top"
                  }
                />
              )}
            </div>
          ))}
        </div>

        {n > 1 && (
          <>
            <button aria-label="Image précédente" onClick={() => go(-1)} className={`${arrow} left-3`}><ChevronLeft size={22} /></button>
            <button aria-label="Image suivante" onClick={() => go(1)} className={`${arrow} right-3`}><ChevronRight size={22} /></button>
          </>
        )}
        <button
          aria-label="Afficher en plein écran"
          onClick={() => setZoom(true)}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-slate-800 shadow-md transition hover:bg-white"
        >
          <Maximize2 size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <p className="min-w-0 flex-1 text-sm font-medium text-slate-700" aria-live="off">
          {slides[i].caption}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-1.5">
            {slides.map((s, k) => (
              <button
                key={s.src}
                aria-label={`Aller à l'image ${k + 1}`}
                aria-current={k === i}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-indigo-600" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
          <span className="text-xs tabular-nums text-slate-500">{i + 1}/{n}</span>
        </div>
      </div>

      {zoom &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} : ${slides[i].caption}`}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/90 p-4"
            onClick={() => setZoom(false)}
          >
            <button aria-label="Fermer" onClick={() => setZoom(false)} className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20">
              <X />
            </button>
            {n > 1 && (
              <button aria-label="Image précédente" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-6">
                <ChevronLeft />
              </button>
            )}
            <img
              src={slides[i].src}
              alt={slides[i].caption}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <p className="mt-4 text-center text-sm text-white/80">{slides[i].caption} ({i + 1}/{n})</p>
            {n > 1 && (
              <button aria-label="Image suivante" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-6">
                <ChevronRight />
              </button>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}

function ProjectRow({ p, index }) {
  const flip = index % 2 === 1;
  return (
    <Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <div className={flip ? "lg:order-2" : ""}>
        <Slideshow slides={p.slides} fit={p.fit} bg={p.bg} title={p.title} />
      </div>
      <div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">{p.type}</span>
        <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 sm:text-3xl">{p.title}</h3>
        <p className="mt-1 font-medium text-indigo-600">{p.subtitle}</p>
        <p className="mt-4 max-w-lg leading-relaxed text-slate-600">{p.desc}</p>
        <ul className="mt-5 space-y-2 text-slate-700">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">{t}</span>
          ))}
        </div>
        {p.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-800 transition hover:border-indigo-600 hover:text-indigo-600">
                {l.label} <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

function Projects() {
  const [filter, setFilter] = useState("Tous");
  const types = ["Tous", "Web", "Mobile"];
  const list = PROJECTS.filter((p) => filter === "Tous" || p.type === filter);
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionTitle sub="Une sélection de réalisations. Parcourez les captures de chaque projet.">Projets</SectionTitle>
      <div className="mb-12 flex gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            aria-pressed={filter === t}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              filter === t ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-24">
        {list.map((p, i) => <ProjectRow key={p.title} p={p} index={i} />)}
      </div>
    </section>
  );
}

function TimelineItem({ e, i }) {
  const [ref, seen] = useInView(0.15);
  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${i * 100}ms` }}
      className={`relative transition-all duration-700 ease-out motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      <span className="absolute -left-[41px] top-7 h-4 w-4 rounded-full border-4 border-white bg-indigo-600 ring-2 ring-indigo-200" />
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-indigo-600">{e.period}</p>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">{e.duration}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-slate-900">{e.role}</h3>
        <p className="font-medium text-slate-500">{e.place}</p>
        <p className="mt-3 text-slate-600">{e.text}</p>
      </div>
    </li>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionTitle sub="Mes expériences en entreprise, de la plus récente à la plus ancienne.">Parcours</SectionTitle>
        <ol className="relative space-y-8 border-l-2 border-slate-200 pl-8">
          {EXPERIENCE.map((e, i) => <TimelineItem key={e.place} e={e} i={i} />)}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    // Remplacez par votre service (Formspree, EmailJS, API...)
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Message de " + form.name)}&body=${encodeURIComponent(form.message + "\n\n" + form.email)}`;
    setStatus("sent");
  };
  const field = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200";
  return (
    <section id="contact" className="mx-auto max-w-3xl scroll-mt-16 px-6 py-24">
      <SectionTitle sub="Un projet, une question ? Écrivez-moi, je réponds sous 48 h.">Contact</SectionTitle>
      <Reveal className="space-y-4">
        <input className={field} placeholder="Votre nom" aria-label="Votre nom" value={form.name} onChange={change("name")} />
        <input className={field} type="email" placeholder="Votre e-mail" aria-label="Votre e-mail" value={form.email} onChange={change("email")} />
        <textarea className={field} rows={5} placeholder="Votre message" aria-label="Votre message" value={form.message} onChange={change("message")} />
        <button onClick={submit} className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 font-medium text-white shadow-lg shadow-indigo-600/25 transition hover:-translate-y-0.5 hover:bg-indigo-700">
          <Send size={18} /> Envoyer le message
        </button>
        {status === "error" && <p className="text-sm text-red-600">Renseignez votre nom, votre e-mail et votre message avant d'envoyer.</p>}
        {status === "sent" && <p className="text-sm text-emerald-600">Votre application de messagerie s'est ouverte avec le message prêt à envoyer.</p>}
        <p className="flex items-center gap-2 pt-4 text-slate-600">
          <Mail size={18} />
          <a href={`mailto:${PROFILE.email}`} className="hover:text-indigo-600">{PROFILE.email}</a>
        </p>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {PROFILE.name}.</p>
        <div className="flex gap-4">
          <a aria-label="GitHub" href={PROFILE.github} target="_blank" rel="noreferrer" className="transition hover:text-indigo-600"><Github size={20} /></a>
          <a aria-label="LinkedIn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-indigo-600"><Linkedin size={20} /></a>
          <a aria-label="E-mail" href={`mailto:${PROFILE.email}`} className="transition hover:text-indigo-600"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
}

/* ============ APP ============ */
export default function Portfolio() {
  return (
    <div className="scroll-smooth bg-slate-50 font-body text-slate-800 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;700;800&family=Inter:wght@400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .font-display { font-family: 'Sora', system-ui, sans-serif; }
        .font-body { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes heroIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-24px); } }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes orbit { to { transform: rotate(360deg); } }
        .animate-orbit { animation: orbit 12s linear infinite; }
        .hero-in { opacity: 0; animation: heroIn .8s ease-out forwards; }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-slow { animation: float 12s ease-in-out infinite; }
        .animate-blink { animation: blink 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-in { opacity: 1; animation: none; }
          .animate-float, .animate-float-slow, .animate-blink, .animate-orbit { animation: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}