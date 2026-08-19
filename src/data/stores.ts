// Dados de exemplo (estáticos) para a aula de Componentes Core + Flexbox.
// Mais pra frente (Sprint 3) esses dados vão vir de uma API de verdade.

export type Store = {
  name: string;
  category: string;
  rating: number;
  distance: string;
  imageUrl: string;
};

export const stores: Store[] = [
  {
    name: 'Café Central',
    category: 'Cafeteria',
    rating: 4.5,
    distance: '0.4 km',
    imageUrl: 'https://picsum.photos/seed/cafe-central/200',
  },
  {
    name: 'Barbearia Agudos',
    category: 'Barbearia',
    rating: 4.8,
    distance: '0.8 km',
    imageUrl: 'https://picsum.photos/seed/barbearia-agudos/200',
  },
  {
    name: 'Doceria da Praça',
    category: 'Doceria',
    rating: 4.2,
    distance: '1.1 km',
    imageUrl: 'https://picsum.photos/seed/doceria-praca/200',
  },
];
