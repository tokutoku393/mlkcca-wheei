var canvas, stage, stats;
var images;
var confetti;

//テスト用
$('#canvas').click(function(){
  createjs.Ticker.addEventListener("tick", update);
});

//gravityを受け取ってイベント発火
window.onload = function(){
  //backgroundだけ描画
  init();

  var milkcocoa = new MilkCocoa("applein31pnvb.mlkcca.com");
  var ds = milkcocoa.dataStore('gravity');
  ds.on('send', changeViewFromSentMode);
  function changeViewFromSentMode(sent){
    if(sent.value.mode === 'portrait'){
      // 終了イベント実装したい
    }
    if(sent.value.mode === 'landscape'){
      createjs.Ticker.addEventListener("tick", update);
    }
  }
};

function init() {
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "fixed";
  stats.domElement.style.right = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);

  canvas = document.getElementById("canvas");

  stage = new createjs.Stage(canvas);

  background();

  images = images||{};
  var loader = new createjs.LoadQueue(false);
  loader.addEventListener("fileload", fileload);
  loader.addEventListener("complete", complete);
  loader.loadFile({src: "assets/images/papers.png", id: "papers"});

  createjs.Ticker.setFPS(30);
  createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }
  stage.enableMouseOver(10);
  stage.update();

}
function fileload(event) {
  if (event.item.type == "image") {
    images[event.item.id] = event.result;
   }
}
function complete(event) {
  event.target.removeEventListener("fileload", fileload);
  event.target.removeEventListener("complete", complete);

  initialize();
}
function initialize() {
  confetti = new Confetti(800, 600, 60, [0.8, 0.6, 0.4], 3);
  stage.addChild(confetti);
  confetti.x = 0;
  confetti.start();
}
function update(event) {
  stage.update();
  stats.update();
}
function background() {
  var sky = new createjs.Shape();
  stage.addChild(sky);
  sky.graphics.beginLinearGradientFill(["#0069A0", "#00AAE4"], [0, 1], 0, 0, 0, 540);
  sky.graphics.drawRect(0, 0, 800, 540);

  var ground = new createjs.Shape();
  stage.addChild(ground);
  ground.graphics.beginLinearGradientFill(["#99CC33", "#7EB133"], [0, 1], 0, 540, 0, 60);
  ground.graphics.drawRect(0, 540, 800, 60);

  var basic = new createjs.Text("HTML5 / CreateJS [0.8.1]", "14px Myriad Pro", "#FFFFFF");
  stage.addChild(basic);
  basic.textAlign = "left";
  basic.textBaseline = "bottom";
  basic.x = 10;
  basic.y = canvas.width;
  basic.alpha = 0.6;
  var title = new createjs.Text("Happy Birthday!!", "24px Myriad Pro", "#FFFFFF");
  stage.addChild(title);
  title.textAlign = "center";
  title.textBaseline = "top";
  title.x = canvas.width/2;
  title.y = 65;
  title.alpha = 0.6;
  var subtitle = new createjs.Text("Wheeeeeeeei", "20px Myriad Pro", "#FFFFFF");
  stage.addChild(subtitle);
  subtitle.textAlign = "center";
  subtitle.textBaseline = "top";
  subtitle.x = canvas.width/2;
  subtitle.y = 110;
  subtitle.alpha = 0.6;
  var publish = new createjs.Text("authoring: Sublime Text 2 + Flash CC", "14px Myriad Pro", "#FFFFFF");
  stage.addChild(publish);
  publish.textAlign = "right";
  publish.textBaseline = "bottom";
  publish.x = canvas.width;
  publish.y = canvas.width;
  publish.alpha = 0.6;

  var img = new createjs.Bitmap('');
  stage.addChild(img);
  img.x = canvas.width/4;
  img.y = 150;
}
