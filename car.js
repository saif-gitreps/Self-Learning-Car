class Car {
   constructor(x, y, width, height) {
      // TODO: Add childrens of cars with different speed limits and accelerations
      // TODO: Also add sub cars such Branded by extending type of Cars
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.angle = 0;

      this.speed = 0;
      this.acceleration = 0.2;
      this.maxSpeed = 4;
      this.friction = 0.05;

      this.sensor = new Sensor(this);
      this.controls = new Control();
   }

   update() {
      this.#move();
      this.sensor.update();
   }

   #move() {
      if (this.controls.forward) {
         this.speed += this.acceleration;
      }
      if (this.controls.reverse) {
         this.speed -= this.acceleration;
      }

      this.speed = this.speed > this.maxSpeed ? this.maxSpeed : this.speed;
      this.speed = this.speed < -this.maxSpeed / 2 ? -this.maxSpeed / 2 : this.speed;

      if (this.speed > 0) {
         this.speed -= this.friction;
      }
      if (this.speed < 0) {
         this.speed += this.friction;
      }
      if (Math.abs(this.speed) < this.friction) {
         this.speed = 0;
      }

      if (this.speed != 0) {
         const flip = this.speed > 0 ? 1 : -1;
         if (this.controls.left) {
            this.angle += 0.03 * flip;
         }
         if (this.controls.right) {
            this.angle -= 0.03 * flip;
         }
      }

      this.x -= Math.sin(this.angle) * this.speed; // sin has a angle range betwwen -1 and 1
      this.y -= Math.cos(this.angle) * this.speed;
   }

   draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(-this.angle);

      ctx.beginPath();
      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.fill();
      ctx.restore(); // save and restore prevents infinite auto rotation

      this.sensor.draw(ctx);
   }
}
