setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    varying vec4 vColor;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    void main(void) {
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        uv.r = (uv.r + 1.) * 0.333;
        r = r * r * (3. - 2. * r);
        // r = r * r * (3. - 2. * r);
        // r = smoothstep(0., 1., r);
        // gl_FragColor = vec4(r, vColor.y, vColor.z, vColor.w - (rando * 0.15));
        gl_FragColor = vec4(r, vColor.y, vColor.z, vColor.w - (rando * 0.15));
        // float re = roundedRectangle(uv, vec2(0.5, 0.5), vec2(0.0005, 0.4) * 0.5, 0.01, 1.);
        // re = re * 0.2 + roundedRectangle(uv, vec2(0.5, 0.5), vec2(0.0, 0.4) * 0.5, 0.01, 0.5) * 0.8;
        // gl_FragColor = vec4(vec3(re), 1.0);
        // gl_FragColor.gb = vec2(0.);
        // gl_FragColor.r += 0.1;
        // gl_FragColor.a = vColor.w - (rando * 0.25);
        // gl_FragColor.rgb *= sin(gl_FragCoord.x * 100.);
        // gl_FragColor.rgb = vec3(1.0) - gl_FragColor.rgb;
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}


setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    varying vec4 vColor;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    void main(void) {
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb * 2. - 1.;
        // uv.r = (uv.r + 1.) * 0.333;
        r = r * r * (3. - 2. * r);
        // r = r * r * (3. - 2. * r);
        // r = smoothstep(0., 1., r);
        // gl_FragColor = vec4(r, vColor.y, vColor.z, vColor.w - (rando * 0.15));
        gl_FragColor = vec4(r, vColor.y, vColor.z, vColor.w - (rando * 0.15));
        float re = roundedRectangle(uv, vec2(0.5, 0.5), vec2(0.0005, 0.4) * 0.5, 0.01, 1.);
        re = re * 0.2 + roundedRectangle(uv, vec2(0.5, 0.5), vec2(0.0, 0.4) * 0.5, 0.01, 0.5) * 0.8;
        gl_FragColor = vec4(vec3(re), 1.0);
        gl_FragColor.gb = vec2(0.);
        // gl_FragColor.r += 0.1;
        gl_FragColor.a = vColor.w - (rando * 0.25);
            vec3 col = 1.0 - vec3(max(abs(uv.x), abs(uv.y)));
    gl_FragColor = vec4(col, 1.0);
        // gl_FragColor.rgb *= sin(gl_FragCoord.x * 100.);
        // gl_FragColor.rgb = vec3(1.0) - gl_FragColor.rgb;
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}


setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        vec3 col = vColor.rgb;
        float rr = abs(col.r * 4. * 1.3 - 2. * 1.3) * -1. + 1.;
        float bb = abs(col.b * 12. * 0.55 - 6. * 0.55) * -1. + 6. * 0.55;
        // col.r = min(rr, bb);
        float rr2 = abs(col.r * 32. * 3. - 16. * 3.) * -1. + 1.;
        col.b = map(col.b, 0.0, 1.0, -0.2, 1.2);
        float bb2 = abs(col.b * 12. * 5.5 - 6. * 5.5) * -1. + 6. * 5.5;
        // col.r = min(rr2, bb2);
        // col.r = rr;
        // col.r = abs(col.b * 4. - 2.) * -1. + 1.;
        float glow = 1.0 - length(vec2(rr, min(1.0, bb)) - vec2(1., 1.));
        // col.r *= 0.5;
        float neon = 1.0 - length(vec2(rr2, min(1.0, bb2)) - vec2(1., 1.));
        // float neon = neon;
        neon = min(1.0, max(0.0, neon));
        glow = min(1.0, max(0.0, glow));
        // neon = smoothstep(0., 1., neon);
        // glow = smoothstep(0., 1., glow);
        // neon = neon * 0.6 + (glow * 0.4);
        neon = neon * 1. + max(0.0, ((glow * 0.7) - 0.25 - (neon * 0.7)));
        // col.r = max(0.0, col.r);
        // col.r *= 0.5;
        // col.r = col.r * col.r * (3. - 3. * col.r);
        // col.b = 1.0;
        vec3 mm = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), 0.);
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.45), 0.025, 0.02);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.45), 0.0175, 0.02);
        gl_FragColor = vec4(vec3(rect-rect2) * vec3(1.0, 0.0, 0.0), 1.0);
        // float col = uv.x;
        // gl_FragColor.a = 1.0;
        // col = abs(col * 4. - 2.) * -1. + 1.;
        // col = smoothstep(0., 1., col);
        // col = col * col * (3. - 2. * col);
        // if (uv.x > 0.25 && uv.x < 0.75) {
        //     uv.x = 1.;
        // } else {
        //     uv.x = map()
        // }
        // gl_FragColor = vec4(vec3(col), 1.0);
        // float re = roundedRectangle(uv, vec2(0.5, 0.5), vec2(0.0005, 0.4) * 0.5, 0.01, 1.);
        // re = re * 0.2 + roundedRectangle(uv, vec2(0.5, 0.5), vec2(0.0, 0.4) * 0.5, 0.01, 0.5) * 0.8;
        // gl_FragColor = vec4(vec3(re), 1.0);
        // gl_FragColor.gb = vec2(0.);
        // gl_FragColor.r += 0.1;
        // gl_FragColor.a = vColor.w - (rando * 0.25);
        // gl_FragColor.rgb *= sin(gl_FragCoord.x * 100.);
        // gl_FragColor.rgb = vec3(1.0) - gl_FragColor.rgb;
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}


setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    varying vec4 vColor;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    void main(void) {
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        vec3 col = vColor.rgb;
        // victoire 1 
        // col.r = abs(col.r * 4. - 2.) * -1. + 1.;
        // col.r = min(col.r, abs(col.b * 12. * 2. - 6. * 2.) * -1. + 6. * 2.);
        // col.b = 0.0;
        // victoire 1, fin
        float rr = abs(col.r * 4. * 0.3 - 2. * 0.3) * -1. + 1.;
        float wideb = map(col.b, 0.0, 1.0, 0.06, 0.94);
        float bb = abs(wideb * 12. * 0.575 - 6. * 0.575) * -1. + 6. * 0.575;
        // col.r = min(rr, bb);
        float rr2 = abs(col.r * 32. * 0.5 - 16. * 0.5) * -1. + 1.;
        col.b = map(col.b, 0.0, 1.0, -0.08, 1.08);
        float bb2 = abs(col.b * 12. * 3. - 6. * 3.) * -1. + 6. * 3.;
        // col.r = min(rr2, bb2);
        // col.r = rr;
        // col.r = abs(col.b * 4. - 2.) * -1. + 1.;
        float glow = 1.0 - length(vec2(rr, min(1.0, bb)) - vec2(1., 1.));
        // col.r *= 0.5;
        float neon = 1.0 - length(vec2(rr2, min(1.0, bb2)) - vec2(1., 1.));
        // float neon = neon;
        neon = min(1.0, max(0.0, neon));
        glow = min(1.0, max(0.0, glow));
        // neon = smoothstep(0., 1., neon);
        // glow = smoothstep(0., 1., glow);
        // neon = neon * 0.6 + (glow * 0.4);
        neon = neon * 1.2 + max(0.0, ((glow * 0.7) - 0.25 - (neon * 0.7)));
        gl_FragColor = vec4(vec3(1.0, neon*0.5, neon*0.25), neon - (rando * 0.1) + 0.);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        vec3 col = vColor.rgb;
        float rr = abs(col.r * 4. * 1.3 - 2. * 1.3) * -1. + 1.;
        float bb = abs(col.b * 12. * 0.55 - 6. * 0.55) * -1. + 6. * 0.55;
        // col.r = min(rr, bb);
        float rr2 = abs(col.r * 32. * 3. - 16. * 3.) * -1. + 1.;
        col.b = map(col.b, 0.0, 1.0, -0.2, 1.2);
        float bb2 = abs(col.b * 12. * 5.5 - 6. * 5.5) * -1. + 6. * 5.5;
        // col.r = min(rr2, bb2);
        // col.r = rr;
        // col.r = abs(col.b * 4. - 2.) * -1. + 1.;
        float glow = 1.0 - length(vec2(rr, min(1.0, bb)) - vec2(1., 1.));
        // col.r *= 0.5;
        float neon = 1.0 - length(vec2(rr2, min(1.0, bb2)) - vec2(1., 1.));
        // float neon = neon;
        neon = min(1.0, max(0.0, neon));
        glow = min(1.0, max(0.0, glow));
        // neon = smoothstep(0., 1., neon);
        // glow = smoothstep(0., 1., glow);
        // neon = neon * 0.6 + (glow * 0.4);
        neon = neon * 1. + max(0.0, ((glow * 0.7) - 0.25 - (neon * 0.7)));
        // col.r = max(0.0, col.r);
        // col.r *= 0.5;
        // col.r = col.r * col.r * (3. - 3. * col.r);
        // col.b = 1.0;
        vec3 mm = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), 0.);
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.45), 0.025, 0.02);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.45), 0.0175, 0.02);
        gl_FragColor = vec4(vec3(rect-rect2) * vec3(1.0, 0.0, 0.0), 1.0);
        // float col = uv.x;
        // gl_FragColor.a = 1.0;
        // col = abs(col * 4. - 2.) * -1. + 1.;
        // col = smoothstep(0., 1., col);
        // col = col * col * (3. - 2. * col);
        // if (uv.x > 0.25 && uv.x < 0.75) {
        //     uv.x = 1.;
        // } else {
        //     uv.x = map()
        // }
        // gl_FragColor = vec4(vec3(col), 1.0);
        // float re = roundedRectangle(uv, vec2(0.5, 0.5), vec2(0.0005, 0.4) * 0.5, 0.01, 1.);
        // re = re * 0.2 + roundedRectangle(uv, vec2(0.5, 0.5), vec2(0.0, 0.4) * 0.5, 0.01, 0.5) * 0.8;
        // gl_FragColor = vec4(vec3(re), 1.0);
        // gl_FragColor.gb = vec2(0.);
        // gl_FragColor.r += 0.1;
        // gl_FragColor.a = vColor.w - (rando * 0.25);
        // gl_FragColor.rgb *= sin(gl_FragCoord.x * 100.);
        // gl_FragColor.rgb = vec3(1.0) - gl_FragColor.rgb;
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}


setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        vec3 col = vColor.rgb;
        float rr = abs(col.r * 4. * 1.3 - 2. * 1.3) * -1. + 1.;
        float bb = abs(col.b * 12. * 0.55 - 6. * 0.55) * -1. + 6. * 0.55;
        // col.r = min(rr, bb);
        float rr2 = abs(col.r * 32. * 3. - 16. * 3.) * -1. + 1.;
        col.b = map(col.b, 0.0, 1.0, -0.2, 1.2);
        float bb2 = abs(col.b * 12. * 5.5 - 6. * 5.5) * -1. + 6. * 5.5;
        // col.r = min(rr2, bb2);
        // col.r = rr;
        // col.r = abs(col.b * 4. - 2.) * -1. + 1.;
        float glow = 1.0 - length(vec2(rr, min(1.0, bb)) - vec2(1., 1.));
        // col.r *= 0.5;
        float neon = 1.0 - length(vec2(rr2, min(1.0, bb2)) - vec2(1., 1.));
        // float neon = neon;
        neon = min(1.0, max(0.0, neon));
        glow = min(1.0, max(0.0, glow));
        // neon = smoothstep(0., 1., neon);
        // glow = smoothstep(0., 1., glow);
        // neon = neon * 0.6 + (glow * 0.4);
        neon = neon * 1. + max(0.0, ((glow * 0.7) - 0.25 - (neon * 0.7)));
        vec3 mm = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), 0.);
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.35), 0.025, 0.1);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.335), 0.025, 0.1);
        gl_FragColor = vec4(vec3(rect-rect2) * vec3(1.0, 0.0, 0.0), 1.0);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        vec3 col = vColor.rgb;
        float rr = abs(col.r * 4. * 1.3 - 2. * 1.3) * -1. + 1.;
        float bb = abs(col.b * 12. * 0.55 - 6. * 0.55) * -1. + 6. * 0.55;
        // col.r = min(rr, bb);
        float rr2 = abs(col.r * 32. * 3. - 16. * 3.) * -1. + 1.;
        col.b = map(col.b, 0.0, 1.0, -0.2, 1.2);
        float bb2 = abs(col.b * 12. * 5.5 - 6. * 5.5) * -1. + 6. * 5.5;
        // col.r = min(rr2, bb2);
        // col.r = rr;
        // col.r = abs(col.b * 4. - 2.) * -1. + 1.;
        float glow = 1.0 - length(vec2(rr, min(1.0, bb)) - vec2(1., 1.));
        // col.r *= 0.5;
        float neon = 1.0 - length(vec2(rr2, min(1.0, bb2)) - vec2(1., 1.));
        // float neon = neon;
        neon = min(1.0, max(0.0, neon));
        glow = min(1.0, max(0.0, glow));
        // neon = smoothstep(0., 1., neon);
        // glow = smoothstep(0., 1., glow);
        // neon = neon * 0.6 + (glow * 0.4);
        neon = neon * 1. + max(0.0, ((glow * 0.7) - 0.25 - (neon * 0.7)));
        vec3 mm = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), 0.);
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.35), 0.025, 0.1);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.335), 0.025, 0.1);
        gl_FragColor = vec4(vec3(rect-rect2) * vec3(1.0, 0.0, 0.0), 1.0);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.35), 0.025, 0.1);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.335), 0.025, 0.1);
        float bg = sin(uv.y*100. * length(uv - vec2(0.5)) + time * -4e-1) * 0.5 + 0.5;
        bg -= 1. - (rect2+(rect*-0.25));
        bg = max(0.0, bg);
        vec3 col = (vec3(rect-rect2)*1.+bg);
        // col = smoothstep(0., 1., col);
        gl_FragColor = vec4(col * vec3(1.0, 0.0, 0.0), 1.0);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.35), 0.025, 0.1);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.335), 0.025, 0.1);
        float bg = sin(uv.y*100. * length(uv - vec2(0.5)) + time * -4e-1) * 0.5 + 0.5;
        float bg2 = bg - (1. - (rect2+(rect*-0.25)));
        bg2 = max(0.0, bg2);
        vec3 col = (vec3(rect-rect2)*1.+bg2);
        // bg = smoothstep(0., 1., bg);
        col = vec3(bg * rect2) + (rect-rect2);
        // col = smoothstep(0., 1., col);
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.2;
        gl_FragColor = vec4(col * vec3(1.0, 0.0, 0.0), 1.0 - noise);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.35), 0.025, 0.1);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.335), 0.025, 0.1);
        float bg = sin(uv.y*100. * length(uv - vec2(0.5) * sin(uv.x*5.)) + time * -4e-1) * 0.5 + 0.5;
        float bg2 = bg - (1. - (rect2+(rect*-0.25)));
        bg2 = max(0.0, bg2);
        vec3 col = (vec3(rect-rect2)*1.+bg2);
        // bg = smoothstep(0., 1., bg);
        // bg = bg * (1.0 - (rect2 * -1.));
        col = vec3(bg * rect2) + ((rect-rect2));
        // col = smoothstep(0., 1., col);
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.2;
        gl_FragColor = vec4(col * vec3(1.0, 0.0, 0.0), 1.0 - noise);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.36), 0.025, 0.05);
        float rectB = roundedRectangle(uv, vec2(0.5), vec2(0.37), 0.03, 0.001);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.355), 0.015, 0.05);
        float bg = sin(uv.y*100. * length(uv - vec2(0.5)) + time * -4e-1) * 0.5 + 0.5;
        bg = pow(bg, 4.0);
        // bg -= 1. - (rect2+(rect*-0.25));
        // bg = max(0.0, bg);
        float col = ((rect-rect2)*1.+bg);
        col = bg;
        col = rect-rect2;
        col = max(col, bg * rectB);
        // col = mix(col + (bg * rectB), max(col, bg * rectB), 0.85);
        // col = max(col, (bg - (1.0 - rectB)));
        // col = col + (bg - (1.0 - rectB));
        // col = col + (bg + rect2);
        // col = smoothstep(0., 1., col);
        // col = max((rect-rect2)*bg, col);
        // col = max(rect-bg, rect-rect2);
        // col = smoothstep(0., 1., col);
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.2;
        gl_FragColor = vec4(vec3(col) * vec3(1.0, 0.0, 0.0), 1.0 - noise);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.36), 0.025, 0.05);
        float rectB = roundedRectangle(uv, vec2(0.5), vec2(0.37), 0.03, 0.001);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.355), 0.015, 0.05);
        float bg = sin(uv.y*100. * length(uv - vec2(0.5)) + time * -4e-1) * 0.5 + 0.5;
        bg = pow(bg, 4.0);
        vec2 wuv = uv;
        float gX = cos(wuv.x*75.-1.25)*0.5+0.5;
        float gY = sin((wuv.y)*75.+time*2e-1)*0.5+0.5;
        // wuv *= vec2(sin(wuv.x*2.), cos(wuv.x*2.));
        float fX = (cos(wuv.x*0.1+time*1e-1)*0.5+0.5);
        float fY = (sin(wuv.y*0.1+time*1e-1)*0.5+0.5);
        vec2 fluc = vec2(0. + (tan(wuv.y+time*5e-2)*0.5+0.5));
        bg = 1.0 - length(vec2(gX, gY) - vec2(0.5))*2.;
        // bg = smoothstep(0.5, 0.51, bg);
        bg = smoothstep(0., 1., bg);
        bg = smoothstep(0., 1., bg);
        // bg -= 1. - (rect2+(rect*-0.25));
        // bg = max(0.0, bg);
        float col = ((rect-rect2)*1.+bg);
        col = bg;
        col = rect-rect2;
        col = max(col, bg * rectB);
        // col = mix(col + (bg * rectB), max(col, bg * rectB), 0.85);
        // col = max(col, (bg - (1.0 - rectB)));
        // col = col + (bg - (1.0 - rectB));
        // col = col + (bg + rect2);
        // col = smoothstep(0., 1., col);
        // col = max((rect-rect2)*bg, col);
        // col = max(rect-bg, rect-rect2);
        // col = smoothstep(0., 1., col);
        gl_FragColor = vec4(vec3(col) * vec3(1.0, 0.0, 0.0), 1.0);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
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
    vec2 rotateUV(vec2 uv, float rotation, float mid) {
        return vec2(
          cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
          cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
        );
    }
    void main(void) {
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.36), 0.025, 0.05);
        float rectB = roundedRectangle(uv, vec2(0.5), vec2(0.37), 0.03, 0.001);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.355), 0.015, 0.05);
        float bg = sin(uv.y*100. * length(uv - vec2(0.5)) + time * -4e-1) * 0.5 + 0.5;
        bg = pow(bg, 4.0);
        vec2 wuv = uv;
        wuv = rotateUV(wuv, time * 1e-1, 0.5);
        float gX = cos(wuv.x*75.-1.25)*0.5+0.5;
        float gY = sin((wuv.y)*75.+time*2e-1)*0.5+0.5;
        // wuv *= vec2(sin(wuv.x*2.), cos(wuv.x*2.));
        float fX = (cos(wuv.x*0.1+time*1e-1)*0.5+0.5);
        float fY = (sin(wuv.y*0.1+time*1e-1)*0.5+0.5);
        vec2 fluc = vec2(0.5);
        bg = 1.0 - length(vec2(gX, gY) - fluc)*2.;
        // bg = smoothstep(0.5, 0.51, bg);
        bg = smoothstep(0., 1., bg);
        bg = smoothstep(0., 1., bg);
        // bg -= 1. - (rect2+(rect*-0.25));
        // bg = max(0.0, bg);
        float col = ((rect-rect2)*1.+bg);
        col = bg;
        col = rect-rect2;
        col = max(col, bg * rectB);
        // col = mix(col + (bg * rectB), max(col, bg * rectB), 0.85);
        // col = max(col, (bg - (1.0 - rectB)));
        // col = col + (bg - (1.0 - rectB));
        // col = col + (bg + rect2);
        // col = smoothstep(0., 1., col);
        // col = max((rect-rect2)*bg, col);
        // col = max(rect-bg, rect-rect2);
        // col = smoothstep(0., 1., col);
        gl_FragColor = vec4(vec3(col) * vec3(1.0, 0.0, 0.0), 1.0);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
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
    vec2 rotateUV(vec2 uv, float rotation, float mid) {
        return vec2(
          cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
          cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
        );
    }
    void main(void) {
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.36), 0.025, 0.05);
        float rectB = roundedRectangle(uv, vec2(0.5), vec2(0.37), 0.03, 0.001);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.355), 0.015, 0.05);
       float bg = sin(uv.y*100. * length(uv - vec2(0.5)) + time * -4e-1) * 0.5 + 0.5;
        bg = pow(bg, 4.0);
        vec2 wuv = uv;
        float gX = cos(wuv.x*75.-1.25)*0.5+0.5;
        float gY = sin((wuv.y)*75.+time*2e-1)*0.5+0.5;
        wuv.y += time * 2e-3;
        // wuv = rotateUV(wuv, time * 2e-1, 0.5);
        // wuv.y += length(uv - vec2(0.5));
        // wuv.y *= cos(wuv.y+time);
        gX = fract(wuv.x * 50.);
        gY = fract(wuv.y * 50.);
        gX = mod((wuv.x+0.05) * 50., 2.);
        gY = mod(wuv.y * 50., 2.);
        // gX *= floor(wuv.x * 50.*0.1)+time*1e-2);
        // wuv *= vec2(sin(wuv.x*2.), cos(wuv.x*2.));
        // float fX = (cos(wuv.x*0.1+time*1e-1)*0.5+0.5);
        // float fY = (sin(wuv.y*0.1+time*1e-1)*0.5+0.5);
        // vec2 fluc = vec2(0. + (tan(wuv.y+time*5e-2)*0.5+0.5));
        bg = 1.0 - length(vec2(gX, gY) - vec2(0.5))*2.;
        bg -= floor(mod(wuv.y * 5. + time*1e-1, 2.));
        // bg -= floor(mod(wuv.x * 5., 2.));
        // bg = smoothstep(0.5, 0.51, bg);
        bg = smoothstep(0., 1., bg);
        float noise = rand(uv + vec2(cos(time), sin(time)));
        float bgg = length(uv - vec2(0.5)) * 2.;
        bgg = smoothstep(0.45, 0.55, bgg);
        bgg -= 0.65 + noise * 0.1;
        // bg = max(bg, bgg);
        // bg = smoothstep(0., 1., bg);
        // bg -= 1. - (rect2+(rect*-0.25));
        // bg = max(0.0, bg);
        float col = ((rect-rect2)*1.+bg);
        col = bg;
        col = rect-rect2;
        col = max(col, bg * rectB);
        // col = mix(col + (bg * rectB), max(col, bg * rectB), 0.85);
        // col = max(col, (bg - (1.0 - rectB)));
        // col = col + (bg - (1.0 - rectB));
        // col = col + (bg + rect2);
        // col = smoothstep(0., 1., col);
        // col = max((rect-rect2)*bg, col);
        // col = max(rect-bg, rect-rect2);
        // col = smoothstep(0., 1., col);
        gl_FragColor = vec4(vec3(col) * vec3(1.0, 0.0, 0.0), 1.0 - noise*0.2);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        varying vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
    }`;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.36), 0.025, 0.05);
        float rectB = roundedRectangle(uv, vec2(0.5), vec2(0.37), 0.03, 0.001);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.355), 0.015, 0.05);
        float bg = sin(uv.y*100.*sin(fract(uv.y*0.04)*100.) * length(uv - vec2(0.5)) + time * -4e-1) * 0.5 + 0.5;
        // bg *= ;
        bg = pow(bg, 4.0);
        // bg -= 1. - (rect2+(rect*-0.25));
        // bg = max(0.0, bg);
        float col = ((rect-rect2)*1.+bg);
        col = bg;
        col = rect-rect2;
        col = max(col, bg * rectB);
        // col = mix(col + (bg * rectB), max(col, bg * rectB), 0.85);
        // col = max(col, (bg - (1.0 - rectB)));
        // col = col + (bg - (1.0 - rectB));
        // col = col + (bg + rect2);
        // col = smoothstep(0., 1., col);
        // col = max((rect-rect2)*bg, col);
        // col = max(rect-bg, rect-rect2);
        // col = smoothstep(0., 1., col);
        gl_FragColor = vec4(vec3(col) * vec3(1.0, 0.0, 0.0), 1.0);
    }
    // endGLSL
    `;
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}


setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        varying vec4 vColor;
        varying vec2 wh;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
        wh = size;
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        float rect = roundedRectangle(uv, vec2(0.5), vec2(0.35), 0.025, 0.1);
        float rect2 = roundedRectangle(uv, vec2(0.5), vec2(0.335), 0.025, 0.1);
        float bg = sin(uv.y*50. * length(uv - vec2(0.5) * smoothstep(0., 1., sin(uv.y*length(uv+2000.)))) + time * -4e-1) * 0.5 + 0.5;
        float bg2 = bg - (1. - (rect2+(rect*-0.25)));
        // bg = pow(bg, 0.5);
        bg2 = max(0.0, bg2);
        vec3 col = (vec3(rect-rect2)*1.+bg2);
        // bg = smoothstep(0., 1., bg);
        // bg = bg * (1.0 - (rect2 * -1.));
        col = vec3(bg * rect2) + ((rect-rect2));
        // col = smoothstep(0., 1., col);
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.2;
        gl_FragColor = vec4(col * vec3(1.0, 0.0, 0.0), 1.0 - noise);
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        varying vec4 vColor;
        varying vec2 wh;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
        wh = size;
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
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
        vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
        float ratio = wh.y / wh.x;
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        float r = vColor.x;
        uv = vColor.rb;
        uv -= vec2(0.5);
        uv.x /= ratio;
        // uv *= wh;
        float rect = roundedRectangle(uv, vec2(0.), vec2(0.4), 0.025, 0.1);
        // float rect2 = roundedRectangle(uv, vec2(0.), vec2(0.39) * wh * 0.25, 0.025, 0.1);
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.2;
        
        gl_FragColor = vec4((rect) * vec3(1.0, 0.0, 0.0) + 0.1, 1.0 - noise);
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        varying vec4 vColor;
        varying vec2 wh;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
        wh = size;
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
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
        float ratio = wh.y / wh.x;
        vec2 uv = vColor.rb;
        // uv -= vec2(0.5);
        // uv.x /= ratio;
        uv *= wh;
        float rect = roundedRectangle(uv, wh*0.5, wh*0.4, 0.025, 0.1);
        // float rect2 = roundedRectangle(uv, vec2(0.), vec2(0.39) * wh * 0.25, 0.025, 0.1);
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.2;
        // uv.x = floor(uv.x*1.);
        // uv.y = floor(uv.y);
        vec3 col = vec3(0.0);
        // if (uv.x > (wh.x - 0.1) || uv.x < (0.1)) {
        //     col.x = 1.0;
        // } else {
        //     col.x = 0.0;
        // }
        // if (uv.y > (wh.y - 0.1) || uv.y < (0.1)) {
        //     col.y = 1.0;
        // } else {
        //     col.y = 0.0;
        // }
        uv -= wh * 0.5;
        if (abs(uv.x) > wh.x * 0.5 - 0.1) {
            col.r = 1.0;
            col.r = map(abs(uv.x), wh.x * 0.5 - 0.1, wh.x * 0.5, 0., 1.);
            col.r = 1.0-abs(col.r-0.5)*4.;
        }
        if (abs(uv.y) > wh.y * 0.5 - 0.1) {
            col.r = 1.0;
            col.r = map(abs(uv.y), wh.y * 0.5 - 0.1, wh.y * 0.5, 0., 1.);
            col.r = 1.0-abs(col.r-0.5)*4.;
        }
        if (abs(uv.x) > wh.x * 0.5 - 0.1 && abs(uv.y) > wh.y * 0.5 - 0.1) {
            // col.r = 1.0;
            // col.g = 1.0;
            // col.g = length(vec2(abs(uv.x),abs(uv.y)) - (wh*0.5-vec2(0.1)))*10.;
            col.r = length(vec2(abs(uv.x),abs(uv.y)) - (wh*0.5-vec2(0.1)))*10.;
            // col.g = 1.0-abs(col.g-0.5)*4.;
            col.r = 1.0-abs(col.r-0.5)*4.;
        }
        gl_FragColor = vec4(col, 1.0);
        // gl_FragColor = vec4(uv.x, uv.y, 0.1, 1.0);
        // gl_FragColor = vec4((rect) * vec3(1.0, 0.0, 0.0) + 0.1, 1.0 - noise);
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}


setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        varying vec4 vColor;
        varying vec2 wh;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
        wh = size;
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
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
        float ratio = wh.y / wh.x;
        vec2 uv = vColor.rb;
        uv *= wh;
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.1;
        float col = float(0.0);
        uv -= wh * 0.5;
        if (abs(uv.x) > wh.x * 0.5 - 0.1) {
            col = map(abs(uv.x), wh.x * 0.5 - 0.1, wh.x * 0.5, 0., 1.);
        }
        if (abs(uv.y) > wh.y * 0.5 - 0.1) {
            col = map(abs(uv.y), wh.y * 0.5 - 0.1, wh.y * 0.5, 0., 1.);
        }
        if (abs(uv.x) > wh.x * 0.5 - 0.1 && abs(uv.y) > wh.y * 0.5 - 0.1) {
            col = length(vec2(abs(uv.x),abs(uv.y)) - (wh*0.5-vec2(0.1)))*10.;
        }
        col = 1.0-abs(col-0.5)*4.;
        gl_FragColor = vec4(vec3(1., 0., 0.), (col - noise));
        // gl_FragColor = vec4(uv.x, uv.y, 0.1, 1.0);
        // gl_FragColor = vec4((rect) * vec3(1.0, 0.0, 0.0) + 0.1, 1.0 - noise);
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        varying vec4 vColor;
        varying vec2 wh;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (1600.0 / 2560.0);
        vColor = color;
        wh = size;
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
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
        float ratio = wh.y / wh.x;
        vec2 uv = vColor.rb;
        uv *= wh;
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.1;
        float col = float(0.0);
        uv -= wh * 0.5;
        float b = 0.2;
        if (abs(uv.x) > wh.x * 0.5 - b) {
            col = map(abs(uv.x), wh.x * 0.5 - b, wh.x * 0.5, 0., 1.);
        }
        if (abs(uv.y) > wh.y * 0.5 - b) {
            col = map(abs(uv.y), wh.y * 0.5 - b, wh.y * 0.5, 0., 1.);
        }
        if (abs(uv.x) > wh.x * 0.5 - b && abs(uv.y) > wh.y * 0.5 - b) {
            col = length(vec2(abs(uv.x),abs(uv.y)) - (wh*0.5-vec2(b)))*(1./b);
        }
        // col = 1.0-abs(col-0.5)*4.*(b*10.);
        // col = 1.0 - length(abs(uv) - vec2(max(abs(uv.x), wh.x * 0.5 - b), max(abs(uv.y), wh.y * 0.5 - b)));
        // col = 1.0 - length(abs(uv) - max(abs(uv), wh * 0.5 - vec2(b)));
        // col = 1.0 - length(max(abs(uv), wh * 0.5 - vec2(b)) - abs(uv));
        //length(max(abs(uv - pos),size) - size) - radius;
        // smoothstep(0.66, 0.33, d / thickness);
        // float f = 1.;
        vec2 size = wh * 0.5 - b;
        col = length(max(abs(uv), size) - size) - b;
        col = (abs(col + 0.1 - 0.05)*-1.+0.05)*20.;
        // col = smoothstep(0.66, 0.33, col / 0.0001);        
        // col = length(max(abs(uv), size) - size) * 10.;
        // col = 1.0 - col * 1000.;
        // col = roundedRectangle(uv, vec2(0.), vec2(wh*0.5-b*1.), b*1., 0.00005);
        // col = smoothstep(0., 1.0, col);
        // col = smoothstep(1., 0., col / 0.0001);
        // col = 1.0-abs(col-0.5)*2.*(b*10.);
        // col = col - b + 0.1;
        // col = col - b;
        // col = 1.0 - abs(col * 20.-10.);
        // gl_FragColor = vec4(vec3(1., 0., 0.), (col - noise));
        gl_FragColor = vec4(vec3(col, 0.1, 0.1), 1.);
        // gl_FragColor = vec4(uv.x, uv.y, 0.1, 1.0);
        // gl_FragColor = vec4((rect) * vec3(1.0, 0.0, 0.0) + 0.1, 1.0 - noise);
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

