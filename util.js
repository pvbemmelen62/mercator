
function range(from,to,inc) {
  var v = from;
  var rv = [];
  while(v <= to) {
    rv.push(v);
    v += inc;
  }
  return rv;
}
