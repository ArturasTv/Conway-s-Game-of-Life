import p5 from "p5";
import sketch from "./sketch";
import "./style.css";

const sketchHtmlElement = document.getElementById("sketch");

if (!sketchHtmlElement) {
	throw "Sketch not found";
}

new p5(sketch, sketchHtmlElement);
