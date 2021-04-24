
function Mercator(phi0,theta0,phi1,theta1) {
  this.phi0 = phi0;
  this.theta0 = theta0;
  this.phi1 = phi1;
  this.theta1 = theta1;
  // compass angle:
  var M = Mercator;
  this.slope = (M.f(theta1) - M.f(theta0)) / (phi1 - phi0);
}

Mercator.fromDegrees = function(phi0,theta0,phi1,theta1) {
  var M = Mercator;
  return new Mercator(phi0*M.d2r,theta0*M.d2r,phi1*M.d2r,theta1*M.d2r);
}

Mercator.d2r = Math.PI*2/360; // radians = d2r * degrees
Mercator.r2d = 1/Mercator.d2r; // degrees = r2d * radians
Mercator.f = function(theta) {
  var rv = Math.log((1/Math.cos(theta)) + Math.tan(theta));
  return rv;
}
Mercator.fDeri = function(theta) {
  var rv = 1/Math.cos(theta);
  return rv;
}
Mercator.fInv = function(y) {
  var e2y = Math.exp(2*y);
  //return Math.asin((e2y-1)/(e2y+1));
  var rv = Math.asin(1 - 2/(e2y+1));
  return rv;
}

Mercator.prototype = {

  phiFromTheta : function(theta) {
    var M = Mercator;
    // (f(theta)-f(theta0)) / (phi - phi0) = slope
    var phi = this.phi0 + (M.f(theta)-M.f(this.theta0))/this.slope;
    return phi;
  },
  thetaFromPhi : function(phi) {
    var M = Mercator;
    // (f(theta)-f(theta0)) / (phi - phi0) = slope
    var fTheta = M.f(this.theta0) + (phi - this.phi0)*this.slope;
    var theta = M.fInv(fTheta);
    return theta;
  }
}