// Mysterious door
setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        // beginGLSL
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        attribute vec2 uv;
        uniform vec2 resolution;
        varying vec4 vColor;
        varying vec2 wh;
        varying vec2 uvs;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (resolution.y / resolution.x);
        vColor = color;
        wh = size;
            uvs = uv;
        // endGLSL
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
    varying vec2 uvs;
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
        vec2 uv = uvs;
        uv *= wh;
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.1;
        uv -= wh * 0.5;
        float radius = 0.3;
        vec2 size = wh * 0.5 - radius;
        float col = length(max(abs(uv), size) - size) - radius;
        float b = 0.6;
        // col += cos(uv.x * 50. * sin(col*1e1)) * 0.0125;
        float col2 = length(max(abs(uv), size) - size) - radius;
        col += sin(uv.y * uv.x * 20. * sin(col*1e1) + time * 1e-1) * 0.125;
        col = (abs(col + b - (b*0.5)) * -1. + (b*0.5)) * (1./(b*0.5));
        // For a filled-out rectangle.
        // col = (min((col + b) * -1. + (b*0.5), 0.) + (b*0.5)) * (1./(b*0.5));
        // col = min((col+b) * -1. + b, b * 0.5) * (1./(b*0.5));
        // col = ((col+b) * -1. + b) * (1./(b*0.5));
        col2 = min(col2 * -1. * (1. / (b * 0.5)), 1.0);
        col = col * col2;
        // col = smoothstep(0., 1., col);
        float highlight = pow(max(0., col), 4.) * 0.5;
        col = col * 0.75 + highlight;
        // col = smoothstep(0., 1., col);
        // col = pow(max(col,0.0), 0.65);
        gl_FragColor = vec4(vec3(1., 0., 0.), (col - noise));
        gl_FragColor = vec4(vec3(col, 0.1, 0.1), 1.0);
        gl_FragColor = vColor;
        gl_FragColor.a = col - noise;
        gl_FragColor.g = highlight;
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

