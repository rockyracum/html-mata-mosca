var dificult = 0;
var score = 0;
var health = 5;

function playGame() {
    dificult = document.getElementById("level").value;
    switch (dificult) {
        case "3":
        case "2":
        case "1":
            loadGame();
            break;
        default:
            alert("Escolha um nível");
            break;
    }
}

function loadGame() {
    document.getElementsByTagName("main")[0].innerHTML = "";
    spawnFly();
    updateStats();
}

function spawnFly() {
    var key = 0;
    var spam = setInterval(() => {
        var x = Math.floor(Math.random() * (window.innerWidth - 64));
        var y = Math.floor(Math.random() * (window.innerHeight - 64));
        var size = Math.floor(Math.random() * 64);
        size = size < 32 ? 32 : size;
        var direction = Math.floor(Math.random() * 2);
        direction = direction < 1 ? -1 : 1;

        let mosca = document.createElement("img");
        mosca.onclick = killFly; // or () => killFly(key)
        mosca.setAttribute("data-key", key);
        mosca.src = "imagens/mosca.png";
        mosca.height = size;
        mosca.width = size;
        mosca.style.position = "absolute";
        mosca.style.left = `${x}px`;
        mosca.style.top = `${y}px`;
        mosca.style.transform = `scaleX(${direction})`;
        document.querySelector("main").appendChild(mosca);

        takeDamage(spam);
        key++;
    }, dificult * 1000);
}

function killFly() {
    this.remove();
    score++;
    updateStats();
    console.log("Dead fly: " + this.getAttribute("data-key") + "\nScore: " + score);
}

function updateStats() {
    document.getElementById("stats").innerHTML = "Vida: " + health + "<br>Pontos: " + score;
}

function takeDamage(spawn) {
    if (health < 1) gameOver(spawn);
    else if (document.getElementsByTagName("img").length > 1) {
        health--;
        updateStats();
        console.log("Damage taken!\nHealth: " + health);
    }
}

function gameOver(spawn) {
    var container = document.getElementsByTagName("main")[0];
    container.innerHTML = '<div id="result"><h2>Pontos: ' + score + '</h2><input type="button" value="Tentar novamente" onclick="location.reload()"></div>';
    clearInterval(spawn);
}
