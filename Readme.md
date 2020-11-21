Generate Secret
node

require('crypto').randomBytes(64).toString('hex')