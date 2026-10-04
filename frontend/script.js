
// ============================================================
// KEYBOARD WARRIOR
// COMPLETE FRONTEND JAVASCRIPT
// Backend is NOT changed by this file.
// ============================================================


// ============================================================
// SERVER
// ============================================================

const SERVER_URL = "ws://127.0.0.1:8000";


// ============================================================
// GET ELEMENTS
// ============================================================

// Pages
const homePage = document.getElementById("homePage");
const gamePage = document.getElementById("gamePage");
const multiplayerPage = document.getElementById("multiplayerPage");
const battlePage = document.getElementById("battlePage");
const resultPage = document.getElementById("resultPage");

// Home
const singlePlayerBtn = document.getElementById("singlePlayerBtn");
const multiplayerBtn = document.getElementById("multiplayerBtn");

// Single player
const typingText = document.getElementById("typingText");
const typingInput = document.getElementById("typingInput");

const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const errorsDisplay = document.getElementById("errors");
const timeDisplay = document.getElementById("time");

const restartBtn = document.getElementById("restartBtn");
const gameHomeBtn = document.getElementById("gameHomeBtn");

const modeButtons = document.querySelectorAll(
    "#singleModeButtons .mode-btn"
);

const lengthButtons = document.querySelectorAll(
    "#singleLengthButtons .length-btn"
);

const singleLengthGroup =
    document.getElementById("singleLengthGroup");

// Multiplayer lobby
const multiplayerHomeBtn =
    document.getElementById("multiplayerHomeBtn");

const createRoomBtn =
    document.getElementById("createRoomBtn");

const joinRoomBtn =
    document.getElementById("joinRoomBtn");

const roomInput =
    document.getElementById("roomInput");

const roomMessage =
    document.getElementById("roomMessage");

const multiModeButtons =
    document.querySelectorAll(
        "#multiModeButtons .mode-btn"
    );

const multiLengthButtons =
    document.querySelectorAll(
        "#multiLengthButtons .length-btn"
    );

const multiLengthGroup =
    document.getElementById("multiLengthGroup");

// Battle
const battleHomeBtn =
    document.getElementById("battleHomeBtn");

const battleRoomCode =
    document.getElementById("battleRoomCode");

const battleModeLabel =
    document.getElementById("battleModeLabel");

const connectionStatus =
    document.getElementById("connectionStatus");

const opponentTypingText =
    document.getElementById("opponentTypingText");

const battleTypingText =
    document.getElementById("battleTypingText");

const battleTypingInput =
    document.getElementById("battleTypingInput");

const opponentWpm =
    document.getElementById("opponentWpm");

const opponentAccuracy =
    document.getElementById("opponentAccuracy");

const opponentErrors =
    document.getElementById("opponentErrors");

const playerWpm =
    document.getElementById("playerWpm");

const playerAccuracy =
    document.getElementById("playerAccuracy");

const playerErrors =
    document.getElementById("playerErrors");

const battleMessage =
    document.getElementById("battleMessage");

// Result
const resultWpm =
    document.getElementById("resultWpm");

const resultAccuracy =
    document.getElementById("resultAccuracy");

const resultErrors =
    document.getElementById("resultErrors");

const resultTime =
    document.getElementById("resultTime");

const resultTitle =
    document.getElementById("resultTitle");

const resultSubtitle =
    document.getElementById("resultSubtitle");

const tryAgainBtn =
    document.getElementById("tryAgainBtn");

const rematchBtn =
    document.getElementById("rematchBtn");

const resultHomeBtn =
    document.getElementById("resultHomeBtn");

const rematchMessage =
    document.getElementById("rematchMessage");

// Account modal
const accountModal =
    document.getElementById("accountModal");

const closeAccountBtn =
    document.getElementById("closeAccountBtn");

const loginBtn =
    document.getElementById("loginBtn");

const signupBtn =
    document.getElementById("signupBtn");

const loginPanel =
    document.getElementById("loginPanel");

const signupPanel =
    document.getElementById("signupPanel");

const switchToSignup =
    document.getElementById("switchToSignup");

const switchToLogin =
    document.getElementById("switchToLogin");


// ============================================================
// SINGLE PLAYER DATA
// ============================================================

const sentenceText =
    "The quick brown fox jumps over the lazy dog.";

const quoteTexts = [
    "Success is the sum of small efforts repeated day in and day out.",
    "The future depends on what you do today.",
    "Great things are done by a series of small things brought together.",
    "Do not watch the clock. Do what it does. Keep going."
];

const paragraphText =
    "Every warrior knows that speed means nothing without accuracy and control. " +
    "Type with focus, correct your mistakes, and never stop moving. " +
    "Practice every day and your hands will become faster and more confident.";

const wordBank = [
    "the",
    "quick",
    "brown",
    "fox",
    "jumps",
    "over",
    "lazy",
    "dog",
    "warrior",
    "keyboard",
    "speed",
    "accuracy",
    "focus",
    "control",
    "battle",
    "strong",
    "fast",
    "power",
    "skill",
    "practice",
    "future",
    "dream",
    "create",
    "fight",
    "victory",
    "challenge",
    "player",
    "game",
    "master",
    "typing",
    "computer",
    "screen",
    "code",
    "javascript",
    "python",
    "server",
    "network",
    "friend",
    "online",
    "room",
    "winner",
    "finish",
    "start",
    "move",
    "attack",
    "defend",
    "learn",
    "build",
    "never",
    "stop"
];


