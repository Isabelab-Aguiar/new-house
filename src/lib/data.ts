export const EVENT_INFO = {
  coupleName: "Isabella & Rafael",
  date: "Sábado, 12 de Abril de 2025",
  time: "15h00",
  address: "Rua das Acácias, 128 – Apto 72",
  neighborhood: "Jardim Europa, São Paulo – SP",
  mapsLink: "https://maps.google.com",
  dresscode: "Casual Elegante",
  message:
    "Com imensa alegria, convidamos você para celebrar conosco a chegada ao nosso novo lar. Será uma tarde cheia de amor, carinho e muito carinho para decorar nossa nova casa.",
};

export interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  reserved: boolean;
  reservedBy?: string;
  priority: "alta" | "media" | "baixa";
  pixKey?: string;
}

export const GIFT_LIST: GiftItem[] = [
  {
    id: "1",
    name: "Jogo de Panelas Premium",
    description: "Conjunto 5 peças antiaderente, fundo triplo, com tampas de vidro",
    price: 380,
    category: "Cozinha",
    icon: "🍳",
    reserved: false,
    priority: "alta",
    pixKey: "isabella@email.com",
  },
  {
    id: "2",
    name: "Jogo de Cama King Percal 400 Fios",
    description: "Lençol + 2 fronhas + edredom em algodão percal premium",
    price: 520,
    category: "Quarto",
    icon: "🛏️",
    reserved: false,
    priority: "alta",
    pixKey: "isabella@email.com",
  },
  {
    id: "3",
    name: "Air Fryer Digital 5L",
    description: "Fritadeira sem óleo com display digital e 8 funções",
    price: 299,
    category: "Cozinha",
    icon: "⚡",
    reserved: true,
    reservedBy: "Família Costa",
    priority: "alta",
    pixKey: "isabella@email.com",
  },
  {
    id: "4",
    name: "Jogo de Toalhas de Banho",
    description: "6 peças 100% algodão egípcio – Branco Neve",
    price: 220,
    category: "Banheiro",
    icon: "🛁",
    reserved: false,
    priority: "media",
    pixKey: "isabella@email.com",
  },
  {
    id: "5",
    name: "Luminária de Piso",
    description: "Luminária articulada com base de mármore e cúpula em tecido",
    price: 350,
    category: "Sala",
    icon: "💡",
    reserved: false,
    priority: "media",
    pixKey: "isabella@email.com",
  },
  {
    id: "6",
    name: "Cafeteira Espresso Automática",
    description: "Máquina de café com moedor integrado, 15 bar",
    price: 899,
    category: "Cozinha",
    icon: "☕",
    reserved: false,
    priority: "alta",
    pixKey: "isabella@email.com",
  },
  {
    id: "7",
    name: "Quadro Decorativo Sala",
    description: "Conjunto 3 quadros com moldura dourada, estilo minimalista",
    price: 180,
    category: "Decoração",
    icon: "🖼️",
    reserved: false,
    priority: "media",
    pixKey: "isabella@email.com",
  },
  {
    id: "8",
    name: "Aspirador Robô Inteligente",
    description: "Robô aspirador com mapeamento laser e controle via app",
    price: 1200,
    category: "Casa",
    icon: "🤖",
    reserved: false,
    priority: "alta",
    pixKey: "isabella@email.com",
  },
  {
    id: "9",
    name: "Conjunto de Pratos para 8 Pessoas",
    description: "Porcelana premium com borda dourada – 24 peças",
    price: 420,
    category: "Cozinha",
    icon: "🍽️",
    reserved: false,
    priority: "media",
    pixKey: "isabella@email.com",
  },
  {
    id: "10",
    name: "Tapete Sala 2x3m",
    description: "Tapete felpudo antiderrapante, cor nude, textura premium",
    price: 480,
    category: "Sala",
    icon: "🏠",
    reserved: false,
    priority: "media",
    pixKey: "isabella@email.com",
  },
  {
    id: "11",
    name: "Kit Porta-Retratos",
    description: "Conjunto 5 molduras metálicas estilo contemporâneo",
    price: 150,
    category: "Decoração",
    icon: "📸",
    reserved: false,
    priority: "baixa",
    pixKey: "isabella@email.com",
  },
  {
    id: "12",
    name: "Batedeira Planetária",
    description: "600W, 10 velocidades, 4 acessórios inox",
    price: 560,
    category: "Cozinha",
    icon: "🎂",
    reserved: false,
    priority: "media",
    pixKey: "isabella@email.com",
  },
];

export const CATEGORIES = ["Todos", "Cozinha", "Quarto", "Sala", "Banheiro", "Decoração", "Casa"];

export const COUPLE_PHOTOS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=90",
    alt: "Casal feliz na nova casa",
    caption: "O começo de um novo capítulo",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1400&q=90",
    alt: "Casal sorrindo",
    caption: "Cada momento ao seu lado é especial",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1472746729193-8c5b0b5c8b7e?w=1400&q=90",
    alt: "Casal abraçados",
    caption: "Construindo nosso lar juntos",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=1400&q=90",
    alt: "Casal na natureza",
    caption: "Uma nova aventura nos espera",
  },
];

export const TIMELINE = [
  { time: "15h00", event: "Chegada dos Convidados", icon: "🏠" },
  { time: "15h30", event: "Visitinha à Nova Casa", icon: "🔑" },
  { time: "16h00", event: "Brunch & Drinks", icon: "🥂" },
  { time: "17h00", event: "Abertura dos Presentes", icon: "🎁" },
  { time: "18h00", event: "Bolo & Sobremesas", icon: "🎂" },
  { time: "19h00", event: "Encerramentos & Abraços", icon: "💛" },
];
