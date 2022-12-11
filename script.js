// Matrice globale du jeu
var cases;

// Variable globale objet drag
var dragged;

// Variable globale score du joueur
var score;

// Variable globale, lvl actuel du joueur
var lvlJoueur = 0

// Tableau des niveau disponible
var lvl = [{niv : 1, scoreObj : 30}, {niv : 2, scoreObj : 60}, {niv : 3, scoreObj : 100}, {niv : 4, scoreObj : 150}] 

// Tableau répertoriant les audios
let audios = {"music" : new Audio('./sounds/music.mp3'),
                "crush" : new Audio('./sounds/crush.wav'),
                "win" : new Audio('./sounds/win.wav')}

audios["music"].loop = true

// Variable globale son
var son = true

// Récupère l'élément qui est drag
document.addEventListener("dragstart", function(event){
        dragged = event.target;
} ,false);


const target = document.getElementsByClassName("pion");
                        for(let i = 0 ; i < target.length ; i++){
                                target[i].addEventListener("dragover", (event) => {
                                        // prevent default to allow drop
                                        event.preventDefault();
                                        });
                        }
                        

document.addEventListener("drop", function(event){
        event.preventDefault();
        
        if(correctMove(event, dragged)){ // Verifie que le mouvement est correct

                // Echange les div et modifie les id

                let dragParentNode = dragged.parentNode;
                let targetParentNode = event.target.parentNode;

                dragged.parentNode.removeChild(dragged);
                event.target.parentNode.removeChild(event.target);

                let tmp = dragged.id
                dragged.id = event.target.id;
                event.target.id = tmp
                targetParentNode.appendChild(dragged);
                dragParentNode.appendChild(event.target);


                // Change les couleur dans la matrice 
                for(let i = 0 ; i < cases.length ; i++){
                        let evt = cases[i].find(objet => objet.id == event.target.id);
                        let drag = cases[i].find(objet => objet.id == dragged.id);
                        if( drag != undefined){
                              drag.couleur = parseInt(dragged.getAttribute("couleur"))
                        }
                        if(evt != undefined){
                              evt.couleur = parseInt(event.target.getAttribute("couleur"))
                        }

                }
                

                threeRules();
        }

        
       
},false);

createMenu()

// Init Candy Crush
function init(){
        
        // Init du score
        score = 0;

        // Init de la matrice
        switch (lvlJoueur) {
                case 0 :
                        cases = [[{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}]
                        ];
                        break;
                case 1 :
                        cases = [[{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1}], 
                        ];
                        break;
                case 2 :
                        cases = [[{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}] 
                        ];
                        break;
                case 3 :
                        cases = [[{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}],
                        [{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1},{id : -1, couleur : -1}, {id : -1, couleur : -1},{id : -1, couleur : -1}] 
                        ];
                        break;
        }
                
                
        // Initialise les id et couleur aléatoire
        let id = 0;
        for(i = 0 ; i < cases.length ; i++){
                for(j = 0 ; j < cases[0].length ; j++){
                        cases[i][j].id = id;
                        cases[i][j].couleur = parseInt(Math.random() * (4 - 0) + 0);
                        id++;
                }
        }

        createDom(); // Créer le dom pour lancer le jeu
}

