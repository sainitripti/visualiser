import "../css/properties-sidebar.css";

export default class BoxGeometryPanel {

  constructor(box, id)
  {   
    this.id = id;
    this.width = box.width;
    this.height = box.height;
    this.depth = box.depth;
    this.widthSegments = box.widthSegments;
    this.heightSegments = box.heightSegments;
    this.depthSegments = box.depthSegments;
    this.rotateX = box.rotateX;
    this.rotateY = box.rotateY;
    this.rotateZ = box.rotateZ; 
    this.positionX = box.positionX;
    this.positionY = box.positionY;
    this.positionZ = box.positionZ;  
    
    this.loadBoxGeometry = this.loadBoxGeometry.bind(this);
    this.saveBoxGeometry = this.saveBoxGeometry.bind(this);
    this.render = this.render.bind(this);
  }

  loadBoxGeometry() {

  }

  saveBoxGeometry() {
    const fileData = JSON.stringify({
      "boxData" : {
        "width": this.width,
        "height": this.height,
        "depth": this.depth,
        "widthSegments": this.widthSegments,
        "heightSegments": this.heightSegments,
        "depthSegments": this.depthSegments,
        "rotateX": this.rotateX,
        "rotateY": this.rotateY,
        "rotateZ": this.rotateZ,
        "positionX": this.positionX,
        "positionY": this.positionY,
        "positionZ": this.positionZ
      }
    });
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'box.json';
    link.href = url;
    link.click();
  }

	render() {
    var boxGeometry = document.createElement("div");
    boxGeometry.id = "boxgeometry"+this.id;

    // Create a span child to this div
    var span = document.createElement("span");
    boxGeometry.appendChild(span);

    // Create a panel with box width, height and depth
    var panel = document.createElement("div");
    panel.className = "Panel";
    span.appendChild(panel);

    // Width row
    var row = document.createElement("div");
    row.className = "Row";
    panel.appendChild(row);


    var textHeading = document.createElement("span");
    textHeading.className = "Text";
    textHeading.classList.add("Heading");
    textHeading.innerHTML = "Box Dimensions";
    row.appendChild(textHeading);

    var text = document.createElement("span");
    text.className = "Text";
    text.innerHTML = "width";
    row.appendChild(text);

    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.className = "Input";
    input.id = "width" + this.id;
    input.value = this.width;
    row.appendChild(input);
    
    // Height row

    row = document.createElement("div");
    row.className = "Row";
    panel.appendChild(row);

    text = document.createElement("span");
    text.className = "Text";
    text.innerHTML = "height";
    row.appendChild(text);

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.className = "Input";
    input.id = "height" + this.id;
    input.value = this.height;
    row.appendChild(input);

    // Depth row

    row = document.createElement("div");
    row.className = "Row";
    panel.appendChild(row);

    text = document.createElement("span");
    text.className = "Text";
    text.innerHTML = "depth";
    row.appendChild(text);

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.className = "Input";
    input.id = "depth" + this.id;
    input.value = this.depth;
    row.appendChild(input);

    // Create a panel with box rotation along X axis, Y axis and Z axis
    panel = document.createElement("div");
    panel.className = "Panel";
    span.appendChild(panel);

    // ROtate X row
    row = document.createElement("div");
    row.className = "Row";
    panel.appendChild(row);

    textHeading = document.createElement("span");
    textHeading.className = "Text";
    textHeading.classList.add("Heading");
    textHeading.innerHTML = "Box Rotation";
    row.appendChild(textHeading);

    text = document.createElement("span");
    text.className = "Text";
    text.innerHTML = "x";
    row.appendChild(text);

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", 0);
    input.setAttribute("max", 360);
    input.className = "Input";
    input.id = "rotateX" + this.id;
    input.value = this.rotateX;
    row.appendChild(input);
    
    // Rotate Y row

    row = document.createElement("div");
    row.className = "Row";
    panel.appendChild(row);

    text = document.createElement("span");
    text.className = "Text";
    text.innerHTML = "y";
    row.appendChild(text);

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", 0);
    input.setAttribute("max", 360);
    input.className = "Input";
    input.id = "rotateY" + this.id;
    input.value = this.rotateY;
    row.appendChild(input);

    // Rotate Z row

    row = document.createElement("div");
    row.className = "Row";
    panel.appendChild(row);

    text = document.createElement("span");
    text.className = "Text";
    text.innerHTML = "z";
    row.appendChild(text);

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", 0);
    input.setAttribute("max", 360);
    input.className = "Input";
    input.id = "rotateZ" + this.id;
    input.value = this.rotateZ;
    row.appendChild(input);

    // Create a panel with box position along X axis, Y axis and Z axis
    panel = document.createElement("div");
    panel.className = "Panel";
    span.appendChild(panel);

    // Position X row
    row = document.createElement("div");
    row.className = "Row";
    panel.appendChild(row);

    textHeading = document.createElement("span");
    textHeading.className = "Text";
    textHeading.classList.add("Heading");
    textHeading.innerHTML = "Box Position";
    row.appendChild(textHeading);

    text = document.createElement("span");
    text.className = "Text";
    text.innerHTML = "x";
    row.appendChild(text);

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.className = "Input";
    input.id = "positionX" + this.id;
    input.value = this.positionX;
    row.appendChild(input);
    
    // Position Y row

    row = document.createElement("div");
    row.className = "Row";
    panel.appendChild(row);

    text = document.createElement("span");
    text.className = "Text";
    text.innerHTML = "y";
    row.appendChild(text);

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.className = "Input";
    input.id = "positionY" + this.id;
    input.value = this.positionY;
    row.appendChild(input);

    // Position Z row

    row = document.createElement("div");
    row.className = "Row";
    panel.appendChild(row);

    text = document.createElement("span");
    text.className = "Text";
    text.innerHTML = "z";
    row.appendChild(text);

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.className = "Input";
    input.id = "positionZ" + this.id;
    input.value = this.positionZ;
    row.appendChild(input);

    document.getElementById("lesson1-properties-sidebar-panel").appendChild(boxGeometry);
	}

}