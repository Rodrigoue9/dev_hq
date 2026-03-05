
import { ServiceItem, ProjectItem } from './types';

export const BRAND_NAME = "DEV_HQ";
export const HERO_HEADLINE = "SOLUÇÕES DIGITAIS PODEROSAS.";
export const HERO_SUBHEADLINE = "Engenharia de Software & Marketing Estratégico.";

export const SERVICES: ServiceItem[] = [
  {
    id: "ecommerce-pro",
    title: "E-commerce Pro",
    description: "Lojas que vendem enquanto você dorme.",
    price: "Start: R$ 500,00",
    longDescription: "Pare de queimar sua margem de lucro. Enquanto marketplaces tradicionais cobram até 14% de comissão sobre cada venda, com seu E-commerce próprio você assume o controle total e paga apenas a taxa do gateway (média de 4%). Desenvolvemos lojas de alta performance focadas em transformar essa economia em lucro líquido e escala real para o seu negócio.",
    features: ["Painel Administrativo Intuitivo", "Checkout Transparente", "Otimização para Mobile", "Integração com Pixel e Analytics"]
  },
  {
    id: "artes-digitais",
    title: "Artes Digitais",
    description: "Design que para o scroll.",
    price: "Start: R$ 15,00",
    longDescription: "Design não é apenas estética; é a ciência de capturar a atenção em segundos. Criamos identidades visuais e criativos publicitários que comunicam autoridade instantânea e elevam o valor percebido do seu produto. Fuja do comum e utilize design estratégico para aumentar seu CTR e converter seguidores em clientes fiéis.",
    features: ["Social Media Design Premium", "Identidade Visual Corporativa", "Motion Graphics Publicitários", "CGI & Modelagem 3D para Produtos"]
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "Alta conversão e velocidade extrema.",
    price: "Orçamento Personalizado",
    longDescription: "Páginas de vendas projetadas com engenharia de persuasão e performance técnica impecável. Otimizadas para carregar em milissegundos, garantindo que você não perca nenhum lead por lentidão e maximize seu ROI em campanhas. Usamos as mesmas tecnologias que gigantes como Netflix e Uber para garantir estabilidade e conversão.",
    features: ["Copywriting Persuasivo", "Velocidade de Carregamento < 1s", "Design Responsivo Premium", "Tagueamento Avançado (Pixel/API)"]
  },
  {
    id: "trafego-pago",
    title: "Tráfego Pago",
    description: "Ads estratégicos.",
    price: "Sob Consulta",
    longDescription: "Gestão estratégica de tráfego para escalar suas vendas. Pare de postar conteúdo e esperar pela sorte. Com tráfego pago, injetamos seus produtos diretamente na frente de quem já quer comprar. Utilizamos inteligência de dados e testes A/B constantes para otimizar cada centavo do seu investimento, focando sempre no maior ROAS possível.",
    features: ["Gestão Meta Ads & Google Ads", "Remarketing Estratégico", "Análise de Dados e ROI", "Relatórios Semanais"]
  }
];

export const CONTACT_PHONE = "+55 62 99571-4707";
export const CONTACT_CTA = "QUERO ESCALAR MEU NEGÓCIO AGORA";

export const SERVICE_TYPE_MAP: Record<string, string> = {
  "ecommerce-pro": "E-commerce",
  "artes-digitais": "Design Digital",
  "landing-pages": "Landing Page",
  "trafego-pago": "Ads Strategy"
};

export const getWhatsAppLink = (text: string) =>
  `https://wa.me/${CONTACT_PHONE.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;

export const PROJECTS: ProjectItem[] = [
  {
    slug: "agencia-e-digital",
    client: "Agência E-Digital",
    type: "Site Institucional / Landing Page",
    image: "/projects/agenciaedigital/1.jpg",
    images: Array.from({ length: 5 }, (_, i) => `/projects/agenciaedigital/${i + 1}.jpg`),
    link: "https://agenciaedigital.netlify.app/",
    tags: ["Agência", "Design", "Performance"],
    year: "2024",
    roi: "Score 100/100"
  },
  {
    slug: "site-vendas-pdf",
    client: "Site de Vendas de PDF",
    type: "Landing Page",
    image: "/projects/testegabrielpfd/1.jpg",
    images: Array.from({ length: 5 }, (_, i) => `/projects/testegabrielpfd/${i + 1}.jpg`),
    link: "https://testegabrielpfd.netlify.app/",
    tags: ["Landing Page", "Vendas", "PDF"],
    year: "2024"
  },
  {
    slug: "ceara-pragas",
    client: "Ceará Pragas",
    type: "Site Institucional",
    image: "/projects/ceara-pragas/1.jpg",
    images: Array.from({ length: 5 }, (_, i) => `/projects/ceara-pragas/${i + 1}.jpg`),
    link: "https://ceara-pragas.com.br/",
    tags: ["Institucional", "SEO"],
    year: "2023",
    roi: "Lead Qualificado"
  },
  {
    slug: "unopar-ceres",
    client: "Unopar Ceres",
    type: "Landing Page Educacional",
    image: "/projects/unopar-ceres/1.jpg",
    images: Array.from({ length: 5 }, (_, i) => `/projects/unopar-ceres/${i + 1}.jpg`),
    link: "https://unopar-ceres.netlify.app/",
    tags: ["Educação", "Captação", "Polos"],
    year: "2024",
    roi: "Alta Matrícula"
  },
  {
    slug: "anhanguera-jaragua",
    client: "Anhanguera Jaraguá",
    type: "Landing Page Educacional",
    image: "/projects/anhanguera-jaragua/1.jpg",
    images: Array.from({ length: 5 }, (_, i) => `/projects/anhanguera-jaragua/${i + 1}.jpg`),
    link: "https://anhanguera-jaragua.netlify.app/",
    tags: ["Educação", "Universidade"],
    year: "2024"
  },
  {
    slug: "unopar-rubiataba",
    client: "Unopar Rubiataba",
    type: "Landing Page Educacional",
    image: "/projects/unopar-rubiataba/1.jpg",
    images: Array.from({ length: 5 }, (_, i) => `/projects/unopar-rubiataba/${i + 1}.jpg`),
    link: "https://rodrigoue9.github.io/site-unopar-rubiataba/index.html",
    tags: ["Educação", "GitHub Pages"],
    year: "2024"
  },
  {
    slug: "radar-vocacional",
    client: "Radar Vocacional",
    type: "Plataforma / Landing Page",
    image: "/projects/radarvocacional/1.jpg",
    images: Array.from({ length: 5 }, (_, i) => `/projects/radarvocacional/${i + 1}.jpg`),
    link: "https://radarvocacional.netlify.app/",
    tags: ["Vocacional", "Testes", "UI/UX"],
    year: "2024",
    roi: "Alto Engajamento"
  },
  {
    slug: "promobia-moveis",
    client: "Promobia Móveis",
    type: "E-commerce & Painel Exclusivo",
    image: "/projects/promobia/6.jpg",
    images: [
      ...Array.from({ length: 15 }, (_, i) => `/projects/promobia/${i + 1}.jpg`),
      ...Array.from({ length: 15 }, (_, i) => `/projects/promobia-admin/${i + 1}.jpg`)
    ],
    link: "https://promobia.online/",
    tags: ["E-commerce", "Dashboard", "Loja Virtual", "Admin"],
    year: "2024",
    roi: "+ Alta Conversão e Gestão"
  }
];
