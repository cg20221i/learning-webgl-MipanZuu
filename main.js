function main() {
  // get the element (id) from HTML
  // getCotext is for adding the library webGL into out code
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("experimental-webgl");

  /*
    A ( 0.5, 0.5)
    B ( 0.0, 0.0)
    C ( -0.5, 0.5)

  */

  var vertices = [0.5, 0.5, 0.0, 0.0, -0.5, 0.5, 0.0, 0.8]; // VERTICES

  // Create a linked-list for storing the vertices data in GPU realm
  var buffrer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffrer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // VERTEX SHADER
  var vertexShaderCode = `
  attribute vec2 aPosition;
  uniform float uTheta;
  void main () {
    gl_PointSize = 15.0;  // adding size of point
    vec2 position = vec2(aPosition)
    position.x = -sin(uTheta) * position.x + cos(uTheta) * position.y;
    position.y = sin(uTheta) * position.x + cos(uTheta) * position.y;
    gl_Position = vec4(aPosition, 0.0, 1.0);
    // is the final destination for storing
    // positional data for the rendered vertex
  }
  `;

  // Create shader to vertext shader
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode); // passing Shader from CPU to GPU
  gl.compileShader(vertexShader);

  // FRAGMENT SHADER
  var fragmentShaderCode = `
      precision mediump float; // useful practice

        void main () {
          // final color for (they need to render in particular fragment) fev1/fec2 dll is for vector
          // final destinarion for storing 
          gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        }
  `;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  // Comparing to C programming, we my imagine
  // that up to this step we have created two
  // object files (.o) for the vertex and fragment shader

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader); // After the shader program has been created
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);


  var theta = 0.0;
  // ! all qualifire
  var uTheta = gl.getUniformLocation(shaderProgram, "UTheta");

  // Teach the GPU how to collect the potitional values from ARRAY_BUFFER
  // for each vertex being processed
  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);



  function render() {
  gl.clearColor(1.0, 0.75, 0.79, 1.0); // adding a color background

  gl.clear(gl.COLOR_BUFFER_BIT);

  theta += 0.1;
  gl.uniform1f(uTheta, theta);

  // draw the canvas using drawArrays
  // glPOINTS (Assembly)
  gl.drawArrays(gl.TRIANGLES_FAN, 0, 4);
  // LINES = only 1 line
  // LINE_LOOP = loop to the first coordinate
  // LINE_STRIP = not looping to the first loop
  // TRIANGLES =  draw tiriangles
  // TRIANGLES_STRIP, TRIANGLES_LOOP etc
  // TRIANGLES_FAN = draw a fan
  }
  setInterval(render, 1000/60);
}
