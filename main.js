function main() {
  // get the element (id) from HTML
  // getCotext is for adding the library webGL into out code
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl");

  /*
    A ( 0.5, 0.5)
    B ( 0.0, 0.0)
    C ( -0.5, 0.5)

  */

  var vertices = [
    0.5, 0.0, 1.0, 0.0, 0.0,
    0.0, -0.5, 0.0, 1.0, 0.0,
    -0.5, 0.0, 0.0, 0.0 ,1.0,
    0.0, 0.5, 0.0, 0.0, 0.0,
  ]; // VERTICES

  // Create a linked-list for storing the vertices data in GPU realm
  var buffrer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffrer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // VERTEX SHADER
  var vertexShaderCode = `
  attribute vec2 aPosition;
  attribute vec3 aColor;
  uniform float uTheta;
  uniform float uDX;
  uniform float uDY;
  varying vec3 vColor;
  void main () {
    gl_PointSize = 15.0;
    vec2 position = vec2(aPosition);
    position.x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y;
    position.y = sin(uTheta) * aPosition.y + cos(uTheta) * aPosition.x;
    gl_Position = vec4(position, 0.0, 1.0);
    vColor = aColor;
  }
  `;


  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode); 
  gl.compileShader(vertexShader);

  var fragmentShaderCode = `
      precision mediump float; // useful practice
      varying vec3 vColor;
        void main () {
          gl_FragColor = vec4(vColor, 1.0);
        }
  `;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader); // After the shader program has been created
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);


  var theta = 0.0;
  var flag = false;
  var dX = 0.0;
  var dY = 0.0;
  function onMouseClick(event){
    flag = !flag;
  }

  function onKeydown(event){
    switch (event.keyCode){
      case 38: // UP
      direction = "up";
        break;

      case 40: // DOWN
      direction = "down";
        break;
        
      case 39: // RIGHT
      direction = "right";
        break;
      
      case 37: //LEFT
      direction = "left";
        break;

      default:
        break;
    }
  }
  function onKeyup(event){
    if (event.keyCode == 37) {
      flag = false;
    }
    direction = "";
  }
  document.addEventListener("click", onMouseClick);
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("keyup", onKeyup);


  // ! all qualifire
  var uTheta = gl.getUniformLocation(shaderProgram, "uTheta");
  var uDX = gl.getUniformLocation(shaderProgram, "uDX");
  var uDY = gl.getUniformLocation(shaderProgram, "uDY");
  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 *Float32Array.BYTES_PER_ELEMENT, 0);
  gl.enableVertexAttribArray(aPosition);

  // adding color
  var aColor = gl.getAttribLocation(shaderProgram, "aColor");
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 *Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(aColor);

function render() {
  gl.clearColor(1.0, 0.75, 0.79, 1.0); // adding a color background
  gl.clear(gl.COLOR_BUFFER_BIT);
  if(flag){
    theta += 0.01;
    gl.uniform1f(uTheta, theta);
  }
  switch (direction){
    case "up":
      dY -= 0.1;
      gl.uniform1f(uDY, dY);
    break;
    case "down":
      dY += 0.1;
      gl.uniform1f(uDY, dY);
    break;
    case "right":
      dX += 0.1;
      gl.uniform1f(uDX, dX);
    break;
    case "left":
      dX -= 0.1;
      gl.uniform1f(uDX, dX);
    break;
    default:
    break;

  }

  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
}
