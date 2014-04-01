// File that contains everything needed to generate a complete set of random things in the cup.

// function setOwnerIcon(hexId, affinity) {

//   hex = boardLayer.get('#' + hexId)[0];
//   console.log(hex);
//   //relative position within hex
//   posx = 10;
//   posy = -60;

//   iconImg = markerIcons[this.affinity];
//   // TODO fix one icon limit

//   // var icon = createIcon(iconImg, 25, "marker");
//   var icon = new Kinetic.Image({
//     x: hex.getX() + posx,
//     y: hex.getY() + posy,
//     image: iconImg,
//     width: 25,
//     height: 25
//   });

//   boardLayer.add(icon);

//   console.log(icon);
//   // icon = playerIcons[affinity][0];
//   // console.log("Generating icon for hex " + this.id + " for army: " + (affinity + 1));
//   // icon.setImage(iconImg);

//   // icon.show();


//   icon.moveToTop();
//   // console.log(hex.getId());
//   // currentHexId = boardLayer.get("#" + this.getId())[0];
//   // currentHexId.affinity = affinity;
//   // console.log(currentHexId.affinity);
//   // console.log("Hello" + affinity);
//   boardLayer.draw();

// }