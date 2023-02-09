class Pipe
{
    static #sprite = null;
    static #width = 0;
    static #height = 0;
    static #verticalGap = 110;
    static #horizontalGap = 200;
    static #speed = 0.06;

    #posX = 300;
    #PosY = 300;
    #yMin = 0;
    #yMax = 0;


    constructor(filename, speed, minY, maxY, x)
    {
        this.#PosY = Math.random() * (maxY - minY) + minY;
        this.#posX = x;
        this.#yMin = minY;
        this.#yMax = maxY;
        
        if (Pipe.#sprite === null)
        {
            this.#LoadAssets(filename, (image)=>{
                Pipe.#width = image.width;
                Pipe.#height = image.height;
            });
        }

        Pipe.#speed = speed;
    }

    #LoadAssets(filename, callback)
    {
        Pipe.#sprite = new Image();
        Pipe.#sprite.onload = function(){
            callback(this);
        }
        Pipe.#sprite.src = filename;
    }

    Update(dt)
    {
        this.#posX -= Pipe.#speed * (dt / 1000);
    }

    Render(context)
    {
        if (context === null)
        {
            return;
        }

        context.drawImage(Pipe.#sprite, this.#posX, this.#PosY);
        context.save();
        context.translate(Pipe.#width, 0);
        context.rotate(Math.PI);
        context.drawImage(Pipe.#sprite, -this.#posX, -1 * (this.#PosY - Pipe.#verticalGap));
        context.restore();
    }

    Refresh(posX)
    {
        this.#PosY = Math.random() * (this.#yMax - this.#yMin) + this.#yMin;
        this.#posX = posX;
    }

    get left()
    {
        return this.#posX;
    }

    get right()
    {
        return this.#posX + Pipe.#width;
    }

    get top()
    {
        return this.#PosY - Pipe.#verticalGap;
    }

    get bottom()
    {
        return this.#PosY;
    }

    static get horizontalGap()
    {
        return Pipe.#horizontalGap;
    }
}