let inputdir={
    x:0,
    y:0
};
let arr= [{x: 13,y: 15}];
food = {x: 6, y:15};
let speed = 10;
let painttime = 0;
let score = 0;

//functions
function main(ct) {
    window.requestAnimationFrame(main);
    if((ct-painttime)/1000 < 1/speed){
    return;
    }
    painttime=ct;
    gameEng();
}
function iscoll(ar){
//collide with itself
for(let ind=1; ind<arr.length; ind++)
{
    if(ar[ind].x === ar[0].x && ar[ind].y === ar[0].y ){
        return 1;

    }
}
//colliding with wall

    if(ar[0].x >= 24 || ar[0].x <= 0 || ar[0].y >= 24 || ar[0].y <= 0 ){
        return 1;
    }
}


function gameEng(){

    if(iscoll(arr)){
        inputdir= { x:0,y:0 };
        alert("Game Over!\nPlay Again");
        arr= [{x: 13,y: 15}];
        score = 0;
        scoreb.innerHTML = "Score:" + score;
    }

    //move the snake
    for(let i= arr.length - 2; i>=0; i--)
    {
        arr[i+1] = {...arr[i]};
    }
    arr[0].x += inputdir.x;
    arr[0].y += inputdir.y;
    

    //if food is eaten, score is incremented and regenerate the food
    if(arr[0].y === food.y && arr[0].x === food.x){
        score += 1;
        scoreb.innerHTML = "Score:" + score;
        arr.unshift({x: arr[0].x + inputdir.x, y: arr[0].y + inputdir.y});
        let a= 2;
        let b= 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

   
    inside.innerHTML="";
    arr.forEach((e, ind) => {
       snakeelem=document.createElement('div');
        snakeelem.style.gridRowStart = e.y;
        snakeelem.style.gridColumnStart = e.x;

        if(ind === 0){
        snakeelem.classList.add('head');
        }
        else{
            snakeelem.classList.add('snake');
        }
        inside.appendChild(snakeelem);

    } );

    foodelem=document.createElement('div');
    foodelem.style.gridRowStart = food.y;
    foodelem.style.gridColumnStart = food.x;
    foodelem.classList.add('food');
    inside.appendChild(foodelem);

}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
inputdir = {x:0, y:1}
switch(e.key){
    case "ArrowUp":
        inputdir.x= 0;
        inputdir.y= -1;
        break;
    case "ArrowDown":
        inputdir.x= 0;
        inputdir.y= 1;
        break;
    case "ArrowLeft":
        inputdir.x= -1;
        inputdir.y= 0;
        break;
    case "ArrowRight":
        inputdir.x= 1;
        inputdir.y= 0;
        break;
        default:
        break;
}
});