function Bowl() {
  var bowl = new Kinetic.Image({
    x: 200,
    y: 20,
    name: 'generate',
    id: "cup",
    image: bowlButtonImg,
    width: 128,
    height: 128
  });

  bowl.updateIcons = function(thing) {
    // Remove old icon
    if (bowlbutton.oldThing)
      bowlbutton.oldThing.remove();

    // Update bowlbutton
    if (thing)
      bowlbutton.addThingIcon(thing);
  };

  bowl.addThingIcon = function(thingName) {
    console.log(thingName + "Image");
    console.log(thingImagesArray[thingName + "Image"]);
    var thing = new Kinetic.Image({
      x: this.getX() + 40,
      y: this.getY() + 40,
      id: "thing",
      name: thingName,
      image: thingImagesArray[thingName + "Image"],
      draggable: true,
      width: 50,
      height: 50
    });

    bowlbutton.oldThing = thing;
    boardLayer.add(thing);
    thing.moveToTop();
    thing.show();
    boardLayer.draw();
  };

  return bowl;
}