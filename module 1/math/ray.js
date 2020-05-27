/*
 * An object type representing a ray.
 *
 * @param origin A Vector3 object representing the start point of the ray
 * @param direction A Vector3 representing the direction of the ray
 */

var Ray = function(origin, direction) {
  if (!(this instanceof Ray)) {
    console.error("Ray constructor must be called with the new operator");
  }

  if (!(origin instanceof Vector3)) {
    console.error("The ray origin must be a Vector3");
  }

  if (!(direction instanceof Vector3)) {
    console.error("The ray direction must be a Vector3");
  }

  this.origin = origin;
  this.direction = direction.normalized();

  this.clone = function() {
    return new Ray(this.origin.clone(), this.direction.clone());
  };
};