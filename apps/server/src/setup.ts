import { readFileSync } from 'fs';
import { User } from './models/User';
import { initDb } from './utils/initDb';
import { Kindergarten } from './models/Kindergarten';

const sequelize = await initDb();

await sequelize.sync({ force: true });

// Seed users
const users: Array<{ email: string, password: string }> = [
  // { email: 'football3@ukr.net', password: '123456' },
];

// Seed kindergartens
const kindergartensInitial: Array<{ id: number, name: string }> = JSON.parse(
  readFileSync('./src/data/kindergartens.json', 'utf-8'),
);
const kindergartens = kindergartensInitial.map(({ name }) => ({ name }));

// Invoke seeding
await Promise.all([
  User.bulkCreate(users),
  Kindergarten.bulkCreate(kindergartens),
]);

global.console.log('Db was successfully seeded with data');
