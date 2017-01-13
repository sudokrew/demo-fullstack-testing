const now = new Date();

const ads = [
  {
    id: 1,
    description: 'The greatest advertisement ever!',
    isVisible: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    description: 'The worst advertisement ever!',
    isVisible: false,
    createdAt: now,
    updatedAt: now,
  }
];

module.exports = ads;
