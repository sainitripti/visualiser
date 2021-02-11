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
      var scene2 = new THREE.Scene();
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
      var loader2 = new AMI.VolumeLoader(container);
      loader2.load(_utils.annotation).then(function () {
        var series = loader2.data[0].mergeSeries(loader.data);
        var stack = series[0].stack[0];
        loader2.free();
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
        renderer.render(scene, camera); //renderer.render(scene2, camera);

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
},{"../utils.js":"src/utils.js"}],"src/js/lesson4.js":[function(require,module,exports) {
"use strict";

var _LessonFourPreviewCard = _interopRequireDefault(require("./LessonFourPreviewCard.js"));

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
  boxData = data["boxData"]; //updateGeometries();
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
} //updateGeometries();


render();
/*
const boxId = "l1";
var boxGeometryPanel = new BoxGeometryPanel(boxData,boxId);
boxGeometryPanel.render();

function handleBoxGeometryChange(e)
{
  // Remove boxId appended at end of each Id
  var property = e.target.id.slice(0,-boxId.length);
  //Update boxData
  boxData[property] = e.target.value;
  updateGeometries();
}

const boxGeometryL1 = document.getElementById("boxgeometry"+boxId);
const properties = ["width","height","depth", "rotateX", "rotateY", "rotateZ", "positionX", "positionY", "positionZ"];
properties.forEach(property => document.getElementById(property+boxId)
  .addEventListener("change", handleBoxGeometryChange));
*/
},{"./LessonFourPreviewCard.js":"src/js/LessonFourPreviewCard.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65223" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/lesson4.js"], null)
//# sourceMappingURL=/lesson4.40849733.js.map