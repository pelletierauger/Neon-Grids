let looping = false;
let grimoire = false;
let tabsLoaded = false;
let gr;
let mode = 0;
let keysActive = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";
let JSONs = [];
let maxFrames = 20;
let gl, shaderProgram;
let vertices = [];
let colors = [];
let indices = [];
let amountOfLines = 0;
let drawCount = 0;
let dotsVBuf;
let termVBuf, dotsCBuf;
const openSimplex = openSimplexNoise(10);
let fmouse = [0, 0];
let pmouse = [0, 0];
let smouse = [0, 0];
let resolutionScalar = 0.5;
let resolutionBG;


let texture, texture2, framebuf, framebuf2;
// ------------------------------------------------------------
// Grimoire Animate
// ------------------------------------------------------------

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;
var animationStart;
var framesRendered = 0;
var framesOfASecond = 0;
var secondStart, secondFrames;
var fps = 24;
var envirLooping = false;

startAnimating = function() {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animationStart = Date.now();
    secondStart = Date.now();
    startTime = then;
    framesRendered = 0;
    envirLooping = true;
    animate();
}

function queryFrameRate() {
    let timeElapsed = Date.now() - animationStart;
    let seconds = timeElapsed / 1000;
    logJavaScriptConsole(framesRendered / seconds);
    // logJavaScriptConsole(timeElapsed);
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {

    // request another frame
    if (envirLooping) {

        requestAnimationFrame(animate);


        // calc elapsed time since last loop

        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);
            // Put your drawing code here
            draw();
            framesRendered++;
            framesOfASecond++;
            if (framesOfASecond == fps) {
                secondFrames = fps / ((Date.now() - secondStart) * 0.001);
                // logJavaScriptConsole(secondFrames);
                framesOfASecond = 0;
                secondStart = Date.now();
            }
        }
    }
}

function setup() {
    socket = io.connect('http://localhost:8080');
    pixelDensity(1);
    noCanvas();
    cnvs = document.getElementById('my_Canvas');
    gl = cnvs.getContext('webgl', { preserveDrawingBuffer: true });
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);
    // gl.colorMask(true, true, true, true);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // Set the view port
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    dotsVBuf = gl.createBuffer();
    dotsCBuf = gl.createBuffer();
    termVBuf = gl.createBuffer();
    shadersReadyToInitiate = true;
    initializeShaders();
        texture = createTexture();
    framebuf = createFrameBuffer(texture);
    texture2 = createTexture();
    framebuf2 = createFrameBuffer(texture2);
    setTimeout(function() {
        scdConsoleArea.setAttribute("style", "display:block;");
        scdArea.style.display = "none";
        scdConsoleArea.setAttribute("style", "display:none;");
        jsCmArea.style.height = "685px";
        jsArea.style.display = "block";
        displayMode = "js";
        javaScriptEditor.cm.refresh();
    }, 1);
    setTimeout( function() {
        keysControl.addEventListener("mouseenter", function(event) {
            document.body.style.cursor = "none";
            document.body.style.backgroundColor = "#000000";
            appControl.setAttribute("style", "display:none;");
            let tabs = document.querySelector("#file-tabs");
            tabs.setAttribute("style", "display:none;");
            cinemaMode = true;
            scdArea.style.display = "none";
            scdConsoleArea.style.display = "none";
            jsArea.style.display = "none";
            jsConsoleArea.style.display = "none";
        }, false);
        keysControl.addEventListener("mouseleave", function(event) {
            if (!grimoire) {
                document.body.style.cursor = "default";
                document.body.style.backgroundColor = "#1C1C1C";
                appControl.setAttribute("style", "display:block;");
                let tabs = document.querySelector("#file-tabs");
                tabs.setAttribute("style", "display:block;");
                // let slider = document.querySelector("#timeline-slider");
                // slider.setAttribute("style", "display:block;");
                // slider.style.display = "block";
                // canvasDOM.style.bottom = null;
                if (displayMode === "both") {
                    scdArea.style.display = "block";
                    scdConsoleArea.style.display = "block";
                    jsArea.style.display = "block";
                    jsConsoleArea.style.display = "block";
                } else if (displayMode == "scd") {
                    scdArea.style.display = "block";
                    scdConsoleArea.style.display = "block";
                } else if (displayMode == "js") {
                    jsArea.style.display = "block";
                    jsConsoleArea.style.display = "block";
                }
                cinemaMode = false;
                clearSelection();
            }   
        }, false);
    }, 1);
    frameRate(30);
    if (!looping) {
        noLoop();
    }
}

