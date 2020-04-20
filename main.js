$(function (){
  airHeight = 50;
  airAcc = 0;
  score = 1;
  diff = 0;
  isPressed = false;
  airplanePrefix = document.querySelector('#airplane');
  emenyPrefix = document.querySelector('.emeny');
  emenyNum = [];
  emenyX = [];
  emenyNr = 1;

  function box(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  document.querySelector('#warpAll').addEventListener('mouseup', function(event) {
    isPressed = false;
  });
  document.querySelector('#warpAll').addEventListener('mousedown', function(event) {
    isPressed = true;
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
    airHeight -= Math.sin(airAcc)*2;
    if (0 > airHeight) {
      airHeight = 0;
      airAcc = 0;
    } else if (95 < airHeight) {
      airHeight = 95;
      airAcc = 0;
    }
    diff += 0.001*Math.log10(score);
    $('#airplane').css('top', (airHeight*0.8+10) + 'vh');
    score += Math.abs(Math.floor((Math.random()*8+4)*(airAcc**2)));
    $('#score').html(function (index,html) {
        return 'Score: ' + score + ' (' + (diff).toFixed(2) + ')';
    });
    if (Math.random() < Math.sqrt(diff)/100) {
      emenyNum.push(Number(emenyNr));
      emenyX.push(Number(0));
      $('<div class=emeny>').addClass('e' + Number(emenyNr)).appendTo('#game');
      emenyNr++;
    }
    for (var i = 0; i < emenyNum.length; i++) {
      emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
      $('.e' + emenyNum[i]).css('left', (208-emenyX[i]) + 'vh');
      $('.e' + emenyNum[i]).css('top', ((emenyNum[i]**1.4)%76)+10 + 'vh');
      if (emenyX[i] > 250) {
        $('.e' + emenyNum[i]).remove();
        emenyNum.splice(i, 1);
        emenyX.splice(i, 1);
      }
    }
    screenX = window.innerWidth || document.body.clientWidth;
    screenY = window.innerHeight || document.body.clientHeight;
    box(airplanePrefix.getBoundingClientRect().top, (screenX/25), (screenX/50), (screenX/50));
  }, 20);
});
