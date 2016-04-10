define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');
        var gameSession = require('models/Game/GameSession');
        var session = require('models/Session');

        var View = Backbone.View.extend({
            template: tmpl,
            id: "game",

    
            model : new gameSession(),

            startForDraw :  {
                x : null,
                y : null
            },

            events : {
                "click #quit" : 'handleQuit',
                'click canvas#gameCanvas' : 'handleDrawInitialPoints' 
            },

            handleDrawInitialPoints: function(e) {
                e.preventDefault();
                this.canvas.beginPath(); 
                this.canvas.strokeStyle = "#FF0000";
                this.canvas.lineWidth = 5;
                scaleCoeff = 490  / 7;
                this.canvas.arc(this.model.get('redx') * scaleCoeff, this.model.get('redy') * scaleCoeff, 5, 0, Math.PI*2, false);
                this.canvas.stroke(); 
                this.canvas.closePath();
                this.canvas.beginPath();
                this.canvas.strokeStyle = "#004DFF";
                this.canvas.arc(this.model.get('bluex') * scaleCoeff, this.model.get('bluey') * scaleCoeff, 5, 0, Math.PI*2, false);
                this.canvas.stroke(); 
            },


            handleQuit: function(e) {
                console.log("finish");
                e.preventDefault();
                this.model.destroy();//fix
                $(document).unbind('keydown', this.keyAction);
                this.trigger("finish");
            },

            connectToGame: function() {
                self = this;
                new session().fetch({
                    success: function(response) {
                        //self.trigger("Authorized user");
                        data = {login : response.toJSON().login};        
                        self.model.save({}, {
                            type : "put",
                            data: JSON.stringify(data),
                            contentType: "application/json",
                            success: function() {
                                redData = {
                                    x : self.model.get("redx"),
                                    y : self.model.get("redy")
                                };

                                self.startForDraw.x =  self.model.get("bluex");
                                self.startForDraw.y =  self.model.get("bluey");

                                //получение соседних точек для синего игрока (bluex, bluey) 
                                self.model.save(redData, { patch : true });
                                console.log(self.model.toJSON());
                            },
                            error: function() {
                                console.log("You didn't get the neighbour points for your initial point");
                            }              
                        });
                    },
                    error: function() {
                        //self.trigger("Unauthorized user");
                        console.log("You need authorize to start game");
                        return false;
                    }
                });
            },

            initialize: function() {
                _.bindAll(this, 
                    'keyAction'
                );
                $(document).bind('keydown', this.keyAction);
            },

            render: function () {   
                this.$el.html(this.template());
                this.canvas = this.$el.find("#gameCanvas")[0].getContext("2d");
             
                //строим красные границы - левая и верхняя стороны
                this.canvas.beginPath();
                this.canvas.lineWidth = 4;
                this.canvas.strokeStyle = "#FF0000";
                this.canvas.moveTo(0, 490);
                this.canvas.lineTo(0, 0);
                this.canvas.lineTo(490, 0);
                this.canvas.stroke();
                
                //строим синие границы - правая и нижняя стороны
                this.canvas.beginPath();
                this.canvas.lineWidth = 4;
                this.canvas.strokeStyle ="#004DFF";
                this.canvas.moveTo(490, 0);
                this.canvas.lineTo(490, 490);
                this.canvas.lineTo(0, 490);
                this.canvas.stroke();

                //сетка
                this.canvas.beginPath();
                this.canvas.lineWidth = 1;
                this.canvas.strokeStyle = "#000000";
                for( var i = 0; i < 8; i++ ) {
                    this.canvas.moveTo(70 * i, 0);
                    this.canvas.lineTo(70 * i, 490);
                    this.canvas.moveTo(0, 70 * i);
                    this.canvas.lineTo(490, 70 * i);
                }
                this.canvas.stroke();
                /*
                //вместо того, чтобы рисовать сетку по линиям, хотим загрузить картинку
                img = document.getElementById("gameField");
                img.onload = function () {
                    this.canvas.drawImage(img, 490, 490);// this is line 14
                }*/
            },

 

            drawLine: function(xStart, yStart, xEnd, yEnd, color) {
                this.canvas.beginPath();
                this.canvas.lineWidth = 6;
                this.canvas.strokeStyle = color;
                this.canvas.moveTo(xStart, yStart);
                this.canvas.lineTo(xEnd, yEnd);
                this.canvas.stroke();
            },

            isFinishGame: function() { 
                for (var state in ['left', 'top', 'right', 'bottom']) {
                    if( this.model.get(state)["x"] !== -1 || this.model.get(state)["y"] !== -1 ) {
                        return false;
                    }
                } 
                return true;
            },

            renderPath: function(state, isBluePlayer) {
                //нарисовать линию между текущей точкой и точкой, определяемой нажатой клавишей
                console.log("отсчет для рисования", this.startForDraw.x, this.startForDraw.y);

                scaleCoeff = 490 / 7;
                if( isBluePlayer ) {
                    color = "#004DFF";
                } else {
                    color = "#FF0000";
                }
               
                if( !this.isFinishGame() ) {
                    if( this.model.get(state)["x"] !== -1 && this.model.get(state)["y"] !== -1 ) {
                        this.drawLine(this.startForDraw.x * scaleCoeff, this.startForDraw.y * scaleCoeff, this.model.get(state)["x"] * scaleCoeff,  this.model.get(state)["y"] * scaleCoeff, color);
                    
                        this.startForDraw.x = this.model.get("x");
                        this.startForDraw.y = this.model.get("y");

                        data = {
                            x : this.model.get(state)["x"],
                            y : this.model.get(state)["y"]
                        };
                        //отправляем пост запрос
                        this.model.save(data, {patch : true});
                    } else {
                        alert("Вы не можете так идти");
                    }
                    
                } else {
                    //временная реализация на alert-ах, необходимо сделать в дальнейшем дополнительную вьюху finish.js
                    if( isBluePlayer == true ) {
                        alert("Победа красного игрока")
                    } else {
                        alert("Победа синего игрока");
                    }
                }
            },

            
           
            keyAction : function(e) {
                var code = e.keyCode || e.which;
                
                switch (code) {
                    //blue player
                    case 37:
                        this.renderPath("left", true);           
                        break;
                    case 38:
                        this.renderPath("top", true);
                        break;
                    case 39:
                        this.renderPath("right", true);
                        break;
                    case 40:
                        this.renderPath("bottom", true);
                        break;

                    //red player
                    case 65:
                        this.renderPath("left",  false);
                        break;
                    case 87:
                        this.renderPath("top", false);
                        break;
                    case 68:
                        this.renderPath("right", false);
                        break;
                    case 83:
                        this.renderPath("bottom", false);      
                        break;                     
                }
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

