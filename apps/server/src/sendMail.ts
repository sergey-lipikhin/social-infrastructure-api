import { emailService } from './services/emailService';

await emailService.send(
  'wejeves420@weizixu.com',
  'Test',
  '<h1>Hello world<h1>',
);
