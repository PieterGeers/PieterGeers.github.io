let canvas;
let context;

let deltaTime; //in ms
let frameCount = 0;
let lastTimeStamp = 0;

let gameState = "start";

const groundSpeed = 100;
const ground = {sprite: new Image(), x: 0, y: 0, width: 336, height: 112};
ground.sprite.src = "Sprites/base.png";

const startMessage = {sprite: new Image(), x: 0, y: 0, width: 184, height: 267};
startMessage.sprite.src = "Sprites/message.png";

const gameOverMessage = {sprite: new Image(), x: 0, y: 0, width: 192, height: 42};
gameOverMessage.sprite.src = "Sprites/gameover.png";

const score = new Score("Sprites/score.png", 10);

const player = new Player("Sprites/yellowbird.png", 3, 450, 200);

const pipes = [new Pipe("Sprites/pipe-green.png", groundSpeed, 150, 350, 500),
    new Pipe("Sprites/pipe-green.png", groundSpeed, 150, 350, 500 + Pipe.horizontalGap),
    new Pipe("Sprites/pipe-green.png", groundSpeed, 150, 350, 500 + 2 * Pipe.horizontalGap)
];

let tempPipe = null;

window.onload = Initialize();

document.onkeydown = HandleInput;

function Initialize()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    ground.y = canvas.height - ground.height;

    player.SetPosition((canvas.width / 4) - 17, (canvas.height / 2) - 12);

    startMessage.x = (canvas.width / 2) - (startMessage.width / 2);
    startMessage.y = (canvas.height / 2) - 180;

    gameOverMessage.x = (canvas.width / 2) - (gameOverMessage.width / 2);
    gameOverMessage.y = (canvas.height / 2) - 100;

    window.requestAnimationFrame(GameLoop);
}

function GameLoop(timeStamp)
{
    deltaTime = timeStamp - lastTimeStamp; 
    lastTimeStamp = timeStamp;

    frameCount++;

    Update();

    Draw();

    window.requestAnimationFrame(GameLoop);
}

function Update()
{
    switch (gameState)
    {
        case "start":
            Animate();
            break;
        case "play":
            Animate();

            player.Update(deltaTime);
            
            for (let i = 0; i < pipes.length; i++)
            {
                pipes[i].Update(deltaTime);

                if (pipes[i].right < 0)
                {
                    pipes[i].Refresh(pipes[(i + 2) % 3].left + Pipe.horizontalGap);
                }
            }

            UpdateScore();

            if (HandleCollision())
            {
                gameState = "end";
            }
            break;
        case "end":
            break;
        default:
    }
}

function Draw()
{
    context.clearRect(0,0,288,512);

    switch (gameState)
    {
        case "start":
            break;
        case "play":
            for (let i = 0; i < pipes.length; i++)
            {
                pipes[i].Render(context);
            }            
            break;
        case "end":
            for (let i = 0; i < pipes.length; i++)
            {
                pipes[i].Render(context);
            }    
            break;
        default:
    }

    context.drawImage(ground.sprite, ground.x, ground.y);
    context.drawImage(ground.sprite, ground.x + ground.width, ground.y);

    switch (gameState)
    {
        case "start":
            context.drawImage(startMessage.sprite, startMessage.x, startMessage.y);
            break;
        case "play":
            score.Render(context, canvas.width / 2, canvas.height / 2 - canvas.height / 3);
            player.Render(context);
            break;
        case "end":
            score.Render(context, canvas.width / 2, canvas.height / 2 - canvas.height / 3);
            player.Render(context);
            context.drawImage(gameOverMessage.sprite, gameOverMessage.x, gameOverMessage.y);
            break;
        default:
    }
}

function Animate()
{
    if (frameCount % 3 === 0)
    {
        player.Animate();
    }

    ground.x -= groundSpeed * (deltaTime/1000);
    if (ground.x < (ground.width) * -1)
    {
        ground.x = 0;
    }
}

function HandleCollision()
{
    if (player.top < 0 || player.bottom > ground.y)
    {
        return true;
    }

    for (let i = 0; i < pipes.length; i++)
    {
        const pipe = pipes[i];
        if (player.right > pipe.left && player.left < pipe.right)
        {
            if (player.top < pipe.top || player.bottom > pipe.bottom)
            {
                return true;
            }
        }
    }

    return false;
}

function HandleInput(event)
{
    switch (gameState)
    {
        case "start":
            if (event.keyCode === 32) //32 = space
            {
                gameState = "play";
            }
            break;
        case "play":
            if (event.keyCode === 32)
            {
                player.HandleJump();
            }
            break;
        case "end":
            if (event.key === 'r')
            {
                location.reload();
            }
            break;
        default:
    }
}

function UpdateScore()
{
    if (tempPipe === null)
    {
        for (let i = 0; i < pipes.length; i++)
        {
            const pipe = pipes[i];
            if (player.right > pipe.left && player.left < pipe.right)
            {
                tempPipe = pipe;
                return;
            }
        }
    }
    else
    {
        if (player.left > tempPipe.right)
        {
            tempPipe = null;
            score.Update(1);
        }
    }
}