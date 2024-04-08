var box = document.getElementsByClassName("box");
var human = 'X';
var ai = 'O';

const boxIDArray = [["box1", "box2", "box3"], ["box4", "box5", "box6"], ["box7", "box8", "box9"]];

function AINextMove(clickedDiv)
{
    // Find the span element inside the clicked div using querySelector
    const spanElement = clickedDiv.querySelector('.boxText');
    if (spanElement.innerText == '') 
    {
        spanElement.innerText = human;
    }

    let bestScore = -Infinity;
    let move;
    for(let i = 0 ; i < 3 ; i++)
    {
        for(let j = 0 ; j < 3 ; j++)
        {
            //Is spot available?
            if(document.getElementById(boxIDArray[i][j]).innerText == '')
            {
                document.getElementById(boxIDArray[i][j]).innerText = ai;
                let score = minimax(false);
                document.getElementById(boxIDArray[i][j]).innerText = '';

                if(score > bestScore)
                {
                    move = { i, j };
                    bestScore = score;
                }
            }
        }
    }
    let result = checkWinner();
    if (result == null) 
    {
        document.getElementById(boxIDArray[move.i][move.j]).innerText = ai;
        let result = checkWinner();
        if (result !== null && result == ai)
        {
            console.log("Y WON");
        }
    }
    else
    {
        if(result == human)
            console.log("X WON");
    }
}

let scores = { 'X': -1, 'O': 1, 'tie': 0 };

function minimax(isMaximizing) 
{
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if(isMaximizing)
    {
        let bestScore = -Infinity;
        for(let i = 0 ; i < 3 ; i++)
        {
            for(let j = 0 ; j < 3 ; j++)
            {
                //is Spot Available?
                if(document.getElementById(boxIDArray[i][j]).innerText == '')
                {
                    document.getElementById(boxIDArray[i][j]).innerText = ai;
                    let score = minimax(false);
                    document.getElementById(boxIDArray[i][j]).innerText = '';

                    if(score > bestScore)
                        bestScore = score;
                }
            }
        }
        return bestScore;
    }
    else
    {
        let bestScore = Infinity;
        for(let i = 0 ; i < 3 ; i++)
        {
            for(let j = 0 ; j < 3 ; j++)
            {
                //is Spot Available?
                if(document.getElementById(boxIDArray[i][j]).innerText == '')
                {
                    document.getElementById(boxIDArray[i][j]).innerText = human;
                    let score = minimax(true);
                    document.getElementById(boxIDArray[i][j]).innerText = '';

                    if(score < bestScore)
                        bestScore = score;
                }
            }
        }
        return bestScore;
    }
}


function checkWinner()
{
    let winner = null;

    //horizontal
    for(let i = 0 ; i < 3 ; i++)
    {
        if(document.getElementById(boxIDArray[i][0]).innerText == document.getElementById(boxIDArray[i][1]).innerText 
            && document.getElementById(boxIDArray[i][1]).innerText == document.getElementById(boxIDArray[i][2]).innerText
            && document.getElementById(boxIDArray[i][0]).innerText != '')
            {
                winner = document.getElementById(boxIDArray[i][0]).innerText;
                //console.log("!");
            }
    }

    //vertical
    for(let i = 0 ; i < 3 ; i++)
    {
        if(document.getElementById(boxIDArray[0][i]).innerText == document.getElementById(boxIDArray[1][i]).innerText 
            && document.getElementById(boxIDArray[1][i]).innerText == document.getElementById(boxIDArray[2][i]).innerText
            && document.getElementById(boxIDArray[0][i]).innerText != '')
            {
                winner = document.getElementById(boxIDArray[0][i]).innerText;
            }
    }

    //Diagonal
    if(document.getElementById(boxIDArray[0][0]).innerText == document.getElementById(boxIDArray[1][1]).innerText 
    && document.getElementById(boxIDArray[1][1]).innerText == document.getElementById(boxIDArray[2][2]).innerText
    && document.getElementById(boxIDArray[0][0]).innerText != '')
    {
        winner = document.getElementById(boxIDArray[0][0]).innerText;
    }

    if(document.getElementById(boxIDArray[2][0]).innerText == document.getElementById(boxIDArray[1][1]).innerText 
    && document.getElementById(boxIDArray[1][1]).innerText == document.getElementById(boxIDArray[0][2]).innerText
    && document.getElementById(boxIDArray[1][1]).innerText != '')
    {
        winner = document.getElementById(boxIDArray[1][1]).innerText;
    }

    //OpenSpots
    let OpenSpots = 0;
    for(let i = 0 ; i < 3 ; i++)
    {
        for(let j = 0 ; j < 3 ; j++)
        {
            if(document.getElementById(boxIDArray[i][j]).innerText == '')
                OpenSpots++;
        }
    }

    if(winner == null && OpenSpots == 0)
        return 'tie';
    else
        return winner;
}

function resetGame()
{
    const boxText = document.querySelectorAll('.boxText');
    const boxTextArray = Array.from(boxText);
    for(let i = 0 ; i < boxTextArray.length ; i++)
    {
        boxTextArray[i].innerText = '';
    }
}