// Create the dom for the game board
function createDom(){

        let body = document.getElementsByTagName("body")[0]
        body.innerHTML = ""
        let title = document.createElement("div")
        title.textContent = "Candy Crush"
        title.id = "title"

        body.append(title)

        let centerPlat = document.createElement("div")
        centerPlat.className = "center"        

        let plateau = document.createElement("div")
        plateau.id = "plateau"
        plateau.innerHTML = ""

        

        for (let i =0 ;  i < cases.length ; i++){
                let ligne = document.createElement("div")
                ligne.className = "ligne"
                

                for(let j = 0 ; j < cases[0].length; j++){

                        let elem = document.createElement("div")
                        elem.className = "case"
                        let pion = document.createElement("div")
                        pion.className = "pion"
                        pion.draggable = true

                        pion.addEventListener("dragover", (event) => {
                                // prevent default to allow drop
                                event.preventDefault();
                                });
                        
                        

                        let tab = ['blue', 'yellow', 'purple','green'];

                        pion.innerHTML = '<img id='+cases[i][j].id+' class="imgPion" src="../img/'+tab[cases[i][j].couleur]+'.png"></img>'
                        let img = pion.getElementsByClassName("imgPion")[0];
                        img.setAttribute("couleur",  cases[i][j].couleur);
                        
                        ligne.append(elem)
                        elem.append(pion)         
                }

                plateau.append(ligne)
        }
        
        body.append(centerPlat)

        // Affichage du lvl et objectifs
        let infoDiv = document.createElement("div")
        infoDiv.id = "infoDiv"

        let ul = document.createElement("ul")

        let liLvl = document.createElement("li")
        liLvl.innerHTML = "Level : "+lvl[lvlJoueur].niv

        let liScore = document.createElement("li")
        liScore.innerHTML = "Objectif de score : " + lvl[lvlJoueur].scoreObj

        ul.append(liLvl) // ajout au au ul
        ul.append(liScore)

        infoDiv.append(ul) // ajout à la div

        centerPlat.append(infoDiv)
        centerPlat.append(plateau)

        // Affichage du score
        let scoreDiv = document.createElement("div")
        scoreDiv.id = "score"
        scoreDiv.innerHTML = "Score : "+score


        // Barre de progression du score
        let progressdiv = document.createElement("div")
        progressdiv.className = "center"

        let progressBar = document.createElement("div")
        progressBar.className = "animated-progress progress-blue"
        let span = document.createElement("span")
        span.style.width = score * 100 / lvl[lvlJoueur].scoreObj + "%"

        progressBar.append(span)
        progressdiv.append(progressBar)


        // Exit button 
        let ctrDiv = document.createElement("div")
        ctrDiv.className = "center"
        let exitBtn = document.createElement("button")
        exitBtn.id = "closeBtn"
        exitBtn.innerHTML = "&times;"
        exitBtn.onclick = createMenu

        ctrDiv.append(exitBtn)
        


        // Ajoute les div au body
        body.append(scoreDiv)
        body.append(progressdiv)
        body.append(ctrDiv)


        // Règle de vérification suite bonbons
        if(score >= lvl[lvlJoueur].scoreObj){
                victory()
        } else {
                threeRules()
        }


       
}



/**
 * Vérifie chacune cases de la matrice et exécute la fonction de destruction des suites de bonbons.
 */ 
function threeRules(){

        for(let i = 0 ; i < cases.length ; i++){

                for(let j = 0 ; j < cases[0].length ; j++){

                        let color = cases[i][j].couleur;
                        let cptHor = 0;
                        for(let k = i ; k < cases.length ; k++){
                                if(cases[k][j].couleur == color){
                                        cptHor++;
                                } else {
                                        break;
                                }
                        }

                        let cptVert = 0;
                        for(let k = j ; k < cases[i].length ; k++){
                                if(cases[i][k].couleur == color){
                                        cptVert++;
                                } else {
                                        break;
                                }
                        }

                        if(cptHor >= 3){ 
                                DestroyHorizontal(i,j)
                        };

                        if(cptVert >= 3){ 
                                DestroyVertical(i,j)
                        };
                }
        }
}

// Incrémente le score et change les bonbons détruits pour les suites horizontale
function DestroyHorizontal(x, y){
        let color = cases[x][y].couleur
        for(let i = x ; i < cases.length ; i++){
                if(color == cases[i][y].couleur){
                        score++
                        cases[i][y].couleur = parseInt(Math.random() * (4 - 0) + 0);
                        
                }
        }
        if(son) audios["crush"].play()
        createDom()
}

// Incrémente le score et change les bonbons détruits pour les suites verticale
function DestroyVertical(x,y){
        let color = cases[x][y].couleur
        for(let i = y ; i < cases[x].length ; i++){
                if(color == cases[x][i].couleur){
                        score++
                        cases[x][i].couleur = parseInt(Math.random() * (4 - 0) + 0);
                        
                }
        }
        if(son) audios["crush"].play()
        createDom() 
}

