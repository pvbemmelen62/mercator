
function Course(phi0, theta0, phi1, theta1, wld2cv, cv2wld) {
  this.wld2cv = wld2cv;
  this.phi0 = phi0;
  this.theta0 = theta0;
  this.phi1 = phi1;
  this.theta1 = theta1;
  this.wld2cv = wld2cv;
  this.cv2wld = cv2wld;
  this.arcRadius = 4;
}
Course.prototype = {
  draw : function(ctx) {
    var {wld2cv,phi0,theta0,phi1,theta1} = this;
    if(false) {
    }
    else {
      var p0 = wld2cv.map(phi0,theta0);
      var p1 = wld2cv.map(phi1,theta1);
      ctx.beginPath();
      ctx.moveTo(p0[0], p0[1]);
      ctx.lineTo(p1[0], p1[1]);
      ctx.strokeStyle = "#000000";
      ctx.stroke();

      for(var p of [p0,p1]) {
        ctx.beginPath();
        ctx.arc(p[0], p[1], this.arcRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    }
  },
  pick : function(e) {
    var hits = [];
    var {wld2cv,phi0,theta0,phi1,theta1} = this;
    var ps = [wld2cv.map(phi0,theta0), wld2cv.map(phi1,theta1)];
    //debug(`p0: ${ps[0]}, p1: ${ps[1]}`);
    for(var i of [0,1]) {
      if(Planar.closerThanDistanceSqr(e.x,e.y,ps[i][0],ps[i][1],100)) {
        hits.push("p"+i);
      }
    }
    return hits.length > 0 ? hits : null;
  },
  move : function(point, e) {
    var [phi,theta] = this.cv2wld.map(e.x,e.y);
    if("p0" == point) {
      this.phi0 = phi;
      this.theta0 = theta;
    }
    else if("p1" == point) {
      this.phi1 = phi;
      this.theta1 = theta;
    }
    else {
      alert("invalid point: " + point);
    }
  }
}

