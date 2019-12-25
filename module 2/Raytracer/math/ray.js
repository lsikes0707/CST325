
var Ray = function(origin, direction) {
	this.origin = origin;
	this.direction = direction.normalized();

	this.clone = function() {
		return new Ray(this.origin.clone(), this.direction.clone());
	};
};