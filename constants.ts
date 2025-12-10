
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
export const CONTACT_CTA = "VAMOS CONVERSAR?";

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
    client: "Bio Clean Store",
    type: "E-commerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Gostaria de conhecer o case E-commerce da Bio Clean."),
    tags: ["React", "Node.js", "Stripe"],
    year: "2024",
    roi: "+45% Conversão"
  },
  {
    client: "Lançamento InfoExpert",
    type: "Landing Page",
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Vi o case InfoExpert e quero uma Landing Page ultra rápida assim."),
    tags: ["Next.js", "Vercel", "Performance"],
    year: "2024",
    roi: "Load: 0.6s"
  },
  {
    client: "Rebranding TechStart",
    type: "Design Digital",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Vi o rebranding da TechStart e quero algo nesse nível."),
    tags: ["Illustrator", "Photoshop", "Branding"],
    year: "2024",
    roi: "Nova Identidade"
  },
  {
    client: "Lançamento Meteórico",
    type: "Ads Strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Gostaria de saber mais sobre o ROI de 12x no tráfego pago."),
    tags: ["Google Ads", "Youtube Ads", "Scale"],
    year: "2024",
    roi: "ROAS 12x"
  },
  {
    client: "Página de Vendas Nutri",
    type: "Landing Page",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Preciso de uma página de vendas otimizada como a da Nutri."),
    tags: ["React", "SEO", "CRO"],
    year: "2024",
    roi: "Score 100/100"
  },
  {
    client: "Pack Criativos Black Friday",
    type: "Design Digital",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Preciso de criativos que convertam como o pack da Black Friday."),
    tags: ["After Effects", "Blender", "3D"],
    year: "2024",
    roi: "+300% CTR"
  },
  {
    client: "Invest Imóveis",
    type: "Ads Strategy",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Quero saber como conseguiram leads a R$ 2,50 para imobiliária."),
    tags: ["Meta Ads", "Remarketing", "CRM"],
    year: "2024",
    roi: "CPL R$ 2,50"
  },
  {
    client: "Gourmet Coffee Hub",
    type: "E-commerce",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec41b501?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Gostaria de conhecer o case E-commerce do Gourmet Coffee Hub."),
    tags: ["Next.js", "Shopify", "UI/UX"],
    year: "2023",
    roi: "R$ 200k+ Vendas"
  },
  {
    client: "Solar Energy LP",
    type: "Landing Page",
    image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Gostaria de ver o case da Solar Energy."),
    tags: ["Tailwind", "GSAP", "Conversion"],
    year: "2024",
    roi: "Lead R$ 1,40"
  },
  {
    client: "Masterclass Financeira",
    type: "Landing Page",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    link: getWhatsAppLink("Olá! Gostaria de ver a Landing Page da Masterclass Financeira."),
    tags: ["Copywriting", "Fast Load", "Marketing"],
    year: "2023",
    roi: "3.5% CVR"
  }
];
