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

const authMiddleware = (req, _res, next) => {
  log('auth middleware')

  next()
}

module.exports = {
  logMiddleware,
  authMiddleware
}
