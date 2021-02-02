"user strict";

// 数値型チェックは省略
// 20210130座標の単位はpxとする
class Shape {
  #shape = null;

  #patternOfPX = /^-?\d{1,}\.?\d{0,}px$/;

  // #statusOperatedBymouse = {
  //   isBeingDragged: false,

  //   shapePositionBeformouseDown: null,

  //   cursorPositonBeformouseDown: { left: 0, top: 0 }
  // };

  constructor(shape) {
    this.#shape = shape;
    // this.#shape.mousedown(e => {
    //   this.#mouseDown(e);
    // });
    // this.#shape.mouseup(e => {
    //   this.#mouseUp(e);
    // });
    // this.#shape.mousemove(e => {
    //   this.#mouseMove(e);
    // });
  }

  set left(value) {
    if (!this.#testForPX(value.toString())) {
      console.log(
        `${value} isn't appropriate for ${this.left.name} that this isn't "integer'px'" `
      );
      return;
    }
    this.#shape.css({
      left: `${value}`
    });
  }

  set top(value) {
    if (!this.#testForPX(value.toString())) {
      console.log(
        `${value} isn't appropriate for ${this.top.name} that this isn't "integer'px'" `
      );
      return;
    }
    this.#shape.css({
      top: `${value}`
    });
  }

  // 戻り値の末尾はpxがある
  get left() {
    return this.#shape.css("left");
  }

  // 戻り値の末尾はpxがある
  get top() {
    return this.#shape.css("top");
  }

  rotate(angle) {
    // 20210201負の値でも正しく余りが出る（ex:(-361) % 360 = -1）
    this.#shape.css({ transform: `rotate(${angle}deg)` });
  }

  // 20210201コールバック関数がprivateなメンバーを参照できる非同期メソッド。setIntervalはwindowオブジェクトに属するので、windowオブジェクトの外部のオブジェクトのprivateなメンバーを参照できない。
  async rotateInfinitely(angle) {
    if (angle == 0) return;

    let totalAngle = angle;
    while (true) {
      totalAngle %= 360;
      this.rotate(totalAngle);
      totalAngle += angle;
      await this.#sleep(50);
    }
  }

  move(plusX, plusY) {
    // parseIntだけでpxが外れ整数値を求められる
    this.left = `${parseInt(this.left) + plusX}px`;
    this.top = `${parseInt(this.top) + plusY}px`;
  }

  async moveInfinitely(plusX, plusY) {
    while (true) {
      this.move(plusX, plusY);
      await this.#sleep(50);
    }
  }

  // 20210201privateなメンバーを参照できる、時間指定用非同期実行メソッド。setIntervalではコールバック関数がprivateなメンバーを参照できない。
  #sleep(seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds);
    });
  }

  #testForPX(string) {
    return this.#patternOfPX.test(string);
  }

  // #mouseDown(e) {
  //   this.#statusOperatedBymouse.isBeingDragged = true;
  //   this.#shape.css({ backgroundColor: "#ff0000" });
  //   this.#statusOperatedBymouse.shapePositionBeformouseDown = this.#shape.position();
  //   this.#statusOperatedBymouse.cursorPositionBeformouseDown = {
  //     left: e.clientX,
  //     top: e.clientY
  //   };
  // }

  // #mouseUp(e) {
  //   this.#statusOperatedBymouse.isBeingDragged == false;
  //   this.#shape.css({ backgroundColor: "#0000ff" });
  // }

  // // 20210201幾つかのサイトでpositionをabsoluteにすることを推奨されるが、それをすると図形の回転時に他の要素の位置と鬩ぎ合う
  // #mouseMove(e) {
  //   if (this.#statusOperatedBymouse.isBeingDragged == false) return;

  //   this.left =
  //     this.#statusOperatedBymouse.shapePositionBeformouseDown.left +
  //     (e.clientX -
  //       this.#statusOperatedBymouse.cursorPositionBeformouseDown.left);
  // }
}

let shape1 = new Shape($("#shape1"));

shape1.rotateInfinitely(1);
shape1.moveInfinitely(2, 1);

let shape2 = new Shape($("#shape2"));

shape2.rotateInfinitely(-1);
shape2.moveInfinitely(-1, -2);
