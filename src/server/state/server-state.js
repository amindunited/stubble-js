const BehaviorSubject =  require("rxjs").BehaviorSubject;

const state = new BehaviorSubject({
  routes: [],
  routeOverrides: [],
  overRideMap: new Map()
});

module.exports = {
  state,
};