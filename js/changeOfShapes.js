"user strict";

// 数値型チェックは省略
// 20210130座標の単位はpxとする
class Shape {
  #shape = null;

  #patternOfPX = /^-?\d{1,}px/;

  constructor(shape) {
    this.#shape = shape;
  }

  get Item() {
    return this.#shape;
  }

  set X(value) {
    if (!this.TestForPX(value.toString())) {
      console.log(
        `${value} isn't appropriate for ${this.X.name} that this isn't "integer'px'" `
      );
      return;
    }
    this.#shape.css({
      left: `${value}`
    });
  }

  set Y(value) {
    if (!this.TestForPX(value.toString())) {
      console.log(
        `${value} isn't appropriate for ${this.Y.name} that this isn't "integer'px'" `
      );
      return;
    }
    this.#shape.css({
      top: `${value}`
    });
  }

  // 戻り値の末尾はpxがある
  get X() {
    return parseInt(this.#shape.css("left"));
  }

  // 戻り値の末尾はpxがある
  get Y() {
    return parseInt(this.#shape.css("top"));
  }

  TestForPX(string) {
    return this.#patternOfPX.test(string);
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
