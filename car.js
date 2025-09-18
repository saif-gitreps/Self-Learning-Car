class Car {
   constructor(x, y, width, height, controlType, maxSpeed = 3) {
      // TODO: Add childrens of cars with different speed limits and accelerations
      // TODO: Also add sub cars such Branded by extending type of Cars
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.angle = 0;

      this.speed = 0;
      this.acceleration = 0.2;
      this.maxSpeed = maxSpeed;
      this.friction = 0.05;
      this.damaged = false;

      this.sensor = new Sensor(this);
      this.controls = new Control(controlType);
   }

   update(roadBorders) {
      if (!this.damaged) {
         this.#move();
         this.polygon = this.#createPolygon();
         this.damaged = this.#assessDamage(roadBorders);
      }
      this.sensor.update(roadBorders);
   }

   #assessDamage(roadBorders) {
      for (let i = 0; i < roadBorders.length; i++) {
         if (polysIntersect(this.polygon, roadBorders[i])) {
            return true;
         }
      }

      return false;
   }

   #createPolygon() {
      const points = [];
      const rad = Math.hypot(this.width, this.height) / 2;
      const alpha = Math.atan2(this.width, this.height);
      points.push({
         x: this.x - Math.sin(this.angle - alpha) * rad,
         y: this.y - Math.cos(this.angle - alpha) * rad,
      });
      points.push({
         x: this.x - Math.sin(this.angle + alpha) * rad,
         y: this.y - Math.cos(this.angle + alpha) * rad,
      });
      points.push({
         x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
         y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
      });
      points.push({
         x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
         y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
      });
      return points;
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
      try {
         if (this.damaged) {
            ctx.fillStyle = "gray";
         } else {
            ctx.fillStyle = "black";
         }
         ctx.beginPath();
         ctx.moveTo(this.polygon[0].x, this.polygon[0].y);

         for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
         }

         ctx.fill();

         this.sensor.draw(ctx);
      } catch (error) {
         console.log(error);
      }
   }
}
