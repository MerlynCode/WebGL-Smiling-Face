# WebGL Smiling Face Drawing

The goal of this program is to draw a picture of smiling face using WebGL API.

## Input

The program doesn’t take any input.

## Output

The program doesn’t give any output value.

## Description

First, the program gets a reference to the canvas element and its WebGL rendering context. Next, a buffer is created and bound to the ARRAY_BUFFER. The generateArc function is defined to generate points for an arc. This function takes the center coordinates, radius, start and end angles, number of points, and scale factor for the x-coordinate as parameters. Once the points for the eyebrows, nose, and lips are generated using the generateArc, they are concatenated into a single array and stored in the buffer using the bufferData method. The code then creates a simple shader program. Lastly, the code draws the eyebrows, nose, and lips using the drawArrays method. The color of each part is set using the uniform4f method before drawing.

### [Webpage](https://merlyncode.github.io/WebGL-Smiling-Face/)
