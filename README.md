Drawing Oxyz App
This is a simple and interactive drawing application built with HTML, CSS, and JavaScript. The app provides users with a canvas where they can draw, change pen colors, pen sizes, and background colors. Additionally, users can interact with the app using keyboard shortcuts, save their drawings, and clear the canvas.

Features
1. Draw on Canvas
Use the mouse to draw on the canvas.
The drawing will follow the mouse movements as long as the mouse button is pressed.
You can draw lines of different thicknesses and colors.
2. Change Pen Color
Users can select a pen color by clicking on one of the color buttons in the toolbar.
The available colors include red, green, blue, yellow, black, and white.
Additionally, users can input a custom hex color code for the pen color using an input box.
3. Change Pen Size
A slider allows the user to adjust the pen size (thickness) from 1 to 10.
The pen size will dynamically change as the user adjusts the slider.
4. Change Canvas Background Color
The background color of the canvas can be changed via a color picker.
Users can also input a custom hex color code for the background color.
By default, the canvas background is set to white (#ffffff).
5. Clear the Canvas
A "Clear" button allows the user to clear all drawings on the canvas.
When the canvas is cleared, the drawing history is also reset.
6. Save the Drawing
Users can save the drawing as an image (PNG format).
A "Save" button creates a downloadable link for the drawing in its current state.
7. Undo Drawing (Ctrl + Z)
Users can undo the last drawing action using the Ctrl+Z keyboard shortcut.
This action restores the canvas to its previous state before the last drawing action.
8. Copy Drawing (Ctrl + C)
Users can copy the current state of the canvas to the clipboard using the Ctrl+C keyboard shortcut.
The copied content is saved as an image in the clipboard, and can be pasted into other applications.
9. Paste Drawing (Ctrl + V)
Users can paste a previously copied image (from the clipboard) onto the canvas using the Ctrl+V keyboard shortcut.
The image will be rendered on the canvas in the current position.
10. Custom Color Input for Pen and Background
Users can input custom hex color codes for both the pen color and the canvas background color.
This allows more flexibility in choosing specific colors for the pen and background.
11. Responsive Layout
The app’s interface is designed to be simple and responsive.
The toolbar with tools and settings is placed on the left side of the canvas, ensuring easy access to all features without taking up too much space.
12. Cross-Browser Support
The app is built to work in modern web browsers that support HTML5, CSS3, and JavaScript.
How to Use
Open the app in a web browser.
Use the toolbar on the left to select the pen color, size, and the canvas background color.
Click on the canvas and drag to start drawing.
You can clear the canvas at any time by clicking the "Clear" button.
Save your drawing by clicking the "Save" button.
Use the keyboard shortcuts:
Ctrl+Z to undo the last drawing action.
Ctrl+C to copy the current canvas content.
Ctrl+V to paste a copied image onto the canvas.
Installation
To use this drawing app locally, follow these steps:

Download or clone the repository to your computer.
Open the index.html file in your web browser to start using the app.
bash
git clone https://github.com/your-username/drawing-app.git
cd drawing-app
open index.html
Technologies Used
HTML5
CSS3
JavaScript (ES6+)
License
This project is licensed under the MIT License - see the LICENSE file for details.

