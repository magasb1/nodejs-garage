const helmetOptions = {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], 
        scriptSrc: ["'self'", "'unsafe-inline'"], 
        styleSrc: ["'self'", "'unsafe-inline'"], 
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"], 
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'self'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"]
      },
      reportOnly: true
    }
  }
  
  module.exports = helmetOptions