// Affiche écran victoire
function victory() {
        if (son) audios["win"].play()

        let body = document.getElementsByTagName("body")[0]

        let div = document.createElement("div")
        div.className = "modale"

        let txt = document.createElement("h1")
        txt.textContent = "VICTORY"

        let btndiv = document.createElement("div")
        btndiv.className = "btnDiv"

        // Si dernier niveau
        if(lvl[lvlJoueur].niv >= lvl.length ){
                let btnPlayAgain = document.createElement("button")
                btnPlayAgain.innerHTML = "Rejouer"
                btnPlayAgain.className = "btnPlayAgain"

                btnPlayAgain.addEventListener("click", ()=> {
                        lvlJoueur = 0
                        createMenu()
                })

                btndiv.append(btnPlayAgain)

                let textGameEnd = document.createElement("h1")
                textGameEnd.textContent = "VOUS AVEZ FINI LE JEU ! BRAVO !"

                div.append(btndiv)
                div.append(textGameEnd)
        } else {
                let btnSuiv = document.createElement("button")
                btnSuiv.innerHTML = "Niveau suivant"
                btnSuiv.className = "btnChoix"

                let btnRetour = document.createElement("button")
                btnRetour.innerHTML = "Retour menu"
                btnRetour.className = "btnChoix"

                btndiv.append(btnRetour)
                btndiv.append(btnSuiv)

                 // Change de lvl et recharge le dom nouveau niveau
                btnRetour.onclick = createMenu
                btnSuiv.addEventListener("click", () => {
                        if(lvlJoueur < lvl.length){
                                lvlJoueur = lvlJoueur + 1; 
                                init()

                        }
                        
                })
                div.append(btndiv)
                div.append(txt)
        }
        
        
        
        
        let voile = document.createElement("div")
        voile.className = "voile"

        body.append(div)
        body.append(voile)
}


//

/**
 * Return true if the move is correct
 * @param {*} evt HTML ELEMENT
 * @param {*} drag HTML ELEMENT
 * @returns true if the move is correct
 */
function correctMove(evt , drag){
        return evt.target.getAttribute("couleur") != drag.getAttribute("couleur") 
        && evt.target.id != drag.id 
        && ( (evt.target.id == (parseInt(drag.id) + 1) && evt.target.id % cases[0].length != 0 )
        || evt.target.id == (parseInt(drag.id) + cases[0].length)
        || (evt.target.id == (parseInt(drag.id-1)) && drag.id % cases[0].length != 0)
        || evt.target.id == (parseInt(drag.id- cases[0].length)));
                        

}

// Fonction créer de menu principale du jeu et l'affiche
function createMenu(){
        stopMusic()
        let body = document.getElementsByTagName("body")[0]
        body.innerHTML = ""

        let logo = document.createElement("img")
        logo.src = "./img/logo.png"
        logo.id = "logo"

        let ul = document.createElement("ul")
        ul.className = "nav"



        let play = document.createElement("li")
        play.textContent = "PLAY"
        play.className = "btn"
        play.addEventListener("click", () => {
                init()
                if(son) audios["music"].play()
        })

        let options = document.createElement("li")
        options.textContent = "OPTIONS"
        options.className = "btn"
        options.onclick = displayOption

        let rules = document.createElement("li")
        rules.textContent = "RULES"
        rules.className = "btn"
        rules.onclick = displayRules

        let credits = document.createElement("li")
        credits.textContent = "CREDITS"
        credits.className = "btn"
        credits.onclick = displayCredit

        ul.append(play)
        ul.append(options)
        ul.append(rules)
        ul.append(credits)

        body.append(logo)
        body.append(ul)

}

// Affiche le menu credits
function displayCredit() {

        let body = document.getElementsByTagName("body")[0]
        body.innerHTML = ""

        let divLogo = document.createElement("div")
        divLogo.className = "center"

        let divExit = document.createElement("div")
        divExit.className = "center"

        let divTxt = document.createElement("div")
        divTxt.className = "center"

        // Logo
        let logo = document.createElement("img")
        logo.src = "./img/logo.png"
        logo.id = "logo"

        // divTxt
        let txt = document.createElement("div")
        txt.className = "texteDiv"
        txt.innerHTML = "Ce <mark>Candy Crush</mark> est développé dans le cadre de mon projet du module Interface Homme Machine <br> "+ 
        "Il s'inspire du célèbre jeu Candy Crush Saga développée par King sur mobile <br><br>" +
        "Languages utilisées :"
        let ul = document.createElement("ol")

        let liScore = document.createElement("li")
        liScore.innerHTML = "HTML/CSS"

        let liLvl = document.createElement("li")
        liLvl.innerHTML = "Javascript"

        ul.append(liLvl)
        ul.append(liScore)
        txt.append(ul)


        // Création div credit github / linkedin

        let tableDiv = document.createElement("div")
        tableDiv.className = "tableDiv"

        let tableau = document.createElement("table")
        let trR = document.createElement("tr")
        let thR = document.createElement("th")
        thR.innerHTML = "Mes réseaux"
        thR.setAttribute("colspan",2)      

        let trT = document.createElement("tr")

        let tBody = document.createElement("tbody")

        let thG = document.createElement("td")
        thG.innerHTML = '<a href="https://github.com/y-lepors">Mon Github</a>'

        let thL = document.createElement("td")
        thL.innerHTML = '<a href="https://www.linkedin.com/in/yanis-le-pors/">Mon Linkedin</a>'
        thL.h

        tableDiv.append(tableau)
        tBody.append(trT)

        tableau.append(trR)
        tableau.append(tBody)
        trR.append(thR)
        trT.append(thG)
        trT.append(thL)
        txt.append(tableDiv)


        // Btn exit

        let exitBtn = document.createElement("button")
        exitBtn.id = "closeBtn"
        exitBtn.innerHTML = "&times;"
        exitBtn.onclick = createMenu


        divTxt.append(txt)
        
        divLogo.append(logo)

        divExit.append(exitBtn)
        divExit.style = "padding: 100px"

        

        body.append(divLogo)
        body.append(divTxt)
        body.append(divExit)
}

