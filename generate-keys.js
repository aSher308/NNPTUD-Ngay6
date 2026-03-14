/**
 * Script để tạo RSA key pair cho JWT RS256
 * Chạy: node generate-keys.js
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

console.log('🔐 Generating RSA Key Pair for JWT RS256...\n');

// Tạo RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

// Tạo folder 'keys' nếu chưa có
const keysDir = path.join(__dirname, 'keys');
if (!fs.existsSync(keysDir)) {
    fs.mkdirSync(keysDir);
    console.log('✅ Created "keys" folder\n');
}

// Lưu private key
const privateKeyPath = path.join(keysDir, 'private.key');
fs.writeFileSync(privateKeyPath, privateKey);
console.log(`✅ Private key saved: ${privateKeyPath}`);

// Lưu public key
const publicKeyPath = path.join(keysDir, 'public.key');
fs.writeFileSync(publicKeyPath, publicKey);
console.log(`✅ Public key saved: ${publicKeyPath}\n`);

console.log('📌 Key Details:');
console.log(`   - Algorithm: RSA`);
console.log(`   - Key Size: 4096 bits`);
console.log(`   - Format: PEM\n`);

console.log('✅ Keys generated successfully!');
console.log('⚠️  Keep private.key secret! Add to .gitignore\n');
