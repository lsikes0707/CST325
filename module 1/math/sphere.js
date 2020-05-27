var Sphere = function(center, radius) {
	this.center = center || new Vector3;
	this.radius = radius || 1;

	this.raycast = function(ray) {

		// distance vector from sphere center to origin of ray
		var rayToSphere = ray.origin.clone().subtract(this.center); 

		var a = ray.direction.dot(ray.direction); // always 1
		var b = ray.direction.dot(rayToSphere)*(2);
		var c = rayToSphere.dot(rayToSphere) - Math.pow(this.radius, 2);
		
		var result = {
			hit: null,      // should be true or false
			point: null,    // should be a vector3
			normal: null,   // should be a vector3
			distance: null, // should be a scalar
		};

		var discriminant = (Math.pow(b, 2)) - (4 * a * c);
		
		if (discriminant < 0){
			var result = { 
				hit: false, 
				point: null,
				normal: null,
				distance: null, 
			};
			return result;
		}

		var t0 = (-1 * b - Math.sqrt(discriminant)) / (2 * a);
		var t1 = (-1 * b + Math.sqrt(discriminant)) / (2 * a);

		// find the first intersection point from the ray's origin
		if (t0 < t1) {
            var t = t0;
        } else {
            var t = t1;
        }

		// ray intersection with sphere
		var intersection = ray.origin.clone().add(ray.direction.multiplyScalar(t));

		// perpendicular vector (normal)
		var normalx = (intersection.x-this.center.x)/this.radius;
		var normaly = (intersection.y-this.center.y)/this.radius;
		var normalz = (intersection.z-this.center.z)/this.radius;
		var normal = new Vector3(normalx, normaly, normalz);

		if (t < 0){
			var result = { 
				hit: false, 
				point: null,
				normal: null,
				distance: null,
			};
			return result;
		} else {
			var result = { 
				hit: true, 
				point: intersection,
				normal: normal,
				distance: t,
			};
			return result;
		}
	}
};
