import { User } from './models/User';
import { initDb } from './utils/initDb';

const sequelize = await initDb();

await sequelize.sync({ force: true });

// Seed users
const users: Array<{ email: string, password: string, name: string }> = [
  { email: 'football3@ukr.net', password: '123456', name: 'Serhii' },
];

// Invoke seeding
await Promise.all([
  User.bulkCreate(users),
]);

global.console.log('Db was successfully seeded with data');
