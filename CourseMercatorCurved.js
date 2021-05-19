
/* Course Mercator Curved
 * A curved line on mercator map, that has as dual a straight line on the naive map.
 */
function CourseMercatorCurved(ll0,ll1,lfl2cv) {
  this.ll0 = ll0;
  this.ll1 = ll1;
  this.lfl2cv = lfl2cv;
}
CourseMercatorCurved.prototype = {
  draw : function(ctx) {
    const arcRadius = 4;
    var {ll0,ll1,lfl2cv} = this;
    var f = x => x;
    var _this = {f: Mercator.f, fInv: Mercator.fInv};
    var _that = {f: Identity.f, fInv: Identity.fInv};

    var lineIter = new Linear(ll0.lon,_that.f(ll0.lat),ll1.lon,_that.f(ll1.lat)).iterator(10);
    ctx.beginPath();
    var lfl = lineIter.next().value;

    var ll = _that.fInv(lfl[0],lfl[1]);
    var cv = lfl2cv.map(ll[0], _this.f(ll[1]));
    ctx.moveTo(cv[0], cv[1]);
    for(var lfl of lineIter) {
      ll = _that.fInv(lfl[0],lfl[1]);
      cv = lfl2cv.map(ll[0], _this.f(ll[1]));
      ctx.lineTo(cv[0], cv[1]);
    }
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    var cv0 = lfl2cv.map(ll0.lon, _this.f(ll0.lat));
    var cv1 = lfl2cv.map(ll1.lon, _this.f(ll1.lat));
    for(var cv of [cv0,cv1]) {
      ctx.beginPath();
      ctx.arc(cv[0], cv[1], arcRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  },
  move : function(point, ll) {
    if("ll0" == point) {
      this.ll0 = ll;
    }
    else if("ll1" == point) {
      this.ll1 = ll;
    }
    else {
      alert("invalid point: " + point);
    }
  }
}

