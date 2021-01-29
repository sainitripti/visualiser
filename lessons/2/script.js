function openL2() {
  document.getElementById("preview-area").innerHTML = 
    `<div class="outer-container">
        <div id="container" class="preview-container"></div>
        <div>Generic</div>
      </div>

      <div class="control-outer-container">
        <div id="gui-container" class="gui-container"></div>
      </div>`;

  var script = document.createElement("script");
    script.type = "module";
    script.src = "src/index.js";
    document.body.appendChild(script);

}