// ============================================================
// SINGLE PLAYER STATE
// ============================================================

let singleMode = "words";
let singleLength = 25;

let singleText = "";
let singleTypedText = "";

let singleStartTime = null;
let singleTimerInterval = null;

let singleRunning = false;
let singleFinished = false;


// ============================================================
// MULTIPLAYER STATE
// ============================================================

let socket = null;

let playerId = "";
let currentRoomCode = "";

let multiplayerMode = "words";
let multiplayerLength = 25;

let battleText = "";
let battleTypedText = "";

let battleStartTime = null;
let battleTimerInterval = null;

let battleRunning = false;
let battleFinished = false;

let creator = false;
let reconnecting = false;


// ============================================================
// REMATCH STATE
// ============================================================

// IMPORTANT:
// This belongs to the frontend only.
// It prevents the same player from sending
// multiple rematch requests.

let rematchRequested = false;


// ============================================================
// PAGE SYSTEM
// ============================================================

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page =
        document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }
}


// ============================================================
// HOME
// ============================================================

if (singlePlayerBtn) {

    singlePlayerBtn.addEventListener(
        "click",
        () => {

            showPage("gamePage");

            restartSinglePlayer();

            setTimeout(() => {

                if (typingInput) {
                    typingInput.focus();
                }

            }, 100);

        }
    );
}


if (multiplayerBtn) {

    multiplayerBtn.addEventListener(
        "click",
        () => {

            showPage("multiplayerPage");

            setTimeout(() => {

                if (roomInput) {
                    roomInput.focus();
                }

            }, 100);

        }
    );
}


// ============================================================
// HOME BUTTONS
// ============================================================

if (gameHomeBtn) {

    gameHomeBtn.addEventListener(
        "click",
        () => {

            stopSingleTimer();

            showPage("homePage");

        }
    );
}


if (multiplayerHomeBtn) {

    multiplayerHomeBtn.addEventListener(
        "click",
        () => {

            closeSocket();

            stopBattleTimer();

            currentRoomCode = "";
            creator = false;

            showPage("homePage");

        }
    );
}


if (battleHomeBtn) {

    battleHomeBtn.addEventListener(
        "click",
        () => {

            closeSocket();

            stopBattleTimer();

            showPage("homePage");

        }
    );
}


if (resultHomeBtn) {

    resultHomeBtn.addEventListener(
        "click",
        () => {

            stopSingleTimer();
            stopBattleTimer();
            closeSocket();

            showPage("homePage");

        }
    );
}


// ============================================================
// WORD GENERATOR
// ============================================================

function generateWords(count) {

    let words = [];

    for (let i = 0; i < count; i++) {

        const randomIndex =
            Math.floor(
                Math.random() *
                wordBank.length
            );

        words.push(
            wordBank[randomIndex]
        );
    }

    return words.join(" ");
}


// ============================================================
// SINGLE PLAYER TEXT
// ============================================================

function getSingleText() {

    if (singleMode === "sentence") {
        return sentenceText;
    }

    if (singleMode === "paragraph") {
        return paragraphText;
    }

    if (singleMode === "quotes") {

        const randomIndex =
            Math.floor(
                Math.random() *
                quoteTexts.length
            );

        return quoteTexts[randomIndex];
    }

    return generateWords(singleLength);
}


// ============================================================
// RENDER SINGLE PLAYER TEXT
// ============================================================

function renderSingleText() {

    if (!typingText) {
        return;
    }

    typingText.innerHTML = "";

    for (
        let i = 0;
        i < singleText.length;
        i++
    ) {

        const span =
            document.createElement("span");

        span.classList.add("char");

        span.textContent =
            singleText[i];

        typingText.appendChild(span);
    }

    updateSingleCaret();
}


// ============================================================
// SINGLE CARET
// ============================================================

function updateSingleCaret() {

    if (!typingText) {
        return;
    }

    const chars =
        typingText.querySelectorAll(".char");

    chars.forEach(char => {
        char.classList.remove("current");
    });

    if (
        singleTypedText.length <
        singleText.length
    ) {

        const current =
            chars[singleTypedText.length];

        if (current) {
            current.classList.add("current");
        }
    }
}


// ============================================================
// SINGLE DISPLAY
// ============================================================

function updateSingleDisplay() {

    if (!typingText) {
        return;
    }

    const chars =
        typingText.querySelectorAll(".char");

    chars.forEach(
        (char, index) => {

            char.classList.remove("correct");
            char.classList.remove("wrong");

            if (
                index <
                singleTypedText.length
            ) {

                if (
                    singleTypedText[index] ===
                    singleText[index]
                ) {

                    char.classList.add(
                        "correct"
                    );

                } else {

                    char.classList.add(
                        "wrong"
                    );
                }
            }
        }
    );

    updateSingleCaret();
    updateSingleStats();
}


// ============================================================
// CALCULATE STATS
// ============================================================

