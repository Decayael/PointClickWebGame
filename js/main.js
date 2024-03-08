document.getElementById("mainTitle").innerText = "Point and Click adventure game";


//Game window reference
const gameWindow = document.getElementById("gameWindow");6

//Game state
let gameState = {
    "door2locked": true,
    "inventory": []
}

if(typeof(Storage) !== "undefined"){
    //code for localStorage
    if(localStorage.gameState){

        gameState = JSON.parse(localStorage.gameState);
    }
    else{
        //save local gameState into browser storage
        localStorage.setItem("gameState",JSON.stringify(gameState))
    }
}
else {
    alert('Web storage not supported!')
}
const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("mainCharacter");
const offsetCharacter = 16;

//speech bubbles
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const counterSpeech = document.getElementById("counterSpeech");
const counterAvatarImg = document.getElementById("counterAvatarImg");
const mcAudio = document.getElementById("mcAudio");
const cAudio = document.getElementById("cAudio");
//Inventory
const inventoryBox = document.getElementById("inventoryBox"); //div
const inventoryList = document.getElementById("inventoryList"); //ul
let ismap2 = false;

//Foreground Items
const door1 = document.getElementById("door1");
const sign = document.getElementById("sign");
let uwu = 0;
let owo = 0;


gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if (e.target.id !== "mcImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    console.log(e.target.id);
    switch (e.target.id) {

        case "door1":
            if (document.getElementById("key1") !== null) {
                console.log('Found key!');
                document.getElementById("key1").remove();
                changeInventory('key', 'add');
                showMessage(mainCharacterSpeech, mcAudio, "There seems to be a key in the keyhole. However, it doesn't fit this door...");
            }

            break;
        case "door2":
            if (gameState.door2locked == true) {
                // check if we have key
                if (document.getElementById("inv-key") !== null) {
                    //yes -> unlock door?
                    gameState.door2locked = false;
                    changeInventory('key', 'delete');
                    showMessage(mainCharacterSpeech, mcAudio, "The door has been unlocked!");

                } else {
                    //no -> alert 'door locked'
                    showMessage(mainCharacterSpeech, mcAudio, "This door seems to be locked.");
                }
            }
                else {
                    if(ismap2){
                        console.log('exit building');
                        document.getElementById("map1").style.display = "inline";
                        document.getElementById("map2").style.display = "none";
                        ismap2 = false;
                    }
                    else{
                    // Door is unlocked
                    console.log('enter building');
                    document.getElementById("map1").style.display = "none";
                    document.getElementById("map2").style.display = "inline";
                    ismap2 = true
                    }

            }

            break;


            case "chest1":
                if(uwu == 0){
                showMessage(mainCharacterSpeech, mcAudio, "the chest is locked but there is no key hole");
                setTimeout(showMessage, 4 * sec, mainCharacterSpeech, mcAudio, "I have to look for something to crack it open...");

                }
                else{
                    if(owo == 0){
                        owo++;                    //wow kist open
                    changeInventory('Magic Stone', 'add');
                    }

                }
            if (uwu == 0) {            // check if we have dynamite and a lighter
                if (document.getElementById("inv-dynamite") != null && document.getElementById("inv-lighter") != null) {
                    //yes -> explode the chest
                    uwu++;
                    changeInventory('dynamite', 'delete');
                    
                    changeInventory('lighter', 'delete');
                    showMessage(mainCharacterSpeech, mcAudio, "Better get out of here before I die!");
                }
                else{
                    showMessage(mainCharacterSpeech, mcAudio, "i should check the graves for some items maybe")
                }
            }
                break;
            

        case "sign":
            if (document.getElementById("dynamite1") !== null) {
                    console.log('Found dynamite? Why is there dynamite on a grave?!');
                    document.getElementById("dynamite1").remove();
                    changeInventory('dynamite', 'add');
                    showMessage(mainCharacterSpeech, mcAudio, "Found dynamite? Why is there dynamite on a grave?!")
                }
                break;
        
        case "lighter1":
            if (document.getElementById("lighter1") !== null) {
                    console.log('lighter found!');
                    document.getElementById("lighter1").remove();
                    changeInventory('lighter', 'add');
                    showMessage(mainCharacterSpeech, mcAudio, "hey a lighter! i'll be taking that.")
                }
                break;

        case "arrow1":
            console.log('enter new map')
            document.getElementById("mainCharacter").style = "left: 0px; top: 120px;";
            document.getElementById("map1").style.display = "none";
            document.getElementById("map2").style.display = "none";
            document.getElementById("map3").style.display = "inline";

        break;

        case "arrow2":
            console.log('enter new map')
            document.getElementById("mainCharacter").style = "left: 755px; top: 173px;";
            document.getElementById("map1").style.display = "inline";
            document.getElementById("map2").style.display = "none";
            document.getElementById("map3").style.display = "none";

        break;
        
        case "teleporter1":
        console.log('enter new map')
            document.getElementById("mainCharacter").style = "left: 755px; top: 173px;";
            document.getElementById("map1").style.display = "none";
            document.getElementById("map2").style.display = "none";
            document.getElementById("map3").style.display = "none";
            document.getElementById("map4").style.display = "inline";
            document.getElementById("map5").style.display = "none";
            showMessage(mainCharacterSpeech, mcAudio, "The runes have been activated! What is happening!?")
            changeInventory('Magic Stone', 'delete');
            break;

            case "teleporter2":
                console.log('enter new map')
            document.getElementById("mainCharacter").style = "left: 755px; top: 173px;";
            document.getElementById("map1").style.display = "none";
            document.getElementById("map2").style.display = "none";
            document.getElementById("map3").style.display = "none";
            document.getElementById("map4").style.display = "none";
            document.getElementById("map5").style.display = "inline";
            document.getElementById("inventoryBox").style.display = "none";
            document.getElementById("mainCharacter").style.display = "none";
            
            
                break;


        case "statue":
            showMessage(mainCharacterSpeech, mcAudio, "Wow cOoL statue...");
            setTimeout(function () { counterAvatarImg.style.opacity = 1; }, 4 * sec);
            setTimeout(showMessage, 4 * sec, counterSpeech, cAudio, "I can hear, you know...stupid");
            setTimeout(showMessage, 8 * sec, mainCharacterSpeech, mcAudio, "You don't have to be so mean.");
            setTimeout(showMessage, 12 * sec, counterSpeech, cAudio, "You should check the house North from here...");
            setTimeout(showMessage, 18 * sec, counterSpeech, cAudio, "Also people tend to leave weird items behind for the afterlife of the deceased.");
            setTimeout(function () { counterAvatarImg.style.opacity = 0; }, 24 * sec);
            break;

        default:
            //explode
            break;

    }

}

/**
 * function to change inventory
 * @param {string} itemName 
 * @param {string} action "add", "delete"
 * @returns 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.log('wrong parameters given to changeInventory()');
        return
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break
        case 'delete':
            gameState.inventory.find(function (item, index) {
                if (item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1) {
                        gameState.inventory.splice(index, 1);
                    }
                }
            })
            break

        default:
            break;
    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * update inventoryList
 * @param {Array} inventory array of items 
 * @param {HTMLElement} inventoryList html <ul> element 
 */
function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = "inv-" + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * Shows a message in a speech bubble
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 * @param {string} message 
 */
function showMessage(targetBalloon, targetSound, message) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerText = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

/**
 * Set the opacity to 0
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
}

/**
 * store local gameState into LocalStorage.gameState
 * @param {object} gameState our gameState object
 */
function saveToBrowser(gameState){
    localStorage.gameState = JSON.stringify(gameState);
}
