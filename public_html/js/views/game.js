define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');
        var gameSession = require('models/Game/GameSession');
        var playerAnswer = require('models/Game/PlayerAnswer');
        var newgameView = require('views/newgame');/////?????????

        var View = Backbone.View.extend({

            id: "game",

            template: tmpl,
            model: new gameSession(),
            playerAnswer : new playerAnswer(),
            questionCounter: 0,

            events : {
                'click #next' : 'nextQuestion',
                'click #finish' : 'getResult'
            },

            getQuestion: function(index) {
                if( index >= 0 ) {
                    question = this.model.get("questions");
                    console.log(question, index);
                    question[index]["login"] = this.model.get("login");
                    question[index]["questionsNum"] = this.model.get("questionsNum");
                    question[index]["questionCounter"] = index;
                    return question[index];
                }
                return;
            },

            initialize: function() {
                self = this;
                newgameView.on("startGame", function() {
                    self.model.fetch({
                        success: function(response) {
                            self.render(self.questionCounter++);
                        }
                    });
                    
                });
            },

            render: function (index) {
                this.$el.html(this.template(this.getQuestion(index)));
                return this;
            },

            nextQuestion: function(e) {
                e.preventDefault();
                this.playerAnswer.set({
                    "question" : this.model.get("questions")[this.questionCounter - 1].id ,
                    "answer" : $('input[name="answer"]:checked').parent().text()
                })
                this.playerAnswer.save();
                this.render(this.questionCounter++);
            },

            getResult: function(e) {
                e.preventDefault();
                this.playerAnswer.set({
                    "question" : this.model.get("questions")[this.questionCounter - 1].id ,
                    "answer" : $('input[name="answer"]:checked').parent().text()
                })
                this.playerAnswer.save({
                    success : function() {
                        window.location.hash = "finish";
                        this.trigger("finishGame");
                    }
                });        
            },

            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
            },
            
            hide: function () {
                this.$el.hide();
            }
        });
        return new View();
    }
);







