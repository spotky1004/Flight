$(function (){
  airHeight = 50;
  airAcc = 0;
  score = 1;
  diff = 0;
  gameTick = 0;
  isPressed = false;
  gameEnd = false;
  airplanePrefix = document.querySelector('#airplane');
  emenyPrefix = document.querySelector('.emeny');
  emenyNum = [];
  emenyX = [];
  emenyY = [];
  emenyType = [];
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
      diff += 0.001*(Math.log10(score)**1.5);
      $('#airplane').css('top', (airHeight*0.8+10) + 'vh');
      score += Math.abs(Math.floor((Math.random()*8+4)*(airAcc**2)*(diff+1)));
      $('#score').html(function (index,html) {
        scoreDim = Math.floor((Math.sqrt(diff) - Math.floor(Math.sqrt(diff)))*100);
        return 'Score: ' + score + ' (Lv ' + Math.floor(Math.sqrt(diff)) + ' <sub>' + scoreDim + '%</sub>' + ')';
      });
      if (Math.random() < Math.sqrt(diff)/100) {
        emenyNum.push(Number(emenyNr));
        emenyTypeNow = Number(Math.floor(Math.floor(Math.floor(Math.sqrt(diff)/3)+1)*Math.random())+1);
        emenyType.push(Number(emenyTypeNow));
        switch (emenyTypeNow) {
          case 1:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=emeny>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 2:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=emenyG>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 3:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=emenyB>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 4:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=emenyP>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 5:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=emenyM>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          default:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=emeny>').addClass('e' + Number(emenyNr)).appendTo('#game');
        }
        emenyNr++;
      }
      for (var i = 0; i < emenyNum.length; i++) {
        switch (emenyType[i]) {
          case 1:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
            break;
          case 2:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
            emenyY[i] += Math.sin(emenyNum[i]/4+gameTick*0.05/3);
            break;
          case 3:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7)*Math.sin(gameTick/3)*2*Math.random();
            break;
          case 4:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
            if (emenyY[i] < (airHeight*0.8+10)) {
              emenyY[i] += ((emenyNum[i]%4)/10+0.2)/2;
            } else {
              emenyY[i] -= ((emenyNum[i]%4)/10+0.2)/2;
            }
            break;
          case 5:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
            if (emenyX[i] > 100) {
              $('.e' + emenyNum[i]).addClass('opac');
            }
            break;
          default:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
        }
        if (emenyY[i] < 10 && emenyType[i] != 2) {
          emenyY[i] = 10;
        } else if (emenyY[i] > 88 && emenyType[i] != 2) {
          emenyY[i] = 88;
        } else if (emenyY[i] < 5 && emenyType[i] == 2){
          emenyY[i] = 5;
        } else if (emenyY[i] > 95 && emenyType[i] == 2) {
          emenyY[i] = 95;
        }
        $('.e' + emenyNum[i]).css('left', (208-emenyX[i]) + 'vh');
        $('.e' + emenyNum[i]).css('top', emenyY[i] + 'vh');
        if ((198 < emenyX[i] && emenyX[i] < 200) && emenyY[i]-2 < (airHeight*0.8+10) && (airHeight*0.8+10) < emenyY[i]+2) {
          gameEnd = true;
        }
        if (emenyX[i] > 250) {
          $('.e' + emenyNum[i]).remove();
          emenyNum.splice(i, 1);
          emenyType.splice(i, 1);
          emenyX.splice(i, 1);
          emenyY.splice(i, 1);
        }
      }
      gameTick++;
    }
  }, 20);
});