draw = function() {
    bindFrameBuffer(texture, framebuf);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    resetRectangles();
    let w = 16/9;
    let r = 1, g = 0, b = 0.25, a = 1;
    let radius = 0.15, border = 0.15;
    let n = 1, m = 3;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let x1 = w/(n/2)*i-(w);
            let x2 = w/(n/2)*(i+1)-w;
            let y1 = 1/(m/2)*j-(1);
            let y2 = 1/(m/2)*(j+1)-1;
            addRectangle(
                x1, y1, x2, y2,
                r, g, b, a,
                radius, border
            );
        }
    }
    currentProgram = getProgram("neon-rectangle");
    gl.useProgram(currentProgram);
    drawRectangles();
    currentProgram = getProgram("smooth-dots");
    gl.useProgram(currentProgram);
    drawAlligatorQuiet(currentProgram);
    currentProgram = getProgram("rounded-square-2");
    gl.useProgram(currentProgram);
    drawText(currentProgram);
    // ------------------------------
    currentProgram = getProgram("rounded-square");
    time = gl.getUniformLocation(currentProgram, "time"); 
    disturb = gl.getUniformLocation(currentProgram, "disturb"); 
    gl.useProgram(currentProgram);
    drawTerminal(currentProgram);
printTexture();
    drawCount++;
    if (exporting && frameCount < maxFrames) {
        frameExport();
    }
}

function makeLine(x0, y0, x1, y1, w) {
    let a0 = Math.atan2(y1 - y0, x1 - x0);
    let halfPI = Math.PI * 0.5;
    let c0 = Math.cos(a0 + halfPI) * w;
    let c1 = Math.cos(a0 - halfPI) * w;
    let s0 = Math.sin(a0 + halfPI) * w;
    let s1 = Math.sin(a0 - halfPI) * w;
    let xA = x0 + c0;
    let yA = y0 + s0;
    let xB = x0 + c1;
    let yB = y0 + s1;
    let xC = x1 + c0;
    let yC = y1 + s0;
    let xD = x1 + c1;
    let yD = y1 + s1;
    return [xA, yA, xB, yB, xC, yC, xD, yD];
}

function rotate(p, a) {
    return [
        p.x * a.y + p.y * a.x,
        p.y * a.y - p.x * a.x
    ];
}
// let rotateAngle = {x: Math.cos(frameCount * 1e-2), y: Math.sin(frameCount * 1e-2)};
// for (let i = 0; i < vertices.length; i += 3) {
//     let newPos = rotate({x: vertices[i], y: vertices[i+1]}, rotateAngle);
//     vertices[i] = newPos[0];
//     vertices[i+1] = newPos[1];
// }

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
        // if (key == 'p' || key == 'P') {
        //     frameExport();
        // }
        // if (key == 'r' || key == 'R') {
        //     window.location.reload();
        // }
        // if (key == 'm' || key == 'M') {
        //     redraw();
        // }
    }
}

tl = function(d = 0) {
    setTimeout(function() {
                if (envirLooping) {
                // noLoop();
                envirLooping = false;
            } else {
                envirLooping = true;
                startAnimating();
            }
    }, d * 1e3);
};

gr = function() {
    grimoire = !grimoire;
}

