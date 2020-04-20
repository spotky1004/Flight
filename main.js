$(function (){
  airHeight = 50;
  airAcc = 0;
  isPressed = false;

  document.querySelector('#warpAll').addEventListener('mouseup', function(event) {
    isPressed = false;
  });
  document.querySelector('#warpAll').addEventListener('mousedown', function(event) {
    isPressed = true;
  });
  $('#monLevel').html(function (index,html) {
      return 'Lv ' + monsterNow;
    });
  setInterval( function () {
    if (isPressed) {
      airAcc += 0.05;
      if (airAcc >= 1.5) {
        airAcc = 1.5;
      }
    } else {
      airAcc -= 0.05;
      if (airAcc <= -1.5) {
        airAcc = -1.5;
      }
    }
    airHeight += -Math.sin(airAcc)*2;
    if (0 > airHeight) {
      airHeight = 0;
      airAcc = 0;
    } else if (95 < airHeight) {
      airHeight = 95;
      airAcc = 0;
    }
    $('#airplane').css('top', (airHeight*0.8+10) + 'vh');
  }, 20);
});
