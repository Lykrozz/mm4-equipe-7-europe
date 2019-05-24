//Fonction pour envoyer le formulaire
const getFormSubmition = () => {
    //On sélectionne le formulaire
    let myForm = document.querySelector('#voteForm');
    let tableau = document.querySelector('#resultBureaux');
    let flag = false;
    //On ajoute un évènement pour écouter le formulaire sélectionné juste avant
    if(myForm) {
        myForm.addEventListener('submit', async function(e) {
            //On empêche le rafraichissement
            e.preventDefault();
            tableau.innerHTML = ' ';
            //On récupère le textarea
            let textarea = myForm.elements["ville"].value;
            console.log(textarea)
            //Si le textarea est vide -->
            if(textarea === ""){
                //--> on affiche une alerte d'erreur
                alert('Entrez une valeur.');
                return false;
            }
            if(!flag) {
                flag = true;
                //Appel de l'api
                const fetchRequest = await fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=bureaux-vote-france-2017&q=${textarea}`);
                const fetchResponse = await fetchRequest.json();
                //const filteredArray = fetchResponse.records.filter(b => b.fields.ville.toLowerCase().includes(textarea));
                const sortedArray = fetchResponse.records.sort((a, b) => {
                    const [codeA, codeB] = [+a.fields.code_bureau_vote, +b.fields.code_bureau_vote];
                    if(codeA > codeB) {
                        return 1;
                    }else {
                        return -1;
                    }
                });
                sortedArray.forEach(record => {
                    document.getElementById("bureaux").style.display = "";
                    tableau.innerHTML +='</td><td>' + record.fields.nom_bureau_vote +'</td><td>' + record.fields.adresse + ', '+record.fields.code_postal+' '+record.fields.ville+'</td><td>'+record.fields.ouverture+'h / '+record.fields.fermeture+'h</td><td><a href="https://www.google.fr/maps/place/'+record.fields.coordonnees+'" target="_blank">Aller</a></td></tr>';
                });
                flag = false;
            }



        });
    }

};

//

/*
Start interrface
!! Don't edit this code unless your are sure of what you do !!
*/
document.addEventListener('DOMContentLoaded', getFormSubmition() );