function calculateStats(
    typed,
    target,
    startTime
) {

    let correct = 0;
    let errors = 0;

    for (
        let i = 0;
        i < typed.length;
        i++
    ) {

        if (
            typed[i] ===
            target[i]
        ) {

            correct++;

        } else {

            errors++;
        }
    }

    let wpm = 0;

    if (startTime) {

        const elapsedSeconds =
            (Date.now() - startTime) /
            1000;

        const elapsedMinutes =
            elapsedSeconds / 60;

        if (elapsedMinutes > 0) {

            wpm =
                Math.round(
                    (correct / 5) /
                    elapsedMinutes
                );
        }
    }

    let accuracy = 100;

    if (typed.length > 0) {

        accuracy =
            Math.round(
                (correct /
                    typed.length) *
                100
            );
    }

    return {
        wpm,
        accuracy,
        errors
    };
}


// ============================================================
// UPDATE SINGLE STATS
// ============================================================

function updateSingleStats() {

    const stats =
        calculateStats(
            singleTypedText,
            singleText,
            singleStartTime
        );

    if (wpmDisplay) {
        wpmDisplay.textContent =
            stats.wpm;
    }

    if (accuracyDisplay) {
        accuracyDisplay.textContent =
            stats.accuracy + "%";
    }

    if (errorsDisplay) {
        errorsDisplay.textContent =
            stats.errors;
    }
}


// ============================================================
// SINGLE TIMER
// ============================================================

function startSingleTimer() {

    if (singleRunning) {
        return;
    }

    singleRunning = true;
    singleStartTime = Date.now();

    singleTimerInterval =
        setInterval(
            () => {

                if (!singleStartTime) {
                    return;
                }

                const seconds =
                    Math.floor(
                        (
                            Date.now() -
                            singleStartTime
                        ) / 1000
                    );

                if (timeDisplay) {
                    timeDisplay.textContent =
                        seconds + "s";
                }

                updateSingleStats();

            },
            250
        );
}


function stopSingleTimer() {

    if (singleTimerInterval) {

        clearInterval(
            singleTimerInterval
        );

        singleTimerInterval = null;
    }

    singleRunning = false;
}


// ============================================================
// SINGLE INPUT
// ============================================================

if (typingInput) {

    typingInput.addEventListener(
        "input",
        () => {

            let value =
                typingInput.value;

            if (
                value.length >
                singleText.length
            ) {

                value =
                    value.substring(
                        0,
                        singleText.length
                    );

                typingInput.value =
                    value;
            }

            singleTypedText =
                value;

            if (
                !singleRunning &&
                singleTypedText.length > 0
            ) {

                startSingleTimer();
            }

            updateSingleDisplay();

            if (
                singleTypedText.length ===
                singleText.length
            ) {

                finishSinglePlayer();
            }
        }
    );


    typingInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Backspace") {
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();
            }
        }
    );
}


// ============================================================
// RESTART SINGLE PLAYER
// ============================================================

function restartSinglePlayer() {

    stopSingleTimer();

    singleTypedText = "";
    singleStartTime = null;
    singleRunning = false;
    singleFinished = false;

    singleText =
        getSingleText();

    if (typingInput) {
        typingInput.value = "";
    }

    if (wpmDisplay) {
        wpmDisplay.textContent = "0";
    }

    if (accuracyDisplay) {
        accuracyDisplay.textContent = "100%";
    }

    if (errorsDisplay) {
        errorsDisplay.textContent = "0";
    }

    if (timeDisplay) {
        timeDisplay.textContent = "0s";
    }

    renderSingleText();
}


// ============================================================
// FINISH SINGLE PLAYER
// ============================================================

function finishSinglePlayer() {

    if (singleFinished) {
        return;
    }

    singleFinished = true;

    stopSingleTimer();

    updateSingleStats();

    const stats =
        calculateStats(
            singleTypedText,
            singleText,
            singleStartTime
        );

    if (resultWpm) {
        resultWpm.textContent =
            stats.wpm;
    }

    if (resultAccuracy) {
        resultAccuracy.textContent =
            stats.accuracy + "%";
    }

    if (resultErrors) {
        resultErrors.textContent =
            stats.errors;
    }

    if (resultTime) {

        let seconds = 0;

        if (singleStartTime) {

            seconds =
                Math.floor(
                    (
                        Date.now() -
                        singleStartTime
                    ) / 1000
                );
        }

        resultTime.textContent =
            seconds + "s";
    }

    if (resultTitle) {
        resultTitle.textContent =
            "Test Complete";
    }

    if (resultSubtitle) {
        resultSubtitle.textContent =
            "Nice work. Ready for another round?";
    }

    if (tryAgainBtn) {
        tryAgainBtn.style.display = "";
    }

    if (rematchBtn) {
        rematchBtn.style.display = "none";
    }

    showPage("resultPage");
}


// ============================================================
// SINGLE MODE BUTTONS
// ============================================================

modeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            modeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            singleMode =
                button.dataset.mode;

            updateSingleLengthVisibility();

            restartSinglePlayer();
        }
    );

});


function updateSingleLengthVisibility() {

    if (!singleLengthGroup) {
        return;
    }

    if (
        singleMode === "words" ||
        singleMode === "paragraph"
    ) {

        singleLengthGroup.style.display =
            "";

    } else {

        singleLengthGroup.style.display =
            "none";
    }
}


// ============================================================
// SINGLE LENGTH BUTTONS
// ============================================================

lengthButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            lengthButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            singleLength =
                Number(
                    button.dataset.length
                );

            restartSinglePlayer();
        }
    );

});


// ============================================================
// TRY AGAIN
// ============================================================

