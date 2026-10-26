export type Role =
  | "Bug bounty"
  | "CTF"
  | "Seguridad de aplicaciones"
  | "Red team ético"
  | "Blue team y defensa"
  | "Ingeniería inversa"
  | "Criptografía"
  | "Privacidad"
  | "IoT / Hardware embebido"
  | "Educación"
  | "Ingeniería de Software"
  | "Blockchain"
  | "Criptomonedas / Web3"
  | "Contratos inteligentes"
  | "DevOps / Infraestructura"
  | "Datos / Inteligencia Artificial"
  | "Redes"
  | "Finanzas / Fintech"
  | "Marketing"
  | "Diseño / Producto"
  | "Investigación académica"
  | "Legal / Compliance / Regulación"
  | "Emprendimiento"
  | "Embajador de plataforma";

export type HackerProfile = {
  rank: number;
  name: string;
  handle: string;
  title?: string;
  city: string;
  years: number;
  roles: Role[];
  bio: string;
  highlight: string;
  links?: string[];
  evidence?: string[];
  score?: number;
};

export const ROLES: Role[] = [
  "Bug bounty",
  "CTF",
  "Seguridad de aplicaciones",
  "Red team ético",
  "Blue team y defensa",
  "Ingeniería inversa",
  "Criptografía",
  "Privacidad",
  "IoT / Hardware embebido",
  "Educación",
  "Ingeniería de Software",
  "Blockchain",
  "Criptomonedas / Web3",
  "Contratos inteligentes",
  "DevOps / Infraestructura",
  "Datos / Inteligencia Artificial",
  "Redes",
  "Finanzas / Fintech",
  "Marketing",
  "Diseño / Producto",
  "Investigación académica",
  "Legal / Compliance / Regulación",
  "Emprendimiento",
  "Embajador de plataforma",
];

