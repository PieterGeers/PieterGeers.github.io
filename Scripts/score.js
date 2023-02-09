class Score 
{
    #spriteSheet = null
    #score = 0;

    constructor(fileName, spriteAmount)
    {
        this.#spriteSheet = new SpriteSheet(fileName, spriteAmount)
    }

    Update(count)
    {
        this.#score += count;
    }

    Render(context, x, y)
    {
        if (context === null)
        {
            return;
        }

        if (this.#spriteSheet === null)
        {
            return;
        }
        
        if (this.#score === 0)
        {
            this.#spriteSheet.RenderIndex(context, x - this.#spriteSheet.width / 2, y, 0);
        }
        else
        {
            var tempScore = this.#score;
            var number = tempScore % 10;
            tempScore = Math.floor(tempScore / 10);
            const numbers = [number];
                
            while (tempScore > 0)
            {
                number = tempScore % 10;
                tempScore = Math.floor(tempScore / 10);
                numbers.push(number);
            }

            const startPos = x - ((numbers.length * this.#spriteSheet.width) / 2);
            var i = 0;
            while (numbers.length > 0)
            {
                number = numbers.pop();
                this.#spriteSheet.RenderIndex(context, startPos + i * this.#spriteSheet.width, y, number);
                i++;
            }
        }
    }
}