if (tryAgainBtn) {

    tryAgainBtn.addEventListener(
        "click",
        () => {

            restartSinglePlayer();

            showPage("gamePage");

            setTimeout(() => {

                if (typingInput) {
                    typingInput.focus();
                }

            }, 100);
        }
    );
}


// ============================================================
// MULTIPLAYER MODE BUTTONS
// ============================================================

multiModeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            multiModeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            multiplayerMode =
                button.dataset.mode;

            updateMultiLengthVisibility();
        }
    );
});


function updateMultiLengthVisibility() {

    if (!multiLengthGroup) {
        return;
    }

    if (
        multiplayerMode === "words" ||
        multiplayerMode === "paragraph"
    ) {

        multiLengthGroup.style.display =
            "";

    } else {

        multiLengthGroup.style.display =
            "none";
    }
}


// ============================================================
// MULTIPLAYER LENGTH BUTTONS
// ============================================================

multiLengthButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            multiLengthButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            multiplayerLength =
                Number(
                    button.dataset.length
                );
        }
    );
});


// ============================================================
// PLAYER ID
// ============================================================

function generatePlayerId() {

    return (
        "player_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}


// ============================================================
// ROOM CODE
// ============================================================

function generateRoomCode() {

    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        code +=
            chars[
                Math.floor(
                    Math.random() *
                    chars.length
                )
            ];
    }

    return code;
}


// ============================================================
// ROOM MESSAGE
// ============================================================

function setRoomMessage(
    message,
    type = ""
) {

    if (!roomMessage) {
        return;
    }

    roomMessage.className =
        "room-message";

    if (type) {
        roomMessage.classList.add(type);
    }

    roomMessage.innerHTML =
        message;
}


// ============================================================
// CREATE ROOM
// ============================================================

if (createRoomBtn) {

    createRoomBtn.addEventListener(
        "click",
        createRoom
    );
}


function createRoom() {

    closeSocket();

    const roomCode =
        generateRoomCode();

    currentRoomCode =
        roomCode;

    creator = true;

    rematchRequested = false;

    playerId =
        generatePlayerId();

    setRoomMessage(
        `
        <div class="room-created">
            <div class="room-created-label">
                ROOM CREATED
            </div>

            <div class="room-code-display">
                ${roomCode}
            </div>

            <div class="room-share-text">
                Share this code with your opponent.
            </div>

            <div class="room-waiting">
                Connecting to server...
            </div>
        </div>
        `,
        "success"
    );

    connectToRoom(roomCode);
}


// ============================================================
// JOIN ROOM
// ============================================================

if (joinRoomBtn) {

    joinRoomBtn.addEventListener(
        "click",
        joinRoom
    );
}


function joinRoom() {

    const code =
        roomInput
            ? roomInput.value
                .trim()
                .toUpperCase()
            : "";

    if (!code) {

        setRoomMessage(
            "Please enter a room code.",
            "error"
        );

        return;
    }

    if (code.length < 4) {

        setRoomMessage(
            "Room code is too short.",
            "error"
        );

        return;
    }

    closeSocket();

    currentRoomCode =
        code;

    creator = false;

    rematchRequested = false;

    playerId =
        generatePlayerId();

    setRoomMessage(
        `
        <div class="room-created">
            <div class="room-created-label">
                JOINING ROOM
            </div>

            <div class="room-code-display">
                ${code}
            </div>

            <div class="room-waiting">
                Connecting to server...
            </div>
        </div>
        `,
        "success"
    );

    connectToRoom(code);
}


// ============================================================
// CONNECT TO WEBSOCKET
// ============================================================

function connectToRoom(roomCode) {

    const url =
        SERVER_URL +
        "/ws/" +
        encodeURIComponent(roomCode) +
        "/" +
        encodeURIComponent(playerId);

    console.log(
        "CONNECTING TO:",
        url
    );

    try {

        socket =
            new WebSocket(url);

    } catch (error) {

        console.error(
            "WebSocket creation error:",
            error
        );

        setRoomMessage(
            "Could not create WebSocket connection.",
            "error"
        );

        return;
    }

    socket.addEventListener(
        "open",
        () => {

            reconnecting = false;

            console.log(
                "WEBSOCKET CONNECTED"
            );

            if (connectionStatus) {
                connectionStatus.textContent =
                    "Connected";
            }

            if (creator) {

                setRoomMessage(
                    `
                    <div class="room-created">
                        <div class="room-created-label">
                            ROOM CREATED
                        </div>

                        <div class="room-code-display">
                            ${currentRoomCode}
                        </div>

                        <div class="room-share-text">
                            Share this code with your opponent.
                        </div>

                        <div class="room-waiting">
                            Waiting for another player...
                        </div>
                    </div>
                    `,
                    "success"
                );

                sendRoomConfig();

            } else {

                setRoomMessage(
                    `
                    <div class="room-created">
                        <div class="room-created-label">
                            ROOM FOUND
                        </div>

                        <div class="room-code-display">
                            ${currentRoomCode}
                        </div>

                        <div class="room-waiting">
                            Joining room...
                        </div>
                    </div>
                    `,
                    "success"
                );
            }
        }
    );


    socket.addEventListener(
        "message",
        event => {

            console.log(
                "SERVER:",
                event.data
            );

            handleServerMessage(
                event.data
            );
        }
    );


    socket.addEventListener(
        "error",
        error => {

            console.error(
                "WEBSOCKET ERROR:",
                error
            );

            setRoomMessage(
                "Could not connect to the game server. Make sure FastAPI is running.",
                "error"
            );

            if (connectionStatus) {
                connectionStatus.textContent =
                    "Connection error";
            }
        }
    );


    socket.addEventListener(
        "close",
        event => {

            console.log(
                "WEBSOCKET CLOSED:",
                event.code,
                event.reason
            );

            socket = null;

            if (
                battlePage &&
                battlePage.classList.contains("active")
            ) {

                if (!battleFinished) {

                    setBattleMessage(
                        "Connection closed.",
                        "error"
                    );
                }

            } else {

                if (!reconnecting) {

                    setRoomMessage(
                        "Connection closed. Check that the FastAPI server is running.",
                        "error"
                    );
                }
            }
        }
    );
}


// ============================================================
// SEND ROOM CONFIG
// ============================================================

function sendRoomConfig() {

    if (
        !socket ||
        socket.readyState !==
        WebSocket.OPEN
    ) {

        console.warn(
            "Cannot send room config: socket not open."
        );

        return;
    }

    socket.send(
        JSON.stringify({
            type: "room_config",
            mode: multiplayerMode,
            length: multiplayerLength
        })
    );

    console.log(
        "ROOM CONFIG SENT:",
        multiplayerMode,
        multiplayerLength
    );
}


// ============================================================
// HANDLE SERVER MESSAGE
// ============================================================

function handleServerMessage(rawMessage) {

    let data;

    try {

        data =
            typeof rawMessage === "string"
                ? JSON.parse(rawMessage)
                : rawMessage;

    } catch (error) {

        console.error(
            "Invalid server message:",
            rawMessage
        );

        return;
    }

    console.log(
        "HANDLED SERVER DATA:",
        data
    );


    switch (data.type) {

        case "room_joined":

            console.log(
                "ROOM JOINED:",
                data
            );

            if (data.room_code) {
                currentRoomCode =
                    data.room_code;
            }

            break;


        case "waiting":

            setRoomMessage(
                `
                <div class="room-created">
                    <div class="room-created-label">
                        ROOM CREATED
                    </div>

                    <div class="room-code-display">
                        ${currentRoomCode}
                    </div>

                    <div class="room-share-text">
                        Share this code with your opponent.
                    </div>

                    <div class="room-waiting">
                        Waiting for another player...
                    </div>
                </div>
                `,
                "success"
            );

            break;


        case "room_configured":

            console.log(
                "Room settings saved:",
                data.mode,
                data.length
            );

            setRoomMessage(
                `
                <div class="room-created">
                    <div class="room-created-label">
                        ROOM READY
                    </div>

                    <div class="room-code-display">
                        ${currentRoomCode}
                    </div>

                    <div class="room-share-text">
                        Share this code with your opponent.
                    </div>

                    <div class="room-settings">
                        ${formatMode(data.mode)}
                        ·
                        ${data.length || multiplayerLength}
                    </div>

                    <div class="room-waiting">
                        Waiting for another player...
                    </div>
                </div>
                `,
                "success"
            );

            break;


        // ====================================================
        // ROOM READY
        //
        // THIS IS ALSO USED FOR REMATCH.
        // ====================================================

        case "room_ready":

            console.log(
                "ROOM READY / NEW ROUND:",
                data
            );

            startBattleFromServer(data);

            break;


        case "opponent_typing":

            updateOpponentTyping(data);

            break;


        case "winner":

            handleWinner(data);

            break;


        case "loser":

            handleLoser(data);

            break;


        // ====================================================
        // REMATCH WAITING
        // ====================================================

        case "rematch_waiting":

            console.log(
                "REMATCH WAITING"
            );

            if (rematchMessage) {

                rematchMessage.textContent =
                    "Waiting for the other player to accept the rematch...";
            }

            if (rematchBtn) {
                rematchBtn.disabled = true;
            }

            break;


        case "opponent_left":

            setBattleMessage(
                "Your opponent left the room.",
                "error"
            );

            break;


        case "room_full":

            setRoomMessage(
                "This room is already full.",
                "error"
            );

            closeSocket();

            break;


        case "match_finished":

            console.log(
                "Match finished:",
                data
            );

            break;


        case "error":

            console.error(
                "SERVER ERROR:",
                data.message
            );

            setBattleMessage(
                data.message ||
                "The server returned an error.",
                "error"
            );

            if (rematchMessage) {

                rematchMessage.textContent =
                    data.message ||
                    "The server returned an error.";
            }

            break;


        default:

            console.log(
                "Unknown server message:",
                data
            );

            break;
    }
}


// ============================================================
// FORMAT MODE
// ============================================================

function formatMode(mode) {

    if (!mode) {
        return "Words";
    }

    return (
        mode.charAt(0).toUpperCase() +
        mode.slice(1)
    );
}


// ============================================================
// START BATTLE FROM SERVER
//
// THIS IS THE MAIN REMATCH FIX.
// ============================================================

function startBattleFromServer(data) {

    console.log(
        "===================================="
    );

    console.log(
        "STARTING / RESTARTING BATTLE"
    );

    console.log(
        "NEW CHALLENGE:",
        data
    );

    console.log(
        "===================================="
    );


    // --------------------------------------------------------
    // 1. STOP OLD TIMER
    // --------------------------------------------------------

    stopBattleTimer();


    // --------------------------------------------------------
    // 2. LOAD NEW SHARED TEXT
    // --------------------------------------------------------

    battleText =
        data.text ||
        data.paragraph ||
        "";


    // --------------------------------------------------------
    // 3. UPDATE SETTINGS
    // --------------------------------------------------------

    multiplayerMode =
        data.mode ||
        multiplayerMode;

    multiplayerLength =
        data.length ||
        multiplayerLength;


    // --------------------------------------------------------
    // 4. COMPLETELY RESET BATTLE STATE
    // --------------------------------------------------------

    battleTypedText = "";

    battleStartTime = null;

    battleRunning = false;

    battleFinished = false;

    rematchRequested = false;


    // --------------------------------------------------------
    // 5. CLEAR OLD INPUT
    // --------------------------------------------------------

    if (battleTypingInput) {

        battleTypingInput.value = "";

        battleTypingInput.disabled = false;

    }


    // --------------------------------------------------------
    // 6. RESET PLAYER + OPPONENT STATS
    // --------------------------------------------------------

    resetBattleStats();


    // --------------------------------------------------------
    // 7. RESET MESSAGES
    // --------------------------------------------------------

    if (battleMessage) {

        battleMessage.textContent = "";

        battleMessage.className =
            "battle-message";

    }


    if (rematchMessage) {

        rematchMessage.textContent = "";

    }


    // --------------------------------------------------------
    // 8. RESET REMATCH BUTTON
    // --------------------------------------------------------

    if (rematchBtn) {

        rematchBtn.style.display = "";

        rematchBtn.disabled = false;

    }


    // --------------------------------------------------------
    // 9. UPDATE ROOM HEADER
    // --------------------------------------------------------

    if (battleRoomCode) {

        battleRoomCode.textContent =
            currentRoomCode;

    }


    if (battleModeLabel) {

        battleModeLabel.textContent =
            formatMode(multiplayerMode);

    }


    if (connectionStatus) {

        connectionStatus.textContent =
            "Connected";

    }


    // --------------------------------------------------------
    // 10. RENDER THE NEW CHALLENGE
    // --------------------------------------------------------

    renderBattleText();

    renderOpponentText("");


    // --------------------------------------------------------
    // 11. IMPORTANT:
    // SWITCH RESULT PAGE → BATTLE PAGE
    // --------------------------------------------------------

    showPage("battlePage");


    // --------------------------------------------------------
    // 12. FOCUS NEW INPUT
    // --------------------------------------------------------

    setTimeout(() => {

        if (battleTypingInput) {

            battleTypingInput.focus();

        }

    }, 100);


    console.log(
        "NEW BATTLE IS READY."
    );
}


// ============================================================
// BATTLE TEXT
// ============================================================

function renderBattleText() {

    if (!battleTypingText) {
        return;
    }

    battleTypingText.innerHTML = "";

    for (
        let i = 0;
        i < battleText.length;
        i++
    ) {

        const span =
            document.createElement("span");

        span.classList.add("char");

        span.textContent =
            battleText[i];

        battleTypingText.appendChild(
            span
        );
    }

    updateBattleCaret();
}


// ============================================================
// BATTLE CARET
// ============================================================

function updateBattleCaret() {

    if (!battleTypingText) {
        return;
    }

    const chars =
        battleTypingText.querySelectorAll(
            ".char"
        );

    chars.forEach(char => {
        char.classList.remove("current");
    });

    if (
        battleTypedText.length <
        battleText.length
    ) {

        const current =
            chars[battleTypedText.length];

        if (current) {

            current.classList.add(
                "current"
            );
        }
    }
}


// ============================================================
// BATTLE DISPLAY
// ============================================================

function updateBattleDisplay() {

    if (!battleTypingText) {
        return;
    }

    const chars =
        battleTypingText.querySelectorAll(
            ".char"
        );

    chars.forEach(
        (char, index) => {

            char.classList.remove(
                "correct"
            );

            char.classList.remove(
                "wrong"
            );

            if (
                index <
                battleTypedText.length
            ) {

                if (
                    battleTypedText[index] ===
                    battleText[index]
                ) {

                    char.classList.add(
                        "correct"
                    );

                } else {

                    char.classList.add(
                        "wrong"
                    );
                }
            }
        }
    );

    updateBattleCaret();

    updateBattleStats();
}


// ============================================================
// BATTLE STATS
// ============================================================

function updateBattleStats() {

    const stats =
        calculateStats(
            battleTypedText,
            battleText,
            battleStartTime
        );

    if (playerWpm) {

        playerWpm.textContent =
            stats.wpm;
    }

    if (playerAccuracy) {

        playerAccuracy.textContent =
            stats.accuracy + "%";
    }

    if (playerErrors) {

        playerErrors.textContent =
            stats.errors;
    }
}


// ============================================================
// BATTLE TIMER
// ============================================================

function startBattleTimer() {

    if (battleRunning) {
        return;
    }

    battleRunning = true;

    battleStartTime =
        Date.now();

    battleTimerInterval =
        setInterval(
            () => {

                updateBattleStats();

            },
            250
        );
}


function stopBattleTimer() {

    if (battleTimerInterval) {

        clearInterval(
            battleTimerInterval
        );

        battleTimerInterval = null;
    }

    battleRunning = false;
}


// ============================================================
// BATTLE INPUT
// ============================================================

if (battleTypingInput) {

    battleTypingInput.addEventListener(
        "input",
        () => {

            if (battleFinished) {
                return;
            }

            let value =
                battleTypingInput.value;


            if (
                value.length >
                battleText.length
            ) {

                value =
                    value.substring(
                        0,
                        battleText.length
                    );

                battleTypingInput.value =
                    value;
            }


            battleTypedText =
                value;


            if (
                !battleRunning &&
                battleTypedText.length > 0
            ) {

                startBattleTimer();
            }


            updateBattleDisplay();

            sendTypingUpdate();


            if (
                battleTypedText.length ===
                battleText.length
            ) {

                finishBattle();
            }
        }
    );


    battleTypingInput.addEventListener(
        "keydown",
        event => {

            // Backspace works normally.
            if (event.key === "Backspace") {
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();
            }
        }
    );
}


// ============================================================
// SEND LIVE TYPING
// ============================================================

function sendTypingUpdate() {

    if (
        !socket ||
        socket.readyState !==
        WebSocket.OPEN
    ) {
        return;
    }

    const stats =
        calculateStats(
            battleTypedText,
            battleText,
            battleStartTime
        );

    socket.send(
        JSON.stringify({
            type: "typing",
            text: battleTypedText,
            wpm: stats.wpm,
            accuracy: stats.accuracy,
            errors: stats.errors
        })
    );
}


// ============================================================
// OPPONENT TEXT
// ============================================================

function renderOpponentText(
    typedText
) {

    if (!opponentTypingText) {
        return;
    }

    opponentTypingText.innerHTML = "";

    for (
        let i = 0;
        i < battleText.length;
        i++
    ) {

        const span =
            document.createElement("span");

        span.classList.add("char");

        span.textContent =
            battleText[i];


        if (
            i <
            typedText.length
        ) {

            if (
                typedText[i] ===
                battleText[i]
            ) {

                span.classList.add(
                    "correct"
                );

            } else {

                span.classList.add(
                    "wrong"
                );
            }
        }


        opponentTypingText.appendChild(
            span
        );
    }
}


// ============================================================
// OPPONENT UPDATE
// ============================================================

function updateOpponentTyping(data) {

    renderOpponentText(
        data.text || ""
    );

    if (opponentWpm) {

        opponentWpm.textContent =
            data.wpm ?? 0;
    }

    if (opponentAccuracy) {

        opponentAccuracy.textContent =
            (data.accuracy ?? 100) + "%";
    }

    if (opponentErrors) {

        opponentErrors.textContent =
            data.errors ?? 0;
    }
}


// ============================================================
// FINISH BATTLE
// ============================================================

function finishBattle() {

    if (battleFinished) {
        return;
    }

    battleFinished = true;

    stopBattleTimer();


    if (
        socket &&
        socket.readyState ===
        WebSocket.OPEN
    ) {

        const stats =
            calculateStats(
                battleTypedText,
                battleText,
                battleStartTime
            );

        socket.send(
            JSON.stringify({
                type: "finish",
                wpm: stats.wpm,
                accuracy: stats.accuracy,
                errors: stats.errors
            })
        );
    }
}


// ============================================================
// WINNER
// ============================================================

function handleWinner(data) {

    battleFinished = true;

    stopBattleTimer();

    const stats =
        calculateStats(
            battleTypedText,
            battleText,
            battleStartTime
        );

    showBattleResult(
        "VICTORY",
        "You won the battle.",
        stats
    );
}


// ============================================================
// LOSER
// ============================================================

function handleLoser(data) {

    battleFinished = true;

    stopBattleTimer();

    const stats =
        calculateStats(
            battleTypedText,
            battleText,
            battleStartTime
        );

    showBattleResult(
        "DEFEAT",
        "Your opponent won the battle.",
        stats
    );
}


// ============================================================
// SHOW BATTLE RESULT
// ============================================================

function showBattleResult(
    title,
    subtitle,
    stats
) {

    if (resultTitle) {
        resultTitle.textContent =
            title;
    }

    if (resultSubtitle) {
        resultSubtitle.textContent =
            subtitle;
    }

    if (resultWpm) {
        resultWpm.textContent =
            stats.wpm;
    }

    if (resultAccuracy) {
        resultAccuracy.textContent =
            stats.accuracy + "%";
    }

    if (resultErrors) {
        resultErrors.textContent =
            stats.errors;
    }

    if (resultTime) {

        let seconds = 0;

        if (battleStartTime) {

            seconds =
                Math.floor(
                    (
                        Date.now() -
                        battleStartTime
                    ) / 1000
                );
        }

        resultTime.textContent =
            seconds + "s";
    }


    if (tryAgainBtn) {
        tryAgainBtn.style.display =
            "none";
    }


    if (rematchBtn) {

        rematchBtn.style.display =
            "";

        rematchBtn.disabled =
            false;
    }


    // New result screen = new rematch request state.
    rematchRequested = false;


    if (rematchMessage) {
        rematchMessage.textContent =
            "";
    }


    showPage("resultPage");
}


// ============================================================
// BATTLE MESSAGE
// ============================================================

function setBattleMessage(
    message,
    type = ""
) {

    if (!battleMessage) {
        return;
    }

    battleMessage.textContent =
        message;

    battleMessage.className =
        "battle-message";

    if (type) {

        battleMessage.classList.add(
            type
        );
    }
}


// ============================================================
// RESET BATTLE
// ============================================================

function resetBattleStats() {

    if (opponentWpm) {
        opponentWpm.textContent = "0";
    }

    if (opponentAccuracy) {
        opponentAccuracy.textContent = "100%";
    }

    if (opponentErrors) {
        opponentErrors.textContent = "0";
    }

    if (playerWpm) {
        playerWpm.textContent = "0";
    }

    if (playerAccuracy) {
        playerAccuracy.textContent = "100%";
    }

    if (playerErrors) {
        playerErrors.textContent = "0";
    }
}


// ============================================================
// REMATCH
// ============================================================

if (rematchBtn) {

    rematchBtn.addEventListener(
        "click",
        () => {

            console.log(
                "REMATCH BUTTON CLICKED"
            );


            // --------------------------------------------
            // CHECK CONNECTION
            // --------------------------------------------

            if (
                !socket ||
                socket.readyState !==
                WebSocket.OPEN
            ) {

                if (rematchMessage) {

                    rematchMessage.textContent =
                        "Connection to the server is closed.";
                }

                return;
            }


            // --------------------------------------------
            // PREVENT DOUBLE CLICK
            // --------------------------------------------

            if (rematchRequested) {

                console.log(
                    "REMATCH ALREADY REQUESTED"
                );

                return;
            }


            rematchRequested = true;


            rematchBtn.disabled =
                true;


            if (rematchMessage) {

                rematchMessage.textContent =
                    "Requesting rematch...";
            }


            // --------------------------------------------
            // IMPORTANT:
            //
            // DO NOT CLOSE SOCKET.
            //
            // Same room.
            // Same players.
            // Same WebSocket.
            // New battle.
            // --------------------------------------------

            socket.send(
                JSON.stringify({
                    type: "rematch"
                })
            );


            console.log(
                "REMATCH REQUEST SENT"
            );
        }
    );
}


// ============================================================
// CLOSE SOCKET
// ============================================================

function closeSocket() {

    if (!socket) {
        return;
    }

    reconnecting = true;

    try {

        socket.close();

    } catch (error) {

        console.error(
            "Socket close error:",
            error
        );
    }

    socket = null;

    rematchRequested = false;
}


// ============================================================
// ACCOUNT MODAL
// ============================================================

function openAccountModal(
    panel = "login"
) {

    if (!accountModal) {
        return;
    }

    accountModal.classList.remove(
        "hidden"
    );

    accountModal.classList.add(
        "active"
    );


    if (panel === "signup") {

        showSignupPanel();

    } else {

        showLoginPanel();
    }
}


function closeAccountModal() {

    if (!accountModal) {
        return;
    }

    accountModal.classList.remove(
        "active"
    );

    accountModal.classList.add(
        "hidden"
    );
}


function showLoginPanel() {

    if (loginPanel) {

        loginPanel.classList.remove(
            "hidden"
        );

        loginPanel.classList.add(
            "active"
        );
    }

    if (signupPanel) {

        signupPanel.classList.remove(
            "active"
        );

        signupPanel.classList.add(
            "hidden"
        );
    }
}


function showSignupPanel() {

    if (signupPanel) {

        signupPanel.classList.remove(
            "hidden"
        );

        signupPanel.classList.add(
            "active"
        );
    }

    if (loginPanel) {

        loginPanel.classList.remove(
            "active"
        );

        loginPanel.classList.add(
            "hidden"
        );
    }
}


// ============================================================
// ACCOUNT BUTTONS
// ============================================================

if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        () => {
            openAccountModal("login");
        }
    );
}


