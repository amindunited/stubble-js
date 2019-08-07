const request = (req, res, next) => {
  console.log('request fn called');
  res.send('{ data: "blah"}');
}

const response = () => {

}

const shows = {
  request,
  response
};

module.exports = shows;