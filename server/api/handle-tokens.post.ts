function generateVerificationToken () {
  return crypto.randomBytes(30).toString('hex')
}

function generateVerificationTokenExpire () {
  return new Date(Date.now() + expireSpan)
}

function signVerificationToken (email, verificationToken) {
  return jwt.sign({
    email,
    verificationToken
  }, authEmailVerificationSecret)
}

function verifySignedVerificationToken (token) {
  return jwt.verify(token, authEmailVerificationSecret)
}