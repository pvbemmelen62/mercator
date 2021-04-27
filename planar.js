
function Planar() {
}
Planar.sqr = function(x) {
  return x*x;
}
Planar.distanceSqr = function(x0,y0,x1,y1) {
  return Planar.sqr(x1-x0) + Planar.sqr(y1-y0);
}
Planar.closerThanDistanceSqr = function(x0,y0,x1,y1, sqr) {
  return Planar.distanceSqr(x0,y0,x1,y1) < sqr;
}

