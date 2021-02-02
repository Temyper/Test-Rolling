"user strict";

// 数値型チェックは省略
// 20210130座標の単位はpxとする
class Shape {
  #shape = null;

  #patternOfPX = /^-?\d{1,}px/;

  constructor(shape) {
    this.#shape = shape;
  }

  set Left(value) {
    if (!this.#TestForPX(value.toString())) {
      console.log(
        `${value} isn't appropriate for ${this.Left.name} that this isn't "integer'px'" `
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
        `${value} isn't appropriate for ${this.Top.name} that this isn't "integer'px'" `
      );
      return;
    }
    this.#shape.css({
      top: `${value}`
    });
  }

  // 戻り値の末尾はpxがある
  get Left() {
    return this.#shape.css("left");
  }

  // 戻り値の末尾はpxがある
  get Top() {
    return this.#shape.css("top");
  }

  Rotate(angle) {
    // 20210201負の値でも正しく余りが出る（ex:(-361) % 360 = -1）
    this.#shape.css({ transform: `rotate(${angle}deg)` });
  }

  // 20210201コールバック関数がprivateなメンバーを参照できる非同期メソッド。setIntervalはwindowオブジェクトに属するので、windowオブジェクトの外部のオブジェクトのprivateなメンバーを参照できない。
  async RotateInfinitely(angle) {
    if (angle == 0) return;

    let totalAngle = angle;
    while (true) {
      totalAngle %= 360;
      this.Rotate(totalAngle);
      totalAngle += angle;
      await this.#Sleep(50);
    }
  }

  Move(plusX, plusY) {
    // parseIntだけでpxが外れ整数値を求められる
    this.Left = `${parseInt(this.Left) + plusX}px`;
    this.Top = `${parseInt(this.Top) + plusY}px`;
  }

  async MoveInfinitely(plusX, plusY) {
    while (true) {
      this.Move(plusX, plusY);
      await this.#Sleep(50);
    }
  }

  // 20210201privateなメンバーを参照できる、時間指定用非同期実行メソッド。setIntervalではコールバック関数がprivateなメンバーを参照できない。
  #Sleep(seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds);
    });
  }

  #TestForPX(string) {
    return this.#patternOfPX.test(string);
  }
}

let shape1 = new Shape($("#shape1"));

shape1.RotateInfinitely(1);
shape1.MoveInfinitely(2, 1);

let shape2 = new Shape($("#shape2"));

shape2.RotateInfinitely(-1);
shape2.MoveInfinitely(-1, -2);
