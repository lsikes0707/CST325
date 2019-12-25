/*
 * AUTHOR: JOHN SEALS, LACEY SIKES
 * OVERVIEW: Implementing an API for a Vector3 object.
 * RUN: run test-vector3.html in browser
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself.  Note the syntax below: var Vector3 = function...
 * This is different than you might be used to in most programming languages.
 * Here, the function is meant to be instantiated rather than called and the
 * instantiation process IS similar to other object oriented languages => new Vector3()
 */

var Vector3 = function(x, y, z) {
  this.x = x; this.y = y; this.z = z;

  // Sanity check to prevent accidentally using this as a normal function call
  if (!(this instanceof Vector3)) {
    console.error("Vector3 constructor must be called with the new operator");
  }

  // PASS - make sure to SET a default value in case x, y, or z is not passed in
    if (this.x == undefined) {
    this.x = this.y = this.z = 0;
    }

  this.set = function(x, y, z) {
    // PASS set 'this' object's values to those from x, y, and z
    this.x = x; this.y = y; this.z = z;
    return this;
  }

  this.clone = function() {
    return new Vector3(this.x, this.y, this.z);
  };

  this.copy = function(other) {
    // PASS - copy the values from other into 'this'
    this.x = other.x; this.y = other.y; this.z = other.z;
    return this;
  }

  this.add = function(v) {
    // PASS - add v to 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x += v.x; this.y += v.y; this.z += v.z;
    return this;
  };

  this.subtract = function(v) {
    // PASS - subtract v from 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x -= v.x; this.y -= v.y; this.z -= v.z;
    return this;
  };

  this.negate = function() {
    // PASS - multiply 'this' vector by -1
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = -this.x; this.y = -this.y; this.z = -this.z;
    return this;
  };

  this.multiplyScalar = function(scalar) {
    // PASS - multiply 'this' vector by "scalar"
    // DEFINE scalar
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  };

  this.length = function() {
    // PASS - return the magnitude (A.K.A. length) of 'this' vector
    // DEFINE magnitude
    // This should NOT change the values of this.x, this.y, and this.z
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
  };

  this.lengthSqr = function() {
    // PASS - return the squared magnitude of this vector ||v||^2
    // This should NOT change the values of this.x, this.y, and this.z
    return ((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
  };

  this.normalized = function() {
    // PASS - return a new vector instance that is a normalized clone of 'this' vector
    // DEFINE normalization
    // This should NOT change the values of this.x, this.y, and this.z
//  let magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
//  return new Vector3(this.x/magnitude, this.y/magnitude, thi.z/magnitude);
    return new Vector3(this.x, this.y, this.z).multiplyScalar(1 / this.length());
   // Should return a new vector that is not this
  };

  this.normalize = function() {
    // PASS - Change the components of this vector so that its magnitude will equal 1.
    // This SHOULD change the values of this.x, this.y, and this.z
//  set magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z))
//  return this.x /= magnitude; this.y /= magnitude; this.z /= magnitude;
    return this.multiplyScalar(1 / this.length());
  };

  this.dot = function(other) {
    // PASS - return the dot product betweent this vector and "other"
    // This should NOT change the values of this.x, this.y, and this.z
    return this.x * other.x + this.y * other.y + this.z * other.z;
  };
};
