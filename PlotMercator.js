
function PlotMercator(canvas, ll0, ll1) {
  this.canvas = canvas;
  this.ll0 = ll0;
  this.ll1 = ll1;
  this.courses = []

  if(!this.canvas.getContext) {
    alert(`Error: no canvas.getContext`);
    return;
  }
  this.ctx = this.canvas.getContext('2d');

/**
   PlotMercator area corresponds to canvas below: 


    +---------------------------------------------------->
    | window                                              |
    |                              w                      |
    |           +------------------------------------->   |
    |           | canvas           ^                   |  |
    |           |               my |                   |  |
    |           |                  V                   |  |
    |           |     ----------------------------     |  |
    |           |    ^                            |    |  |
    |           |    |                            |    |  |
    |           |    |                            |    |  |
    |        h  | mx |                            | mx |  |
    |           |<-> |                            |<-> |  |
    |           |    |                            |    |  |
    |           |    | viewport                   |    |  |
    |           |    +--------------------------->     |  |
    |           |                  ^                   |  |
    |           |               my |                   |  |
    |           V                  V                   |  |
    |            --------------------------------------   |
    |                                                     |
    |                                                     |
    |                                                     |
    |                                                     |
    V                                                     |
     -----------------------------------------------------

  In the margins given by mx and my, the axis grid numbers are shown.

  TODO handle case where onscreen size of canvas is different than its actual dimensions
  respectively canvas.width,canvas.height   and  canvas.getBoundingClientRect() ;
  see  "Canvas, Pocket Reference" by David Flanagan, section "Hit Detection" .
**/
  
  var w = this.canvas.width;
  var h = this.canvas.height;
  var mx = 100; // margin x
  var my = 50;
  // canvas pixels
  // viewport pixels
  // lfl coordinates: longitude, f(latitude)
  var f = Mercator.f;
  var vp2cv = Matrix2DST.fromPoints([0,0],[mx,h-my],[w-2*mx,h-2*my],[w-mx,my]);
  vp2cv.verifyPoints("vp2cv", [0,0],[mx,h-my],[w-2*mx,h-2*my],[w-mx,my]);
  var lfl2vp = Matrix2DST.fromPoints([0,-90],[0,0],[360,90],[w-2*mx,h-2*my]);
  var lfl2cv = vp2cv.multiply(lfl2vp);
  var cv2lfl = lfl2cv.inverse();

  let rect = canvas.getBoundingClientRect()
  // event.clientX, event.clientY -- ms2cv -> canvas x, canvas y
  var ms2cv = new Matrix2DST(1,1,-rect.left,-rect.top);

  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
  
  this.ctx.lineWidth = 1;
  this.ctx.setLineDash([]);
  this.ctx.strokeStyle = 'rgba(50, 50, 50, 1.0)';
  
  // border of graph
  var xGrid  = range(0,360,360);
  var yGrid = range(-90,90,180);
  var xLabels  = [];
  var yLabels = [];
  this.border = new Grid(lfl2cv,xGrid,yGrid,xLabels,yLabels);
  
  var xGrid  = range(0,360,30);
  var yGrid = range(-90,90,30).map(y => Mercator.r2d*f(Mercator.d2r*y));
  var xLabels  = range(0,360,60).map(x => {return {x: x, text: x.toString()}; });
  var yLabels = range(-90,90,30).map(y => {return {y: Mercator.r2d*f(Mercator.d2r*y), text: y.toString()}; });

  this.grid = new Grid(lfl2cv,xGrid,yGrid,xLabels,yLabels);

  this.courses.push(new CourseMercatorCurved(ll0,ll1,lfl2cv));
  this.courses.push(new CourseMercatorStraight(ll0,ll1,lfl2cv));
  var ll2 = this.calcLl2();
  this.ll2 = ll2;
  this.courses.push(new CourseMercatorStraight(ll0,ll2,lfl2cv));

  this.f = f;
  this.lfl2cv = lfl2cv;
  this.cv2lfl = cv2lfl;
  this.ms2cv = ms2cv;

  canvas.addEventListener("mousedown", e => this.handleMouseDown(e));
  canvas.addEventListener("mouseup", e => this.handleMouseUp(e));
  canvas.addEventListener("mousemove", e => this.handleMouseMove(e));
}
PlotMercator.prototype = {
  addPlotListener : function(listener) {
    this.listeners.push(listener);
  },
  setPoint : function(point, ll) {
    // TODO
  },
  calcLl2 : function() {
    var {ll0,ll1} = this;
    var tangent = (ll1.lat - ll0.lat)/(ll1.lon - ll0.lon);
    // Solve for lfl2.lon, lfl2.flat:
    // Short: lon2 =def= lfl2.lon , flat2 =def= lfl2.flat
    // (flat2 - flat0) / (lon2 - lon0) = tangent
    // dist(lfl0,lfl2) = dist(lfl0,lfl1)
    var lon0 = ll0.lon;
    var flat0 = Mercator.f(ll0.lat);
    var lon1 = ll1.lon;
    var flat1 = Mercator.f(ll1.lat);
    var lon2;
    var flat2;
    var angle = Math.atan2(flat2-flat0, lon2-lon0);
    // Vector (cos,sin) points from lon0,flat0  in direction of lon2,flat2 .
    var sqr = x => x*x;
    var dist = Math.sqrt(sqr(lon1-lon0)+sqr(flat1-flat0));
    lon2 = lon0 + dist*Math.cos(angle);
    flat2 = flat0 + dist*Math.sin(angle);
    var lat2 = Mercator.fInv(flat2);
    return {lon: lon2, lat: lat2};
  },
  draw : function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.border.draw(this.ctx);
    this.grid.draw(this.ctx);
    for(var course of this.courses) {
      course.draw(this.ctx);
    }
  },
  handleMouseDown : function(e) {
    // TODO
  },
  handleMouseUp : function(e) {
    // TODO
  },
  handleMouseMove : function(e) {
    // TODO
  },
  hits : function(e) {
    let cv = this.ms2cv.map(e.clientX, e.clientY);
    let lfl = this.cv2lfl.map(cv);
    var hits = [];
    var lls = [this.ll0,this.ll1];
    var i;
    for(i=0; i<2; ++i) {
      var lli = lls[i];
      var lfli = [lli.lon, this.f(lli.lat)];
      var cvi = this.lfl2cv.map(lfli);
      if(Planar.closerThanDistanceSqr(cv[0],cv[1],cvi[0],cvi[1],100)) {
        hits.push("ll"+i);
      }
    }
    return hits;
  }
};

