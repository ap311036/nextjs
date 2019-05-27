const nextRoutes = require('next-routes');
const sharedRoutes = module.exports = nextRoutes();

sharedRoutes.add({ name: 'app', pattern: '/', page: 'app' });