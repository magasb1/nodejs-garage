module.exports = {
    secret: "691B8741C1F028CDC2AFE6CEC1FFEADCD97CF344A07376FD0563F61E818BA5F4",
    jwtExpiration: 60 * 15,              // 15 minutes
    jwtRefreshExpiration: 60*60*24*90,   // 90 days
  
    /* for test */
    //jwtExpiration: 15,          // 15 seconds
    //jwtRefreshExpiration: 120,  // 2 minutes
  };