var vertexShaderText = 
[
'precision mediump float;',
'attribute vec3 position;',
'attribute vec3 color;',
'varying vec3 vColor;',
'void main(){',
'  vColor = color;',
'  gl_Position = vec4(position, 1);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'varying vec3 vColor;',
'void main(){',
'  gl_FragColor = vec4(vColor, 1);',
'}'
].join('\n');

const main = function() {
    console.log('Start javascript..');

    //Init WebGL
    let canvas = document.getElementById('canvas-surface');
    let gl = canvas.getContext('webgl');

    if(!gl){
        console.log('WebGL Experimental');
        gl = canvas.getContext('experimental-webgl');
    }
    if(!gl){
        alert('Your Browser doesn\'t support WebGl ¯\_(ツ)_/¯');
    }

    gl.clearColor(0.85, 1, 0.95, 1.0)
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    //Vertex Datas
    const vertexData = [
         0, -1,  0,  //v1
        -1,  1,  0,  //v2
         1,  1,  0   //v3
    ];

    const colorData = [
        1,  0,  0,  //v1.color
        0,  1,  0,  //v2.color
        0,  0,  1   //v3.color
   ];

    //Buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

    //Shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    gl.compileShader(fragmentShader);

    //Program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    //
    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    const colorLocation = gl.getAttribLocation(program, `color`);
    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);





}
main();