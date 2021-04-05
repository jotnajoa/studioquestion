export default class Rect {

    constructor(context, x, y, width, height, xspeed, yspeed) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
    }
    draw() {
        this.context.beginPath();
        this.context.rect(this.x, this.y, this.width, this.height)
        this.context.stroke();
        this.context.closePath();
    }
    update() {
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
    }
}