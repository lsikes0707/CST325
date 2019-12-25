// JOHN SEALS AND LACEY SIKES
    attribute vec3 aVertexPosition;

    uniform mat4 uWorldMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying float vDepth;

    void main(void) {
        gl_Position = uProjectionMatrix * uViewMatrix * uWorldMatrix * vec4(aVertexPosition, 1.0);
        // todo convert clip space depth into NDC and rescale from [-1, 1] to [0, 1]
        vDepth = (gl_Position.z+1.0)*0.5;
    }
