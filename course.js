
ga hier verder

function Course(phi0, theta0, phi1, theta1, wld2cv, mapType, constantTangentType) {
  this.wld2cv = wld2cv;
  this.phi0 = phi0;
  this.theta0 = theta0;
  this.phi1 = phi1;
  this.theta1 = theta1;
  this.wld2cv = wld2cv;
  this.mapType = mapType;
  this.constantTangentType = constantTangentType;
  this.mercator = isMercator ? null : new Mercator(phi0, theta0, phi1, theta1);
}
Course.prototype = {
  draw : function(ctx) {

ga hier verder

    var {wld2cv,phi0,theta0,phi1,theta1,isMercator,mercator} = this;
    if(isMercator) {
      var p0 = wld2cv.map(mercator.phi phi0,theta0);
      var p1 = wld2cv.map(phi1,theta1);

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
        ctx.arc(p[0], p[1], 4, 0, 2 * Math.PI, false);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    }
  }
}

