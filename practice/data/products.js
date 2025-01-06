export const products = [
  { 
    id: 'a2020',
    image: 'athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: {
      star: 4.5,
      count: 87
    },
    priceCents: 1090
  },
  {
    id: 'b2021',
    image: 'intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
      star: 4.0,
      count: 127
    },
    priceCents: 2095
  },
  {
    id: 'c2022',
    image: 'adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
      star: 4.5,
      count: 56
    },
    priceCents: 790
  },
  {
    id: 'd2023',
    image: '6-piece-white-dinner-plate-set.jpg',
    name: '6 piece white dinner plate set',
    rating: {
      star: 4.0,
      count: 127
    },
    priceCents: 2095
  }
];

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}