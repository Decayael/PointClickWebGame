document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Game state
gameState = {
    "door2locked": true,
    "inventory": []
}


//Main Character
const mainCharacter = document.getElementById("mainCharacter");
const offsetCharacter = 16;

//Inventory
const inventoryBox = document.getElementById("inventoryBox"); //div
const inventoryList = document.getElementById("inventoryList"); //ul

//Foreground Items
const door1 = document.getElementById("door1");
const sign = document.getElementById("sign");


gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if(e.target.id !== "mainCharacter") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    console.log(e.target.id);
    switch (e.target.id) {
        
        case "door1":
            mainCharacter.style.backgroundColor = "#FFFF00";
            door1.style.opacity = 0.5;
            sign.style.opacity = 1;
            if(document.getElementById("key1") !== null){
                console.log('Found key!');
                document.getElementById("key1").remove();
                const keyElement = document.createElement("li");
                keyElement.id = "inv-key";
                keyElement.innerText = "Key";
                inventoryList.appendChild(keyElement);
            }
            
            break;
        case "door2":
            if(gameState.door2locked == true) {
                // check if we have key
                if(document.getElementById("inv-key") !== null) {
                    //yes -> unlock door?
                    gameState.door2locked = false;
                    document.getElementById("inv-key").remove();
                    console.log('Door unlocked!');

                } else {
                    //no -> alert 'door locked'
                    alert("Door is locked!");
                }
            } else {
                console.log('enter building');
            }
            
            break;

        case "sign":
            mainCharacter.style.backgroundColor = "#FFFF00";
            sign.style.opacity = 0.5;
            door1.style.opacity = 1;
            break;

        default:
            //explode
            mainCharacter.style.backgroundColor = "#1286a7";
            door1.style.opacity = 1;
            sign.style.opacity = 1;
            break;

    }

}