import { Config } from './models/Config';
import { User } from './models/User';
import { initDb } from './utils/initDb';

const sequelize = await initDb();

await sequelize.sync({ force: true });

// Seed users
const users: Array<{ email: string, password: string, name: string }> = [
  { email: 'football3@ukr.net', password: '123456', name: 'Serhii' },
];

const config = {
  name: 'main',
  timeThreshold: 10,
  hasEquipment: false,
  maxGenerations: 300,
  pCrossover: 0.7,
  pMutation: 0.05,
  popSize: 100,
};

// Invoke seeding
await Promise.all([
  User.bulkCreate(users),
  Config.create(config),
]);

global.console.log('Db was successfully seeded with data');
