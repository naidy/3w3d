function GameOver()
{
	//...
	game_progress = false;

	for (var i = 0; i < pucks.length; i++)
    {
        if (pucks[i] != undefined)
        {
        	pucks[i].kill();
        }
    }
    lifePoint = 0;

    text_Info.innerHTML = "GAME OVER ! ";

    var records = [];
    records.push({
        name: name,
        score: score
    });

    var objStr = JSON.stringify(records);
    localStorage.setItem ("scores", objStr);

    document.getElementById('start').style.visibility = "visible";
}

function RandomEvent()  /////////////////////////
{
    var maxNum = 6;  
    var minNum = 1;  
    var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

    console.log (n);
}

function userLogin()
{
    name = document.getElementById('user').value;
    if (name == "")
        text_Message.innerHTML = "Please Enter Your Name!";
    else
    {
        var objStr = localStorage.getItem ("scores");
        var records = JSON.parse (objStr);

        if (records != null)
        {
            var result = searchUser(name, records);
            if (result >= 0)
                text_Message.innerHTML = "Hello! "+name+" <br>Your high score: "+result;
            else
                text_Message.innerHTML = "Hello! "+name+" <br>You dont have any record.";
        }
        else
            text_Message.innerHTML = "Hello! "+name+" <br>You dont have any record.";
        
        document.getElementById('start').style.visibility = "visible";
    }
}

function searchUser(name, records)
{
    for (var i = 0; i < records.length; i++)
    {
        if (records[i].name === name)
        {
            return records[i].score;
        }
    }
}

function GameStart()
{
    Reload();
    text_Info.innerHTML = "";
    game_progress = true;

    time_evt = setTimeout(timeout, TIME_SPACE*1000);
    time_cnt = setTimeout(timeCount, 0);

    document.getElementById('start').style.visibility = "hidden";
}

function Reload()
{
    lifePoint = 5; score = 0; puck_on = 0;
    scoreGain = 1;
    m = 0; s = 0; t = 0;
    pucks = []; pID = 0; puckCount = 1;

    clearTimeout(time_cnt);
    clearTimeout(time_evt);

    init();
}