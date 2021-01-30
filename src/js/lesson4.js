import LessonFourPreviewCard from './LessonFourPreviewCard.js';

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

fetch("https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/box.json")
.then(response => {
   return response.json();
})
.then(data => {
  boxData = data["boxData"];   
  //updateGeometries();
});

var axial = new LessonFourPreviewCard("axial-container", "axial-gui-container", "2", "20", "axial");
var sagittal = new LessonFourPreviewCard("sagittal-container", "sagittal-gui-container", "0", "40", "sagittal");
var coronal = new LessonFourPreviewCard("coronal-container", "coronal-gui-container", "1", "25", "coronal");


function updateGeometries()
{
  axial.generateGeometry(boxData);
  sagittal.generateGeometry(boxData);
  coronal.generateGeometry(boxData);
}

function render()
{ 
  axial.run();
  sagittal.run();
  coronal.run();
}


//updateGeometries();
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