indices = [];
    vertices = [];
    colors = [];
    sizes = [];
    uvs = [];
    radii = [];
    borders = [];

let r = 1, g = 0, b = 0, a = 1;
let radius = 0.1, border = 0.1;

addRectangle(
    x1, y1, x2, y2
    r, g, b, a,
    radius, border
);

function addRectangle(    
    x1, y1, x2, y2
    r, g, b, a,
    radius, border) {
    let ii = [0, 1, 2, 0, 2, 3];
    for (let k = 0; k < ii.length; k++) {
        indices.push(ii[k]);
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
}

let ii = [0, 1, 2, 0, 2, 3];
    indices = [];
    vertices = [];
    colors = [];
    sizes = [];
    uvs = [];
    radii = [];
    borders = [];
    for (let j = 0; j < 1; j++) {
        for (let k = 0; k < ii.length; k++) {
            indices.push(ii[k] + (j*4));
        }
        let x1 = 0;
        let y1 = 1;
        let x0 = 0;
        let y0 = -1;
        let ml = makeLine(x0, y0, x1, y1, 1);
        let vv = [
            ml[0], ml[1], 
            ml[2], ml[3],
            ml[6], ml[7],
            ml[4], ml[5],
        ];
        for (let k = 0; k < vv.length; k++) {
            vertices.push(vv[k]);
        }
        let w = Math.hypot((ml[0] - ml[2]), (ml[1] - ml[3]));
        let h = Math.hypot((ml[0] - ml[4]), (ml[1] - ml[5]));
        sizes.push(w, h, w, h, w, h, w, h);
        radii.push(0.1, 0.1, 0.1, 0.1);
        borders.push(0.1, 0.1, 0.1, 0.1);
        let cc = [
            0, 0, 1, 1
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
    }