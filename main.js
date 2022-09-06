function main() {
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("experimental-webgl");

  // VERTEX SHADER
  var vertexShaderCode = "void main () {" + "}";

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  // FRAGMENT SHADER
  var fragmentShaderCode = `
        void main () {

        }
  `;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  // Comparing to C programming, we my imagine
  // that up to this step we have created two
  // object files (.o) for the vertex and fragment shader

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  gl.clearColor(1.0, 0.75, 0.79, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);
}
