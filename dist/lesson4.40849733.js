// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateGeometry = generateGeometry;
exports.sagittalCube = exports.coronalCube = exports.axialCube = exports.cube = exports.material = exports.geometry = exports.boxData = exports.colors = exports.annotation = exports.file4 = exports.file = void 0;
//export const file = 'https://cdn.rawgit.com/FNNDSC/data/master/nifti/adi_brain/adi_brain.nii.gz';
//export const file = '..//data//adi_brain.nii.gz';
var file = 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/adi_brain.nii.gz';
exports.file = file;
var file4 = 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/training_sa_crop_pat0_transformed.nii.gz';
exports.file4 = file4;
var annotation = 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/pat10.nii.gz';
exports.annotation = annotation;
var colors = {
  red: 0xff0000,
  lightGrey: 0xffffff
};
exports.colors = colors;
var boxData = {
  width: 50,
  height: 50,
  depth: 50,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  positionX: 0,
  positionY: 0,
  positionZ: 0
};
/*
fetch("..//data//box.json")
.then(response => {
   return response.json();
})
.then(data => {
  boxData = data["boxData"];
  gui();
  generateGeometry();
});
*/

exports.boxData = boxData;
var geometry = new THREE.BoxGeometry(1, 1, 1);
exports.geometry = geometry;
var material = new THREE.MeshBasicMaterial({
  transparent: true,
  color: 0xff0000,
  opacity: 0.5,
  side: THREE.DoubleSide,
  wireframe: true
});
exports.material = material;
var cube = new THREE.Mesh(geometry, material);
exports.cube = cube;
var axialCube = new THREE.Mesh(geometry, material);
exports.axialCube = axialCube;
var coronalCube = new THREE.Mesh(geometry, material);
exports.coronalCube = coronalCube;
var sagittalCube = new THREE.Mesh(geometry, material);
exports.sagittalCube = sagittalCube;
var arrCube = [cube, axialCube, coronalCube, sagittalCube];

function generateGeometry() {
  arrCube.forEach(function (element) {
    element.geometry.dispose();
    element.geometry = new THREE.BoxGeometry(boxData.width, boxData.height, boxData.depth, boxData.widthSegments, boxData.heightSegments, boxData.depthSegments);
    element.rotation.x = boxData.rotateX;
    element.rotation.y = boxData.rotateY;
    element.rotation.z = boxData.rotateZ;
    element.position.x = boxData.positionX;
    element.position.y = boxData.positionY;
    element.position.z = boxData.positionZ;
  });
}

function gui() {
  var gui = new dat.GUI({
    autoPlace: false
  });
  var customContainer = document.getElementById('main-gui-container');
  customContainer.appendChild(gui.domElement);
  var boxFolder = gui.addFolder('Box Geometry');
  boxFolder.add(boxData, 'width', 1, 100).onChange(generateGeometry);
  boxFolder.add(boxData, 'height', 1, 100).onChange(generateGeometry);
  boxFolder.add(boxData, 'depth', 1, 100).onChange(generateGeometry);
  boxFolder.add(boxData, 'widthSegments', 1, 10).step(1).onChange(generateGeometry);
  boxFolder.add(boxData, 'heightSegments', 1, 10).step(1).onChange(generateGeometry);
  boxFolder.add(boxData, 'depthSegments', 1, 10).step(1).onChange(generateGeometry);
  boxFolder.add(boxData, 'rotateX', 0, 360).onChange(generateGeometry);
  boxFolder.add(boxData, 'rotateY', 0, 360).onChange(generateGeometry);
  boxFolder.add(boxData, 'rotateZ', 0, 360).onChange(generateGeometry);
  boxFolder.add(boxData, 'positionX', -100, 100).onChange(generateGeometry);
  boxFolder.add(boxData, 'positionY', -100, 100).onChange(generateGeometry);
  boxFolder.add(boxData, 'positionZ', -100, 100).onChange(generateGeometry);
  boxFolder.open();
}

