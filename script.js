const canvas = document.getElementById("my-canvas");

canvas.width = 200;
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width);
const car = new Car(100, 400, 30, 50);
car.draw(ctx);

animate();

function animate() {
   car.update();
   canvas.height = window.innerHeight;

   road.draw();
   car.draw(ctx);
   requestAnimationFrame(animate);
}