function addRectangle(    
    x1, y1, x2, y2,
    r, g, b, a,
    radius, border) {
    let ii = [0, 1, 2, 0, 2, 3];
    for (let k = 0; k < ii.length; k++) {
        indices.push(ii[k]+(amountOfRectangles*4));
    }
    let vv = [
        x1, y1, 
        x2, y1,
        x2, y2,
        x1, y2,
    ];
    for (let k = 0; k < vv.length; k++) {
        vertices.push(vv[k]);
    }
    let w = Math.hypot((x1 - x2), (y1 - y1));
    let h = Math.hypot((x1 - x1), (y1 - y2));
    sizes.push(w, h, w, h, w, h, w, h);
    radii.push(radius, radius, radius, radius);
    borders.push(border, border, border, border);
    let cc = [
        r, g, b, a
    ];        
    let uv = [
        0, 0, 
        1, 0, 
        1, 1, 
        0, 1
    ];
    for (let k = 0; k < cc.length * 4; k++) {
        colors.push(cc[k % (cc.length)]);
    }
    for (let k = 0; k < uv.length; k++) {
        uvs.push(uv[k]);
    }
    amountOfRectangles++;
}

function resetRectangles() {
    amountOfRectangles = 0;
    indices = [];
    vertices = [];
    colors = [];
    sizes = [];
    uvs = [];
    radii = [];
    borders = [];
}

