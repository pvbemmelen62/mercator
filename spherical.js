
function Spherical() {
}
Spherical.x = function(r,phi,theta) { return r*Math.cos(theta)*Math.cos(phi); }
Spherical.y = function(r,phi,theta) { return r*Math.cos(theta)*Math.sin(phi); }
Spherical.z = function(r,phi,theta) { return r*Math.sin(theta); }
Spherical.xyz = function(r,phi,theta) { return [ r*Math.cos(theta)*Math.cos(phi), r*Math.cos(theta)*Math.sin(phi), r*Math.sin(theta)]; }

