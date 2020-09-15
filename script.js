var bar1 = document.getElementById('one');
var bar2 = document.getElementById('two');
var ball = document.getElementsByClassName('ball')[0];
var gameOn = false;

var storeName = "PPname";
var storeScore = "PPMaxScore";


var movement,
    ballSpeedX = 2,
    bar,
    ballSpeedY = 2,
    bar1X,bar2X,score = 0,
    bar2Name = "bar2",bar1Name = "bar1",maxScore = 0;

    (function () {
        bar = localStorage.getItem(storeName);
        maxScore = localStorage.getItem(storeScore);
    
        if (bar === "null" || maxScore === "null") {
            alert("This is the first time you are playing this game. LET'S START");
            maxScore = 0;
            bar = "Rod1"
        } else {
            alert(bar + " has maximum score of " + maxScore * 100);
        }
    
        resetBoard(bar);
    })();
    



    function resetBoard(barName){
        bar1.style.left = (window.innerWidth - bar1.offsetWidth) / 2 + 'px';
        bar2.style.left = (window.innerWidth - bar1.offsetWidth) / 2 + 'px';
        ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + 'px';

        if(barName == bar2Name){
            ball.style.top = (bar1.offsetTop + bar1.offsetHeight) + 'px';
            ballSpeedY = 2;
        }
        else{
            ball.style.top = (bar2.offsetTop - bar2.offsetHeight) + 'px';
            ballSpeedY = 2;
        }
        score = 0;
        gameOn = false;
    }




    function storeWin(name,score){
        if(score > maxScore){
            maxScore = score;
            localStorage.setItem(storeName,name);
            localStorage.setItem(storeScore,maxScore);
        }

        clearInterval(movement);
        resetBoard(name);

        alert(name + " wins with a score of " + (score * 100) + ". Max score is: " + (maxScore * 100));
    }


document.addEventListener('keydown',function(e){
    
    var val = e.keyCode;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;   

    let barRect = bar1.getBoundingClientRect();
    
    if(val == 39 && ((barRect.x + barRect.width + 20) < window.innerWidth)){

        bar1.style.left = (barRect.x) + 20 + "px";
        bar2.style.left = bar1.style.left;

        
    }

    else if (val == 37 && (barRect.x  > 0) ){
        bar1.style.left = (barRect.x) - 20 + "px";
        bar2.style.left = bar1.style.left;
    }

    if(val == 13){

        if(!gameOn){
            gameOn = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;

            let bar1Heigth = bar1.offsetHeight;
            let bar2Height = bar2.offsetHeight;
            let bar1Width = bar1.offsetWidth;
            let bar2Width = bar2.offsetWidth;

            movement= setInterval(function(){

                ballX += ballSpeedX;
                ballY += ballSpeedY;
                
                bar1X = bar1.getBoundingClientRect().x;
                bar2X = bar2.getBoundingClientRect().x;

                ball.style.left = ballX + "px";
                ball.style.top = ballY + "px";

                if((ballX + ballDia)> windowWidth || ballX < 0){
                    ballSpeedX = -ballSpeedX;
                }

                let ballPos = ballX + ballDia/2;

                if(ballY <= bar1Heigth){
                    ballSpeedY = -ballSpeedY;
                    score++;

                    if((ballPos < bar1X) || ballPos > (bar1X + bar1Width))
                    {
                        storeWin(bar2Name,score);
                        
                    }
                }

                else if ((ballY + ballDia ) >= (windowHeight - bar2Height)){
                    ballSpeedY = -ballSpeedY;
                    score++;

                    if((ballPos < bar2X) || ballPos > (bar2X + bar2Width))
                    {
                        storeWin(bar1Name,score);

                    }

                }
               

            },10);



        }

    }
});