;
},{}],"src/js/LessonFourPreviewCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LessonFourPreviewCard = /*#__PURE__*/function () {
  function LessonFourPreviewCard(id, guiId, stackHelperOrientation, cameraZoomInFactor, cameraOrientation) {
    _classCallCheck(this, LessonFourPreviewCard);

    this.id = id;
    this.guiId = guiId;
    this.cube = new THREE.Mesh(_utils.geometry, _utils.material);
    this.stackHelperOrientation = stackHelperOrientation;
    this.cameraZoomInFactor = cameraZoomInFactor;
    this.cameraOrientation = cameraOrientation;
  }

  _createClass(LessonFourPreviewCard, [{
    key: "generateGeometry",
    value: function generateGeometry(box) {
      this.cube.scale.x = box.width;
      this.cube.scale.y = box.height;
      this.cube.scale.z = box.depth;
      this.cube.rotation.x = box.rotateX * 0.01745329; // degree to radians

      this.cube.rotation.y = box.rotateY * 0.01745329;
      this.cube.rotation.z = box.rotateZ * 0.01745329;
      this.cube.position.x = box.positionX;
      this.cube.position.y = box.positionY;
      this.cube.position.z = box.positionZ;
    }
  }, {
    key: "run",
    value: function run() {
      var _this = this;

      // Setup renderer
      var container = document.getElementById(this.id);
      var renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setClearColor(_utils.colors.lightGrey, 1);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement); // Create scene

      var scene = new THREE.Scene();
      scene.add(this.cube); // Camera

      var camera = new AMI.OrthographicCamera(container.clientWidth / -2, container.clientWidth / 2, container.clientHeight / 2, container.clientHeight / -2, 0.1, 10000); // Setup controls

      var controls = new AMI.TrackballOrthoControl(camera, container);
      controls.staticMoving = true;
      controls.noRotate = true;
      camera.controls = controls; // Resize canvas when the window resizes

      var onWindowResize = function onWindowResize() {
        camera.canvas = {
          width: container.offsetWidth,
          height: container.offsetHeight
        };
        camera.fitBox(2);
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      };

      window.addEventListener('resize', onWindowResize, false); // Load image data

      var loader = new AMI.VolumeLoader(container);
      loader.load(_utils.file4).then(function () {
        var series = loader.data[0].mergeSeries(loader.data);
        var stack = series[0].stack[0];
        loader.free();
        var stackHelper = new AMI.StackHelper(stack);
        stackHelper.bbox.visible = false;
        stackHelper.border.color = _utils.colors.red;
        stackHelper.orientation = Number(_this.stackHelperOrientation);
        scene.add(stackHelper);
        gui(stackHelper); // center camera and interactor to center of bouding box
        // for nicer experience
        // set camera

        var worldbb = stack.worldBoundingBox();
        var lpsDims = new THREE.Vector3(worldbb[1] - worldbb[0], worldbb[3] - worldbb[2], worldbb[5] - worldbb[4]);
        var box = {
          center: stack.worldCenter().clone(),
          halfDimensions: new THREE.Vector3(lpsDims.x - _this.cameraZoomInFactor, lpsDims.y - _this.cameraZoomInFactor, lpsDims.z - _this.cameraZoomInFactor)
        }; // init and zoom

        var canvas = {
          width: container.clientWidth,
          height: container.clientHeight
        };
        camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
        camera.box = box;
        camera.canvas = canvas;
        camera.orientation = _this.cameraOrientation;
        camera.update();
        camera.fitBox(2);
      }).catch(function (error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
      });

      var animate = function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(function () {
          animate();
        });
      };

      animate(); // GUI

      var gui = function gui(stackHelper) {
        var gui = new dat.GUI({
          autoPlace: false
        });
        var customContainer = document.getElementById(_this.guiId);
        customContainer.appendChild(gui.domElement);
        var camUtils = {
          invertRows: false,
          invertColumns: false,
          rotate45: false,
          rotate: 0,
          orientation: 'axial',
          convention: 'radio'
        }; // camera

        var cameraFolder = gui.addFolder('Camera');
        var invertRows = cameraFolder.add(camUtils, 'invertRows');
        invertRows.onChange(function () {
          camera.invertRows();
        });
        var invertColumns = cameraFolder.add(camUtils, 'invertColumns');
        invertColumns.onChange(function () {
          camera.invertColumns();
        });
        var rotate45 = cameraFolder.add(camUtils, 'rotate45');
        rotate45.onChange(function () {
          camera.rotate();
        });
        cameraFolder.add(camera, 'angle', 0, 360).step(1).listen();
        var conventionUpdate = cameraFolder.add(camUtils, 'convention', ['radio', 'neuro']);
        conventionUpdate.onChange(function (value) {
          camera.convention = value;
          camera.update();
          camera.fitBox(2);
        });
        var stackFolder = gui.addFolder('Stack');
        stackFolder.add(stackHelper, 'index', 0, stackHelper.stack.dimensionsIJK.z - 1).step(1).listen();
        stackFolder.add(stackHelper.slice, 'interpolation', 0, 1).step(1).listen();
      };
    }
  }]);

  return LessonFourPreviewCard;
}();

