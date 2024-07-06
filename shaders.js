let smoothDots = new ShaderProgram("smooth-dots");

// Spatially fluctuating smoothDots
smoothDots.vertText = `
    // beginGLSL
    attribute vec2 coordinates;
    uniform float time;
    varying float t;
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        gl_PointSize = 24.;
        gl_PointSize += (sin((coordinates.y*0.02+time*2e-1))*0.5+0.5)*4.;
    // gl_PointSize *= (sin(time*0.1+gl_Position.y*1e-2)*0.5+0.5);
        t = time;
        }
    // endGLSL
`;
smoothDots.fragText = `
    // beginGLSL
    precision mediump float;
    // uniform float time;
    varying float t;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 0.5;
        float l = 1.0 - length(pos - vec2(0.5)) * 4.;
        // l += (1.0 - length(pos - vec2(0.5)) * 2.) * 0.125;
        // l += distSquared * 0.25;
        distSquared -= 1.2;
        l += (distSquared - (l * distSquared));
        float halo = (1.0 - length(pos - vec2(0.5)) * 2.)*0.5;
        l = smoothstep(0., 1., l);
        l = mix(pow(l, 10.), l, (sin(t*0.1+gl_FragCoord.y*1e-2)*0.5+0.5));
        float noise = rand(pos - vec2(cos(t), sin(t))) * 0.0625;
        gl_FragColor = vec4(vec3(1.0, pow(l, 2.)*0.75, 0.25), l+halo-noise);
        gl_FragColor.a *= (sin(t*0.1+gl_FragCoord.y*1e-2)*0.5+0.5);
    }
    // endGLSL
`;
smoothDots.vertText = smoothDots.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots.fragText = smoothDots.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots.init();

smoothDots.vertText = `
    // beginGLSL
    attribute vec2 coordinates;
    uniform float time;
    varying float t;
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        gl_PointSize = 15.;
        gl_PointSize += (sin((coordinates.y*0.02+time*2e-1))*0.5+0.5)*4.;
    }
    // endGLSL
`;
smoothDots.fragText = `
    // beginGLSL
    precision mediump float;
    // uniform float time;
    varying float t;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 0.5;
        float l = 1.0 - length(pos - vec2(0.5)) * 4.;
        // l += (1.0 - length(pos - vec2(0.5)) * 2.) * 0.125;
        // l += distSquared * 0.25;
        distSquared -= 1.2;
        l += (distSquared - (l * distSquared));
        float halo = (1.0 - length(pos - vec2(0.5)) * 2.)*0.5;
        l = smoothstep(0., 1., l);
        float noise = rand(pos - vec2(cos(t), sin(t))) * 0.0625;
        gl_FragColor = vec4(vec3(1.0, pow(l, 2.)*0.75, 0.25), l+halo-noise);
    }
    // endGLSL
`;
smoothDots.vertText = smoothDots.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots.fragText = smoothDots.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots.init();


let neonRectangle = new ShaderProgram("neon-rectangle");

