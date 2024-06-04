var boxes = Array.from(document.getElementsByClassName('box'));
var restart_button = document.getElementById('restartBtn');
var prev_button = document.getElementById('prevBtn');
var won_cond = document.getElementById('won');
var current_player = 'X';
var last_move = null;

const start_game = () => {
    boxes.forEach(box => box.addEventListener('click', box_clicked));
}

function box_clicked(e) {
    if (e.target.innerHTML === 'X' || e.target.innerHTML === 'O') {
        alert("Box is already used");
    } else {
        e.target.innerHTML = current_player;
        last_move = e.target;
        const [hasWon, winIndices] = checkwin();

        if (hasWon) {
            setTimeout(() => {
                winIndices.forEach(index => {
                    boxes[index].innerHTML = `<s style="color: cyan;">${boxes[index].innerHTML}</s>`;
                    boxes[index].style.fontSize = '4em';
                });
                won_cond.innerHTML = `<p style="color: cyan;">Player ${current_player} won</p>`;
                won_cond.style.fontSize = '2em';
                prev_button.style.display = 'none';
                boxes.forEach(box => box.removeEventListener('click', box_clicked));
            }, 100);
        } else if (is_tied()) {
            won_cond.innerHTML = `<p style="color: cyan;">It's a Tie</p>`;
            won_cond.style.fontSize = '2em';
        } else {
            current_player = (current_player === 'X') ? 'O' : 'X';
        }
    }
}

function is_tied() {
    for (const box of boxes) {
        if (box.innerHTML === '') {
            return false;
        }
    }
    return true;
}

function checkwin() {
    const winning_combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winning_combos) {
        const [a, b, c] = combo;
        if (boxes[a].innerHTML === current_player &&
            boxes[b].innerHTML === current_player &&
            boxes[c].innerHTML === current_player) {
            return [true, [a, b, c]];
        }
    }
    return [false, []];
}

restart_button.addEventListener('click', restart);

function restart() {
    current_player = 'X';
    last_move = null;
    boxes.forEach(box => {
        box.innerHTML = '';
        box.style.color = '';
        box.style.fontSize = '';
        box.addEventListener('click', box_clicked);
    });
    won_cond.innerText = '';
    prev_button.style.display = 'inline-block';
}

prev_button.addEventListener('click', prev);

function prev() {
    if (last_move) {
        last_move.innerHTML = '';
        last_move.style.color = '';
        last_move.style.fontSize = '';
        current_player = (current_player === 'X') ? 'O' : 'X';
        last_move = null;
    }
}

start_game();
