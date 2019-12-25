// * AUTHORS: JOHN SEALS AND LACEY SIKES
precision mediump float;

uniform vec3 uLightDirection;
uniform vec3 uCameraPosition;
uniform sampler2D uTexture;

varying vec2 vTexcoords;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main(void) {
    // DONE - diffuse contribution
    // 1. normalize the light direction and store in a separate variable
	vec3 lightDirection = normalize(uLightDirection);
	
    // 2. normalize the world normal and store in a separate variable
	vec3 worldNormal = normalize(vWorldNormal);
	
    // 3. calculate the lambert term, which is the dot product of n and L
	float lambert = dot(lightDirection, worldNormal);
	
    // todo - specular contribution
    // 1. in world space, calculate the direction from the surface point to the eye (normalized)
	vec3 eyeDirection = normalize(uCameraPosition - vWorldPosition);
	
    // 2. in world space, calculate the reflection vector (normalized)
	vec3 reflectionVector = reflect(worldNormal,lightDirection);
	
    // 3. calculate the phong term, Video 6.1 @ 42:24 Phong = (r dot v)^n, also the phong term can return negative values, 
	// in order to avoid these negative values causing black areas in the plane and sphere, use the glsl max function of the 
	// dot product and 0.0, (it will use whichever value is greater).
	
	float phongTerm = pow(max(dot(reflectionVector,eyeDirection),0.0),64.0);
	
    vec3 albedo = texture2D(uTexture, vTexcoords).rgb;

    // todo - combine
    // 1. apply light and material interaction for diffuse value by using the texture color as the material
    // 2. apply light and material interaction for phong, assume phong material color is (0.3, 0.3, 0.3)

    vec3 ambient = albedo * 0.1;
		
	//todo - WebGL/Matsuda Chp 8 Pg 302 line 18: vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;	
    vec3 diffuseColor = vec3(1,1,1) * albedo * vec3(lambert,lambert,lambert);
    
	//todo (same as above only with 0.3 for light contribution and phong term in place of albedo and dot prod of eyeDirection and reflectionVector instead of worldNormal and lightDirection)
	//if you make vec3(0.3,0.3,0.3) larger, like change it to vec3(1.6,1.6,1.6) you will see the light's reflection on the sphere get bigger
	vec3 specularColor = vec3(0.3,0.3,0.3) * vec3(phongTerm,phongTerm,phongTerm) * vec3(dot(eyeDirection,reflectionVector),dot(eyeDirection,reflectionVector),dot(eyeDirection,reflectionVector));
	
    vec3 finalColor = ambient + diffuseColor + specularColor;

	//***Visualize TODO #1A***
    //gl_FragColor = vec4(uLightDirection,1.0);
	
	//***Visualize TODO #1B***
	//gl_FragColor = vec4(lightDirection,1.0);
	
	//***Visualize TODO #2***
	//gl_FragColor = vec4(worldNormal,1.0);
	
	//***Visualize TODO #3 Grayscale***
	//gl_FragColor = vec4(lambert,lambert,lambert,1.0);
	
	//***Visualize TODO #4***
	//gl_FragColor = vec4(eyeDirection,1.0);
	
	//***Visualize TODO #5***
	//gl_FragColor = vec4(reflectionVector,1.0);
	
	//***Visualize TODO #6 Phong term***
	//gl_FragColor = vec4(phongTerm,phongTerm,phongTerm,1.0);
	
	//***Visualize TODO #7***
	//gl_FragColor = vec4(diffuseColor,1.0);
	
	//***Visualize TODO #8***
	//gl_FragColor = vec4(specularColor,1.0);
	
	//***Visualize TODO #9***
	gl_FragColor = vec4(finalColor,1.0);
}
