
function Linear(x0,y0,x1,y1) {
  this.x0=x0;
  this.y0=y0;
  this.x1=x1;
  this.y1=y1;
  this.dx = x1-x0;
  this.dy = y1-y0;
}
/** Produces n+1 points, steps n times */
Linear.prototype = {

  iterator : function(n) {
    var i = 0;
    var sx = this.dx/n;
    var sy = this.dy/n;
    var x = this.x0;
    var y = this.y0;
    // x,y correspond to i-th point.
    return {
      next: function() {
        if(i<=n) {
          var rv = { done:false, value: [x,y]};
          x += sx;
          y += sy;
          ++i;
          return rv;
        }
        else {
          return { done: true, value: null };
        }
      },
      [Symbol.iterator]: function() { return this; }
    }
  }

}
