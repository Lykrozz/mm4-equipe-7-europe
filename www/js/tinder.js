document.addEventListener('DOMContentLoaded', (e) => {

function verifyFin(input){
    if(input.length === 1){
        document.querySelector('#liste').remove();
        document.querySelector('#idees').remove();
        document.querySelector('#nombre').remove();
        document.querySelector('#choices').remove();
        document.querySelector('#infos').style.display = "";
        document.querySelector('#tinderContain').classList.add("infosAfter")
        return 1;
    }
    return 0;
}
    const app = new Vue({
        el: "#app",
        data() {
            return {
                titre: "Choisissez quels partis vous correspondent le plus :",
                parti: [
                    { nomParti: "Europe écologie les verts", candidat: "Yannick Jadot",
                        idees: ["Adopter un traité environnemental européen",
                            "Mettre en œuvre un plan d'urgence européen pour l'écologie",
                            "Changer les règles du jeu pour réduire le pouvoir de la finance",
                        "Réorienter l’économie vers la post croissance",
                        "Réussir la révolution énergétique : une Europe sobre et 100% renouvelable"], couleur: "vert_vert"},
                    { nomParti: "Les Républicains", candidat: "François-Xavier Bellamy", idees: [
                        "Arrêter l'immigration de masse avec une protection des frontières nationales",
                        "Ramener systématiquement les bateaux de migrants sur les côtes africaines",
                        "Refuser tout nouvel élargissement",
                        "Inscrire les racines judéo-chrétiennes de l’Europe dans les traités",
                        "Réserver 50% de nos marchés publics aux entreprises locales"
                    ], couleur: "orange_rose"},
                    { nomParti: "La République en marche", candidat: "Nathalie Loiseau", idees: [
                        "Création d'une banque européenne du climat",
                        "Mise en place d'un SMIC \"adapté à chaque pays européen\"",
                        "Harmoniser les critères de l'asile et augmenter les effectifs de Frontex",
                        "Conditionner l’accès aux fonds européens au respect de l’État de droit et à la convergence sociale",
                        "Taxer le carbone des produits importés en Europe"
                    ], couleur: "rose_violet"},
                    { nomParti: "Rassemblement national", candidat: "Jordan Bardella", idees: [
                        "Renégocier les traités (mais rester dans l'UE et garder l'euro)",
                        "Rétablir les contrôles aux frontières nationales",
                        "Arrêt de l'immigration légale",
                        "Abroger la directive sur le travail détaché",
                        "Instaurer le RIC au niveau national pour orienter les décisions"
                    ], couleur: "vert_bleu"},
                    { nomParti: "Parti socialiste et place publique", candidat: "Raphaël Glucksmann", idees: [
        "Création d'un grand plan européen de rénovation thermique des logements",
                        "Sortir les dépenses liées à la transition écologique du calcul des « 3% » de déficit public",
                        "Salaire minimum au sein de l’UE (65% du salaire médian de chaque pays)",
                        "Congé parental sera d’au moins huit mois partagé à égalité entre les deux parents et rémunéré aux trois quarts du salaire brut",
                        "Taux d'impôt minimum sur les sociétés à 20%"
                    ], couleur: "marron_marron"},
                    { nomParti: "La France Insoumise", candidat: "Manon Aubry", idees: ["Face au verrouillage du jeu politique, mettons la souveraineté du peuple au cœur de l’Europe.",
                        "Face au libre-échange, planifions la relocalisation écologique par le protectionnisme solidaire.",
                        "Face à l’impunité des multinationales, dégageons les lobbies.",
                    "Face à l’agriculture productiviste t au glyphosate, choisissons l’agriculture paysanne, bio et de proximité",
                    "Face aux paradis fiscaux au cœur de l’Europe, éradiquons l’évasion fiscale"], couleur: "jaune_orange"}
                ],
                nombre: 1,
                compteur: [{
                    ajout: 0,
                    supp: 0
                }],
                maListe: [

                ]
            }

        },
        filters: {
            capitalize: function (value) {
                return value.toUpperCase()
            }
        },
        methods: {
            nextList(){
                if(this.nombre <= this.parti.length){
                    this.nombre += 1;
                    this.compteur[0].ajout += 1;
                    this.maListe.push(this.parti[this.nombre-2].nomParti + " - " + this.parti[this.nombre-2].candidat)
                    console.log(this.maListe)
                    console.log(this.nombre)
                }else if(this.nombre+1 === this.parti.length){
                    console.log('coucou')
                }
                if(this.nombre === this.parti.length +1){
                    document.querySelector('.masquer').classList.remove('masquer');
                    document.querySelector('#del').classList.add('masquer');
                    document.querySelector('#aj').classList.add('masquer');
                    this.nombre = 1;
                    this.compteur[0].ajout = 0;
                }
                if(verifyFin(this.parti)){
                    this.titre = ""
                }
            },
            popList(nombre){
                this.parti.splice(nombre-1, 1);
                if(this.nombre === this.parti.length +1){
                    document.querySelector('.masquer').classList.remove('masquer');
                    document.querySelector('#del').classList.add('masquer');
                    document.querySelector('#aj').classList.add('masquer');
                    this.nombre = 1;
                    this.compteur[0].ajout = 0;
                }
                if(verifyFin(this.parti)){
                    this.titre = ""
                }
            },
            restart(){
                document.querySelector('#choices a').classList.add('masquer');
                document.querySelector('#del').classList.remove('masquer');
                document.querySelector('#aj').classList.remove('masquer');
                this.maListe = [];
                if(verifyFin(this.parti)){
                    this.titre = ""
                }
            }

        }

    })

});