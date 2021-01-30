"user strict";

// 数値型チェックは省略
// 20210130座標の単位はpxとする
class Shape {
  #shape = null;

  constructor(shape) {
    this.#shape = shape;
  }

  get Item() {
    return this.#shape;
  }

  set X(value) {
    this.#shape.css({
      left: `${value}`
    });
  }

  set Y(value) {
    this.#shape.css({
      top: `${value}`
    });
  }

  get X() {
    return parseInt(this.#shape.css("left"));
  }

  get Y() {
    return parseInt(this.#shape.css("top"));
  }
}

let shape = new Shape($("#shape1"));

let plusX = 2;
let plusY = 1;

let count = 0;

$(function AddRotation() {
  function Rotation(shape, count) {
    count %= 360;
    shape.Item.css({ transform: `rotate(${count}deg)` });
    count++;
    setTimeout(function () {
      Rotation(shape, count);
    }, 50);
  }

  function Movement(shape, plusX, plusY) {
    // parseIntだけでpxが外れ整数値を求められる
    shape.X = `${parseInt(shape.X) - plusX}px`;
    shape.Y = `${parseInt(shape.Y) - plusY}px`;
    // count++;
    setTimeout(function () {
      Movement(shape, plusX, plusY);
    }, 50);
  }

  setTimeout(Rotation, 50, shape, count);
  setTimeout(Movement, 50, shape, plusX, plusY);
});
