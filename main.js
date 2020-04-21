$(function (){
  airHeight = 50;
  airAcc = 0;
  score = 1;
  diff = 0;
  isPressed = false;
  gameEnd = false;
  airplanePrefix = document.querySelector('#airplane');
  emenyPrefix = document.querySelector('.emeny');
  emenyNum = [];
  emenyX = [];
  emenyNr = 1;

  document.querySelector('#warpAll').addEventListener('mouseup', function(event) {
    isPressed = false;
  });
  document.querySelector('#warpAll').addEventListener('mousedown', function(event) {
    isPressed = true;
  });
  setInterval( function () {
    if (gameEnd != true) {
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
        $('.e' + emenyNum[i]).css('top', Math.abs(((emenyNum[i]**1.4)%152)-76)+10 + 'vh');
        if ((198 < emenyX[i] && emenyX[i] < 200) && Math.abs(((emenyNum[i]**1.4)%152)-76)+8 < (airHeight*0.8+10) && (airHeight*0.8+10) < Math.abs(((emenyNum[i]**1.4)%152)-76)+12) {
          gameEnd = true;
        }
        if (emenyX[i] > 250) {
          $('.e' + emenyNum[i]).remove();
          emenyNum.splice(i, 1);
          emenyX.splice(i, 1);
        }
      }
    }
  }, 20);
});
