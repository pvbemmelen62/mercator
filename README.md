
Mercator projection: horizontal longitude, vertical function of latitude ; in javascript.

Work in progress.

Uses two javascript canvases:
- one with axes longitude, latitude; the naive map;
- one with axes longitude, f(latitude); the mercator map.
The function f() for the mercator map, is such that it gives the mercator map the property,
that a straight line on the map, corresponds to a course on the globe that has a constant compass angle.

The main file is mercator.html ; it includes the others.
