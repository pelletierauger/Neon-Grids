let smoothDots = new ShaderProgram("smooth-dots");

smoothDots.vertText = `
    // beginGLSL
    attribute vec2 coordinates;
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        gl_PointSize = 24.;
    }
    // endGLSL
`;
smoothDots.fragText = `
    // beginGLSL
    precision mediump float;
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
        gl_FragColor = vec4(vec3(1.0, pow(l, 2.)*0.75, 0.25), l+halo);
    }
    // endGLSL
`;
smoothDots.vertText = smoothDots.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots.fragText = smoothDots.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots.init();


let neonRectangle = new ShaderProgram("neon-rectangle");

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