function drawRectangles() {
        var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // Create an empty buffer object and store Index data
    var Index_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    // Create an empty buffer object and store Index data
    var sizes_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizes_Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sizes), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // Create an empty buffer object and store color data
    var color_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    var uv_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uv_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW); 
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    var radii_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, radii_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(radii), gl.STATIC_DRAW);  
    var borders_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, borders_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(borders), gl.STATIC_DRAW);
    setShaders();
    /* ======== Associating shaders to buffer objects =======*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Bind index buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, sizes_Buffer);
    // Get the attribute location
    var sizesAttribLocation = gl.getAttribLocation(shaderProgram, "size");
    // point an attribute to the currently bound VBO
    gl.vertexAttribPointer(sizesAttribLocation, 2, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(sizesAttribLocation);
    // bind the color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    // get the attribute location
    var color = gl.getAttribLocation(shaderProgram, "color");
    // point attribute to the volor buffer object
    gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);
    // enable the color attribute
    gl.enableVertexAttribArray(color);
    gl.bindBuffer(gl.ARRAY_BUFFER, uv_buffer);
    var uvAttribLocation = gl.getAttribLocation(shaderProgram, "uv");
    // point attribute to the volor buffer object
    gl.vertexAttribPointer(uvAttribLocation, 2, gl.FLOAT, false, 0, 0);
    // enable the color attribute
    gl.enableVertexAttribArray(uvAttribLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, radii_buffer);    
    var radiusAttribLocation = gl.getAttribLocation(shaderProgram, "radius");
    // point attribute to the volor buffer object
    gl.vertexAttribPointer(radiusAttribLocation, 1, gl.FLOAT, false, 0, 0);
    // enable the color attribute
    gl.enableVertexAttribArray(radiusAttribLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, borders_buffer);    
    var borderAttribLocation = gl.getAttribLocation(shaderProgram, "border");
    // point attribute to the volor buffer object
    gl.vertexAttribPointer(borderAttribLocation, 1, gl.FLOAT, false, 0, 0);
    // enable the color attribute
    gl.enableVertexAttribArray(borderAttribLocation);
    // Managing uniforms
    timeUniformLocation = gl.getUniformLocation(shaderProgram, "time");
    gl.uniform1f(timeUniformLocation, frameCount);
    resolutionUniformLocation = gl.getUniformLocation(shaderProgram, "resolution");
    gl.uniform2f(resolutionUniformLocation, cnvs.width, cnvs.height);
    // Draw
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

drawAlligatorQuiet = function(selectedProgram) {
    vertices = [];
    num=0;
    let al = 0.3;
    for (let i = 0; i < 2500; i++) {
        let x = Math.cos(i + Math.sin(i + drawCount * 1e-2 + Math.PI)) * i * 0.001;
        let y = Math.sin(i + Math.sin(i + drawCount * 1e-2 + Math.PI)) * i * 0.001;
        vertices.push(x * (9 / 16), y);
        num++;
    }
    sides = 3;
    inc = (Math.PI * 2) / sides;
    st = -drawCount * 1e-2;
    for (let i = st; i <= (Math.PI * 2.1) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let p1 = [Math.cos(i + inc), Math.sin(i + inc)];
        for (let p = 0; p < 1; p += 0.01) {
            let x = lerp(p0[0], p1[0], p) * 0.5;
            let y = lerp(p0[1], p1[1], p) * 0.5;
            vertices.push(x * (9 / 16), y);
            num++;
        }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsVBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(selectedProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, num);
}

drawAlligatorQuiet = function(selectedProgram) {
    vertices = [];
    num=0;
    let al = 0.3;
    for (let i = 0; i < 1500; i++) {
        let x = Math.cos(i - drawCount) * i * 0.001;
        let y = Math.sin(i - drawCount) * i * 0.001;
        vertices.push(x * (9 / 16), y);
        num++;
    }
    sides = 3;
    inc = (Math.PI * 2) / sides;
    st = -drawCount * 1e-2;
    for (let i = st; i <= (Math.PI * 2.1) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let p1 = [Math.cos(i + inc), Math.sin(i + inc)];
        for (let p = 0; p < 1; p += 0.01) {
            let x = lerp(p0[0], p1[0], p) * 0.5;
            let y = lerp(p0[1], p1[1], p) * 0.5;
            vertices.push(x * (9 / 16), y);
            num++;
        }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsVBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(selectedProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, num);
}

drawText = function(selectedProgram) {
    vertices = [];
    let num = 0;
    let colors = [];
    let s = "La Constellation de l'Alligator";
    // s = s.substring(0, map(Math.sin(drawCount * 2e-1), -1, 1, 0, 25));
    twd = new Text(s);
    for (let x = 0; x <= twd.glyphArray[0].length; x++) {
        for (let y = 0; y < 9; y++) {
            if (twd.glyphArray[y][x] == "1") {
                vertices.push(x*0.02*(9/16)*(3/5)-0.72, -y*0.02+0.75, 40.0, 1.0);
                colors.push(1, 0, 0.2);
                num++;
            }
        }
    }
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, termVBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 4, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsCBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    // Get the attribute location
    var cols = gl.getAttribLocation(selectedProgram, "colors");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(cols, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(cols);
    let timeUniformLocation = gl.getUniformLocation(selectedProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, num);
}

setTabs = function() {

};

printTexture = function() {
       gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    // 
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 
    gl.clearColor(0, 0, 0, 1); // clear to white
    // 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // 
    var textureShader = getProgram("textu");
    gl.useProgram(textureShader);
    // 
    aspect = cnvs.width / cnvs.height;
    let vertices = new Float32Array([-1, 1, 1, 1, 1, -1, // Triangle 1
        -1, 1, 1, -1, -1, -1 // Triangle 2
    ]);
    vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    itemSize = 2;
    numItems = vertices.length / itemSize;
    let positionAttribLocation = gl.getAttribLocation(textureShader, "a_position");
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.vertexAttribPointer(positionAttribLocation, itemSize, gl.FLOAT, false, 0, 0);
    // 
    var textureLocation = gl.getUniformLocation(textureShader, "u_texture");
    gl.uniform1i(textureLocation, 0);
    var timeLocation = gl.getUniformLocation(textureShader, "time");
    gl.uniform1f(timeLocation, drawCount * 0.01);
    // 
    var scalar = gl.getUniformLocation(textureShader, "resolution");
    gl.uniform1f(scalar, resolutionScalar);
    // 
    var texcoordLocation = gl.getAttribLocation(textureShader, "a_texcoord");
    gl.enableVertexAttribArray(texcoordLocation);
    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);
    gl.drawArrays(gl.TRIANGLES, 0, numItems);
};

keyDown = function(e) {
    if (keysActive) {
        if (ge.recording) {
            ge.recordingSession.push([drawCount, {
                name: "keyDown",
                key: e.key,
                keyCode: e.keyCode,
                altKey: e.altKey,
                metaKey: e.metaKey,
                shiftKey: e.shiftKey
            }]);
        }
        // console.log(event.keyCode);
        if (e.keyCode == 27 && ge.activeTab !== null) {
            mode = (mode + 1) % 3;
        }
        if (mode == 0) {
                if (vtActive) {
                    vt.update(e);
                    // ljs(event.keyCode);
                }
            updateDrawing(e);
        } else if (mode == 1) {
            ge.update(e);
        } else if (mode == 2) {
            paintingKeys(e);
        }
    }
}

document.onkeydown = keyDown; 