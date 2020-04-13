/* ------- FUNCIONES: INICIALIZACIÓN DEL TABLERO -------- */

function createBoard() {
    newBoard = new Array(canvas1.height / square)

    for (i = 0; i < newBoard.length; i++) {
        newBoard[i] = new Array(canvas1.width / square)
    }

    return newBoard
}

function clearBoard() {
    for (i = 0; i < board.length; i++) {
        for (j = 0; j < board[0].length; j++) {
            board[i][j] = undefined
        }
    }
}



/* ---------- FUNCIONES: IMPRESIÓN DEL TABLERO ---------- */

function drawGrid(canvas, ctx) {
    
    var j = 0
    for (var i = 0; i < canvas.height * square; i = i + square) {

        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width * square, i)
        ctx.strokeStyle = palette[16]
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(j, 0)
        ctx.lineTo(j, canvas.height * square)
        ctx.strokeStyle = palette[16]
        ctx.stroke()
        ctx.closePath()

        if (j < canvas.width * square) {
            j = j + square;
        }
    }
}

function redraw() {

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)

    for (i = 0; i < board.length; i++) {
        for (j = 0; j < board[0].length; j++) {
            if (board[i][j] != undefined) {
                ctx1.beginPath()
                ctx1.rect(square * j + 2*pad, square * i + 2*pad, square - 4*pad, square - 4*pad)
                ctx1.fillStyle = palette[board[i][j]]
                ctx1.strokeStyle = palette[board[i][j] + 8]       
                ctx1.stroke()
                ctx1.fill();
                ctx1.closePath()
            }
        }
    }

    drawGrid(canvas1, ctx1);
}



/* ----------- FUNCIONES: SUPRESIÓN DE FILAS ------------ */

function deleteAbove(pos) {

    for (i = 0; i < pos; i++) {
        for (j = 0; j < board[0].length; j++) {
            board[i][j] = undefined
        }
    }
}

function initArray(aux, aux1) {
    //esta funcion retorna una copia de la fila aux hasta aux1 del board

    //inicializo el array y segun lo voy haciendo copio una nueva fila del board
    var array = new Array(aux1 - aux - 1);
    if (aux != 0) {
        aux++ //necesario para que el primer for de abajo se cumpla en todos los casos
    }
    for (i = aux; i < aux1; i++) {
        array[i - aux] = new Array(board[0].length)

        for (j = 0; j < board[0].length; j++) {
            array[i - aux][j] = board[i][j]
        }
    }
    return array
}

function breakblock(aux) {

    // Se activa cada seg. En caso de accelerate se activa más rapido
    for (i = 0; i < aux.length; i++) {
        for (j = 0; j < board[0].length; j++) {
            board[aux[i]][j] = undefined;
        }
    }
}

function checkrows() {

    var aux = []
    var aux1 = []
    var ArrayCompleto = [2]
    var previous = -8;

    for (i = 0; i < player.array.length; i++) {
        for (j = 0; j < board[0].length; j++) {
            if (player.y + i < board.length) {
                if (board[player.y + i][j] == undefined) {
                    break;
                }

                else if (j == board[0].length - 1) {
                    if (player.y + i != previous + 1) {    
                        previous = player.y + i 
                        aux.push(previous)
                    }
                    else{
                        previous++
                    }
                    
                    aux1.push(player.y + i)
                }
            }
        }
    }

    ArrayCompleto[0] = aux // sin coincidentes
    ArrayCompleto[1] = aux1 // todas las posiciones

    return ArrayCompleto
}

function gravity(rows) {
    // Baja las filas (gravedad)
    /* Ahora creamos todas las figuras según los valores que nos
    llegan, que ya están ordenados para que no nos tengamos que
    preocupar por filas consecutivas */

    var array1 = initArray(0, rows[0])
    var figure1 = new figure(0, 0, array1)
    


    // Si tan solo nos pasan una figura
    if (rows.length == 1) {
        deleteAbove(rows[0])
        while (!figure1.crash(1, 0)) {
            figure1.move(0, 1)
           
        }
        figure1.addToBoard()
    }

    // Si son dos
    else {

        var array2 = initArray(rows[0], rows[1]);
        var figure2 = new figure(0, (rows[0] + 1), array2)

        // Eliminamos las filas superiores
        deleteAbove(rows[1])

        // Bajamos las fichas hasta que haya un crash
        // Primero la de mas abajo, luego la de mas arriba
        while (!figure2.crash(1, 0)) {
            figure2.move(0, 1)
        }
        figure2.addToBoard()

        while (!figure1.crash(1, 0)) {
            figure1.move(0, 1)
        }
        figure1.addToBoard()
    }
    redraw()
}