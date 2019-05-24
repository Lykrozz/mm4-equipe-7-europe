document.addEventListener('DOMContentLoaded', (e) => {

    const bus = new Vue();

    Vue.component('chatComponent', {
        template: document.querySelector('template#chatComponent').innerHTML,
        props: ['type', 'question', 'answers', 'content', 'photo'],
        data() {
            return {
                mail: ''
            }
        },
        created() {
            console.log('Mounted.')
        },
        methods: {
            chooseAnswer(answer) {
                bus.$emit('chooseAnswer', answer)
            },
            sendData() {
                bus.$emit('sendData', this.mail)
                console.log("emit "+this.mail)
            }
        }
    });

    Vue.config.devtools = true;

    function create_conv_right(contenu){
        document.querySelector('#conversation').innerHTML += "<div class=\"conv_right\">" +
            "            <p>"+contenu+"</p>" +
            "        </div>";
    }
    function create_conv_left(contenu){
        document.querySelector('#conversation').innerHTML += "<div class=\"conv_left\">" +
            "            <img src=\"img/quentin.png\" alt=\"\">" +
            "            <p>"+contenu+"</p>" +
            "        </div>";
        console.log('hello')
    }
    function create_answer(contenu, choix){
        document.querySelector('#conversation').innerHTML += "<div class=\"answers\" >" +
            "            <a href=\"#\" @click=\""+choix+"\">"+contenu+"</a>" +
            "        </div>"
    }

    const app = new Vue({
        el: "#app",
        data() {
            return {
                titre: "Quentin",
                sous_titre : "Faisons connaissance",
                numero : 1,
                prenom : null,
                nom : null,
                age : '30',
                sexe : 'un homme',
                chat: [

                ],
                answers: [],
                conv: null
            }

        },
        created() {
            bus.$on('chooseAnswer', (data) => {
                this.chooseAnswer(data)
            })

            bus.$on('sendData', (mail) => {
                this.sendData(mail)
                console.log('coucou '+ this.mail)
            })
        },
        methods: {
            addUser(){
                console.log(this.nom, this.prenom, this.sexe, this.age);
                document.getElementById("answer_hole").remove();
                setTimeout(() => {
                    create_conv_right("Je m'appelle " + this.prenom + " " + this.nom + ", je suis " + this.sexe + " et j'ai " + this.age + " ans.");
                }, 500);

                setTimeout(() => {
                    document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                    Vue.nextTick(() => {
                        document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                    })
                }, 1000);

                setTimeout(() => {
                    document.querySelector('#loading').remove();
                    this.chat.push({
                        type: 'question',
                        content: `Enchanté ${this.prenom}, je vais te poser quelques questions sur tes habitudes de vote. Pas d'inquiétude, je ne te demanderai jamais tes choix politiques.`,
                        id: this.chat.length + 1,
                        photo: true
                    });
                    Vue.nextTick(() => {
                        document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                    })
                    this.chat.push({
                        type: 'quizz',
                        answers: ["C'est parti !"],
                        id: this.chat.length + 1,
                        photo: true
                    });
                    Vue.nextTick(() => {
                        document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                    })
                }, 2500)
            },
            async sendData(input){
                this.mail = input;
                console.log("async " +input)
                //const loader = document.querySelector('.hidden')

                const asyncFetch = async (path) => {

                    //loader.classList.remove('hidden')

                    const dataUser = {
                        firstname: this.prenom,
                        lastname: this.nom,
                        email: this.mail,
                        age: this.age,
                        author: "jonathan"
                    };

                    const response = await fetch(path, {
                        method: 'POST',
                        body: JSON.stringify(dataUser),
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json;charset=utf-8',
                        }
                    });

                    console.log(JSON.stringify(dataUser))
                    const dataResponse = await response.json()

                    //loader.classList.add('hidden')

                    console.log(dataResponse)

                };

                await asyncFetch('https://ldp.dwsapp.io/mm4-europe/');
                document.querySelector('#submitMail').remove();
                create_conv_right("Oui, mon email est : " + this.mail);
                setTimeout(() => {
                    document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                    Vue.nextTick(() => {
                        document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                    })
                }, 1000);
                setTimeout(() => {
                    document.querySelector('#loading').remove()
                    this.chat.push({
                        type: 'question', content: 'Merci ! Tu vas désormais pouvoir choisir ton candidat. A très vite ;)', id: this.chat.length + 1,
                        photo:true
                    });
                    Vue.nextTick(() => {
                        document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                    })
                }, 2500);
                setTimeout(() => {
                    window.open('/ca/tinder.html', "_self");
                }, 5000);

            },

            chooseAnswer(data) {
                this.chat.splice(-1,1);
                this.chat.push({type: 'answer', content: data, id: this.chat.length + 1});
                const choice = this.chat.slice(-2);
                const lastAnswer = {
                    question: choice[0].content,
                    answer: data
                };
                this.answers.push(lastAnswer);

                /*
                lastAnswer.question : dernière question répondue
                lastAnswer.answer : réponse
                 */

                if(lastAnswer.question === `Enchanté ${this.prenom}, je vais te poser quelques questions sur tes habitudes de vote. Pas d'inquiétude, je ne te demanderai jamais tes choix politiques.`) {
                    if(lastAnswer.answer === "C'est parti !") {
                        document.querySelector('#etape2').classList.add('line_step_active');
                        this.numero += 1;
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question', content: 'Tout d’abord, as-tu déjà voté (élections législatives, présidentielles, européennes…) ?', id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            this.chat.push({
                                type: 'quizz', answers: ["Oui, j'ai déjà voté", "Non, je n'avais pas 18 ans", "Non, bien que j'avais l'âge"], id: this.chat.length + 1,
                                photo:true
                            });

                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })

                        }, 2500);


                    }
                }

                if(lastAnswer.question === "Tout d’abord, as-tu déjà voté (élections législatives, présidentielles, européennes…) ?") {
                    if(lastAnswer.answer === "Oui, j'ai déjà voté") {
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: 'Super ! Je propose de t’envoyer un récapitulatif simplifié des différents programmes de ces européennes. \n' +
                                'Pour le recevoir, merci de renseigner ton adresse mail (n’ai crainte elle restera entre nous).',
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            this.chat.push({
                                type: 'mail'
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            document.querySelector('#etape3').classList.add('line_step_active');
                            this.numero += 1;
                        }, 2500);


                    }
                    else if(lastAnswer.answer === "Non, je n'avais pas 18 ans") {
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: 'C’est une bonne raison :) Je propose de t’envoyer un récapitulatif simplifié des différents programmes de ces européennes. \n' +
                                'Pour le recevoir, merci de renseigner ton adresse mail (n’ai crainte elle restera entre nous).',
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            document.querySelector('#etape3').classList.add('line_step_active');
                            this.numero += 1;
                            this.chat.push({
                                type: 'mail'
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 2500);


                    } else if(lastAnswer.answer === "Non, bien que j'avais l'âge") {
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: 'Pourquoi n’as tu pas voté ?',
                                id: this.chat.length + 1,
                                photo: true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            this.chat.push({
                                type: 'quizz',
                                answers:
                                    ['Je ne savais pas pour qui voter',
                                        'Je ne savais pas où trouver un bureau de vote',
                                        'Je ne savais pas qu’il y avait des élections',
                                        "Je n’ai pas reçu ma carte d’électeur",
                                        "Je ne crois plus au système de vote"],
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 2500);

                    }
                }



                if(lastAnswer.question === "Pourquoi n’as tu pas voté ?") {
                    if (lastAnswer.answer === "Je ne savais pas pour qui voter") {
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: "Je comprends ! C’est un choix difficile et fastidieux à prendre. Je propose donc de t’envoyer un récapitulatif simplifié des différents programmes de ces européennes. \n" +
                                "Pour le recevoir, merci de renseigner ton adresse mail (n’ai crainte elle restera entre nous).\n" +
                                "Ensuite, nous passerons à notre questionnaire interactif pour découvrir quel candidat te correspond le plus !",
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            document.querySelector('#etape3').classList.add('line_step_active');
                            this.numero += 1;
                            this.chat.push({
                                type: 'mail'
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 2500);

                    }
                    else if (lastAnswer.answer === "Je ne savais pas où trouver un bureau de vote") {
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: "Pour ces élections européennes, nous t’avons simplifié la tâche. Renseigne ton adresse et nous t’indiquons le bureau de vote le plus proche. Veux-tu le rechercher ?",
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            this.chat.push({
                                type: 'quizz', answers: ['Oui, avec plaisir !',
                                    'Non merci, je sais désormais où aller.',
                                ], id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })

                        }, 2500);
                    }


                    else if (lastAnswer.answer === "Je ne savais pas qu’il y avait des élections") {
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: "Faute avouée à moitié pardonnée ! Pour t’aider dans ton choix; je propose de t’envoyer un récapitulatif simplifié des différents programmes de ces européennes.\n" +
                                "Pour le recevoir, merci de renseigner ton adresse mail (n’ai crainte elle restera entre nous).\n",
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            document.querySelector('#etape3').classList.add('line_step_active');
                            this.numero += 1;
                            this.chat.push({
                                type: 'mail'
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })                        }, 2500);

                    }
                    else if (lastAnswer.answer === "Je n’ai pas reçu ma carte d’électeur") {
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: "Pour pallier ce problème, nous t’invitons à aller vérifier l’exactitude de ton adresse postale auprès de ta mairie. Pour t’aider dans ton choix, je propose de t’envoyer un récapitulatif simplifié des différents programmes de ces européennes. \n" +
                                "Pour le recevoir, merci de renseigner ton adresse mail (n’ai crainte elle restera entre nous).",
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            document.querySelector('#etape3').classList.add('line_step_active');
                            this.numero += 1;
                            this.chat.push({
                                type: 'mail'
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })                        }, 2500);

                    }
                    else if (lastAnswer.answer === "Je ne crois plus au système de vote") {
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: "Malgré tout en tant que citoyen européen ton avis compte. Pour t’aider à faire un choix, je propose de t’envoyer un récapitulatif simplifié des différents programmes de ces européennes. \n" +
                                "Pour le recevoir, merci de renseigner ton adresse mail (n’ai crainte elle restera entre nous).",
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            document.querySelector('#etape3').classList.add('line_step_active');
                            this.numero += 1;
                            this.chat.push({
                                type: 'mail'
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })                        }, 2500);

                    }

                }
                if(lastAnswer.question === "Pour ces élections européennes, nous t’avons simplifié la tâche. Renseigne ton adresse et nous t’indiquons le bureau de vote le plus proche. Veux-tu le rechercher ?") {
                    if (lastAnswer.answer === "Oui, avec plaisir !") {
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: "Nous t'ouvrons le lien dans une nouvelle fenêtre. Reviens ici dès que tu as trouvé :)",
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 2500);

                        setTimeout(() => {
                            window.open('http://127.0.0.1:8080/ca/index.html#bureau_vote', '_blank');
                        }, 4500);
                        setTimeout(() => {
                            this.chat.push({
                                type: 'question',
                                content: "J'espère que tu as désormais obtenu tes informations !\n"+
                                "Nous allons pouvoir passer à notre questionnaire interactif pour découvrir quel candidat te correspond le plus !\n" +
                                "Juste avant, peux-tu nous indiquer ton mail pour que l'on puisse t'envoyer un récapitulatif des candidats ?",
                                id: this.chat.length + 1,
                                photo: false
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            document.querySelector('#etape3').classList.add('line_step_active');
                            this.numero += 1;
                            this.chat.push({
                                type: 'mail'
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 5000);

                    }else{
                        setTimeout(() => {
                            document.querySelector("#conversation").innerHTML += "<img id='loading' src='img/loading.gif'>"
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('#loading').remove();
                            this.chat.push({
                                type: 'question',
                                content: "Pas de soucis ! Nous allons pouvoir passer à notre questionnaire interactif pour découvrir quel candidat te correspond le plus !\n" +
                                "Juste avant, peux-tu nous indiquer ton mail pour que l'on puisse t'envoyer un récapitulatif des candidats ?",
                                id: this.chat.length + 1,
                                photo:true
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                            document.querySelector('#etape3').classList.add('line_step_active');
                            this.numero += 1;
                            this.chat.push({
                                type: 'mail'
                            });
                            Vue.nextTick(() => {
                                document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                            })
                        }, 2500);
                    }
                }
                /*
                Example :
                 */


                Vue.nextTick(() => {
                    document.querySelector('#conversation').scrollTo(0, document.querySelector('#conversation').scrollHeight)
                })




        }

    }
    })

});