// Permet d'afficher le menu d'option
function displayOption(){

        let body = document.getElementsByTagName("body")[0]
        body.innerHTML = ""

        let divLogo = document.createElement("div")
        divLogo.className = "center"

        let divExit = document.createElement("div")
        divExit.className = "center"

        let divTxt = document.createElement("div")
        divTxt.className = "center"




        let txt = document.createElement("div")
        txt.className = "texteOptionDiv"

        let inputSound = document.createElement("input")
        inputSound.type = "checkbox"
        inputSound.checked = !son
        inputSound.addEventListener("change", ()=> {
                son = !inputSound.checked
        })

        let labelWrapper = document.createElement("label")
        labelWrapper.className = "toggler-wrapper style-1"

        let divSlider = document.createElement("div")
        divSlider.className = "toggler-slider"

        let divKnob = document.createElement("div")
        divKnob.className = "toggler-knob"

        divSlider.append(divKnob)


        labelWrapper.append(inputSound)
        labelWrapper.append(divSlider)

        let labelTxt = document.createElement("label")
        labelTxt.textContent = "Désactiver le son"
        labelTxt.id = "optionText"

        txt.append(labelWrapper)
        txt.append(labelTxt)


        let logo = document.createElement("img")
        logo.src = "./img/logo.png"
        logo.id = "logo"

        let exitBtn = document.createElement("button")
        exitBtn.id = "closeBtn"
        exitBtn.innerHTML = "&times;"
        exitBtn.onclick = createMenu

       
        
        divLogo.append(logo)

        divTxt.append(txt)

        divExit.append(exitBtn)
        divExit.style = "padding: 100px"


        
        body.append(divLogo)
        body.append(divTxt)
        body.append(divExit)

}

function displayRules(){
        let body = document.getElementsByTagName("body")[0]
        body.innerHTML = ""

        let divLogo = document.createElement("div")
        divLogo.className = "center"

        let divExit = document.createElement("div")
        divExit.className = "center"

        let divTxt = document.createElement("div")
        divTxt.className = "center"

        // Logo
        let logo = document.createElement("img")
        logo.src = "./img/logo.png"
        logo.id = "logo"

        // divTxt
        let txt = document.createElement("div")
        txt.className = "texteDiv"
        txt.innerHTML = "<u>Règles :</u>"
        let ul = document.createElement("ul")

        let liObj = document.createElement("li")
        liObj.innerHTML = "Atteindre l'objectif de points"

        let liSuite = document.createElement("li")
        liSuite.innerHTML = "Faire des suite du même bonbon supérieur ou égale à 3"

        let liDeplacement = document.createElement("li")
        liDeplacement.innerHTML = "Déplacement autorisé dans les directions verticale et horizontal à une case"

        let liPts = document.createElement("li")
        liPts.innerHTML = "1 point par bonbon dans la suite"

        ul.append(liObj)
        ul.append(liSuite)
        ul.append(liDeplacement)
        ul.append(liPts)
        txt.append(ul)


        // Btn exit

        let exitBtn = document.createElement("button")
        exitBtn.id = "closeBtn"
        exitBtn.innerHTML = "&times;"
        exitBtn.onclick = createMenu


        divTxt.append(txt)
        
        divLogo.append(logo)

        divExit.append(exitBtn)
        divExit.style = "padding: 100px"

        

        body.append(divLogo)
        body.append(divTxt)
        body.append(divExit)
}

// Stoppe la musique du jeu
function stopMusic() {
        audios["music"].pause()
}