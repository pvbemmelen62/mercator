
function Mercator(lon0,lat0,lon1,lat1) {
  this.lon0 = lon0;
  this.lat0 = lat0;
  this.lon1 = lon1;
  this.lat1 = lat1;
  // compass angle:
  var M = Mercator;
  this.slope = (M.f(lat1) - M.f(lat0)) / (lon1 - lon0);
}

Mercator.fromDegrees = function(lon0,lat0,lon1,lat1) {
  var M = Mercator;
  return new Mercator(lon0*M.d2r,lat0*M.d2r,lon1*M.d2r,lat1*M.d2r);
}

Mercator.d2r = Math.PI*2/360; // radians = d2r * degrees
Mercator.r2d = 1/Mercator.d2r; // degrees = r2d * radians
Mercator.f = function(lat) {
  var rv = Math.log((1/Math.cos(lat)) + Math.tan(lat));
  return rv;
}
Mercator.fDeri = function(lat) {
  var rv = 1/Math.cos(lat);
  return rv;
}
Mercator.fInv = function(y) {
  var e2y = Math.exp(2*y);
  //return Math.asin((e2y-1)/(e2y+1));
  var rv = Math.asin(1 - 2/(e2y+1));
  return rv;
}

Mercator.prototype = {

  lonFromLat : function(lat) {
    var M = Mercator;
    // (f(lat)-f(lat0)) / (lon - lon0) = slope
    var lon = this.lon0 + (M.f(lat)-M.f(this.lat0))/this.slope;
    return lon;
  },
  latFromLon : function(lon) {
    var M = Mercator;
    // (f(lat)-f(lat0)) / (lon - lon0) = slope
    var fLat = M.f(this.lat0) + (lon - this.lon0)*this.slope;
    var lat = M.fInv(fLat);
    return lat;
  }
}

