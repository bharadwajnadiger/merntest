module.exports = (app) => {
  app.get('http://ergast.com/api/f1/2013/driverStandings.json', (req, res, next) => {
    return res;
  });
}
