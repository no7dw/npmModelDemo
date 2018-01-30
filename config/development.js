module.exports = {
  database: {
    mongoDebug: false,
    mongodb: [
      {
        name: 'test',
        url: process.env.URI || 'mongodb://localhost',
        options: {}
      }
    ]
  }
};
