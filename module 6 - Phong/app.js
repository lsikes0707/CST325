// AUTHORS:LACEY SIKES
'use strict'

var gl;

var appInput = new Input();
var time = new Time();
var camera = new OrbitCamera(appInput);

var sphereGeometry = null; // this will be created after loading from a file
var groundGeometry = null;

var projectionMatrix = new Matrix4();
var lightDirection = new Vector3(5, 3, 0);

// the shader that will be used by each piece of geometry (they could each use their own shader but in this case it will be the same)
var phongShaderProgram;

// auto start the app when the html page is ready
window.onload = window['initializeAndStartRendering'];

// we need to asynchronously fetch files from the "server" (your local hard drive)
var loadedAssets = {
    phongTextVS: null, phongTextFS: null,
    vertexColorVS: null, vertexColorFS: null,
    sphereJSON: null,
    marbleImage: null,
    crackedMudImage: null
};

// -------------------------------------------------------------------------
function initializeAndStartRendering() {
    initGL();
    loadAssets(function() {
        createShaders(loadedAssets);
        createScene();

        updateAndRender();
    });
}

// -------------------------------------------------------------------------
function initGL(canvas) {
    var canvas = document.getElementById("webgl-canvas");

    try {
        gl = canvas.getContext("webgl");
        gl.canvasWidth = canvas.width;
        gl.canvasHeight = canvas.height;

        gl.enable(gl.DEPTH_TEST);
    } catch (e) {}

    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

// -------------------------------------------------------------------------
function loadAssets(onLoadedCB) {
    var filePromises = [
        fetch('./shaders/phong.vs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/phong.directionlit.fs.glsl').then((response) => { return response.text(); }),
        fetch('./data/sphere.json').then((response) => { return response.json(); }),
        loadImage('./data/marble.jpg'),
        loadImage('./data/crackedMud.png')
    ];

    Promise.all(filePromises).then(function(values) {
        // Assign loaded data to our named variables
        loadedAssets.phongTextVS = values[0];
        loadedAssets.phongTextFS = values[1];
        loadedAssets.sphereJSON = values[2];
        loadedAssets.marbleImage = values[3];
        loadedAssets.crackedMudImage = values[4];
    }).catch(function(error) {
        console.error(error.message);
    }).finally(function() {
        onLoadedCB();
    });
}

// -------------------------------------------------------------------------
function createShaders(loadedAssets) {
    phongShaderProgram = createCompiledAndLinkedShaderProgram(loadedAssets.phongTextVS, loadedAssets.phongTextFS);

    phongShaderProgram.attributes = {
        vertexPositionAttribute: gl.getAttribLocation(phongShaderProgram, "aVertexPosition"),
        vertexNormalsAttribute: gl.getAttribLocation(phongShaderProgram, "aNormal"),
        vertexTexcoordsAttribute: gl.getAttribLocation(phongShaderProgram, "aTexcoords")
    };

    phongShaderProgram.uniforms = {
        worldMatrixUniform: gl.getUniformLocation(phongShaderProgram, "uWorldMatrix"),
        viewMatrixUniform: gl.getUniformLocation(phongShaderProgram, "uViewMatrix"),
        projectionMatrixUniform: gl.getUniformLocation(phongShaderProgram, "uProjectionMatrix"),
        lightDirectionUniform: gl.getUniformLocation(phongShaderProgram, "uLightDirection"),
        cameraPositionUniform: gl.getUniformLocation(phongShaderProgram, "uCameraPosition"),
        textureUniform: gl.getUniformLocation(phongShaderProgram, "uTexture"),
    };
}

// -------------------------------------------------------------------------
function createScene() {
    groundGeometry = new WebGLGeometryQuad(gl, phongShaderProgram);
    groundGeometry.create(loadedAssets.crackedMudImage);

    sphereGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    sphereGeometry.create(loadedAssets.sphereJSON, loadedAssets.marbleImage);

    // Scaled it down so that the diameter is 3, (starts at 100)
    var scale = new Matrix4().scale(0.03, 0.03, 0.03);

    sphereGeometry.worldMatrix.identity();
    sphereGeometry.worldMatrix.multiplyRightSide(scale);

    // raise it by the radius to make it sit on the ground
    sphereGeometry.worldMatrix.translate(0, 1.5, 0);
}

// -------------------------------------------------------------------------
function updateAndRender() {
    requestAnimationFrame(updateAndRender);

    var aspectRatio = gl.canvasWidth / gl.canvasHeight;

    // todo 
    // add keyboard controls for changing light direction here
	// use appInput to detect key presses
	
	if(appInput.up || appInput.w)
	{
		//Rotate light away from camera in the starting position
		var rotateLR = new Matrix3().setRotationY(0.0);
		var rotateUD = new Matrix3().setRotationX(-1.0);
  	    var rotationMatrix = rotateLR.clone().multiplyRightSide(rotateUD.clone());
        rotationMatrix.multiplyVector(lightDirection);
	}
	
	if(appInput.down || appInput.s)
	{
		//Rotate light toward the camera in the starting position
		var rotateLR = new Matrix3().setRotationY(0.0);
		var rotateUD = new Matrix3().setRotationX(1.0);
  	    var rotationMatrix = rotateLR.clone().multiplyRightSide(rotateUD.clone());
        rotationMatrix.multiplyVector(lightDirection);
	}
	
	if(appInput.left || appInput.a)
	{
		//Rotate light counter clockwise around the 3d world when the camera is in the starting position
		var rotateLR = new Matrix3().setRotationY(1.0);
		var rotateUD = new Matrix3().setRotationX(0.0);
  	    var rotationMatrix = rotateLR.clone().multiplyRightSide(rotateUD.clone());
        rotationMatrix.multiplyVector(lightDirection);
	}
	
	if(appInput.right || appInput.d)
	{
	   //Rotate light clockwise around the 3d world when the camera is in the starting position
		var rotateLR = new Matrix3().setRotationY(-1.0);
		var rotateUD = new Matrix3().setRotationX(0.0);
  	    var rotationMatrix = rotateLR.clone().multiplyRightSide(rotateUD.clone());
        rotationMatrix.multiplyVector(lightDirection);
	}
	
    time.update();
    camera.update(time.deltaTime);

    // specify what portion of the canvas we want to draw to (all of it, full width and height)
    gl.viewport(0, 0, gl.canvasWidth, gl.canvasHeight);

    // this is a new frame so let's clear out whatever happened last frame
    gl.clearColor(0.707, 0.707, 1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(phongShaderProgram);
    var uniforms = phongShaderProgram.uniforms;
    var cameraPosition = camera.getPosition();
    gl.uniform3f(uniforms.lightDirectionUniform, lightDirection.x, lightDirection.y, lightDirection.z);
    gl.uniform3f(uniforms.cameraPositionUniform, cameraPosition.x, cameraPosition.y, cameraPosition.z);

    projectionMatrix.setPerspective(45, aspectRatio, 0.1, 1000);
    groundGeometry.render(camera, projectionMatrix, phongShaderProgram);
    sphereGeometry.render(camera, projectionMatrix, phongShaderProgram);
}
