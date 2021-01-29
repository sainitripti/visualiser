function openL1() {
  document.getElementById("preview-area").innerHTML = 
    `<div class="outer-container">
      <div id="axial-container" class="preview-container"></div>
      <div>Axial</div>
    </div>

    <div class="outer-container">
      <div id="coronal-container" class="preview-container"></div>
      <div>Coronal</div>
    </div>

    <div class="outer-container">
      <div id="sagittal-container" class="preview-container"></div>
      <div>Sagittal</div>
    </div>

    <div class="control-outer-container">
      <div id="axial-gui-container" class="gui-container"></div>
    </div>

    <div class="control-outer-container">
      <div id="coronal-gui-container" class="gui-container"></div>
    </div>

    <div class="control-outer-container">
      <div id="sagittal-gui-container" class="gui-container"></div>
    </div>`;

  document.getElementById("properties-sidebar-outer-container").innerHTML = 
  `<div class="TabbedPanel" id="properties-sidebar">
    <div class="Tabs">
      <span class="Tab selected" id="BoxGeometry">Box Geometry</span>
      <span class="Tab" id="Others">Others</span>
    </div>
    <div class="Panels">
      <div id="boxgeometry" style="">
        <span>
          <div class="Panel">
            <div class="Row">
              <span class="Text Heading">Box Dimensions</span>
            </div>
            <div class="Row">
              <span class="Text">Width</span>
              <input class="Input">
            </div>
            <div class="Row">
              <span class="Text">Height</span>
              <input class="Input">
            </div>
            <div class="Row">
              <span class="Text">Depth</span>
              <input class="Input">
            </div>
          </div>
          <div class="Panel">
            <div class="Row">
              <span class="Text Heading">Box Rotation</span>
            </div>
            <div class="Row">
              <span class="Text">X</span>
              <input class="Input">
            </div>
            <div class="Row">
              <span class="Text">Y</span>
              <input class="Input">
            </div>
            <div class="Row">
              <span class="Text">Z</span>
              <input class="Input">
            </div>
          </div>
          <div class="Panel">
            <div class="Row">
              <span class="Text Heading">Box Position</span>
            </div>
            <div class="Row">
              <span class="Text">X</span>
              <input class="Input">
            </div>
            <div class="Row">
              <span class="Text">Y</span>
              <input class="Input">
            </div>
            <div class="Row">
              <span class="Text">Z</span>
              <input class="Input">
            </div>
            <div class="Row">
              <button class="Button">Save</button>
            </div>
          </div>
        </span>
      </div>
      <div id="others" style="display: none;"></div>
    </div>
  </div>`;

  var script = document.createElement("script");
    script.type = "module";
    script.src = "src/axial.js";
    document.body.appendChild(script);

    script = document.createElement("script");
    script.type = "module";
    script.src = "src/coronal.js";
    document.body.appendChild(script);

    script = document.createElement("script");
    script.type = "module";
    script.src = "src/sagittal.js";
    document.body.appendChild(script);
}