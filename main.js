const divGateaux = document.querySelector('.gateaux');

const divRecettes = document.querySelector('.recettes');
const boutonStart = document.querySelector('.start');

boutonStart.addEventListener('click', event =>{
    afficheTousLesGateaux();
})






function afficheUnGateau(sonId){


    let maRequete = new XMLHttpRequest();
   
    maRequete.open('GET', `http://localhost/hb/gateaux/index.php?controller=gateau&task=showApi&id=${sonId}` )
 
 
 
    maRequete.onload =  () => {
 
            let data = JSON.parse(maRequete.responseText)
 
            let gateau = data.gateau   //objet
            let recettes = data.recettes   //tableau d'objets recette
 
            faireCardGateauEtCardsRecettes(gateau, recettes)



    }
 
          maRequete.send();
}







function afficheTousLesGateaux(){


    let maRequete = new XMLHttpRequest();
   
    maRequete.open('GET', 'http://localhost/hb/gateaux/index.php?controller=gateau&task=indexApi' )
 
 
 
    maRequete.onload =  () => {
 
            let data = JSON.parse(maRequete.responseText)
 
            faireDesCardsGateaux(data);
 
            
    }
 
          maRequete.send();
 
 
          
             
 
 
}

function faireDesCardsGateaux(tableauGateau){

    let cards = "";

    tableauGateau.forEach(element => {
        
        card = `        <div class="col-4 p-3">

        <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.flavor}</p>
            <button value="${element.id}" class="btn btn-primary showGateau">voir le gateau</button>
            </div>
        </div>

    </div>`

        cards += card

        divGateaux.innerHTML = cards
        divRecettes.innerHTML = "";

        





    });

        document.querySelectorAll('.showGateau').forEach(bouton =>{

        bouton.addEventListener('click', event =>{
    
            afficheUnGateau(bouton.value);
    
        })
    
    })


}


function faireCardGateauEtCardsRecettes(gateau, recettes){

    cardGateau = `        <div class="col-4 p-3">

    <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${gateau.name}</h5>
        <p class="card-text">${gateau.flavor}</p>
        </div>
             <button class="btn btn-success retourGateaux">Retour aux Gateaux</button>
     </div> 
   
</div>`

divGateaux.innerHTML = cardGateau

    cardsRecettes = ""

    recettes.forEach(recette => {

        cardRecette = `        <div class="row" data-recette="${recette.id}">
    <hr>
        <p><strong>${recette.name}</strong></p>
        <p>${recette.description}</p>
<button class="btn btn-danger supprRecette" value="${recette.id}">Supprimer</button>
       
    <hr>
</div>`;

        cardsRecettes += cardRecette


    })

    divRecettes.innerHTML = cardsRecettes

    

    document.querySelector('.retourGateaux').addEventListener('click', event => {

        afficheTousLesGateaux();

    })

    document.querySelectorAll('.supprRecette').forEach(bouton =>{

        bouton.addEventListener('click', event =>{

            supprimeUneRecette(bouton.value)
        })

    })






}

function  supprimeUneRecette(idRecette){


    let maRequete = new XMLHttpRequest();
   
    maRequete.open('POST', 'http://localhost/hb/gateaux/index.php?controller=recette&task=supprApi' )
 
 
 
    maRequete.onload =  () => {
 
            let data = JSON.parse(maRequete.responseText)
 
            console.log(data)

            let divRecette = document.querySelector(`div[data-recette="${idRecette}"]`)
 
                divRecette.remove()
    }

    maRequete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        params = "id="+idRecette
          maRequete.send(params);

}


const monBouton = document.querySelector('#monBouton');
const unName = document.querySelector('#unName')
const message = document.querySelector('#message');



monBouton.addEventListener('click', event=>{

    // pour le cas ou on aura des balises form
      //  preventDefault(event)

        console.log(unName.value, message.value)
      //  console.log(message)

})