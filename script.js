// Get the canvas and WebGL context
var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

// Set the clear color to a darker green
gl.clearColor(0.0, 0.39, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Create a buffer for the points
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// Function to generate points for an arc
function generateArc(centerX, centerY, radius, startAngle, endAngle, numPoints, scaleX) {
    var points = [];
    var angleStep = (endAngle - startAngle) / (numPoints - 1);
    for (var i = 0; i < numPoints; i++) {
      var angle = startAngle + i * angleStep;
      points.push(centerX + radius * Math.cos(angle) * scaleX); // Scale the x-coordinate
      points.push(centerY + radius * Math.sin(angle));
    }
    return points;
  }

// Generate points for the eyebrows, nose, and lips
var leftEyebrow = generateArc(-0.20, 0.05, 0.1, 0, Math.PI, 50, 1.25);
var rightEyebrow = generateArc(0.20, 0.05, 0.1, 0, Math.PI, 50, 1.25);
var nose = [0.0, 0.0, 0.0, -0.1];
var lips = generateArc(0.0, -0.15, 0.1, Math.PI, 2 * Math.PI, 50, 1.25);

var vertices = [].concat(leftEyebrow, rightEyebrow, nose, lips);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Create a simple shader program
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    gl_PointSize = 15.0; // Set the point size here
  }
`);
gl.compileShader(vertexShader);

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
  precision mediump float;
  uniform vec4 u_color;
  void main() {
    gl_FragColor = u_color;
  }
`);
gl.compileShader(fragmentShader);

var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// Use the shader program and bind the buffer
gl.useProgram(program);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// Get the position location and enable it
var positionLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionLocation);

// Point the position attribute to the buffer
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Get the color uniform location
var colorLocation = gl.getUniformLocation(program, 'u_color');

// Draw the left eyebrow
gl.uniform4f(colorLocation, 0.0, 0.0, 1.0, 1.0); // Blue
gl.drawArrays(gl.LINE_STRIP, 0, leftEyebrow.length / 2);

// Draw the right eyebrow
gl.uniform4f(colorLocation, 0.0, 0.0, 1.0, 1.0); // Blue
gl.drawArrays(gl.LINE_STRIP, leftEyebrow.length / 2, rightEyebrow.length / 2);

// Draw the nose
gl.uniform4f(colorLocation, 0.0, 0.0, 0.0, 1.0); // Black
gl.drawArrays(gl.LINES, (leftEyebrow.length + rightEyebrow.length) / 2, nose.length / 2);

// Draw the lips
gl.uniform4f(colorLocation, 1.0, 0.0, 0.0, 1.0); // Red
gl.drawArrays(gl.LINE_STRIP, (leftEyebrow.length + rightEyebrow.length + nose.length) / 2, lips.length / 2);