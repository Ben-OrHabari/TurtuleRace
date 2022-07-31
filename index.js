import { data } from './data.js';
const config = {
    limit: document.querySelector('#tracks').offsetWidth,
    iconWidth: 50,
};

const state = {
    timer: { id: null },
};

function getTurtle(turtle, config) {
    const img = document.createElement('img');
    img.src = turtle.icon;
    img.height = config.iconWidth;
    img.style.position = 'relative';
    return img;
}

function createTracks(data, state, config) {
    const tracks = data.map(turtle => {
        const track = document.createElement('div');
        track.style.backgroundColor = turtle.color;
        track.append(getTurtle(turtle, config));
        return track;
    });
    document.querySelector('#tracks').append(...tracks);
}

function updateTracks(data) {
    const tracks = Array.from(document.querySelectorAll('#tracks > div'));
    tracks.forEach((track, i) => {
        const turtle = data[i];
        track.querySelector('img').style.left = `${turtle.position}px`;
    });
};

function getLeadTurtle(data) {
    return data.reduce((lead, curr) => {
        if (lead.position > curr.position) {
            return lead;
        };
        return curr;
    }, data[0]);
}

function getOrderOfTurtles(data) {
    const arrangingData = [...data];
    const podiumOrder = arrangingData.sort(
        (turtle1, turtle2) => { return turtle2.position - turtle1.position });
    console.log(podiumOrder);
    return podiumOrder;
}

function createTable(podiumOrder) {
    const table = document.getElementById('turtle_table');
    const podium = getOrderOfTurtles(podiumOrder);
    for (let i = 0; i < podium.length; i++) {
        table.children()[i + 1].getElementById...
    }
    document.querySelector('#first').textContent = podium[0].name;
    document.querySelector('#second').textContent = podium[1].name;
    document.querySelector('#third').textContent = podium[2].name;
    document.querySelector('#fourth').textContent = podium[3].name;
}

function setStateSpeed(data, state) {
    state.first = data[0];
    state.second = data[1];
    state.third = data[2];
    state.fourth = data[3];
}

function getSpeed() {
    return Math.random() + Math.random() + Math.random() * 100;
}

function setTurtlesNextSpeed(data) {
    data.map(turtle => turtle.nextSpeed = getSpeed());
}

function drawFrame(data, state, config) {
    const limit = config.limit - config.iconWidth;
    setTurtlesNextSpeed(data);
    const leadTurtle = getLeadTurtle(data);
    if (leadTurtle.position + leadTurtle.nextSpeed >= limit) {

        state.winner = leadTurtle;
        createTable(data);
        updateWinner(leadTurtle)
        return;
    }
    for (const turtle of data) {
        turtle.speed = turtle.nextSpeed;
        turtle.position += turtle.speed;
    }
    createTable(data);
    setStateSpeed(getOrderOfTurtles(data), state);
    updateTracks(data);

    state.timer.id = setTimeout(() => drawFrame(data, state, config), 1000 / 120);

};

function resetPosition(data, pos = 0) {
    for (const turtle of data) {
        turtle.position = pos;
    }
}

function updateWinner(turtle) {
    const winner = document.getElementById('winner');
    winner.textContent = ` ${turtle.name}`;
    winner.style.backgroundColor = ` ${turtle.color}`;
}


document.querySelector('#reset').addEventListener('click', () => {
    resetPosition(data);
});
document.querySelector('#restart').addEventListener('click', () => {
    clearTimeout(state.timer.id);
    resetPosition(data);
    updateTracks(data);
    drawFrame(data, state, config);
})
createTracks(data, state, config);
resetPosition(data);
drawFrame(data, state, config);