exports.default = LessonFourPreviewCard;
},{"../utils.js":"src/utils.js"}],"src/css/properties-sidebar.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/js/BoxGeometryPanel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../css/properties-sidebar.css");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BoxGeometryPanel = /*#__PURE__*/function () {
  function BoxGeometryPanel(box, id) {
    _classCallCheck(this, BoxGeometryPanel);

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

  _createClass(BoxGeometryPanel, [{
    key: "loadBoxGeometry",
    value: function loadBoxGeometry() {}
  }, {
    key: "saveBoxGeometry",
    value: function saveBoxGeometry() {
      var fileData = JSON.stringify({
        "boxData": {
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
      var blob = new Blob([fileData], {
        type: "text/plain"
      });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.download = 'box.json';
      link.href = url;
      link.click();
    }
  }, {
    key: "render",
    value: function render() {
      var boxGeometry = document.createElement("div");
      boxGeometry.id = "boxgeometry" + this.id; // Create a span child to this div

      var span = document.createElement("span");
      boxGeometry.appendChild(span); // Create a panel with box width, height and depth

      var panel = document.createElement("div");
      panel.className = "Panel";
      span.appendChild(panel); // Width row

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
      row.appendChild(input); // Height row

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
      row.appendChild(input); // Depth row

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
      row.appendChild(input); // Create a panel with box rotation along X axis, Y axis and Z axis

      panel = document.createElement("div");
      panel.className = "Panel";
      span.appendChild(panel); // ROtate X row

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
      row.appendChild(input); // Rotate Y row

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
      row.appendChild(input); // Rotate Z row

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
      row.appendChild(input); // Create a panel with box position along X axis, Y axis and Z axis

      panel = document.createElement("div");
      panel.className = "Panel";
      span.appendChild(panel); // Position X row

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
      row.appendChild(input); // Position Y row

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
      row.appendChild(input); // Position Z row

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
      document.getElementById("properties-sidebar-panel").appendChild(boxGeometry);
    }
  }]);

  return BoxGeometryPanel;
}();

exports.default = BoxGeometryPanel;
},{"../css/properties-sidebar.css":"src/css/properties-sidebar.css"}],"src/js/lesson4.js":[function(require,module,exports) {
"use strict";

var _LessonFourPreviewCard = _interopRequireDefault(require("./LessonFourPreviewCard.js"));

var _BoxGeometryPanel = _interopRequireDefault(require("./BoxGeometryPanel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boxData = {
  width: 50,
  height: 50,
  depth: 50,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  positionX: 0,
  positionY: 0,
  positionZ: 0
};
fetch("https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/box.json").then(function (response) {
  return response.json();
}).then(function (data) {
  boxData = data["boxData"];
  updateGeometries();
});
var axial = new _LessonFourPreviewCard.default("axial-container", "axial-gui-container", "2", "20", "axial");
var sagittal = new _LessonFourPreviewCard.default("sagittal-container", "sagittal-gui-container", "0", "40", "sagittal");
var coronal = new _LessonFourPreviewCard.default("coronal-container", "coronal-gui-container", "1", "25", "coronal");

function updateGeometries() {
  axial.generateGeometry(boxData);
  sagittal.generateGeometry(boxData);
  coronal.generateGeometry(boxData);
}

function render() {
  axial.run();
  sagittal.run();
  coronal.run();
}

updateGeometries();
render();
var boxId = "l4";
var boxGeometryPanel = new _BoxGeometryPanel.default(boxData, boxId);
boxGeometryPanel.render();

function handleBoxGeometryChange(e) {
  // Remove boxId appended at end of each Id
  var property = e.target.id.slice(0, -boxId.length); //Update boxData

  boxData[property] = e.target.value;
  updateGeometries();
}

var boxGeometryL1 = document.getElementById("boxgeometry" + boxId);
var properties = ["width", "height", "depth", "rotateX", "rotateY", "rotateZ", "positionX", "positionY", "positionZ"];
properties.forEach(function (property) {
  return document.getElementById(property + boxId).addEventListener("change", handleBoxGeometryChange);
});
},{"./LessonFourPreviewCard.js":"src/js/LessonFourPreviewCard.js","./BoxGeometryPanel.js":"src/js/BoxGeometryPanel.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50092" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("js",require("node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));b.load([]).then(function(){require("src/js/lesson4.js");});
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/lesson4.40849733.js.map