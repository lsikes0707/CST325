// AUTHORS: JOHN SEALS AND LACEY SIKES
precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

varying vec3 aVert;
varying vec2 aTex;

void main(void) {
    //gl_FragColor = vec4(aTex, aVert);	
	//gl_FragColor = texture2D(uTexture, aTex);
	
	gl_FragColor = texture2D(uTexture, aTex, uAlpha);
	gl_FragColor.a = uAlpha;
}