if (signupBtn) {

    signupBtn.addEventListener(
        "click",
        () => {
            openAccountModal("signup");
        }
    );
}


if (closeAccountBtn) {

    closeAccountBtn.addEventListener(
        "click",
        closeAccountModal
    );
}


if (switchToSignup) {

    switchToSignup.addEventListener(
        "click",
        showSignupPanel
    );
}


if (switchToLogin) {

    switchToLogin.addEventListener(
        "click",
        showLoginPanel
    );
}


// ============================================================
// CLOSE MODAL OUTSIDE
// ============================================================

if (accountModal) {

    accountModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                accountModal
            ) {

                closeAccountModal();
            }
        }
    );
}


// ============================================================
// KEEP TYPING INPUT FOCUSED
// ============================================================

document.addEventListener(
    "click",
    event => {

        const target =
            event.target;


        if (
            gamePage &&
            gamePage.classList.contains("active") &&
            typingInput &&
            target !== typingInput &&
            !target.closest("button")
        ) {

            typingInput.focus();
        }


        if (
            battlePage &&
            battlePage.classList.contains("active") &&
            battleTypingInput &&
            target !== battleTypingInput &&
            !target.closest("button")
        ) {

            battleTypingInput.focus();
        }
    }
);


// ============================================================
// ROOM INPUT — ENTER
// ============================================================

if (roomInput) {

    roomInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                joinRoom();
            }
        }
    );
}


// ============================================================
// INITIAL SETUP
// ============================================================

updateSingleLengthVisibility();

updateMultiLengthVisibility();

restartSinglePlayer();

console.log(
    "Keyboard Warrior frontend loaded."
);

