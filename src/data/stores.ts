// Dados de exemplo (estáticos) para a aula de Componentes Core + Flexbox.
// Mais pra frente (Sprint 3) esses dados vão vir de uma API de verdade.

export type Store = {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  address: string;
  imageUrl: string;
};

export const stores: Store[] = [
  {
    id: '1',
    name: 'Café Central',
    category: 'Cafeteria',
    rating: 4.5,
    distance: '0.4 km',
    address: 'Rua Rio Branco, 120 - Centro, Agudos - SP',
    imageUrl: 'https://picsum.photos/seed/cafe-central/200',
  },
  {
    id: '2',
    name: 'Barbearia Agudos',
    category: 'Barbearia',
    rating: 4.8,
    distance: '0.8 km',
    address: 'Av. Cristóvão Colombo, 450 - Centro, Agudos - SP',
    imageUrl: 'https://picsum.photos/seed/barbearia-agudos/200',
  },
  {
    id: '3',
    name: 'Doceria da Praça',
    category: 'Doceria',
    rating: 4.2,
    distance: '1.1 km',
    address: 'Praça Rui Barbosa, 33 - Centro, Agudos - SP',
    imageUrl: 'https://picsum.photos/seed/doceria-praca/200',
  },
];
