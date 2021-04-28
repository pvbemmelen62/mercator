
function Grid(wld2pix, xGrid, yGrid, xLabels, yLabels) {
  this.wld2pix = wld2pix;
  this.xGrid = xGrid;
  this.yGrid = yGrid;
  this.xLabels = xLabels;
  this.yLabels = yLabels;
}
Grid.prototype.draw = function(ctx) {
  var {wld2pix,xGrid,yGrid,xLabels,yLabels} = this;

  for(var x of xGrid) {
    ctx.beginPath();
    var p;
    p = wld2pix.map([x,-90]);
    ctx.moveTo(p[0], p[1]);
    p = wld2pix.map([x, 90]);
    ctx.lineTo(p[0],p[1]);
    ctx.stroke();
  }
  for(var y of yGrid) {
    ctx.beginPath();
    var p;
    p = wld2pix.map([0, y]);
    ctx.moveTo(p[0], p[1]);
    p = wld2pix.map([360, y]);
    ctx.lineTo(p[0],p[1]);
    ctx.stroke();
  }
  ctx.font = "15px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = "black";
  for(var xLabel of xLabels) {
    ctx.beginPath();
    var p = wld2pix.map([xLabel.x,-90]);
    ctx.moveTo(p[0], p[1]);
    ctx.lineTo(p[0],p[1] + 5);
    ctx.stroke();
    var s = xLabel.text;
    var metrics = ctx.measureText(s);
    ctx.fillText(s, p[0],p[1] + 10);
  }
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for(var yLabel of yLabels) {
    ctx.beginPath();
    var p;
    p = wld2pix.map([0, yLabel.y]);
    ctx.moveTo(p[0], p[1]);
    ctx.lineTo(p[0]-5,p[1]);
    ctx.stroke();
    var s = yLabel.text;
    var metrics = ctx.measureText(s);
    ctx.fillText(s, p[0]-10,p[1]);
  }
}
