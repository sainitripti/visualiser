import LessonOnePreviewCard from './LessonOnePreviewCard.js';

let boxData = {
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

fetch("..//..//data//box.json")
.then(response => {
   return response.json();
})
.then(data => {
  boxData = data["boxData"];
  console.log("Data: " + boxData);
});

var axial = new LessonOnePreviewCard("axial-container", "0", "70", "axial");
var sagittal = new LessonOnePreviewCard("sagittal-container", "1", "50", "sagittal");
var coronal = new LessonOnePreviewCard("coronal-container", "2", "55", "coronal");

axial.generateGeometry(boxData);
sagittal.generateGeometry(boxData);
coronal.generateGeometry(boxData);

axial.run();
sagittal.run();
coronal.run();
