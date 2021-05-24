
/* Course Naive Curved
 * A curved line on naive map, that has as dual a straight line on the mercator map.
 */
function CourseNaiveCurved(ll0,ll1,lfl2cv,style) {
  this.ll0 = ll0;
  this.ll1 = ll1;
  this.lfl2cv = lfl2cv;
  this.style = style || { strokeStyle: "#000000" , lineDash: [] };
}
CourseNaiveCurved.prototype = {
  draw : function(ctx) {
    const arcRadius = 4;
    var {ll0,ll1,lfl2cv} = this;
    var _this = {f: Identity.f, fInv: Identity.fInv};
    var _that = {f: Mercator.f, fInv: Mercator.fInv};

    var lineIter = new Linear(ll0.lon,_that.f(ll0.lat),ll1.lon,_that.f(ll1.lat)).iterator(10);
    ctx.beginPath();
    var lfl = lineIter.next().value;
    var lon = lfl[0];
    var lat = _that.fInv(lfl[1]);
    var cv = lfl2cv.map(lon, _this.f(lat));
    ctx.moveTo(cv[0], cv[1]);
    for(var lfl of lineIter) {
      lon = lfl[0];
      lat = _that.fInv(lfl[1]);
      cv = lfl2cv.map(lon, _this.f(lat));
      ctx.lineTo(cv[0], cv[1]);
    }
    ctx.strokeStyle = this.style.strokeStyle;
    ctx.setLineDash(this.style.lineDash);
    ctx.stroke();

    var cv0 = lfl2cv.map(ll0.lon, _this.f(ll0.lat));
    var cv1 = lfl2cv.map(ll1.lon, _this.f(ll1.lat));
    for(var cv of [cv0,cv1]) {
      ctx.beginPath();
      ctx.arc(cv[0], cv[1], arcRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "red";
      ctx.fill();
    }

//  var lineIter = new Linear(ll0.lon,_that.f(ll0.lat),ll1.lon,_that.f(ll1.lat)).iterator(10);
//  ctx.beginPath();
//  var lfl = lineIter.next().value;

//  var ll = _that.fInv(lfl[0],lfl[1]);
//  var cv = lfl2cv.map(ll[0], _this.f(ll[1]));
//  ctx.moveTo(cv[0], cv[1]);
//  for(var lfl of lineIter) {
//    ll = _that.fInv(lfl[0],lfl[1]);
//    cv = lfl2cv.map(ll[0], _this.f(ll[1]));
//    ctx.lineTo(cv[0], cv[1]);
//  }
//  ctx.strokeStyle = "#000000";
//  ctx.stroke();

//  var cv0 = lfl2cv.map(ll0.lon, _this.f(ll0.lat));
//  var cv1 = lfl2cv.map(ll1.lon, _this.f(ll1.lat));
//  for(var cv of [cv0,cv1]) {
//    ctx.beginPath();
//    ctx.arc(cv[0], cv[1], arcRadius, 0, 2 * Math.PI, false);
//    ctx.fillStyle = "red";
//    ctx.fill();
//  }
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

