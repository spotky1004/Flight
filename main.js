$(function (){
  varData = ['highScore', 'highStage', 'attempt'];
  resetData = {
    0: 0,
    1: 0,
    2: 0
  };
  airHeight = 50;
  airAcc = 0;
  score = 1;
  diff = 0;
  gameTick = 0;
  gameEndTick = 5;
  highScore = 0;
  highStage = 0;
  attempt = 0;
  stageSel = 0;
  isPressed = false;
  gameEnd = true;
  airplanePrefix = document.querySelector('#airplane');
  emenyPrefix = document.querySelector('.emeny');
  emenyNum = [];
  emenyX = [];
  emenyY = [];
  emenyType = [];
  emenyNr = 1;

  function gameSave() {
    var date = new Date();
    date.setDate(date.getDate() + 2000);
    var willCookie = "";
    willCookie += "saveData=";
    saveFile = {};
    for (var i = 0; i < varData.length; i++) {
      saveFile[i] = eval(varData[i]);
    }
    willCookie += JSON.stringify(saveFile);
    willCookie += ";expires=" + date.toUTCString();
    document.cookie = willCookie;
  }
  function gameLoad() {
    var cookies = document.cookie.split(";");
    for(var i in cookies) {
      if(cookies[i].search('saveData') != -1) {
        const savedFile = JSON.parse(decodeURIComponent(cookies[i].replace('saveData' + "=", "")));
        dataCopy = JSON.parse(JSON.stringify(resetData));
        Object.assign(dataCopy, savedFile);
        for (var i = 0; i < varData.length; i++) {
          this[varData[i]] = dataCopy[i];
        }
        debugStr = dataCopy;
      }
    }
  }
  function newGame() {
    score = 1;
    diff = stageSel**2;
    gameTick = 0;
    emenyNum = [];
    emenyX = [];
    emenyY = [];
    emenyType = [];
    emenyNr = Math.floor((stageSel/3)*100)+1;
    attempt++;
    gameEnd = false;
    $('#score').show();
    $('#name').hide();
    $('#hight').hide();
    $('#stageFrom').hide();
    gameSave();
  }

  $(document).keydown(function(event) {
    if (event.keyCode == '39') {
      if (highStage >= stageSel+1) {
        stageSel++;
        $('#stageFrom').html(function (index,html) {
          return 'Start From Stage ' + stageSel + ' (press arrow key <- ->)';
        });
      }
    }
    else if (event.keyCode == '37') {
      if (1 <= stageSel) {
        stageSel--;
        $('#stageFrom').html(function (index,html) {
          return 'Start From Stage ' + stageSel + ' (press arrow key <- ->)';
        });
      }
    }
  });
  document.querySelector('#warpAll').addEventListener('mouseup', function(event) {
    isPressed = false;
  });
  document.querySelector('#warpAll').addEventListener('mousedown', function(event) {
    isPressed = true;
    if (gameEnd == true && gameEndTick >= 5) {
      newGame();
    }
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
    $('#airplane').css('top', (airHeight*0.8+10) + 'vh');
    if (gameEnd != true) {
      diff += 0.001*(Math.log10(score)**1.5);
      score += Math.abs(Math.floor((Math.random()*8+4)*(airAcc**2)*(diff+1)));
      $('#score').html(function (index,html) {
        scoreDim = Math.floor((Math.sqrt(diff) - Math.floor(Math.sqrt(diff)))*100);
        level = Math.floor(Math.floor(Math.sqrt(diff))/6)+1;
        return 'Score: ' + score + ' (<span class="level' + level + '">Lv ' + Math.floor(Math.sqrt(diff)) + ' <sub>' + scoreDim + '%</sub>' + '</span>)';
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
          case 6:
            emenyX.push(Number(75));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=emenyW>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 7:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=Uemeny>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 8:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=UemenyG>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 9:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=UemenyB>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 10:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=UemenyP>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 11:
            emenyX.push(Number(0));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=UemenyM>').addClass('e' + Number(emenyNr)).appendTo('#game');
            break;
          case 12:
            emenyX.push(Number(125));
            emenyY.push(Number(Math.abs(((emenyNum[emenyNum.length-1]**1.4)%152)-76)+10));
            $('<div class=UemenyW>').addClass('e' + Number(emenyNr)).appendTo('#game');
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
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/5)+0.7);
            break;
          case 2:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/5)+0.7);
            emenyY[i] += Math.sin(emenyNum[i]/4+gameTick*0.03)/2;
            break;
          case 3:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7)*Math.sin(gameTick/3)*2*Math.random();
            break;
          case 4:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/5)+0.7);
            if (emenyY[i] < (airHeight*0.8+10)) {
              emenyY[i] += ((emenyNum[i]%4)/10+0.2)/2;
            } else {
              emenyY[i] -= ((emenyNum[i]%4)/10+0.2)/2;
            }
            break;
          case 5:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/5)+0.7);
            if (emenyX[i] > 100) {
              $('.e' + emenyNum[i]).addClass('opac');
            }
            break;
          case 6:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/5)+0.7);
            break;
          case 7:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7)*1.5;
            break;
          case 8:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7)*1.2;
            emenyY[i] += Math.sin(emenyNum[i]/4+gameTick*0.2);
            break;
          case 9:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
            emenyX[i] += (Math.abs((Math.sin(emenyNum[i]/4))**2)*Math.pow(diff+1, 1/4)+0.7)*Math.sin(gameTick/3)*2*Math.random();
            break;
          case 10:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7);
            if (emenyY[i] < (airHeight*0.8+10)) {
              emenyY[i] += ((emenyNum[i]%4)/10+0.2)/1.2;
            } else {
              emenyY[i] -= ((emenyNum[i]%4)/10+0.2)/1.4;
            }
            break;
          case 11:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7)*1.3;
            if (emenyX[i] > 75) {
              $('.e' + emenyNum[i]).addClass('opac');
            }
            break;
          case 12:
            emenyX[i] += (Math.abs(Math.sin(emenyNum[i]/4))*Math.pow(diff+1, 1/4)+0.7)*1.3;
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
          if (highStage < Math.floor(Math.sqrt(diff))) {
            highStage = Math.floor(Math.sqrt(diff));
          }
          if (highScore < score) {
            highScore = score;
          }
          gameEnd = true;
          $('.emeny').remove();
          $('.emenyG').remove();
          $('.emenyB').remove();
          $('.emenyP').remove();
          $('.emenyM').remove();
          $('.emenyW').remove();
          $('.Uemeny').remove();
          $('.UemenyG').remove();
          $('.UemenyB').remove();
          $('.UemenyP').remove();
          $('.UemenyM').remove();
          $('.UemenyW').remove();
          $('#score').hide();
          $('#name').show();
          $('#hight').show();
          $('#hight').html(function (index,html) {
            return 'High Score: ' + highScore + '<br>High Stage: lv ' + highStage;
          });
          $('#stageFrom').show();
          gameEndTick = 0;
          gameSave();
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
    gameEndTick += 0.2
  }, 20);

  $('#score').hide();
  gameLoad();
  $('#hight').html(function (index,html) {
    return 'High Score: ' + highScore + '<br>High Stage: lv ' + highStage;
  });

});
