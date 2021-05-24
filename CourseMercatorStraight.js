
/* Course Mercator Straight
 * A straight line on the mercator map
 */
function CourseMercatorStraight(ll0, ll1, lfl2cv, style) {
  this.ll0 = ll0;
  this.ll1 = ll1;
  this.lfl2cv = lfl2cv;
  this.style = style || { strokeStyle: "#000000" , lineDash: [] };
}
CourseMercatorStraight.prototype = {
  draw : function(ctx) {
    const arcRadius = 4;
    var {ll0,ll1,lfl2cv} = this;
    var f = Mercator.f;
    var cv0 = lfl2cv.map(ll0.lon, f(ll0.lat));
    var cv1 = lfl2cv.map(ll1.lon, f(ll1.lat));
    ctx.beginPath();
    ctx.moveTo(cv0[0], cv0[1]);
    ctx.lineTo(cv1[0], cv1[1]);
    ctx.strokeStyle = this.style.strokeStyle;
    ctx.setLineDash(this.style.lineDash);
    ctx.stroke();

    for(var cv of [cv0,cv1]) {
      ctx.beginPath();
      ctx.arc(cv[0], cv[1], arcRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "red";
      ctx.fill();
    }
    //debug("CourseMercatorStraight: distSqr: " + Planar.distanceSqr(cv0[0],cv0[1],cv1[0],cv1[1]));
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

