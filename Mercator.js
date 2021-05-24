
function Mercator() {
}

// d2r : degrees to radians
// d3r : degrees from radians
Mercator.r3d = Math.PI*2/360; // radians = r3d * degrees
Mercator.d3r = 1/Mercator.r3d; // degrees = d3r * radians
Mercator.f = function(lat) {
  var rv = Mercator.d3r * Math.log((1/Math.cos(Mercator.r3d*lat)) + Math.tan(Mercator.r3d*lat));
  return rv;
}
Mercator.fInv = function(y) {
  var e2y = Math.exp(2*Mercator.r3d*y);
  //return Mercator.d3r*Math.asin((e2y-1)/(e2y+1));
  var rv = Mercator.d3r*Math.asin(1 - 2/(e2y+1));
  return rv;
}

