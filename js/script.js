tableRange = 15;
alfabeto = ["zero", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
data = [];
finalData = [];
boatClickCount = 0;
endGameBlock = 0;
atackPoints = 100;
boatCount = 0;
boatOne = [];
boatTwo = [];
boatThree = [];
boatFour = [];
boatFive = [];
boatSix = [];
boatSeven = [];
boatEight = [];
boatNine = [];
boatTen = [];
msg2 = document.getElementById("mensagem2");
msg = document.getElementById("mensagem")
clicks = 0;
Erro = 0;
msgAtk = document.getElementById("atkMsg");
pontos = 0;

function criarDivs() {
    const mainGame = document.getElementById("mainGame");

    for (let i = 0; i < (tableRange + 1); i++) {
        const outerDiv = document.createElement("div");
        outerDiv.className = "coluna";

        for (let j = 0; j < (tableRange + 2); j++) {
            const innerDiv = document.createElement("div");
            innerDiv.className = "celula";
            innerDiv.id = `${alfabeto[i]}${j}`;
            outerDiv.appendChild(innerDiv);
            if (i == 0) {
                if (j == 0 || j == (tableRange + 1)) {
                    innerDiv.textContent = "";
                } else {
                    innerDiv.classList.add(`${alfabeto[i]}${j}`);
                    innerDiv.textContent = j;
                }
                innerDiv.classList.add("zero");
            } else {
                if (j == 0 || j == (tableRange + 1)) {
                    innerDiv.classList.add("zero");
                    if (j == (tableRange + 1)) {
                        innerDiv.textContent = "";
                    } else {
                        innerDiv.textContent = `${alfabeto[i]}`;
                    }
                } else {
                    innerDiv.classList.add("semclique");
                    innerDiv.textContent = "";
                    innerDiv.addEventListener("click", function () { verify(this.id) });

                }
            }
        }

        mainGame.appendChild(outerDiv);
    }
}

function verifyBoat(idOfCell) {
    let barcos = [boatOne, boatTwo, boatThree, boatFour, boatFive, boatSix, boatSeven, boatEight, boatNine, boatTen];

    for (let i = 0; i < 10; i++) {
        let barco = barcos[i];
        let index = barco.indexOf(idOfCell);
        if (index !== -1) {
            barco.splice(index, 1);
            if (barco.length === 0) {
                boatCount--;
                let clickSound = new Audio('./snd/sucess.mp3');
                clickSound.volume = 1.0;
                clickSound.addEventListener('canplaythrough', function () {
                    clickSound.play();
                });
                msg2.textContent = `Barco ${i + 1} afundado! Restam ${boatCount} barcos!`;
            }
            if (boatCount == 0) {
                pontos = (((10 - boatCount) * 1000) - (Erro * 10));
                msg.textContent = `VITÓRIA!!! Usou ${100 - atackPoints}/100, Clicou ${clicks} vezes e errou ${Erro} vezes. ${pontos} Pontos, PARABÉNS!!!`;
                endGameBlock = 1;
                MainSong.pause();
                let sucess = new Audio('./snd/sucessFinal.mp3');
                sucess.volume = 1;
                sucess.addEventListener('canplaythrough', function () {
                    sucess.play();
                });
                setTimeout(() => {
                    let endingSong = new Audio('./snd/ending.mp3');
                    endingSong.volume = 0.2;
                    endingSong.loop = true;
                    endingSong.addEventListener('canplaythrough', function () {
                        endingSong.play();
                    });
                }, 2000);

            }
            break;
        }
    }
}


function verify(celula_id) {
    if (!endGameBlock == 1) {

        let celulaVerificada = document.getElementById(celula_id);

        if (!celulaVerificada.classList.contains("clicado")) {

            celulaVerificada.classList.remove("semclique");
            celulaVerificada.classList.add("clicado");

            if (celulaVerificada.classList.contains("ship")) {

                celulaVerificada.style.border = "solid transparent 1px";
                celulaVerificada.style.backgroundColor = "transparent";

                if (celulaVerificada.classList.contains("frontYp") || celulaVerificada.classList.contains("frontXn")) {

                    const imgInner = document.createElement("img");
                    imgInner.id = `${celulaVerificada.id}${celulaVerificada.id}`;
                    imgInner.classList.add("imgCelula");

                    if (celulaVerificada.classList.contains("frontYp")) {

                        imgInner.src = "./css/img/boatYP.png";
                    } else if (celulaVerificada.classList.contains("frontXn")) {

                        imgInner.src = "./css/img/boatXN.png";
                    }

                    celulaVerificada.appendChild(imgInner);

                } else if (celulaVerificada.classList.contains("backYn") || celulaVerificada.classList.contains("backXp")) {

                    const imgInner = document.createElement("img");
                    imgInner.id = `${celulaVerificada.id}${celulaVerificada.id}`;
                    imgInner.classList.add("imgCelula");

                    if (celulaVerificada.classList.contains("backXp")) {

                        imgInner.src = "./css/img/boatXP.png";

                    } else if (celulaVerificada.classList.contains("backYn")) {

                        imgInner.src = "./css/img/boatYN.png";

                    }
                    celulaVerificada.appendChild(imgInner);

                } else if (celulaVerificada.classList.contains("boatsprite")) {

                    const imgInner = document.createElement("img");
                    imgInner.id = `${celulaVerificada.id}${celulaVerificada.id}`;
                    imgInner.classList.add("imgCelula");
                    imgInner.src = "./css/img/boat.png";
                    celulaVerificada.appendChild(imgInner);

                }
                let clickSound = new Audio('./snd/boom.mp3')
                clickSound.addEventListener('canplaythrough', function () {
                    clickSound.volume = 1.0;
                    clickSound.play();
                })
                verifyBoat(celula_id);
                atackPoints--;
                boatClickCount--;

            } else {

                let clickSound = new Audio('./snd/splash.mp3')
                clickSound.addEventListener('canplaythrough', function () {
                    clickSound.volume = 1.0;
                    clickSound.play();
                })
                celulaVerificada.style.border = "solid transparent 1px";
                celulaVerificada.style.backgroundColor = "transparent";
                atackPoints--;
                Erro++;

            }

            clicks++;
            msgAtk.textContent = `Armamento: ${atackPoints}/100`;

            if (atackPoints == 0) {

                endGameBlock = 1;
                pontos = 0;
                msg.textContent = `Derrota... Usou ${100 - atackPoints}/100, Clicou ${clicks} vezes e errou ${Erro} vezes. ${pontos} Pontos, mais sorte na próxima vez...`;
                MainSong.pause();

                let fail = new Audio('./snd/fail.mp3');
                fail.volume = 1;
                fail.addEventListener('canplaythrough', function () {
                    fail.play();
                });
                setTimeout(() => {
                    let endingSong = new Audio('./snd/ending.mp3');
                    endingSong.volume = 0.2;
                    endingSong.loop = true;
                    endingSong.addEventListener('canplaythrough', function () {
                        endingSong.play();
                    });
                }, 2000);
            }
        }
    }
}

function createBoats() {
    let tentativas = 0;
    let barcosCriados = 0;

    while (barcosCriados < 4 && tentativas < 100) {
        let baseX = Math.floor(Math.random() * (tableRange - 3)) + 1;
        let baseY = Math.floor(Math.random() * (tableRange - 3)) + 1;
        let coordXBase = baseX;
        let coordYBase = baseY;
        let direction = Math.floor(Math.random() * 2);
        let novoBarco = [];
        let sobrepoe = false;

        for (let i = 0; i < 4; i++) {
            let coordY = alfabeto[coordYBase];
            let coordX = coordXBase;

            if (direction === 1) {
                coordY = alfabeto[coordYBase + i];
            } else {
                coordX = coordXBase + i;
            }

            let idCelula = coordY + coordX;
            let celula = document.getElementById(idCelula);

            if (!celula || finalData.flat().includes(idCelula)) {
                sobrepoe = true;
                break;
            }

            if (i == 0) {
                if (direction === 1) {
                    celula.classList.add("frontYp");
                } else {
                    celula.classList.add("frontXn");
                }
            } else if (i == 3) {
                if (direction === 1) {
                    celula.classList.add("backYn");
                } else {
                    celula.classList.add("backXp");
                }
            } else {
                celula.classList.add("boatsprite");
            }

            novoBarco.push(idCelula);
            boatClickCount++;

        }

        if (!sobrepoe && novoBarco.length === 4) {
            for (let cel of novoBarco) {
                document.getElementById(cel).classList.add("ship");
            }
            finalData.push(novoBarco);
            barcosCriados++;
            boatCount++;
            switch (barcosCriados) {
                case 1:
                    boatOne = novoBarco;
                    break
                case 2:
                    boatTwo = novoBarco;
                    break
                case 3:
                    boatThree = novoBarco;
                    break
                case 4:
                    boatFour = novoBarco;
                    break
            }

        }

        tentativas++;
    }

    if (barcosCriados < 4) {
        console.warn("Nem todos os barcos foram criados.");
    }

    barcosCriados = 0;
    tentativas = 0;

    while (barcosCriados < 3 && tentativas < 100) {
        let baseX = Math.floor(Math.random() * (tableRange - 3)) + 1;
        let baseY = Math.floor(Math.random() * (tableRange - 3)) + 1;
        let coordXBase = baseX;
        let coordYBase = baseY;
        let direction = Math.floor(Math.random() * 2);
        let novoBarco = [];
        let sobrepoe = false;

        for (let i = 0; i < 3; i++) {
            let coordY = alfabeto[coordYBase];
            let coordX = coordXBase;

            if (direction === 1) {
                coordY = alfabeto[coordYBase + i];
            } else {
                coordX = coordXBase + i;
            }

            let idCelula = coordY + coordX;
            let celula = document.getElementById(idCelula);

            if (!celula || finalData.flat().includes(idCelula)) {
                sobrepoe = true;
                break;
            }

            if (i == 0) {
                if (direction === 1) {
                    celula.classList.add("frontYp");
                } else {
                    celula.classList.add("frontXn");
                }
            } else if (i == 2) {
                if (direction === 1) {
                    celula.classList.add("backYn");
                } else {
                    celula.classList.add("backXp");
                }
            } else {
                celula.classList.add("boatsprite");
            }

            novoBarco.push(idCelula);
            boatClickCount++;
        }

        if (!sobrepoe && novoBarco.length === 3) {
            for (let cel of novoBarco) {
                document.getElementById(cel).classList.add("ship");
            }
            finalData.push(novoBarco);
            barcosCriados++;
            boatCount++;

            switch (barcosCriados) {
                case 1:
                    boatFive = novoBarco;
                    break
                case 2:
                    boatSix = novoBarco;
                    break
                case 3:
                    boatSeven = novoBarco;
                    break
            }
        }



        tentativas++;
    }

    if (barcosCriados < 3) {
        console.warn("Nem todos os barcos foram criados.");
    }

    barcosCriados = 0;
    tentativas = 0;

    while (barcosCriados < 3 && tentativas < 100) {
        let baseX = Math.floor(Math.random() * (tableRange - 3)) + 1;
        let baseY = Math.floor(Math.random() * (tableRange - 3)) + 1;
        let coordXBase = baseX;
        let coordYBase = baseY;
        let direction = Math.floor(Math.random() * 2);
        let novoBarco = [];
        let sobrepoe = false;

        for (let i = 0; i < 2; i++) {
            let coordY = alfabeto[coordYBase];
            let coordX = coordXBase;

            if (direction === 1) {
                coordY = alfabeto[coordYBase + i];
            } else {
                coordX = coordXBase + i;
            }

            let idCelula = coordY + coordX;
            let celula = document.getElementById(idCelula);

            if (!celula || finalData.flat().includes(idCelula)) {
                sobrepoe = true;
                break;
            }

            if (i == 0) {
                if (direction === 1) {
                    celula.classList.add("frontYp");
                } else {
                    celula.classList.add("frontXn");
                }
            } else if (i == 1) {
                if (direction === 1) {
                    celula.classList.add("backYn");
                } else {
                    celula.classList.add("backXp");
                }
            }

            novoBarco.push(idCelula);
            boatClickCount++;
        }

        if (!sobrepoe && novoBarco.length === 2) {
            for (let cel of novoBarco) {
                document.getElementById(cel).classList.add("ship");
            }
            finalData.push(novoBarco);
            barcosCriados++;
            boatCount++;

            switch (barcosCriados) {
                case 1:
                    boatEight = novoBarco;
                    break
                case 2:
                    boatNine = novoBarco;
                    break
                case 3:
                    boatTen = novoBarco;
                    break
            }
        }



        tentativas++;
    }

    if (barcosCriados < 3) {
        console.warn("Nem todos os barcos foram criados.");
    }

    barcosCriados = 0;
    tentativas = 0;
}

function mainMusic() {
    MainSong = new Audio('./snd/mainsong.mp3');
    MainSong.loop = true;
    MainSong.volume = 0.2;
    MainSong.addEventListener('canplaythrough', function () {
        MainSong.play();
    });
}

function create() {
    let destruir = document.getElementById("destructble");
    let titulo = document.getElementById("h1");
    let bt = document.getElementById("imgButton");
    let restartDiv = document.getElementById("restart")

    bt.style.content = "./css/img/start_press";
    bt.style.width = "0";
    titulo.style.fontSize = "large";

    mainMusic();
    setTimeout(() => {
        criarDivs();
        createBoats();
        msg2.textContent = "Restam 10 barcos!";
        msgAtk.textContent = "Armamento: 100/100";

        const restartButton = document.createElement('button');
        restartButton.id = 'btrestart';
        restartButton.textContent = 'REINICIAR';
        restartButton.onclick = () => location.reload();
        restartDiv.appendChild(restartButton);

        setTimeout(() => {
            destruir.remove();
        }, 800);
    }, 400);

    let clickSound = new Audio('./snd/splash.mp3');
    clickSound.volume = 1;
    clickSound.addEventListener('canplaythrough', function () {
        clickSound.play();
    });
}
