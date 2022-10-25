const jwt = require("jsonwebtoken");
const hasKey = (obj) => !!Object.keys(obj).length

const log = (...args) => {
  console.log(new Date(), "[INFO]", ...args)
}

const logIf = (prefix, obj) => {
  if (!hasKey(obj)) {
    return
  }

  log(prefix, obj)
}

const logMiddleware = (req, _res, next) => {
  log('logging middleware')
  log('Method:', req.method)
  log('Url:', req.url)
  logIf('Header:', req.headers)
  logIf('Body:', req.body)
  logIf('Params:', req.params)
  logIf('Query:', req.query)

  next()
}

const authMiddleware = (signInKey, targets, onSuccess) => (req, res, next) => {
  log('auth middleware')
  if (!targets.find(it => req.path.startsWith(it))) {
    next()
    return
  }

  const tokenInHeader = req.headers.authorization;
  if (!tokenInHeader) {
    log('auth failed: token is empty')
    res.status(403).json({})
    return
  }

  const raw = tokenInHeader.replaceAll('Bearer: ', '');
  try {
    const payload = jwt.verify(raw, signInKey)
    onSuccess(req, res, payload)
  } catch (e) {
    log('auth failed', e)
    res.status(403).json({})
    return
  }

  next()
}

module.exports = {
  logMiddleware,
  authMiddleware
}
