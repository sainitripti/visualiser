import { colors, file, cube } from './utils.js';

// Setup renderer
const container = document.getElementById('container');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setClearColor(colors.lightGrey, 1);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  container.offsetWidth / container.offsetHeight,
  0.1,
  1000
);
camera.position.x = 200;
camera.position.y = 200;
camera.position.z = 150;

const controls = new AMI.TrackballControl(camera, container);

const onWindowResize = () => {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();

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
    scene.add(stackHelper);

    gui(stackHelper);

    const centerLPS = stackHelper.stack.worldCenter();
    camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
    camera.updateProjectionMatrix();
    controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
  
  })
  .catch(error => {
    window.console.log('oops... something went wrong...');
    window.console.log(error);
  });

scene.add( cube );

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

  const customContainer = document.getElementById('gui-container');
  customContainer.appendChild(gui.domElement);
  const camUtils = {
    invertRows: false,
    invertColumns: false,
    rotate45: false,
    rotate: 0,
    orientation: 'default',
    convention: 'radio',
  };

  const stackFolder = gui.addFolder('Stack');
  stackFolder
    .add(stackHelper, 'index', 0, stackHelper.stack.dimensionsIJK.z - 1)
    .step(1)
    .listen();
  stackFolder
    .add(stackHelper.slice, 'interpolation', 0, 1)
    .step(1)
    .listen();
};
