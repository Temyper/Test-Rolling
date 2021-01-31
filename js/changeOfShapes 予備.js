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

  set Left(value) {
    if (!this.#TestForPX(value.toString())) {
      console.log(
        `${value} isn't appropriate for ${this.X.name} that this isn't "integer'px'" `
      );
      return;
    }
    this.#shape.css({
      left: `${value}`
    });
  }

  set Top(value) {
    if (!this.#TestForPX(value.toString())) {
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
  get Left() {
    return parseInt(this.#shape.css("left"));
  }

  // 戻り値の末尾はpxがある
  get Top() {
    return parseInt(this.#shape.css("top"));
  }

  #TestForPX(string) {
    return this.#patternOfPX.test(string);
  }
}

let shape = new Shape($("#shape1"));

// 20210131ここの動作群をShapeクラスに移すと、windowオブジェクトからprivateな変数を参照できなくなる
// TODO:20210131async/awaitを考える
$(function AddRotation() {
  // 弧度
  function Rotation(shape, angle) {
    angle %= 360;
    shape.Item.css({ transform: `rotate(${angle}deg)` });
    angle++;
    setTimeout(function () {
      Rotation(shape, angle);
    }, 50);
  }

  function Movement(shape, plusX, plusY) {
    // parseIntだけでpxが外れ整数値を求められる
    shape.Left = `${parseInt(shape.Left) - plusX}px`;
    shape.Top = `${parseInt(shape.Top) - plusY}px`;
    // count++;
    setTimeout(function () {
      Movement(shape, plusX, plusY);
    }, 50);
  }

  setTimeout(Rotation, 50, shape, 0);
  setTimeout(Movement, 50, shape, 2, 1);
});
