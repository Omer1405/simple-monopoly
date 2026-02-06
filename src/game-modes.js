// game-modes.js

function selectGameMode() {
    const modeSelection = document.createElement('div');
    modeSelection.setAttribute('id', 'game-mode-selection');

    const offlineButton = document.createElement('button');
    offlineButton.innerText = 'Offline (vs AI)';
    offlineButton.onclick = () => { startOfflineGame(); };

    const onlineButton = document.createElement('button');
    onlineButton.innerText = 'Online (Create/Join Session)';
    onlineButton.onclick = () => { startOnlineGame(); };

    modeSelection.appendChild(offlineButton);
    modeSelection.appendChild(onlineButton);
    document.body.appendChild(modeSelection);
}

function startOfflineGame() {
    // Logic for starting the offline game
    console.log('Starting offline game...');
}

function startOnlineGame() {
    // Logic for creating or joining an online session
    console.log('Starting online game...');
}

// Call the selectGameMode function to display the UI
selectGameMode();
