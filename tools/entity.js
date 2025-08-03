class Entity {
    constructor(x, y, xsize, ysize, debugColor) {
        this._x = x;
        this._y = y;
        this._xsize = xsize;
        this._ysize = ysize;
        this._debugColor = debugColor;
        this._visible = true;
        this.elemRef = document.createElement("div")
        this.elemRef.style.width = `${this._xsize}px`;
        this.elemRef.style.height = `${this._xsize}px`;
        this.elemRef.style.position = "absolute";
        this.elemRef.style.top = `${this._y}px`
        this.elemRef.style.left = `${this._x}px`
        this.elemRef.style.backgroundColor = this._debugColor;
        this.scene = actualScene;
        console.log(document.getElementById(actualScene).getElementsByClassName("elemContainer"))
        document.getElementById(actualScene).getElementsByClassName("elemContainer")[0].appendChild(this.elemRef)
        this.updateElemStats = () => {
            this.elemRef.style.width = `${this._xsize}px`;
            this.elemRef.style.height = `${this._ysize}px`;
            this.elemRef.style.top = `${this._y}px`
            this.elemRef.style.left = `${this._x}px`
        }
    }
    set x(value) {
        this._x = value;
        this.updateElemStats();
    }
    set y(value) {
        this._y = value;
        this.updateElemStats();
    }
    set xsize(value) {
        this._xsize = value;
        this.updateElemStats();
    }
    set ysize(value) {
        this._ysize = value;
        this.updateElemStats();
    }
    get x() { return this._x; }
    get y() { return this._y; }
    get xsize() { return this._x; }
    get ysize() { return this._y; }
}
class Player extends Entity {
    constructor(x, y, xsize, ysize) {
        super(x, y, xsize, ysize, "red");
        this.speed = 10;
        this.update = (dt) =>{
            if(keys.w) {
                this.y -= this.speed * dt
            };
            if(keys.a) this.x -= this.speed * dt;
            if(keys.s) this.y += this.speed * dt;
            if(keys.d) this.x += this.speed * dt;
        }
    }
}