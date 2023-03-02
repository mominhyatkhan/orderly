import * as dotenv from 'dotenv';

dotenv.config();

const { SENDGRIDAPIKEY } = process.env;

if (!SENDGRIDAPIKEY) {
  throw new Error('Missing Environment Variables');
}
const config: Record<string, string> = {
  SENDGRIDAPIKEY,
};

export default config;
