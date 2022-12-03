const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const stream = require('stream');
const { promisify } = require('util');

const algorithm = 'aes-192-cbc';
const rootDir = process.cwd();

const pipeline = promisify(stream.pipeline);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the password to decrypt: ', async (password) => {
  try {
    const file = await decrypt(password);

    console.log('Decrypted:', file);
  } catch {
    console.error('Wrong password');
  } finally {
    rl.close();
  }
});

async function decrypt(password) {
  const key = crypto.scryptSync(password, 'apoj', 24);
  const iv = Buffer.alloc(16, 0);

  const fileExists = fs.existsSync(path.join(rootDir, './.env.enc'));

  if (!fileExists) {
    throw new Error('No .env.enc file found');
  }

  await pipeline(
    fs.createReadStream(path.join(rootDir, './.env.enc')),
    crypto.createDecipheriv(algorithm, key, iv),
    fs.createWriteStream(path.join(rootDir, './.env'))
  );

  return path.join(rootDir, './.env.enc');
}