// Concentric rings
neonRectangle.vertText = `
    // beginGLSL
        attribute vec2 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        attribute vec2 uv;
        attribute float radius;
        attribute float border;
        uniform vec2 resolution;
        varying vec4 vColor;
        varying vec2 wh;
        varying vec2 uvs;
        varying float vradius;
        varying float vborder;
        void main(void) {
            gl_Position = vec4(coordinates, 0.0, 1.0);
            gl_Position.x = gl_Position.x * (resolution.y / resolution.x);
            vColor = color;
            wh = size;
            uvs = uv;
            vradius = radius;
            vborder = border;
        }
    // endGLSL
`;
neonRectangle.fragText = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
    varying vec2 uvs;
    varying float vradius;
    varying float vborder;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness);
    }
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    void main(void) {
        vec2 pos = gl_FragCoord.xy;
        vec2 uv = uvs;
        uv *= wh;
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.1;
            uv -= wh * 0.5;
                float radius = vradius * 0.25;
        vec2 size = wh * 0.5 - radius;
        float col = 1. - (sin(length(uv)*5.-time*0.5e-1)*0.5+0.5);
        float halo = 1. - (sin(length(uv)*5.-time*0.5e-1)*0.5+0.5);
        float cutoff = 0.5;
        // cutoff = 0.5 + (sin(atan(uv.y, uv.x)*5.)*0.5+0.5);
        // cutoff = 0.5 + (sin(atan(uv.y, uv.x)*15.)*0.5+0.5) * 0.1;
        float sharpness = 10.0;
        col = ((abs(col - cutoff) * -1.) * sharpness + cutoff) * (1./cutoff);
        col = max(0.0, col);
        halo = ((abs(halo - cutoff) * -1.) * (sharpness*0.25) + cutoff) * (1./cutoff);
        halo = max(0.0, halo);
        // halo = pow(halo, 1.5);
        col += halo - (halo * col);
        col = mix(pow(col, 20.), col, sin(time*0.1+pos.y*1e-2)*0.5+0.5)*(sin(time*0.1+pos.y*1e-2)*0.5+0.5);
        // col = halo;
        // col = smoothstep(0., 1., col);
        gl_FragColor = vec4(vec3(col, pow(col, 3.)*0.5, pow(col, 3.)*0.25), (1.0 - noise));
    }
    // endGLSL
`;
neonRectangle.vertText = neonRectangle.vertText.replace(/[^\x00-\x7F]/g, "");
neonRectangle.fragText = neonRectangle.fragText.replace(/[^\x00-\x7F]/g, "");
neonRectangle.init();

neonRectangle.vertText = `
    // beginGLSL
        attribute vec2 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        attribute vec2 uv;
        attribute float radius;
        attribute float border;
        uniform vec2 resolution;
        varying vec4 vColor;
        varying vec2 wh;
        varying vec2 uvs;
        varying float vradius;
        varying float vborder;
        void main(void) {
            gl_Position = vec4(coordinates, 0.0, 1.0);
            gl_Position.x = gl_Position.x * (resolution.y / resolution.x);
            vColor = color;
            wh = size;
            uvs = uv;
            vradius = radius;
            vborder = border;
        }
    // endGLSL
`;
neonRectangle.fragText = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
    varying vec2 uvs;
    varying float vradius;
    varying float vborder;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness);
    }
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    void main(void) {
        vec2 pos = gl_FragCoord.xy;
        vec2 uv = uvs;
        uv *= wh;
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.1;
        uv -= wh * 0.5;
        float radius = vradius;
        vec2 size = wh * 0.5 - radius;
        float col = length(max(abs(uv), size) - size) - radius;
        float b = vborder;
        col = (abs(col + b - (b*0.5)) * -1. + (b*0.5)) * (1./(b*0.5));
        // For a filled-out rectangle.
        // col = (min((col + b) * -1. + (b*0.5), 0.) + (b*0.5)) * (1./(b*0.5));
        // col = min((col+b) * -1. + b, b * 0.5) * (1./(b*0.5));
        // col = ((col+b) * -1. + b) * (1./(b*0.5));
        // col = min(col * -1. * (1. / (b * 0.5)), 1.0);
        // col = smoothstep(0., 1., col);
        // --------------------------------------------------------
        // to make the neonRectangle fluctuate
        // col = mix(pow(col, 20.), col, sin(time*0.1)*0.5+0.5)*(sin(time*0.1)*0.5+0.5);
        // col = mix(pow(col, 20.), col, sin(time*0.1+pos.y*1e-2)*0.5+0.5)*(sin(time*0.1+pos.y*1e-2)*0.5+0.5);
        // --------------------------------------------------------
        float highlight = pow(max(0., col), 4.) * 0.5;
        col = col * 0.75 + highlight;
        // col = smoothstep(0., 1., col);
        col = mix(col, smoothstep(0., 1.5, col), sin((pos.y*0.02+time*2e-1))*0.5+0.5);
        // col = pow(max(col,0.0), 0.65);
        gl_FragColor = vec4(vec3(1., 0., 0.), (col - noise));
        gl_FragColor = vec4(vec3(col, 0.1, 0.1), 1.0);
        gl_FragColor = vColor;
        gl_FragColor.a = col - noise;
        gl_FragColor.g = highlight;
    }
    // endGLSL
`;
neonRectangle.vertText = neonRectangle.vertText.replace(/[^\x00-\x7F]/g, "");
neonRectangle.fragText = neonRectangle.fragText.replace(/[^\x00-\x7F]/g, "");
neonRectangle.init();

