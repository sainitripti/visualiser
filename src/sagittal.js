import { colors, file, sagittalCube } from './utils.js';

// Setup renderer
const container = document.getElementById('sagittal-container');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setClearColor(colors.lightGrey, 1);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

scene.add( sagittalCube );

const camera = new AMI.OrthographicCamera(
  container.clientWidth / -2,
  container.clientWidth / 2,
  container.clientHeight / 2,
  container.clientHeight / -2,
  0.1,
  10000
);

// Setup controls
const controls = new AMI.TrackballOrthoControl(camera, container);
controls.staticMoving = true;
controls.noRotate = true;
camera.controls = controls;

const onWindowResize = () => {
  camera.canvas = {
    width: container.offsetWidth,
    height: container.offsetHeight,
  };
  camera.fitBox(2);

  renderer.setSize(container.offsetWidth, container.offsetHeight);
};
window.addEventListener('resize', onWindowResize, false);

const loader = new AMI.VolumeLoader(container);
loader
  .load(file)
  .then(() => {
    const series = loader.data[0].mergeSeries(loader.data);
    const stack = series[0].stack[0];
    loader.free();

    const stackHelper = new AMI.StackHelper(stack);
    stackHelper.bbox.visible = false;
    stackHelper.border.color = colors.red;
    stackHelper.orientation = 1;
    scene.add(stackHelper);

    gui(stackHelper);

    // center camera and interactor to center of bouding box
    // for nicer experience
    // set camera
    const worldbb = stack.worldBoundingBox();
    const lpsDims = new THREE.Vector3(
      worldbb[1] - worldbb[0],
      worldbb[3] - worldbb[2],
      worldbb[5] - worldbb[4]
    );

    const box = {
      center: stack.worldCenter().clone(),
      halfDimensions: new THREE.Vector3(lpsDims.x - 50, lpsDims.y - 50, lpsDims.z - 50),
    };

    // init and zoom
    const canvas = {
      width: container.clientWidth,
      height: container.clientHeight,
    };

    camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
    camera.box = box;
    camera.canvas = canvas;
    camera.orientation = 'sagittal';
    camera.update();
    camera.fitBox(2);
  })
  .catch(error => {
    window.console.log('oops... something went wrong...');
    window.console.log(error);
  });

const animate = () => {
  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(function() {
    animate();
  });
};

animate();

const gui = stackHelper => {
  const gui = new dat.GUI({
    autoPlace: false,
  });

  const customContainer = document.getElementById('sagittal-gui-container');
  customContainer.appendChild(gui.domElement);
  const camUtils = {
    invertRows: false,
    invertColumns: false,
    rotate45: false,
    rotate: 0,
    orientation: 'sagittal',
    convention: 'radio',
  };

  // camera
  const cameraFolder = gui.addFolder('Camera');
  const invertRows = cameraFolder.add(camUtils, 'invertRows');
  invertRows.onChange(() => {
    camera.invertRows();
  });

  const invertColumns = cameraFolder.add(camUtils, 'invertColumns');
  invertColumns.onChange(() => {
    camera.invertColumns();
  });

  const rotate45 = cameraFolder.add(camUtils, 'rotate45');
  rotate45.onChange(() => {
    camera.rotate();
  });

  cameraFolder
    .add(camera, 'angle', 0, 360)
    .step(1)
    .listen();

  const conventionUpdate = cameraFolder.add(camUtils, 'convention', ['radio', 'neuro']);
  conventionUpdate.onChange(value => {
    camera.convention = value;
    camera.update();
    camera.fitBox(2);
  });

  const stackFolder = gui.addFolder('Stack');
  stackFolder
    .add(stackHelper, 'index', 0, stackHelper.stack.dimensionsIJK.x - 1)
    .step(1)
    .listen();
  stackFolder
    .add(stackHelper.slice, 'interpolation', 0, 1)
    .step(1)
    .listen();
};
