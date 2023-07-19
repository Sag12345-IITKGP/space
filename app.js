const grid=document.querySelector('.grid')
let currentshooterindex=202;
let width=15;
let direction=1;
let goingRight=true
let aliensremoved=[]
let result=0
const resultsDisplay=document.querySelector('.result')


for(let i=0;i<255 ;i++)
{
    const square=document.createElement('div')
    grid.appendChild(square)
}
const squares=Array.from(document.querySelectorAll('.grid div'))

const alienInvaders=[
    0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39,
]

function draw()
{
    for(let i=0;i<alienInvaders.length;i++)
    {
        if(!aliensremoved.includes(i))
        {
            squares[alienInvaders[i]].classList.add('invader')
        }
        
    }
}

draw()




function remove()
{
    for(let i=0;i<alienInvaders.length;i++)
    {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

squares[currentshooterindex].classList.add('shooter')




function moveshooter(e)
{
    squares[currentshooterindex].classList.remove('shooter')
    switch(e.key)
    {
        case 'a':
            if(currentshooterindex % width  !==0) currentshooterindex-=1
            break
        case 'd':
            if(currentshooterindex %width<width-1)currentshooterindex+=1
            break
    }
    squares[currentshooterindex].classList.add('shooter')
}
document.addEventListener('keydown',moveshooter) 

let invaderShooting=false;



function moveinvader()
{
    const leftEdge=alienInvaders[0]%width===0
    const rightEdge=alienInvaders[alienInvaders.length-1]%width===width-1
    remove()

    if(rightEdge && goingRight)
    {
        for(let i=0;i<alienInvaders.length;i++)
        {
            alienInvaders[i]+=width+1
            direction=-1
            goingRight=false
        }
    }
    if(leftEdge && !goingRight)
    {
    for(let i=0;i<alienInvaders.length;i++)
    {
        alienInvaders[i]+= width-1
        direction =1
        goingRight=true
    }
}
for(let i=0;i<alienInvaders.length;i++)
{
    alienInvaders[i]+=direction
}
    draw()
    if(squares[currentshooterindex].classList.contains('invader','shooter'))
    {
       resultsDisplay.innerHTML='GAME OVER  '+'score: '+result;
        clearInterval(invadersId)
    }
    for(let i=0;i<alienInvaders.length;i++)
    {
        if(alienInvaders[i]> squares.length-1)
        
        {
            resultsDisplay.innerHTML='GAME OVER  ' +'score: '+result;
        clearInterval(invadersId)
    }
    }
    if(aliensremoved.length===alienInvaders.length)
    {
        resultsDisplay.innerHTML='YOU WIN!'
        clearInterval(invadersId)
    }
    if (!invaderShooting && Math.random() < 0.1) {
        const currentInvaderIndex = alienInvaders[Math.floor(Math.random() * alienInvaders.length)];
        if (currentInvaderIndex < squares.length - width) {
          invaderShoot(currentInvaderIndex);
        } else {
          invaderShooting = false;
        }
      }
}


invadersId = setInterval(moveinvader,200)
let invaderLaserId;

function invaderShoot(currentInvaderIndex) {
     invaderShooting = true;
    invaderLaserId = setInterval(moveInvaderLaser, 50);
  
    function moveInvaderLaser() {
      squares[currentInvaderIndex].classList.remove('laser-invader');
      currentInvaderIndex += width;
      squares[currentInvaderIndex].classList.add('laser-invader');
  
      if (currentInvaderIndex === currentshooterindex) {
        squares[currentshooterindex].classList.remove('shooter')
        squares[currentInvaderIndex].classList.remove('laser-invader');
        resultsDisplay.innerHTML = 'GAME OVER  ' + 'score: ' + result;
        clearInterval(invaderLaserId);
        clearInterval(invadersId);
      }
  
      if (currentInvaderIndex >= squares.length - width) {
        squares[currentInvaderIndex].classList.remove('laser-invader');
        clearInterval(invaderLaserId);
        invaderShooting=false;
      }
    }
  }



function shoot(e)
{
    let laserId
    let currrentLaserIndex=currentshooterindex
    function moveLaser()
    {
        squares[currrentLaserIndex].classList.remove('laser')
        currrentLaserIndex-=width
        squares[currrentLaserIndex].classList.add('laser')

        if(squares[currrentLaserIndex].classList.contains('invader'))
        {
            squares[currrentLaserIndex].classList.remove('laser')
            squares[currrentLaserIndex].classList.remove('invader')
            squares[currrentLaserIndex].classList.remove('boom')
            setTimeout(()=>squares[currrentLaserIndex].classList.remove('boom'),200)
            clearInterval(laserId)

            const alienremoved=alienInvaders.indexOf(currrentLaserIndex)
            aliensremoved.push(alienremoved)

           
            result++
            resultsDisplay.innerHTML='score: ' + result;
            
        }
    }
    switch(e.key)
    {
        case 'w':
            laserId=setInterval(moveLaser,50)
    }
}
document.addEventListener('keydown',shoot)