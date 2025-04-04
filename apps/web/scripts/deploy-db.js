const { execSync } = require('child_process');

// Run database migrations
console.log('Running database migrations...');
try {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
} catch (error) {
  console.error('Error running migrations:', error);
  process.exit(1);
}

// Generate Prisma Client
console.log('Generating Prisma Client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (error) {
  console.error('Error generating Prisma Client:', error);
  process.exit(1);
}

console.log('Database deployment completed successfully!'); 