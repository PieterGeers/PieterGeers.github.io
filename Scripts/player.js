class Player
{
    #spriteSheet = null;
    #posX = 0;
    #posY = 0;
    #speed = 0;
    #spriteIndex = 0;
    #gravity = 0;
    #jumpSpeed = 0;

    constructor(fileName, spriteAmount, gravity, jumpSpeed)
    {
        this.#spriteSheet = new SpriteSheet(fileName, spriteAmount);
        this.#gravity = gravity;
        this.#jumpSpeed = jumpSpeed;
    }

    Update(dt)
    {
        this.#speed += this.#gravity * (dt / 1000);
        this.#posY += this.#speed * (dt / 1000);
    }

    Render(context)
    {
        if (context === null)
        {
            return;
        }
        
        this.#spriteSheet.RenderIndex(context, this.#posX, this.#posY, this.#spriteIndex);
    }

    Animate()
    {
        this.#spriteIndex++;
        if (this.#spriteIndex >= this.#spriteSheet.amount)
        {
            this.#spriteIndex = 0;
        }
    }

    SetPosition(x, y)
    {
        this.#posX = x;
        this.#posY = y;
    }

    HandleJump()
    {
        this.#speed = -this.#jumpSpeed;
    }

    get x()
    {
        return this.#posX;
    }

    get y()
    {
        return this.#posY;
    }

    get width()
    {
        return this.#spriteSheet.width;
    }

    get height()
    {
        return this.#spriteSheet.height;
    }

    get left()
    {
        return this.#posX;
    }

    get right() 
    {
        return this.#posX + this.#spriteSheet.width
    }

    get top()
    {
        return this.#posY;
    }

    get bottom()
    {
        return this.#posY + this.#spriteSheet.height;
    }
}