/*
 * AUTHORS: JOHN SEALS && LACEY SIKES
 * An object representing a 3x3 matrix
 */

var Matrix3 = function() {

	if (!(this instanceof Matrix3)) {
		alert("Matrix3 constructor must be called with the new operator");
	}

	// Stores a matrix in a flat array - left to right, top to bottom.
	// This format will be similar to what we'll eventually need to provide the WebGL API
	this.elements = new Float32Array(9);

	// DONE
	// "this.elements" should be initialized with values equal to the identity matrix
/*	3x3 identity matrix is: 1 0 0
				0 1 0
				0 0 1	*/

	this.elements[0] = 1;
	this.elements[1] = 0;
	this.elements[2] = 0;
	this.elements[3] = 0;
	this.elements[4] = 1;
	this.elements[5] = 0;
	this.elements[6] = 0;
	this.elements[7] = 0;
	this.elements[8] = 1;

	// -------------------------------------------------------------------------
	this.clone = function() {
		// DONE
		// create a new Matrix3 instance that is an exact copy of 'this' one and return it
		return new Matrix3().set(this.elements[0],
	            this.elements[1],
	            this.elements[2],
	            this.elements[3],
	            this.elements[4],
	            this.elements[5],
	            this.elements[6],
	            this.elements[7],
	            this.elements[8]);
//		return this /* should be a new Matrix instance*/;
	};

	// -------------------------------------------------------------------------
	this.copy = function(other) {
		// DONE
		// copy all of the elements of other into the elements of 'this' matrix
		this.elements[0] = other.elements[0];
		this.elements[1] = other.elements[1];
		this.elements[2] = other.elements[2];
		this.elements[3] = other.elements[3];
		this.elements[4] = other.elements[4];
		this.elements[5] = other.elements[5];
		this.elements[6] = other.elements[6];
		this.elements[7] = other.elements[7];
		this.elements[8] = other.elements[8];
		return this;
	};

	// -------------------------------------------------------------------------
	this.set = function (e11, e12, e13, e21, e22, e23, e31, e32, e33) {
		// DONE
		// given the 9 elements passed in as argument e-row#col#, use
    // them as the values to set on 'this' matrix.
    // Order is left to right, top to bottom.
	this.elements[0] = e11;
	this.elements[1] = e12;
	this.elements[2] = e13;
	this.elements[3] = e21;
	this.elements[4] = e22;
	this.elements[5] = e23;
	this.elements[6] = e31;
	this.elements[7] = e32;
	this.elements[8] = e33;
		return this;
	};

	// -------------------------------------------------------------------------
	this.getElement = function(row, col) {
		// DONE
		// use the row and col to get the proper index into the 1d element array and return it
		return this.elements[(row*3)+col];


/*index computed from row and col*/
		
	};

	// -------------------------------------------------------------------------
	this.setIdentity = function() {
		// DONE
		// reset every element in 'this' matrix to make it the identity matrix
		this.elements[0] = 1;
		this.elements[1] = 0;
		this.elements[2] = 0;
		this.elements[3] = 0;
		this.elements[4] = 1;
		this.elements[5] = 0;
		this.elements[6] = 0;
		this.elements[7] = 0;
		this.elements[8] = 1;
		return this;
	};

	// -------------------------------------------------------------------------
	this.setRotationX = function(angle) {
		// not required yet, attempt to implement if finished early
		// create a rotation matrix that rotates around the X axis
		e[0] = 1;
		e[1] = 0;
		e[2] = 0;
		e[3] = 0;
		e[4] = Math.cos(radians);
		e[5] = -Math.sin(radians);
		e[6] = 0;
		e[7] = Math.sin(radians);
		e[8] = Math.cos(radians);
		return this;
	};

	// -------------------------------------------------------------------------
	this.setRotationY = function(angle) {
		// not required yet, attempt to implement if finished early
		// create a rotation matrix that rotates around the Y axis
		e[0] = Math.cos(radians);
		e[1] = 0;
		e[2] = Math.sin(radians);
		e[3] = 0;
		e[4] = 1;
		e[5] = 0;
		e[6] = -Math.sin(radians);
		e[7] = 0;
		e[8] = Math.cos(radians);
		return this;
	};


	// -------------------------------------------------------------------------
	this.setRotationZ = function(angle) {
		// not required yet, attempt to implement if finished early
		// create a rotation matrix that rotates around the Z axis
		e[0] = Math.cos(radians);
		e[1] = -Math.sin(radians);
		e[2] = 0;
		e[3] = Math.sin(radians);
		e[4] = Math.cos(radians);
		e[5] = 0;
		e[6] = 0;
		e[7] = 0;
		e[8] = 1;
		return this;
	};

	// -------------------------------------------------------------------------
	this.multiplyScalar = function(s) {
		// DONE
		// multiply every element in 'this' matrix by the scalar argument s
		this.elements[0]*=s;
	        this.elements[1]*=s;
	        this.elements[2]*=s;
	        this.elements[3]*=s;
	        this.elements[4]*=s;
	        this.elements[5]*=s;
	        this.elements[6]*=s;
	        this.elements[7]*=s;
	        this.elements[8]*=s;
		return this;
	};

	// -------------------------------------------------------------------------
	this.multiplyRightSide = function(otherMatrixOnRight) {
		// DONE
		// multiply 'this' matrix (on the left) by otherMatrixOnRight (on the right)
		// the results should be applied to the elements on 'this' matrix

		// need a temporary variable so original this is not lost
		var temp = new Matrix3(9);
		
		temp[0] = this.elements[0] * otherMatrixOnRight.elements[0] + this.elements[1] * otherMatrixOnRight.elements[3] + this.elements[2] * otherMatrixOnRight.elements[6];
		temp[1] = this.elements[0] * otherMatrixOnRight.elements[1] + this.elements[1] * otherMatrixOnRight.elements[4] + this.elements[2] * otherMatrixOnRight.elements[7];
		temp[2] = this.elements[0] * otherMatrixOnRight.elements[2] + this.elements[1] * otherMatrixOnRight.elements[5] + this.elements[2] * otherMatrixOnRight.elements[8];
		temp[3] = this.elements[3] * otherMatrixOnRight.elements[0] + this.elements[4] * otherMatrixOnRight.elements[3] + this.elements[5] * otherMatrixOnRight.elements[6];
		temp[4] = this.elements[3] * otherMatrixOnRight.elements[1] + this.elements[4] * otherMatrixOnRight.elements[4] + this.elements[5] * otherMatrixOnRight.elements[7];
		temp[5] = this.elements[3] * otherMatrixOnRight.elements[2] + this.elements[4] * otherMatrixOnRight.elements[5] + this.elements[5] * otherMatrixOnRight.elements[8];
		temp[6] = this.elements[6] * otherMatrixOnRight.elements[0] + this.elements[7] * otherMatrixOnRight.elements[3] + this.elements[8] * otherMatrixOnRight.elements[6];
		temp[7] = this.elements[6] * otherMatrixOnRight.elements[1] + this.elements[7] * otherMatrixOnRight.elements[4] + this.elements[8] * otherMatrixOnRight.elements[7];
		temp[8] = this.elements[6] * otherMatrixOnRight.elements[2] + this.elements[7] * otherMatrixOnRight.elements[5] + this.elements[8] * otherMatrixOnRight.elements[8];
		
		this.elements = temp;

		return this;
	};

	// -------------------------------------------------------------------------
	this.determinant = function() {
		// DONE
		// compute and return the determinant for 'this' matrix
	        var elements = this.elements;
		var determinant = 0;
        	determinant += elements[0] * ((elements[4] * elements[8]) - ((elements[5] * elements[7])));
        	determinant -= elements[1] * ((elements[3] * elements[8]) - ((elements[5] * elements[6])));
        	determinant += elements[2] * ((elements[3] * elements[7]) - ((elements[4] * elements[6])));
		return determinant;
		// Math.Infinity is simply a place holder
		//return Math.Infinity; // should be the determinant
	};

	// -------------------------------------------------------------------------
	this.transpose = function() {
		// DONE
		// modify 'this' matrix so that it becomes its transpose
		var elem = this.elements;
		var temp;
		
		// index 0, 4, and 8 remain in place so they don't change --> starting at index 1
		// Saving [1] && [3] moves to [1] && [1]{saved in temp} moves to[3]
		temp = elem[1];   elem[1] = elem[3];   elem[3] = temp;
		// saving [2] && [6] moves to [2] && [2]{saved in temp} moves to [6]
		temp = elem[2];   elem[2] = elem[6];   elem[6] = temp;
		// saving [5] && [7] moves to [5] && [5]{saved in temp} moves to [7]
		temp = elem[5];   elem[5] = elem[7];   elem[7] = temp;

		return this;
	};

	// -------------------------------------------------------------------------
	this.inverse = function() {
		// DONE
		// modify 'this' matrix so that it becomes its inverse

		// will need the determinant for part IV
		var determinant = this.determinant();
		// if the determinant is = 0 --> the inverse does not exist
		if(determinant == 0) {
			// setting back to an identity matrix if inverse does not exist
			return setIdentity();
		// else calculate inverse
		} else {

			// part I/II: creating minors && cofactoring
			var minorA = this.elements[4] * this.elements[8] - this.elements[5] * this.elements[7];
			var minorB = -(this.elements[3] * this.elements[8] - this.elements[5] * this.elements[6]);
			var minorC = this.elements[3] * this.elements[7] - this.elements[4] * this.elements[6];
			var minorD = -(this.elements[1] * this.elements[8] - this.elements[2] * this.elements[7]);
			var minorE = this.elements[0] * this.elements[8] - this.elements[2] * this.elements[6];
			var minorF = -(this.elements[0] * this.elements[7] - this.elements[1] * this.elements[6]);
			var minorG = this.elements[1] * this.elements[5] - this.elements[2] * this.elements[4];
			var minorH = -(this.elements[0] * this.elements[5] - this.elements[2] * this.elements[3]);
			var minorI = this.elements[0] * this.elements[4] - this.elements[1] * this.elements[3];
			// part III/IV: adjugating the matrix && multiplying by 1/determinant
			return this.set(
				minorA, minorD, minorG,
				minorB, minorE, minorH,
				minorC, minorF, minorI).multiplyScalar(1/determinant);
			
		}
	};


	// -------------------------------------------------------------------------
	this.log = function() {
		var e = this.elements;
		console.log('[ '+
      '\n ' + e[0]  + ', ' + e[1]  + ', ' + e[2]  +
      '\n ' + e[4]  + ', ' + e[5]  + ', ' + e[6]  +
      '\n ' + e[8]  + ', ' + e[9]  + ', ' + e[10] +
      '\n ' + e[12] + ', ' + e[13] + ', ' + e[14] +
      '\n]'
		);

		return this;
	};
};
