module.exports = {
  async up(db) {
    await db.collection('users').insertOne({
      name: 'Lucas Alves',
      email: 'lucas@hotmail.com',
      password: 'Lucas@123',
    });
  },

  async down(db) {
    await db.collection('users').remove({
      name: 'Lucas Alves',
      email: 'lucas@hotmail.com',
      password: 'Lucas@123',
    });
  },
};
