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

      this.controls = new Control();
   }

   update() {
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

      if (this.controls.left) {
         this.angle -= 0.03;
      }
      if (this.controls.right) {
         this.angle += 0.03;
      }

      this.y -= this.speed;
      /*
        Heres how this works:

        Initially speed = 0. When we press forward, speed inscrease by amount of 
        acceleration. Then Request animate function recalls the window infinitely. 
        Which causes the update method to be called, subsequently y -= (curr)speed happens.

        this.y -= this.speed; works because mathematically, 
        Lets say y = 100:
        => 100 - 2 = 98, and we are going up.
        
        For reverse. When we hit down arrow. Speed -= acceleration (retardation). where at some point it becomes retardation, AKA negative.
        => 100 - (-2) = 102 which is going down.
      */
   }

   draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(-this.angle);

      ctx.beginPath();
      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.fill();
      ctx.restore();
   }
}
