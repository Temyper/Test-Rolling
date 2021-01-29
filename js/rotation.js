$(function AddRotation() {
  // $("#shape1").css({ transform: "rotate(45deg)" });
  var count = 0;

  function Rotation(count) {
    count %= 360;
    $("#shape1").css({ transform: `rotate(${count}deg)` });
    // count++;
  }

  // 20210130単純にsetInterval(func, time, arg)にすると、func外のargが一回しか呼び出されず、カウントが1回しか増えない。
  // 20210130無名関数の中に本命の関数を渡し、その本命関数にインクリメント付きの引数を渡すことで、無名関数が呼ばれる毎に引数（funcの外のcount変数）の値が増える。
  setInterval(function () {
    Rotation(++count);
  }, 50);
});
