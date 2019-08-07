const request = (req, res, next) => {
  console.log('games request handler');
  next();
}

const response = () => {
  
}

const games = {
  request,
  response
};

module.exports = games;