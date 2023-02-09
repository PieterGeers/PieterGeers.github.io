class SpriteSheet
{
    #spriteSheet = null;
    #spriteAmount = 0;
    #spriteWidth = 0;
    #spriteHeight = 0;

    constructor(fileName, spriteAmount)
    {
        this.#spriteAmount = spriteAmount;
        
        this.#LoadAsset(fileName, (image)=>{
            this.#spriteWidth = image.width / this.#spriteAmount;
            this.#spriteHeight = image.height;
        });     
    }

    #LoadAsset(fileName, callback)
    {
        this.#spriteSheet = new Image();
        this.#spriteSheet.onload = function()
        {
            callback(this);
        }
        this.#spriteSheet.src = fileName;
    }

    RenderIndex(context, x, y, i)
    {
        context.drawImage(this.#spriteSheet, i * this.#spriteWidth, 0, this.#spriteWidth, this.#spriteHeight, x, y, this.#spriteWidth, this.#spriteHeight);
    }

    get width()
    {
        return this.#spriteWidth;
    }

    get height()
    {
        return this.#spriteHeight;
    }

    get amount()
    {
        return this.#spriteAmount;
    }
}