// Velour
setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        // beginGLSL
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        attribute vec2 uv;
        uniform vec2 resolution;
        varying vec4 vColor;
        varying vec2 wh;
        varying vec2 uvs;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (resolution.y / resolution.x);
        vColor = color;
        wh = size;
            uvs = uv;
        // endGLSL
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
    varying vec2 uvs;
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
        vec2 uv = uvs;
        uv *= wh;
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.3;
        uv -= wh * 0.5;
        float radius = 0.6;
        vec2 size = wh * 0.5 - radius;
        float col = length(max(abs(uv), size) - size) - radius;
        float b = 0.6;
        // col += cos(uv.x * 50. * sin(col*1e1)) * 0.0125;
        col += sin(uv.y * uv.x * 15. * sin(col*1e1) + time * 2e-1) * 0.0125;
        col += sin(uv.y * uv.x * 15. * sin(col*1e1) + time * 2e-1) * 0.0125;
        col += sin(uv.y * uv.x * 15. * sin(col*1e1) + time * 2e-1) * 0.0125;
        col += sin(uv.y * uv.x * 15. * sin(col*1e1) + time * 2e-1) * 0.0125;
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
        // col = pow(max(col,0.0), 0.65);
        gl_FragColor = vec4(vec3(1., 0., 0.), (col - noise));
        gl_FragColor = vec4(vec3(col, 0.1, 0.1), 1.0);
        gl_FragColor = vColor;
        gl_FragColor.a = col - noise;
        gl_FragColor.g = highlight;
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

