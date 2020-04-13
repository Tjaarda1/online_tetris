/* ------- FUNCIONES CLASE: CONSTRUCTOR Y OTROS -------- */

class figure {
    constructor(x, y, array) {
        this.x = x
        this.y = y
        this.array = array;
    }
}

figure.prototype.addToBoard = function() {
    for (var f = 0; f < this.array.length; f++) {
        for (var c = 0; c < this.array[0].length; c++) {
            if (this.array[f][c] != undefined) {
                board[this.y + f][this.x + c] = this.array[f][c];
            }
        }
    }
}



/* ------- FUNCIONES CLASE: IMPRESIÓN DE FIGURA --------- */

figure.prototype.draw = function(type) {
    

    for (var f = 0; f < this.array.length; f++) {
        for (var c = 0; c < this.array[0].length; c++) {
            if (this.array[f][c] != undefined) {

                ctx1.beginPath()
                ctx1.rect(square * (this.x + c) + 2*pad, square * (this.y + f) + 2*pad, square - 4*pad, square - 4*pad)
                
                if (type == "preview") {
                    ctx1.fillStyle = palette[7]
                    ctx1.strokeStyle = palette[15]

                } else {
                    ctx1.clearRect(square * (this.x + c) + 1*pad, square * (this.y + f) + 1*pad, square - 2*pad, square - 2*pad) // Evita solaparse con getPreview()
                    ctx1.fillStyle = palette[this.array[f][c]]
                    ctx1.strokeStyle = palette[this.array[f][c] + 8]
                }

                ctx1.fill()
                ctx1.stroke()
                ctx1.closePath()
            }
        }
    }
}

figure.prototype.undraw = function() {
    for (var f = 0; f < this.array.length; f++) {
        for (var c = 0; c < this.array.length; c++) {
            if (this.array[f][c] != undefined) {
                ctx1.clearRect(square * (this.x + c) + pad, square * (this.y + f) + pad, square - 2*pad, square - 2*pad)
            }
        }
    }
}

figure.prototype.showInOtherCanvas = function(canvas, ctx) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGrid(canvas, ctx)

    if (this != undefined) {
        for (var f = 0; f < this.array.length; f++) {
            for (var c = 0; c < this.array[0].length; c++) {
                if (this.array[f][c] != undefined) {
                    ctx.beginPath()
                    ctx.rect((c + 1)*square + 2*pad, (f + 1)*square + 2*pad, square - 4*pad, square - 4*pad)
                    ctx.fillStyle = palette[this.array[f][c]]
                    ctx.strokeStyle = palette[this.array[f][c] + 8]
                    ctx.fill()
                    ctx.stroke()
                    ctx.closePath()
                }
            }
        }
    }
}



/* ------- FUNCIONES CLASE: MOVIMIENTO DE FIGURA -------- */

figure.prototype.move = function (dx, dy) {
    this.x += dx
    this.y += dy
}

figure.prototype.rotate = function(aux) {
    var choc = 0;
    for (var i = 0; i < this.array.length; i++) {
        for (var j = 0; j < this.array[0].length; j++) {
            this.array[i][j] = aux[(this.array.length - 1) - j][i];
        }
    }

    while (this.crash(0, 0)) {
        if (this.crash(0, 1)) {
            this.x--
            choc++
        }
        if (this.crash(0, -1)) {
            this.x++
            choc++
        }
        if (choc > 5) {
            this.array = JSON.parse(JSON.stringify(aux));
        }
    }
}

figure.prototype.crash = function(dy, dx) {
    for (var f = 0; f < this.array.length; f++) {
        for (var c = 0; c < this.array[0].length; c++) {

            if (this.y + f + dy < 0) {
                dy = 2
            }

            if (this.array[f][c] != undefined && (
                // Si sobrepaso por los lados...
                this.x + dx + c >= board[0].length || this.x + dx + c < 0
                // ... o excedo el board
                || this.y + f + dy >= board.length
                // ... o coincido con una figura congelada
                || board[this.y + f + dy][this.x + c + dx] >= 0
            )
            ) {
                return true;
            }
        }
    }
}



/* ----------------- FUNCIONES: OTROS ------------------ */

function pickFigure() {
    allow_save_mode = true;
    //llamar a la funcion aleatoria y que devuelva un numero
    var color = Math.floor(Math.random() * 7); //randomNumber()

    var picker = Math.floor(Math.random() * 7);
    var array, x, y = [];

    switch (picker) {

        case 0:
            x = 3;
            y = -2;
            array = [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ];
            break;

        case 1:
            x = 3;
            y = -2;
            array = [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ];
            break;

        case 2:
            x = 3;
            y = -2;
            array = [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]
            ];
            break;

        case 3:
            x = 4;
            y = -2;
            array = [
                [1, 1],
                [1, 1]
            ];
            break;

        case 4:
            x = 3;
            y = -1;
            array = [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ];
            break;

        case 5:
            x = 3;
            y = -1;
            array = [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];
            break;

        case 6:
            x = 3;
            y = -1;
            array = [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ];
            break;
    }

    //este bucle pasa nuestro array a la nomenclatura de los 0 son undefined y los 1 los multiplica ya por su color
    //esto lo hago porque habia que cambiarlo para hacer el gravity y ademas lo hago aqui abajo en este bucle for
    //para que los arrays de arriba se vean mas claros.
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array[0].length; j++) {
            if (array[i][j] == 0) {
                array[i][j] = undefined
            }
            else {
                array[i][j] = array[i][j] * color
            }
        }
    }
    
    return new figure(x, y, array)
}

function getPreview() {

    var preview_figure = new figure(player.x, player.y, player.array);

    while (!preview_figure.crash(1, 0)) {
        preview_figure.move(0, 1);
    }

    return preview_figure;
}