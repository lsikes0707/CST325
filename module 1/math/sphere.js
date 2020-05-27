/*
 * AUTHORS: John Seals, Lacey Sikes
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 */

var Sphere = function(center, radius) {
  if (!(this instanceof Sphere)) {
    console.error("Sphere constructor must be called with the new operator");
  }

  if (!(center instanceof Vector3)) {
    console.error("The sphere center must be a Vector3");
  }

  if ((typeof(radius) != 'number')) {
    console.error("The radius must be a Number");
  }

  this.center = center;
  this.radius = radius;

  // PASS - make sure center and radius are replaced with default values if and only if they
  // are invalid or undefined (i.e. center should be of type Vector3 & radius should be a Number)
  // - the default center should be the zero vector
  // - the default radius should be 1
  if (center == undefined || radius == undefined) {
    this.center = new Vector3();
    this.radius = 1;
  }

  this.raycast = function(ray) {
    // todo determine whether the ray intersects this sphere and where

    // 2. create the vector(s) needed to solve for the coefficients in the
    //    quadratic equation

    // originToOrigin = vector from ray origin to sphere origin
    var originToOrigin = ray.origin.clone().subtract(this.center);

    var a = ray.direction.dot(ray.direction);
    var b =2 *  ray.direction.clone().dot(originToOrigin);
    var c = originToOrigin.dot(originToOrigin) - this.radius * this.radius;

    var result = { hit: false, point: null };
    // Recommended steps
    // ------------------
    // 0. (optional) watch the video showing the complete implementation of plane.js
    //    You may find it useful to see a different piece of geometry coded.
    // 1. review slides/book math

    // An object created from a literal that we will return as our result
    // 3. calculate the discriminant
    // discriminant is b^2-4ac
    var discriminant = b * b - 4 * a * c;
    // 4. use the discriminant to determine if further computation is necessary
    // if the discriminant is negative, then there isn't an intersection
    // 5. return the following object literal "result" based on the following cases:
    //    case 1: no VALID intersections
    //      var result = { hit: false, point: null }
	if (discriminant < 0) {
		return result;
	}
    // pos & neg are the distance from ray origin at specific points of intersection.
    var neg = (-b - Math.sqrt(discriminant)) / (2 * a);
    var pos = (-b + Math.sqrt(discriminant)) / (2 * a);

    //    case 2: 1 or more intersections
    //      var result = {
    //        hit: true,
    //        point: 'a Vector3 containing the closest VALID intersection',
    //        normal: 'a vector3 containing a unit length normal at the intersection point',
    //        distance: 'a scalar containing the intersection distance from the ray origin'
    //      }
    // not negative values so the ray is inside of the sphere or does not hit
    if (pos > 0 && neg > 0) {
	var d = (neg < pos) ? neg: pos;
	var intersection = ray.clone().direction.multiplyScalar(d);

	result.hit = true;
	result.point = ray.origin.clone().add(intersection);
	result.normal = (result.point.clone().subtract(this.center)).normalized();
	result.distance = intersection.length();
	}

	return result;
	}
};
