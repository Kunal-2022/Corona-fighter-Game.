function loadImages() {
    // player , enemy(gem) , virus

    enemyImage = new Image;
    enemyImage.src = "enemy.jpg";

    playerImage = new Image;
    playerImage.src = "player.png";

    gemImage = new Image;
    gemImage.src = "gem.jpg";
}
function init() {
    // define the objects that we will have in the game

    canvas = document.getElementById("my-canvas");
    width = 1000;
    height = 550;
    canvas.width = width;
    canvas.height = height;

    // create a cotext 

    pen = canvas.getContext('2d');

    // create a box (enemy object)
    e1 = {
        x: 150,
        y: 150,
        w: 60,
        h: 60,
        speed: 20
    };
    e2 = {
        x: 350,
        y: 150,
        w: 60,
        h: 60,
        speed: 30
    };

    e3 = {
        x: 600,
        y: 250,
        w: 60,
        h: 60,
        speed: 40
    };
    e4 = {
        x: 750,
        y: 100,
        w: 60,
        h: 60,
        speed: 35
    };

    enemy = [e1, e2, e3, e4];

    // player object

    player = {
        x: 50,
        y: height / 2,
        w: 60,
        h: 60,
        speed: 20,
        isMoving: false,
        health: 50,
        score: 50,
        gameover: false
    };


    // gem object

    gem = {
        x: width - 100,
        y: height / 2,
        w: 60,
        h: 60
    };

    canvas.addEventListener("mousedown", function () {
        player.isMoving = true;
    });

    canvas.addEventListener("mouseup", function () {
        player.isMoving = false;
    });
}

function isOverlap(rect1, rect2) {
    if (rect1.x - rect2.x < rect2.w && rect2.x - rect1.x < rect1.w && rect2.y - rect1.y < rect1.h && rect1.y - rect2.y < rect2.h) {
        return true;
    }
    return false;
}

function draw() {
    console.log("in draw");

    // draw the box - enemy object 


    pen.clearRect(0, 0, width, height);
    pen.fillStyle = "red";

    pen.font = "30px Arial";
    pen.fillText(`score - ${player.score}`, 50, 30);
    pen.fillStyle = "blue";
    pen.fillText(`health - ${player.health}`, 50, 60);

    pen.drawImage(gemImage, gem.x, gem.y, gem.w, gem.h);
    pen.drawImage(playerImage, player.x, player.y, player.w, player.h);

    for (let i = 0; i < 4; i++) {
        pen.drawImage(enemyImage, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }

}

function update() {
    console.log("in update");

    // mpve the box downwads
    // update each enemy by the same logic 

    if (isOverlap(player, gem) == true) {
        alert("you won refresh the page to start a new game ");
        return;
    }

    for (let i = 0; i < 4; i++) {
        if (isOverlap(enemy[i], player) == true) {
            player.health -= 50;
            player.score -= 50;
            if (player.health < 0) {
                alert('game over');
                player.gameover = true;
                return;
            }
        }
    }


    if (player.isMoving == true) {
        player.x += player.speed;
        player.health += 50;
        player.score += 50;
    }
    for (let i = 0; i < 4; i++) {
        enemy[i].y += enemy[i].speed;
        if (enemy[i].y < 0 || enemy[i].y > height - enemy[i].h) {
            enemy[i].speed *= -1;
        }
    }
}

function gameloop() {
    if (player.gameover == true) {
        clearInterval(f);
        return;
    }
    draw();
    update();
}
loadImages();
init();
var f = setInterval(gameloop, 100);