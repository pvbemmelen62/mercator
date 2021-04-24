
var sf = JSON.stringify;

var m = new Matrix2DST(1,1,3,4);

var a = m.map(3,6);
debug(`var a = m.map(3,6);`);
debug("a : " + sf(a));

var b = m.map([3,6]);
debug(`var b = m.map([3,6]);`)
debug("b : " + sf(b));

debug(`var c = m.map([[1,2],[2,4],[3,6],[4,8]]);`);
var c = m.map([[1,2],[2,4],[3,6],[4,8]]);
debug("c : " + sf(c));

var a = new Matrix2DST(1,1,3,4);
var b = new Matrix2DST(3,2,5,4);

var aI = a.inverse();
var bI = b.inverse();
var bIaI = bI.multiply(aI);
debug("bIaI: " + sf(bIaI));

var ab = a.multiply(b);
var abI = ab.inverse();
debug("abI: " + sf(abI));

debug(`
let p0 = [0,0];
let p1 = [100,500];
let q0 = [600,400];
let q1 = [700,100];
var M = Matrix2DST.fromPoints(p0,p1,q0,q1);
`);

let p0 = [0,0];
let p1 = [100,500];
let q0 = [600,400];
let q1 = [700,100];
var M = Matrix2DST.fromPoints(p0,p1,q0,q1);

debug("M: " + sf(M));
debug("M.map(p0) : " + sf(M.map(p0)) );
debug("M.map(q0) : " + sf(M.map(q0)) );