/** Perfiles publicados en bolivia-100-hackers.vercel.app (temporada 2026). */
export const OCCUPIED: HackerProfile[] = [
  {
    rank: 1,
    name: "Jhon Angelo Rivera Cartagena",
    handle: "Angel_tech",
    title: "Founder, Team Zephy",
    city: "Santa Cruz, Santa Cruz",
    years: 6,
    roles: [
      "Ingeniería de Software",
      "Blockchain",
      "Criptomonedas / Web3",
      "Finanzas / Fintech",
    ],
    bio: "Founder de Team Zephy, comunidad de investigación y tecnología para Latinoamérica. Ingeniero de sistemas y aeroespacial autodidacta. Web3, blockchain, fintech y ciberseguridad.",
    highlight:
      "Fundó Team Zephy y construye en software, web3 y fintech desde Santa Cruz.",
    links: ["https://github.com/Angelldino23/raking-Bolivia-100"],
    evidence: ["Team Zephy", "Comunidad LATAM", "Web3 / fintech"],
    score: 4680,
  },
  {
    rank: 2,
    name: "Nicolás Emir Mejía Agreda",
    handle: "nemejia",
    city: "Santa Cruz, Santa Cruz",
    years: 4,
    roles: ["Embajador de plataforma", "Datos / Inteligencia Artificial"],
    bio: "Embajador n8n. Ingeniero de automatización e IA. SQL, Python, Power BI y Tableau. Santa Cruz · UAGRM · WET Chemical Bolivia.",
    highlight:
      "Embajador n8n y automatización aplicada. Forma equipos en IA, SQL y pipelines de datos.",
    evidence: ["n8n", "Python", "Power BI"],
    score: 4120,
  },
  {
    rank: 3,
    name: "Vanessa Cárdenas de la Fuente",
    handle: "vanelncripto",
    city: "Santa Cruz, Santa Cruz",
    years: 5,
    roles: [
      "Embajador de plataforma",
      "Educación",
      "Blockchain",
      "Criptomonedas / Web3",
    ],
    bio: "VanelNCripto. Embajadora MERUU Bolivia. Educa web3 y bitcoin. Core team Builders Bolivia y Satoshi Casas. Santa Cruz · Escuela Militar de Ingeniería.",
    highlight:
      "Embajadora MERUU Bolivia y educadora web3. Lidera comunidad bitcoin y builders en Santa Cruz.",
    evidence: ["VanelNCripto", "MERUU Bolivia", "Builders Bolivia"],
    score: 4050,
  },
  {
    rank: 4,
    name: "Yeisa Torrico",
    handle: "yeisa",
    title: "Co-founder, YAIS Lab",
    city: "Santa Cruz, Santa Cruz",
    years: 3,
    roles: [
      "Educación",
      "Datos / Inteligencia Artificial",
      "Investigación académica",
    ],
    bio: "Co-founder de YAIS Lab, comunidad impulsada por inteligencia artificial e investigación. Aborda problemas de Bolivia con proyectos desde esa base. Impulsa mujeres en STEM, IT e IA.",
    highlight:
      "Co-founder de YAIS Lab. Promueve mujeres en STEM, IT e IA desde Santa Cruz.",
    evidence: ["YAIS Lab"],
    score: 3980,
  },
  {
    rank: 5,
    name: "Sergio Mauricio Núñez",
    handle: "mauricio",
    city: "Santa Cruz, Santa Cruz",
    years: 5,
    roles: ["Datos / Inteligencia Artificial", "Diseño / Producto"],
    bio: "Ingeniero de IA. AI Safety y product manager de IA. Santa Cruz · YAIS Lab · UAGRM.",
    highlight: "Ingeniero de IA y AI Safety. Product manager de IA en YAIS Lab.",
    evidence: ["YAIS Lab", "AI Safety"],
    score: 3890,
  },
  {
    rank: 7,
    name: "Jhenny Solis",
    handle: "jhennysolis",
    title: "UI/UX Designer",
    city: "Santa Cruz, Santa Cruz",
    years: 2,
    roles: ["Diseño / Producto", "Embajador de plataforma", "Educación"],
    bio: "Diseñadora UI/UX y community leader en Santa Cruz. Impulsa a más mujeres en tecnología con Women Techmakers y Ficct Ladies. Estudia Ingeniería de Sistemas.",
    highlight:
      "Community leader: Women Techmakers y Ficct Ladies. Diseña en Figma para acercar más mujeres a la tecnología.",
    evidence: ["Women Techmakers Santa Cruz", "Ficct Ladies"],
    score: 3510,
  },
  {
    rank: 8,
    name: "Dax Kenji Tellez Duran",
    handle: "kenyi001",
    title: "Full Stack & Backend",
    city: "Santa Cruz, Santa Cruz",
    years: 4,
    roles: [
      "Ingeniería de Software",
      "Datos / Inteligencia Artificial",
      "DevOps / Infraestructura",
    ],
    bio: "Desarrollador full stack y backend. Python, Node.js, C#/.NET y React. APIs REST, IA (RAG/OCR), PostgreSQL, automatización con n8n y cloud (AWS, Azure, GCP). UTEPSA.",
    highlight:
      "Backends y sistemas full stack. Staff del Cursor Buildathon Bolivia.",
    links: ["https://github.com/Kenyi001", "https://daxkenyi.vercel.app"],
    evidence: ["github.com/Kenyi001", "daxkenyi.vercel.app"],
    score: 3440,
  },
  {
    rank: 13,
    name: "Ariane Somoza Rocha",
    handle: "arianesomoza",
    title: "Local Lead, NASA Space Apps Santa Cruz",
    city: "Santa Cruz, Santa Cruz",
    years: 2,
    roles: ["Ingeniería de Software", "Embajador de plataforma", "Educación"],
    bio: "Local Lead del NASA Space Apps Challenge en Santa Cruz. Tech Lead en UxODS. Estudia Ingeniería de Sistemas en la UAGRM y construye con JavaScript, Java y Python.",
    highlight:
      "Local Lead del NASA Space Apps Challenge en Santa Cruz. Tech Lead en UxODS.",
    evidence: ["NASA Space Apps Santa Cruz", "UxODS"],
    score: 3180,
  },
];

export const TOTAL_SEATS = 100;

export function getOccupiedByRank(rank: number): HackerProfile | undefined {
  return OCCUPIED.find((h) => h.rank === rank);
}

export function getStats() {
  const occupied = OCCUPIED.length;
  return {
    seats: TOTAL_SEATS,
    occupied,
    open: TOTAL_SEATS - occupied,
    reviewing: 0,
  };
}

export function buildBoard(roleFilter?: string | null) {
  const byRank = new Map(OCCUPIED.map((h) => [h.rank, h]));
  const rows = Array.from({ length: TOTAL_SEATS }, (_, i) => {
    const rank = i + 1;
    const profile = byRank.get(rank);
    return { rank, profile: profile ?? null };
  });

  if (!roleFilter || roleFilter === "Todos") return rows;

  return rows.filter(
    (row) =>
      !row.profile || row.profile.roles.includes(roleFilter as Role)
  );
}