let roundedSquare2 = new ShaderProgram("rounded-square-2");

roundedSquare2.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    attribute vec3 colors;
    varying vec3 cols;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        gl_PointSize = 32.;
        cols = colors;
    }
    // endGLSL
`;
roundedSquare2.fragText = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec3 cols;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float roundedRectangleFlicker (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        // vec2 uv = gl_PointCoord.xy;
        float t = time;
        float t2 = mod(t * 0.125, 3.14159 * 2.) * 1.;
        // t = 100. + (t * 1e-4);
        float w = 0.15 + (sin(t2 * 1e-2 * tan(t2 * 2e-2)) + 1.0) * 0.25;
        float d = length(max(abs(uv - pos), size * 0.5) - size * 0.5) * w - radius * 0.01;
        float oscFull = (sin(t2) * 0.5 + 0.5) * 3.75 * 0.;
        float oscScanning = (sin(gl_FragCoord.y * 1e-2 + t2) * 0.5 + 0.5) * 4.;
        return smoothstep(3.99 + oscFull + oscScanning, 0.11, d * 10. / thickness * 5.0 * 0.125 * 1.5);
        // No oscScanning anymore.
        // return smoothstep(2.99 + oscFull + 1., 0.11, d * 10. / thickness * 5.0 * 0.125 * 1.5);
     }
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos), size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    void main(void) {
         float resolution = 1.0;
         vec2 screenSize = vec2(2560.0, 1440.0) * resolution;
         vec2 uv = gl_PointCoord.xy;
        uv = uv * 2. - 1.;
        float color = roundedRectangleFlicker(uv, vec2(0.0, 0.0), vec2(0.125, 0.125 * (5./3.)) * 0.5, 0.1, 0.5);
        float rando = rand(uv * time) * 0.1;
        gl_FragColor = vec4(vec3(1., 0., 0.), color - rando);
    }
    // endGLSL
`;
roundedSquare2.vertText = roundedSquare2.vertText.replace(/[^\x00-\x7F]/g, "");
roundedSquare2.fragText = roundedSquare2.fragText.replace(/[^\x00-\x7F]/g, "");
roundedSquare2.init();

let textureShader = new ShaderProgram("textu");

// Bloody dawn over the mountains
textureShader.vertText = `
    // beginGLSL
attribute vec3 a_position;
attribute vec2 a_texcoord;
varying vec2 v_texcoord;
void main() {
  // Multiply the position by the matrix.
  vec4 positionVec4 = vec4(a_position, 1.0);
  // gl_Position = a_position;
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
// endGLSL
`;
textureShader.fragText = `
// beginGLSL
precision mediump float;
// Passed in from the vertex shader.
uniform float time;
varying vec2 v_texcoord;
// The texture.
uniform sampler2D u_texture;
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
${blendingMath}
void main() {
   gl_FragColor = texture2D(u_texture, v_texcoord);
}
// endGLSL
`;
textureShader.vertText = textureShader.vertText.replace(/[^\x00-\x7F]/g, "");
textureShader.fragText = textureShader.fragText.replace(/[^\x00-\x7F]/g, "");
textureShader.init();