// Fiery
setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        // beginGLSL
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        attribute vec2 uv;
        uniform vec2 resolution;
        varying vec4 vColor;
        varying vec2 wh;
        varying vec2 uvs;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (resolution.y / resolution.x);
        vColor = color;
        wh = size;
            uvs = uv;
        // endGLSL
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
    varying vec2 uvs;
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
        vec2 uv = uvs;
        uv *= wh;
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.1;
        uv -= wh * 0.5;
        float radius = 0.3;
        vec2 size = wh * 0.5 - radius;
        float col = length(max(abs(uv), size) - size) - radius;
        float b = 0.3;
        // col += cos(uv.x * 50. * sin(col*1e1)) * 0.0125;
        col += sin(uv.y * 50. * sin(col*1e1) + time * 2e-1) * 0.0125;
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
        // col = pow(max(col,0.0), 0.65);
        gl_FragColor = vec4(vec3(1., 0., 0.), (col - noise));
        gl_FragColor = vec4(vec3(col, 0.1, 0.1), 1.0);
        gl_FragColor = vColor;
        gl_FragColor.a = col - noise;
        gl_FragColor.g = highlight;
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

// Shiny
setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        // beginGLSL
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        attribute vec2 uv;
        uniform vec2 resolution;
        varying vec4 vColor;
        varying vec2 wh;
        varying vec2 uvs;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (resolution.y / resolution.x);
        vColor = color;
        wh = size;
            uvs = uv;
        // endGLSL
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
    varying vec2 uvs;
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
        vec2 uv = uvs;
        uv *= wh;
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.1;
        uv -= wh * 0.5;
        float radius = 0.1;
        vec2 size = wh * 0.5 - radius;
        float col = length(max(abs(uv), size) - size) - radius;
        float b = 0.1;
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
        // col = pow(max(col,0.0), 0.65);
        gl_FragColor = vec4(vec3(1., 0., 0.), (col - noise));
        gl_FragColor = vec4(vec3(col, 0.1, 0.1), 1.0);
        gl_FragColor = vColor;
        gl_FragColor.a = col - noise;
        gl_FragColor.g = highlight;
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}

// Simple rounded rectangle
setShaders = function() {
    /*======================= Shaders =======================*/
    // vertex shader source code
    var vertCode = `
        // beginGLSL
        attribute vec3 coordinates;
        attribute vec4 color;
        attribute vec2 size;
        attribute vec2 uv;
        uniform vec2 resolution;
        varying vec4 vColor;
        varying vec2 wh;
        varying vec2 uvs;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_Position.x = gl_Position.x * (resolution.y / resolution.x);
        vColor = color;
        wh = size;
            uvs = uv;
        // endGLSL
    }`;
    vertCode = vertCode.replace(/[^\x00-\x7F]/g, "");
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    uniform float time;
    varying vec4 vColor;
    varying vec2 wh;
    varying vec2 uvs;
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
        vec2 uv = uvs;
        uv *= wh;
        float noise = rand(uv + vec2(cos(time), sin(time))) * 0.1;
        uv -= wh * 0.5;
        float radius = 0.1;
        vec2 size = wh * 0.5 - radius;
        float col = length(max(abs(uv), size) - size) - radius;
        float b = 0.1;
        col = (abs(col + b - (b*0.5)) * -1. + (b*0.5)) * (1./(b*0.5));
        // For a filled-out rectangle.
        // col = (min((col + b) * -1. + (b*0.5), 0.) + (b*0.5)) * (1./(b*0.5));
        // col = min((col+b) * -1. + b, b * 0.5) * (1./(b*0.5));
        // col = ((col+b) * -1. + b) * (1./(b*0.5));
        // col = min(col * -1. * (1. / (b * 0.5)), 1.0);
        // col = smoothstep(0., 1., col);
        // col = pow(max(0., col), 3.);
                // col = smoothstep(0., 1., col);
        gl_FragColor = vec4(vec3(1., 0., 0.), (col - noise));
        gl_FragColor = vec4(vec3(col, 0.1, 0.1), 1.0);
        gl_FragColor = vColor;
        gl_FragColor.a = col;
    }
    // endGLSL
    `;
    fragCode = fragCode.replace(/[^\x00-\x7F]/g, "");
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
}