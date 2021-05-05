
function PlotMercator(canvas) {
  this.canvas = canvas;
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
  // world coordinates
  var vp2cv = Matrix2DST.fromPoints([0,0],[mx,h-my],[w-2*mx,h-2*my],[w-mx,my]);
  //vp2cv.verifyPoints("vp2cv", [0,0],[mx,h-my],[w-2*mx,h-2*my],[w-mx,my]);
  var wld2vp = Matrix2DST.fromPoints([0,-90],[0,0],[360,90],[w-2*mx,h-2*my]);
  //wld2vp.verifyPoints("wld2vp", [0,-90],[0,0],[360,90],[w-2*mx,h-2*my]);
  var wld2cv = vp2cv.multiply(wld2vp);
  var cv2wld = wld2cv.inverse();
  
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
  
  this.ctx.lineWidth = 1;
  this.ctx.setLineDash([]);
  this.ctx.strokeStyle = 'rgba(50, 50, 50, 1.0)';
  
  // border of graph
  var xGrid  = range(0,360,360);
  var yGrid = range(-90,90,180);
  var xLabels  = [];
  var yLabels = [];
  this.border = new Grid(wld2cv,xGrid,yGrid,xLabels,yLabels);
  
  var xGrid  = range(0,360,30);
  var yGrid = range(-90,90,30).map(y => Mercator.f(Mercator.d2r*y)*Mercator.r2d);
  var xLabels  = range(0,360,60).map(x => {return {x: x, text: x.toString()}; });
  var yLabels = range(-90,90,30).map(y => {return {y: Mercator.f(Mercator.d2r*y)*Mercator.r2d, text: y.toString()}; });

  this.grid = new Grid(wld2cv,xGrid,yGrid,xLabels,yLabels);

  this.wld2cv = wld2cv;
  this.cv2wld = cv2wld;
}

PlotMercator.prototype = {
  addCourse : function(course) {
    this.courses.push(course);
  },
  getCourses : function() {
    return this.courses;
  },
  draw : function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.border.draw(this.ctx);
    this.grid.draw(this.ctx);
    for(var course of this.courses) {
      course.draw(this.ctx);
    }
  }
};

