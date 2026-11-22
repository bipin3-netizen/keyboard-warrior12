
/* =====================================================
   KEYBOARD WARRIOR
   COMPLETE FRONTEND JAVASCRIPT
===================================================== */


/* =====================================================
   SERVER
===================================================== */

const SERVER_URL = "wss://keyboard-warrior12.onrender.com";
const API_URL = "https://keyboard-warrior12.onrender.com";


/* =====================================================
   SAFE STORAGE
===================================================== */

const STORAGE_KEYS = {
    user: "keyboardWarriorUser",
    history: "keyboardWarriorHistory"
};


function saveLocalUser(user) {

    try {
        localStorage.setItem(
            STORAGE_KEYS.user,
            JSON.stringify(user)
        );
    }

    catch (error) {
        console.warn("Could not save user:", error);
    }

}


function loadLocalUser() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEYS.user
            );

        if (!saved) {
            return null;
        }

        return JSON.parse(saved);

    }

    catch (error) {

        console.warn(
            "Could not load saved user:",
            error
        );

        return null;
    }

}


function removeLocalUser() {

    try {
        localStorage.removeItem(
            STORAGE_KEYS.user
        );
    }

    catch (error) {
        console.warn(error);
    }

}


/* =====================================================
   PAGE ELEMENTS
===================================================== */

const homePage =
    document.getElementById("homePage");

const gamePage =
    document.getElementById("gamePage");

const multiplayerPage =
    document.getElementById("multiplayerPage");

const battlePage =
    document.getElementById("battlePage");

const resultPage =
    document.getElementById("resultPage");


/* =====================================================
   HOME
===================================================== */

const singlePlayerBtn =
    document.getElementById("singlePlayerBtn");

const multiplayerBtn =
    document.getElementById("multiplayerBtn");


/* =====================================================
   SINGLE PLAYER
===================================================== */

const typingText =
    document.getElementById("typingText");

const typingInput =
    document.getElementById("typingInput");

const wpmDisplay =
    document.getElementById("wpm");

const accuracyDisplay =
    document.getElementById("accuracy");

const errorsDisplay =
    document.getElementById("errors");

const timeDisplay =
    document.getElementById("time");

const restartBtn =
    document.getElementById("restartBtn");

const gameHomeBtn =
    document.getElementById("gameHomeBtn");


/* =====================================================
   SINGLE MODE / LENGTH
===================================================== */

const singleModeButtons =
    document.querySelectorAll(
        "#singleModeButtons .mode-btn"
    );

const singleLengthGroup =
    document.getElementById(
        "singleLengthGroup"
    );

const singleLengthButtons =
    document.querySelectorAll(
        "#singleLengthButtons .length-btn"
    );


/* =====================================================
   SINGLE BACKSPACE
===================================================== */

const singleBackspaceButtons =
    document.querySelectorAll(
        "#singleBackspaceButtons .backspace-btn"
    );


/* =====================================================
   MULTIPLAYER LOBBY
===================================================== */

const multiplayerHomeBtn =
    document.getElementById(
        "multiplayerHomeBtn"
    );

const createRoomBtn =
    document.getElementById(
        "createRoomBtn"
    );

const joinRoomBtn =
    document.getElementById(
        "joinRoomBtn"
    );

const roomInput =
    document.getElementById(
        "roomInput"
    );

const roomMessage =
    document.getElementById(
        "roomMessage"
    );


/* =====================================================
   MULTIPLAYER MODE / LENGTH
===================================================== */

const multiModeButtons =
    document.querySelectorAll(
        "#multiModeButtons .mode-btn"
    );

const multiLengthGroup =
    document.getElementById(
        "multiLengthGroup"
    );

const multiLengthButtons =
    document.querySelectorAll(
        "#multiLengthButtons .length-btn"
    );


/* =====================================================
   MULTIPLAYER BACKSPACE
===================================================== */

const multiBackspaceButtons =
    document.querySelectorAll(
        "#multiBackspaceButtons .backspace-btn"
    );


/* =====================================================
   BATTLE
===================================================== */

const battleHomeBtn =
    document.getElementById(
        "battleHomeBtn"
    );

const battleRoomCode =
    document.getElementById(
        "battleRoomCode"
    );

const battleModeLabel =
    document.getElementById(
        "battleModeLabel"
    );

const battleBackspaceLabel =
    document.getElementById(
        "battleBackspaceLabel"
    );

const connectionStatus =
    document.getElementById(
        "connectionStatus"
    );

const opponentTypingText =
    document.getElementById(
        "opponentTypingText"
    );

const battleTypingText =
    document.getElementById(
        "battleTypingText"
    );

const battleTypingInput =
    document.getElementById(
        "battleTypingInput"
    );

const opponentWpm =
    document.getElementById(
        "opponentWpm"
    );

const opponentAccuracy =
    document.getElementById(
        "opponentAccuracy"
    );

const opponentErrors =
    document.getElementById(
        "opponentErrors"
    );

const playerWpm =
    document.getElementById(
        "playerWpm"
    );

const playerAccuracy =
    document.getElementById(
        "playerAccuracy"
    );

const playerErrors =
    document.getElementById(
        "playerErrors"
    );

const battleTypingContainer =
    document.getElementById(
        "battleTypingContainer"
    );

const battleMessage =
    document.getElementById(
        "battleMessage"
    );

const opponentName =
    document.getElementById(
        "opponentName"
    );

const playerName =
    document.getElementById(
        "playerName"
    );


/* =====================================================
   RESULT
===================================================== */

const resultWpm =
    document.getElementById(
        "resultWpm"
    );

const resultAccuracy =
    document.getElementById(
        "resultAccuracy"
    );

const resultErrors =
    document.getElementById(
        "resultErrors"
    );

const resultTime =
    document.getElementById(
        "resultTime"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultSubtitle =
    document.getElementById(
        "resultSubtitle"
    );

const continueBtn =
    document.getElementById(
        "continueBtn"
    );

const tryAgainBtn =
    document.getElementById(
        "tryAgainBtn"
    );

const rematchBtn =
    document.getElementById(
        "rematchBtn"
    );

const resultHomeBtn =
    document.getElementById(
        "resultHomeBtn"
    );

const rematchMessage =
    document.getElementById(
        "rematchMessage"
    );


/* =====================================================
   ACCOUNT MODAL
===================================================== */

const accountModal =
    document.getElementById(
        "accountModal"
    );

const closeAccountBtn =
    document.getElementById(
        "closeAccountBtn"
    );

const loginBtn =
    document.getElementById(
        "loginBtn"
    );

const signupBtn =
    document.getElementById(
        "signupBtn"
    );

const loginPanel =
    document.getElementById(
        "loginPanel"
    );

const signupPanel =
    document.getElementById(
        "signupPanel"
    );

const switchToSignup =
    document.getElementById(
        "switchToSignup"
    );

const switchToLogin =
    document.getElementById(
        "switchToLogin"
    );


/* =====================================================
   SIGNUP
===================================================== */

const submitSignupBtn =
    document.getElementById(
        "submitSignupBtn"
    );

const signupUsername =
    document.getElementById(
        "signupUsername"
    );

const signupEmail =
    document.getElementById(
        "signupEmail"
    );

const signupPassword =
    document.getElementById(
        "signupPassword"
    );

const signupConfirm =
    document.getElementById(
        "signupConfirm"
    );

const signupMessage =
    document.getElementById(
        "signupMessage"
    );


/* =====================================================
   LOGIN
===================================================== */

const submitLoginBtn =
    document.getElementById(
        "submitLoginBtn"
    );

const loginIdentity =
    document.getElementById(
        "loginIdentity"
    );

const loginPassword =
    document.getElementById(
        "loginPassword"
    );

const loginMessage =
    document.getElementById(
        "loginMessage"
    );


/* =====================================================
   ACCOUNT / PROFILE
===================================================== */

const loggedOutActions =
    document.getElementById(
        "loggedOutActions"
    );

const loggedInActions =
    document.getElementById(
        "loggedInActions"
    );

const profileHeaderBtn =
    document.getElementById(
        "profileHeaderBtn"
    );

const accountMenu =
    document.getElementById(
        "accountMenu"
    );

const menuProfileBtn =
    document.getElementById(
        "menuProfileBtn"
    );

const menuHistoryBtn =
    document.getElementById(
        "menuHistoryBtn"
    );

const menuSettingsBtn =
    document.getElementById(
        "menuSettingsBtn"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const headerAvatar =
    document.getElementById(
        "headerAvatar"
    );

const headerUsername =
    document.getElementById(
        "headerUsername"
    );

const menuAvatar =
    document.getElementById(
        "menuAvatar"
    );

const menuDisplayName =
    document.getElementById(
        "menuDisplayName"
    );

const menuUsername =
    document.getElementById(
        "menuUsername"
    );


/* =====================================================
   PROFILE MODAL
===================================================== */

const profileModal =
    document.getElementById(
        "profileModal"
    );

const closeProfileBtn =
    document.getElementById(
        "closeProfileBtn"
    );

const profilePanel =
    document.getElementById(
        "profilePanel"
    );

const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );

const profileDisplayName =
    document.getElementById(
        "profileDisplayName"
    );

const profileUsername =
    document.getElementById(
        "profileUsername"
    );

const profileBestWpm =
    document.getElementById(
        "profileBestWpm"
    );

const profileAverageWpm =
    document.getElementById(
        "profileAverageWpm"
    );

const profileAverageAccuracy =
    document.getElementById(
        "profileAverageAccuracy"
    );

const profileMatches =
    document.getElementById(
        "profileMatches"
    );

const profileWins =
    document.getElementById(
        "profileWins"
    );

const profileLosses =
    document.getElementById(
        "profileLosses"
    );


/* =====================================================
   EDIT PROFILE
===================================================== */

const editProfilePanel =
    document.getElementById(
        "editProfilePanel"
    );

const editProfileAvatar =
    document.getElementById(
        "editProfileAvatar"
    );

const avatarChoices =
    document.querySelectorAll(
        "#avatarChoices .avatar-choice"
    );

const profileDisplayNameInput =
    document.getElementById(
        "profileDisplayNameInput"
    );

const profileUsernameInput =
    document.getElementById(
        "profileUsernameInput"
    );

const saveProfileBtn =
    document.getElementById(
        "saveProfileBtn"
    );

const cancelProfileEditBtn =
    document.getElementById(
        "cancelProfileEditBtn"
    );

const profileMessage =
    document.getElementById(
        "profileMessage"
    );


/* =====================================================
   HISTORY
===================================================== */

const historyPanel =
    document.getElementById(
        "historyPanel"
    );

const matchHistoryList =
    document.getElementById(
        "matchHistoryList"
    );

const emptyHistoryMessage =
    document.getElementById(
        "emptyHistoryMessage"
    );

const closeHistoryBtn =
    document.getElementById(
        "closeHistoryBtn"
    );


/* =====================================================
   SETTINGS
===================================================== */

const settingsPanel =
    document.getElementById(
        "settingsPanel"
    );

const settingsEmail =
    document.getElementById(
        "settingsEmail"
    );

const settingsLogoutBtn =
    document.getElementById(
        "settingsLogoutBtn"
    );

const closeSettingsBtn =
    document.getElementById(
        "closeSettingsBtn"
    );


/* =====================================================
   LOGGED-IN USER
===================================================== */

let loggedInUser =
    loadLocalUser();


/* =====================================================
   GUEST IDENTITY
===================================================== */

const guestWarriorNames = [

    "Swift Wolf",
    "Shadow Blade",
    "Silent Hawk",
    "Iron Fang",
    "Night Warrior",
    "Storm Rider",
    "Crimson Wolf",
    "Lone Warrior",
    "Silver Blade",
    "Dark Falcon",
    "Steel Fox",
    "Ghost Blade"

];


const guestAvatars = [
    "⚔",
    "🐺",
    "🦅",
    "🔥",
    "☠",
    "👑"
];


let guestWarriorName =
    guestWarriorNames[
        Math.floor(
            Math.random() *
            guestWarriorNames.length
        )
    ];


let guestWarriorAvatar =
    guestAvatars[
        Math.floor(
            Math.random() *
            guestAvatars.length
        )
    ];


/* =====================================================
   PLAYER IDENTITY
===================================================== */

function getCurrentPlayerName() {

    if (loggedInUser) {

        return (
            loggedInUser.displayName ||
            loggedInUser.username ||
            "Warrior"
        );

    }

    return guestWarriorName;
}


function getCurrentPlayerAvatar() {

    if (loggedInUser) {

        return (
            loggedInUser.profileImage ||
            "⚔"
        );

    }

    return guestWarriorAvatar;
}


/* =====================================================
   PAGE SYSTEM
===================================================== */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active"
            );

        });


    const page =
        document.getElementById(
            pageId
        );


    if (page) {

        page.classList.add(
            "active"
        );

    }

}


/* =====================================================
   TEXT SOURCES
===================================================== */

const sentenceText =
    "The quick brown fox jumps over the lazy dog.";


const quoteTexts = [

    "Success is the sum of small efforts repeated day in and day out.",

    "The future depends on what you do today.",

    "Great things are done by a series of small things brought together.",

    "Do not watch the clock. Do what it does. Keep going.",

    "Believe you can and you are halfway there.",

    "Small progress is still progress.",

    "Discipline is choosing between what you want now and what you want most."

];


const paragraphSentences = [

    "Every warrior knows that speed means nothing without accuracy and control.",

    "Type with focus, correct your mistakes, and never stop moving.",

    "Practice every day and your hands will become faster and more confident.",

    "Good typing is not only about moving quickly.",

    "It is about staying calm while making every character count.",

    "A focused mind can turn simple practice into real skill.",

    "The strongest players learn from mistakes instead of fearing them."

];


/* =====================================================
   WORD BANK
===================================================== */

const wordBank = [

    "about",
    "after",
    "again",
    "against",
    "always",
    "around",
    "because",
    "before",
    "between",
    "better",
    "bring",
    "build",
    "change",
    "choose",
    "control",
    "create",
    "different",
    "during",
    "every",
    "example",
    "focus",
    "future",
    "great",
    "important",
    "learn",
    "little",
    "never",
    "people",
    "practice",
    "problem",
    "quick",
    "right",
    "school",
    "should",
    "simple",
    "small",
    "something",
    "strong",
    "success",
    "system",
    "think",
    "through",
    "together",
    "understand",
    "warrior",
    "without",
    "world",
    "write",
    "your",
    "keyboard",
    "accuracy",
    "speed",
    "battle",
    "player",
    "challenge",
    "victory",
    "training",
    "future",
    "power",
    "focus",
    "skill",
    "keyboard",
    "typing",
    "control",
    "master",
    "improve",
    "learn",
    "confidence",
    "discipline",
    "progress"

];


/* =====================================================
   GENERATORS
===================================================== */

function generateWords(count) {

    const words = [];


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                wordBank.length
            );


        words.push(
            wordBank[randomIndex]
        );

    }


    return words.join(" ") + ".";
}


function generateQuote() {

    const randomIndex =
        Math.floor(
            Math.random() *
            quoteTexts.length
        );


    return quoteTexts[
        randomIndex
    ];
}


function generateParagraph(wordCount) {

    let result = "";


    while (
        result
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .length < wordCount
    ) {

        const sentence =
            paragraphSentences[
                Math.floor(
                    Math.random() *
                    paragraphSentences.length
                )
            ];


        if (result) {

            result += " ";

        }


        result += sentence;

    }


    const words =
        result
            .trim()
            .split(/\s+/);


    return words
        .slice(0, wordCount)
        .join(" ") + ".";
}


/* =====================================================
   SINGLE PLAYER STATE
===================================================== */

let singleMode = "words";

let singleLength = 25;

let singleText = "";

let singleTypedText = "";

let singleStartTime = null;

let singleTimerInterval = null;

let singleRunning = false;

let singleFinished = false;


/* =====================================================
   SINGLE BACKSPACE STATE
===================================================== */

let singleBackspaceEnabled = true;


/* =====================================================
   SINGLE RESULT STATE
===================================================== */

let currentResultType = "single";


/* =====================================================
   GENERATE SINGLE CHALLENGE
===================================================== */

function generateSingleChallenge() {

    if (singleMode === "sentence") {

        return sentenceText;

    }


    if (singleMode === "paragraph") {

        return generateParagraph(
            singleLength
        );

    }


    if (singleMode === "quote") {

        return generateQuote();

    }


    return generateWords(
        singleLength
    );

}


/* =====================================================
   CREATE SINGLE TEXT
===================================================== */

function createSingleTypingText() {

    if (!typingText) return;


    typingText.innerHTML = "";


    for (
        let i = 0;
        i < singleText.length;
        i++
    ) {

        const span =
            document.createElement(
                "span"
            );


        span.classList.add(
            "char"
        );


        span.textContent =
            singleText[i];


        typingText.appendChild(
            span
        );

    }


    updateSingleTypingDisplay();

}


/* =====================================================
   SINGLE CARET
===================================================== */

function updateSingleCaret() {

    if (!typingText) return;


    const chars =
        typingText.querySelectorAll(
            ".char"
        );


    chars.forEach(char => {

        char.classList.remove(
            "current"
        );

    });


    if (
        singleTypedText.length <
        singleText.length
    ) {

        const currentChar =
            chars[
                singleTypedText.length
            ];


        if (currentChar) {

            currentChar.classList.add(
                "current"
            );

        }

    }

}


/* =====================================================
   SINGLE TIMER
===================================================== */

function startSingleTimer() {

    if (singleRunning) {
        return;
    }


    singleRunning = true;

    singleStartTime =
        Date.now();


    singleTimerInterval =
        setInterval(
            () => {

                updateSingleStats();

                updateSingleTime();

            },
            250
        );

}


function updateSingleTime() {

    if (
        !singleStartTime ||
        !timeDisplay
    ) {
        return;
    }


    const seconds =
        Math.floor(
            (
                Date.now() -
                singleStartTime
            ) / 1000
        );


    timeDisplay.textContent =
        seconds + "s";
}


/* =====================================================
   SINGLE STATS
===================================================== */

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

        }

        else {

            errors++;

        }

    }


    let wpm = 0;

    let accuracy = 100;


    if (startTime) {

        const elapsedSeconds =
            (
                Date.now() -
                startTime
            ) / 1000;


        const elapsedMinutes =
            elapsedSeconds / 60;


        if (
            elapsedMinutes > 0
        ) {

            wpm =
                Math.round(
                    (
                        correct / 5
                    ) /
                    elapsedMinutes
                );

        }

    }


    if (typed.length > 0) {

        accuracy =
            Math.round(
                (
                    correct /
                    typed.length
                ) * 100
            );

    }


    return {
        wpm,
        accuracy,
        errors,
        correct
    };

}


/* =====================================================
   UPDATE SINGLE STATS
===================================================== */

function updateSingleStats() {

    if (!singleStartTime) {
        return;
    }


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


/* =====================================================
   SINGLE DISPLAY
===================================================== */

function updateSingleTypingDisplay() {

    if (!typingText) return;


    const chars =
        typingText.querySelectorAll(
            ".char"
        );


    chars.forEach(
        (char, index) => {

            char.classList.remove(
                "correct",
                "wrong"
            );


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

                }

                else {

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


/* =====================================================
   SINGLE INPUT
===================================================== */

if (typingInput) {

    typingInput.addEventListener(
        "input",
        () => {

            if (
                !singleRunning &&
                typingInput.value.length > 0
            ) {

                startSingleTimer();

            }


            singleTypedText =
                typingInput.value;


            if (
                singleTypedText.length >
                singleText.length
            ) {

                singleTypedText =
                    singleTypedText.substring(
                        0,
                        singleText.length
                    );


                typingInput.value =
                    singleTypedText;

            }


            updateSingleTypingDisplay();


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

            /*
             * BACKSPACE OFF
             */

            if (
                event.key === "Backspace" &&
                !singleBackspaceEnabled
            ) {

                event.preventDefault();

                return;

            }


            /*
             * CTRL + ENTER
             *
             * During an active test:
             * restart the SAME challenge.
             */

            if (
                event.key === "Enter"
            ) {

                if (
                    event.ctrlKey ||
                    event.metaKey
                ) {

                    event.preventDefault();

                    restartSinglePlayer(
                        true,
                        false
                    );

                    return;

                }


                event.preventDefault();

            }

        }
    );

}


/* =====================================================
   SINGLE BACKSPACE BUTTONS
===================================================== */

singleBackspaceButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const setting =
                    button.dataset.backspace;


                singleBackspaceEnabled =
                    setting !== "off";


                singleBackspaceButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =====================================================
   FINISH SINGLE PLAYER
===================================================== */

function finishSinglePlayer() {

    if (singleFinished) {
        return;
    }


    singleFinished = true;


    clearInterval(
        singleTimerInterval
    );


    singleRunning = false;


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

        resultTime.textContent =
            timeDisplay
                ? timeDisplay.textContent
                : "0s";

    }


    if (resultTitle) {

        resultTitle.textContent =
            "Test Complete";

    }


    if (resultSubtitle) {

        resultSubtitle.textContent =
            "Good work, warrior.";

    }


    currentResultType =
        "single";


    /*
     * SINGLE RESULT BUTTONS
     */

    if (tryAgainBtn) {

        tryAgainBtn.classList.remove(
            "hidden"
        );

    }


    if (continueBtn) {

        continueBtn.classList.remove(
            "hidden"
        );

    }


    if (rematchBtn) {

        rematchBtn.classList.add(
            "hidden"
        );

    }


    if (rematchMessage) {

        rematchMessage.textContent =
            "";

    }


    saveSingleHistory(
        stats
    );


    showPage(
        "resultPage"
    );

}


/* =====================================================
   RESET SINGLE TEST STATE
===================================================== */

function resetSingleTestState() {

    clearInterval(
        singleTimerInterval
    );


    singleTypedText = "";

    singleStartTime = null;

    singleTimerInterval = null;

    singleRunning = false;

    singleFinished = false;


    if (typingInput) {

        typingInput.value =
            "";

    }


    if (wpmDisplay) {

        wpmDisplay.textContent =
            "0";

    }


    if (accuracyDisplay) {

        accuracyDisplay.textContent =
            "100%";

    }


    if (errorsDisplay) {

        errorsDisplay.textContent =
            "0";

    }


    if (timeDisplay) {

        timeDisplay.textContent =
            "0s";

    }

}


/* =====================================================
   RESTART SINGLE
===================================================== */

/*
 * forceNewChallenge = true
 *
 * Generates a completely new random challenge.
 *
 * forceNewChallenge = false
 *
 * Reuses the current challenge.
 */

function restartSinglePlayer(
    focusInput = false,
    forceNewChallenge = true
) {

    resetSingleTestState();


    if (
        forceNewChallenge ||
        !singleText
    ) {

        singleText =
            generateSingleChallenge();

    }


    createSingleTypingText();


    if (focusInput) {

        setTimeout(
            () => {

                typingInput?.focus();

            },
            30
        );

    }

}


/* =====================================================
   CONTINUE SINGLE PLAYER
===================================================== */

function continueSinglePlayer() {

    /*
     * Continue means:
     *
     * - same mode
     * - same length
     * - same Backspace setting
     * - NEW random challenge
     */

    restartSinglePlayer(
        true,
        true
    );


    showPage(
        "gamePage"
    );

}


/* =====================================================
   SINGLE RESTART BUTTON
===================================================== */

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        () => {

            /*
             * Restart = same challenge.
             */

            restartSinglePlayer(
                true,
                false
            );

        }
    );

}


/* =====================================================
   CONTINUE BUTTON
===================================================== */

if (continueBtn) {

    continueBtn.addEventListener(
        "click",
        () => {

            /*
             * Continue = new challenge.
             */

            if (
                currentResultType ===
                "single"
            ) {

                continueSinglePlayer();

            }

        }
    );

}


/* =====================================================
   SINGLE TRY AGAIN
===================================================== */

if (tryAgainBtn) {

    tryAgainBtn.addEventListener(
        "click",
        () => {

            if (
                currentResultType ===
                "multiplayer"
            ) {

                requestMultiplayerRematch();

                return;

            }


            /*
             * Try Again = SAME exact challenge.
             */

            restartSinglePlayer(
                true,
                false
            );


            showPage(
                "gamePage"
            );

        }
    );

}


/* =====================================================
   SINGLE HOME
===================================================== */

if (gameHomeBtn) {

    gameHomeBtn.addEventListener(
        "click",
        () => {

            clearInterval(
                singleTimerInterval
            );


            singleRunning = false;


            showPage(
                "homePage"
            );

        }
    );

}


/* =====================================================
   SINGLE MODE BUTTONS
===================================================== */

singleModeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                singleMode =
                    button.dataset.mode ||
                    "words";


                singleModeButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                updateLengthVisibility(
                    singleLengthGroup,
                    singleMode
                );


                /*
                 * Changing mode creates
                 * a new challenge.
                 */

                restartSinglePlayer(
                    true,
                    true
                );

            }
        );

    }
);


/* =====================================================
   SINGLE LENGTH BUTTONS
===================================================== */

singleLengthButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const value =
                    parseInt(
                        button.dataset.length,
                        10
                    );


                if (!Number.isNaN(value)) {

                    singleLength =
                        value;

                }


                singleLengthButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                /*
                 * Changing length creates
                 * a new challenge.
                 */

                restartSinglePlayer(
                    true,
                    true
                );

            }
        );

    }
);


/* =====================================================
   LENGTH VISIBILITY
===================================================== */

function updateLengthVisibility(
    group,
    mode
) {

    if (!group) {
        return;
    }


    if (
        mode === "words" ||
        mode === "paragraph"
    ) {

        group.classList.remove(
            "hidden"
        );

    }

    else {

        group.classList.add(
            "hidden"
        );

    }

}


/* =====================================================
   TYPING AREA FOCUS
===================================================== */

if (typingText) {

    typingText.addEventListener(
        "click",
        () => {

            typingInput?.focus();

        }
    );

}


/* =====================================================
   MULTIPLAYER STATE
===================================================== */

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

let rematchRequested = false;


/* =====================================================
   MULTIPLAYER BACKSPACE STATE
===================================================== */

let multiplayerBackspaceEnabled = true;

let battleBackspaceEnabled = true;


/* =====================================================
   MULTIPLAYER MODE BUTTONS
===================================================== */

multiModeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                multiplayerMode =
                    button.dataset.mode ||
                    "words";


                multiModeButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                updateLengthVisibility(
                    multiLengthGroup,
                    multiplayerMode
                );

            }
        );

    }
);


/* =====================================================
   MULTIPLAYER LENGTH
===================================================== */

multiLengthButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const value =
                    parseInt(
                        button.dataset.length,
                        10
                    );


                if (!Number.isNaN(value)) {

                    multiplayerLength =
                        value;

                }


                multiLengthButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =====================================================
   MULTIPLAYER BACKSPACE BUTTONS
===================================================== */

multiBackspaceButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const setting =
                    button.dataset.backspace;


                multiplayerBackspaceEnabled =
                    setting !== "off";


                multiBackspaceButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =====================================================
   HOME BUTTONS
===================================================== */

if (singlePlayerBtn) {

    singlePlayerBtn.addEventListener(
        "click",
        () => {

            showPage(
                "gamePage"
            );


            /*
             * Starting a new single-player session
             * generates a new challenge.
             */

            restartSinglePlayer(
                true,
                true
            );

        }
    );

}


if (multiplayerBtn) {

    multiplayerBtn.addEventListener(
        "click",
        () => {

            showPage(
                "multiplayerPage"
            );


            if (roomMessage) {

                roomMessage.textContent =
                    "";

            }

        }
    );

}


/* =====================================================
   ROOM CODE
===================================================== */

function generateRoomCode() {

    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


    let code = "";


    for (
        let i = 0;
        i < 6;
        i++
    ) {

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


/* =====================================================
   CREATE ROOM
===================================================== */

if (createRoomBtn) {

    createRoomBtn.addEventListener(
        "click",
        () => {

            if (
                socket &&
                socket.readyState ===
                WebSocket.OPEN
            ) {

                return;

            }


            creator = true;

            const code =
                generateRoomCode();


            currentRoomCode =
                code;


            if (roomMessage) {

                roomMessage.textContent =
                    `Room created: ${code} — share this code with your opponent.`;

            }


            connectToRoom(
                code
            );

        }
    );

}


/* =====================================================
   JOIN ROOM
===================================================== */

if (joinRoomBtn) {

    joinRoomBtn.addEventListener(
        "click",
        () => {

            const code =
                roomInput
                    ? roomInput.value
                        .trim()
                        .toUpperCase()
                    : "";


            if (!code) {

                if (roomMessage) {

                    roomMessage.textContent =
                        "Please enter a room code.";

                }

                return;

            }


            if (
                code.length !== 6
            ) {

                if (roomMessage) {

                    roomMessage.textContent =
                        "Room codes contain 6 characters.";

                }

                return;

            }


            creator = false;


            connectToRoom(
                code
            );

        }
    );

}


/* =====================================================
   CONNECT TO ROOM
===================================================== */

function connectToRoom(
    roomCode
) {

    if (socket) {

        try {
            socket.close();
        }

        catch (error) {
            console.warn(error);
        }

    }


    currentRoomCode =
        roomCode.toUpperCase();


    playerId =
        Math.random()
            .toString(36)
            .substring(2, 10);


    if (roomMessage) {

        if (creator) {

            roomMessage.textContent =
                `Room ${currentRoomCode} created. Connecting...`;

        }

        else {

            roomMessage.textContent =
                `Joining room ${currentRoomCode}...`;

        }

    }


    try {

        socket =
            new WebSocket(
                `${SERVER_URL}/ws/${currentRoomCode}/${playerId}`
            );

    }

    catch (error) {

        console.error(error);

        showRoomError(
            "Could not create the WebSocket connection."
        );

        return;

    }


    socket.onopen = () => {

        if (connectionStatus) {

            connectionStatus.textContent =
                "CONNECTED";

        }


        if (roomMessage) {

            roomMessage.textContent =
                `Room ${currentRoomCode} connected. Waiting for opponent...`;

        }


        sendRoomConfig();

    };


    socket.onmessage = event => {

        try {

            const data =
                JSON.parse(
                    event.data
                );


            handleServerMessage(
                data
            );

        }

        catch (error) {

            console.error(
                "Invalid server message:",
                error
            );

        }

    };


    socket.onerror = error => {

        console.error(
            "WEBSOCKET ERROR:",
            error
        );


        if (connectionStatus) {

            connectionStatus.textContent =
                "ERROR";

        }


        showRoomError(
            "Could not connect to server. Make sure FastAPI is running."
        );

    };


    socket.onclose = () => {

        console.log(
            "WebSocket closed."
        );


        if (
            battlePage &&
            battlePage.classList.contains(
                "active"
            ) &&
            !battleFinished
        ) {

            if (connectionStatus) {

                connectionStatus.textContent =
                    "DISCONNECTED";

            }


            if (battleMessage) {

                battleMessage.textContent =
                    "Connection lost.";

            }

        }

    };

}


/* =====================================================
   ROOM CONFIG
===================================================== */

function sendRoomConfig() {

    if (
        !socket ||
        socket.readyState !==
        WebSocket.OPEN
    ) {

        return;

    }


    socket.send(
        JSON.stringify({

            type: "room_config",

            mode:
                multiplayerMode,

            length:
                multiplayerLength,

            backspace:
                multiplayerBackspaceEnabled

        })
    );

}


/* =====================================================
   SERVER MESSAGE
===================================================== */

function handleServerMessage(
    data
) {

    console.log(
        "SERVER:",
        data
    );


    switch (data.type) {

        case "room_joined":

            currentRoomCode =
                data.room_code ||
                currentRoomCode;


            if (battleRoomCode) {

                battleRoomCode.textContent =
                    currentRoomCode;

            }


            if (roomMessage) {

                roomMessage.textContent =
                    `Room ${currentRoomCode} joined. Waiting for opponent...`;

            }

            break;


        case "waiting":

            if (roomMessage) {

                roomMessage.textContent =
                    `Room ${currentRoomCode} — waiting for another player...`;

            }

            break;


        case "room_ready":

            battleText =
                data.text ||
                "";


            if (data.mode) {

                multiplayerMode =
                    data.mode;

            }


            if (data.length) {

                multiplayerLength =
                    data.length;

            }


            if (
                typeof data.backspace ===
                "boolean"
            ) {

                battleBackspaceEnabled =
                    data.backspace;

            }

            else {

                battleBackspaceEnabled =
                    multiplayerBackspaceEnabled;

            }


            showBattlePage();

            break;


        case "room_configured":

            if (data.text) {

                battleText =
                    data.text;

            }


            if (
                typeof data.backspace ===
                "boolean"
            ) {

                battleBackspaceEnabled =
                    data.backspace;

            }


            if (
                battlePage &&
                battlePage.classList.contains(
                    "active"
                )
            ) {

                updateBattleBackspaceLabel();

                createBattleTypingText();

            }

            break;


        case "opponent_typing":

            updateOpponentTyping(
                data
            );

            break;


        case "winner":

            finishBattle(
                true,
                data
            );

            break;


        case "loser":

            finishBattle(
                false,
                data
            );

            break;


        case "rematch_waiting":

            rematchRequested = true;


            if (rematchMessage) {

                rematchMessage.textContent =
                    "Rematch requested. Waiting for your opponent...";

            }

            break;


        case "opponent_left":

            if (battleMessage) {

                battleMessage.textContent =
                    "Opponent left the room.";

            }


            if (connectionStatus) {

                connectionStatus.textContent =
                    "OPPONENT LEFT";

            }

            break;


        case "room_full":

            showRoomError(
                "This room is already full."
            );

            break;


        case "error":

            showRoomError(
                data.message ||
                "Something went wrong."
            );

            break;


        default:

            console.log(
                "Unknown server event:",
                data.type
            );

    }

}


/* =====================================================
   ROOM ERROR
===================================================== */

function showRoomError(
    message
) {

    if (roomMessage) {

        roomMessage.textContent =
            message;

    }

}


/* =====================================================
   UPDATE BATTLE BACKSPACE LABEL
===================================================== */

function updateBattleBackspaceLabel() {

    if (!battleBackspaceLabel) {
        return;
    }


    battleBackspaceLabel.textContent =
        battleBackspaceEnabled
            ? "BACKSPACE ON"
            : "BACKSPACE OFF";


    battleBackspaceLabel.classList.toggle(
        "disabled",
        !battleBackspaceEnabled
    );

}


/* =====================================================
   SHOW BATTLE
===================================================== */

function showBattlePage() {

    showPage(
        "battlePage"
    );


    battleTypedText = "";

    battleStartTime = null;


    clearInterval(
        battleTimerInterval
    );


    battleTimerInterval = null;

    battleRunning = false;

    battleFinished = false;

    rematchRequested = false;


    if (battleRoomCode) {

        battleRoomCode.textContent =
            currentRoomCode;

    }


    if (battleModeLabel) {

        battleModeLabel.textContent =
            multiplayerMode.toUpperCase();

    }


    updateBattleBackspaceLabel();


    if (connectionStatus) {

        connectionStatus.textContent =
            "CONNECTED";

    }


    if (playerName) {

        playerName.textContent =
            getCurrentPlayerName();

    }


    if (opponentName) {

        opponentName.textContent =
            "Opponent";

    }


    resetBattleStats();

    createBattleTypingText();


    if (battleTypingInput) {

        battleTypingInput.value =
            "";


        setTimeout(
            () => {

                battleTypingInput.focus();

            },
            100
        );

    }

}


/* =====================================================
   RESET BATTLE STATS
===================================================== */

function resetBattleStats() {

    if (playerWpm) {
        playerWpm.textContent = "0";
    }


    if (playerAccuracy) {
        playerAccuracy.textContent = "100%";
    }


    if (playerErrors) {
        playerErrors.textContent = "0";
    }


    if (opponentWpm) {
        opponentWpm.textContent = "0";
    }


    if (opponentAccuracy) {
        opponentAccuracy.textContent = "100%";
    }


    if (opponentErrors) {
        opponentErrors.textContent = "0";
    }


    if (opponentTypingText) {
        opponentTypingText.textContent = "";
    }


    if (battleMessage) {
        battleMessage.textContent = "";
    }

}


/* =====================================================
   CREATE BATTLE TEXT
===================================================== */

function createBattleTypingText() {

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
            document.createElement(
                "span"
            );


        span.classList.add(
            "char"
        );


        span.textContent =
            battleText[i];


        battleTypingText.appendChild(
            span
        );

    }


    updateBattleDisplay();

}


/* =====================================================
   BATTLE TIMER
===================================================== */

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


/* =====================================================
   UPDATE BATTLE STATS
===================================================== */

function updateBattleStats() {

    if (!battleStartTime) {
        return;
    }


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


    sendTypingUpdate(
        stats
    );

}


/* =====================================================
   SEND TYPING UPDATE
===================================================== */

function sendTypingUpdate(
    stats
) {

    if (
        !socket ||
        socket.readyState !==
        WebSocket.OPEN
    ) {

        return;

    }


    socket.send(
        JSON.stringify({

            type: "typing",

            text:
                battleTypedText,

            wpm:
                stats.wpm,

            accuracy:
                stats.accuracy,

            errors:
                stats.errors

        })
    );

}


/* =====================================================
   BATTLE DISPLAY
===================================================== */

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
                "correct",
                "wrong",
                "current"
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

                }

                else {

                    char.classList.add(
                        "wrong"
                    );

                }

            }

        }
    );


    if (
        battleTypedText.length <
        battleText.length
    ) {

        const currentChar =
            chars[
                battleTypedText.length
            ];


        if (currentChar) {

            currentChar.classList.add(
                "current"
            );

        }

    }

}


/* =====================================================
   BATTLE INPUT
===================================================== */

if (battleTypingInput) {

    battleTypingInput.addEventListener(
        "input",
        () => {

            if (
                !battleRunning &&
                battleTypingInput.value.length > 0
            ) {

                startBattleTimer();

            }


            battleTypedText =
                battleTypingInput.value;


            if (
                battleTypedText.length >
                battleText.length
            ) {

                battleTypedText =
                    battleTypedText.substring(
                        0,
                        battleText.length
                    );


                battleTypingInput.value =
                    battleTypedText;

            }


            updateBattleDisplay();

            updateBattleStats();


            if (
                battleTypedText.length ===
                battleText.length
            ) {

                finishBattleTyping();

            }

        }
    );


    battleTypingInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Backspace" &&
                !battleBackspaceEnabled
            ) {

                event.preventDefault();

                return;

            }


            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

            }

        }
    );

}


/* =====================================================
   BATTLE TEXT CLICK
===================================================== */

if (battleTypingText) {

    battleTypingText.addEventListener(
        "click",
        () => {

            battleTypingInput?.focus();

        }
    );

}


/* =====================================================
   FINISH BATTLE TYPING
===================================================== */

function finishBattleTyping() {

    if (battleFinished) {
        return;
    }


    battleFinished = true;


    clearInterval(
        battleTimerInterval
    );


    battleRunning = false;


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


    if (
        socket &&
        socket.readyState ===
        WebSocket.OPEN
    ) {

        socket.send(
            JSON.stringify({

                type: "finish",

                wpm:
                    stats.wpm,

                accuracy:
                    stats.accuracy,

                errors:
                    stats.errors

            })
        );

    }

}


/* =====================================================
   OPPONENT TYPING
===================================================== */

function updateOpponentTyping(
    data
) {

    if (opponentTypingText) {

        opponentTypingText.textContent =
            data.text || "";

    }


    if (opponentWpm) {

        opponentWpm.textContent =
            data.wpm ?? 0;

    }


    if (opponentAccuracy) {

        opponentAccuracy.textContent =
            `${data.accuracy ?? 100}%`;

    }


    if (opponentErrors) {

        opponentErrors.textContent =
            data.errors ?? 0;

    }

}


/* =====================================================
   FINISH BATTLE
===================================================== */

function finishBattle(
    won,
    data
) {

    clearInterval(
        battleTimerInterval
    );


    battleRunning = false;

    battleFinished = true;


    const finalWpm =
        data.wpm ?? 0;

    const finalAccuracy =
        data.accuracy ?? 100;

    const finalErrors =
        data.errors ?? 0;


    if (resultWpm) {

        resultWpm.textContent =
            finalWpm;

    }


    if (resultAccuracy) {

        resultAccuracy.textContent =
            finalAccuracy + "%";

    }


    if (resultErrors) {

        resultErrors.textContent =
            finalErrors;

    }


    if (resultTime) {

        resultTime.textContent =
            "—";

    }


    if (resultTitle) {

        resultTitle.textContent =
            won
                ? "VICTORY"
                : "DEFEAT";

    }


    if (resultSubtitle) {

        resultSubtitle.textContent =
            won
                ? "You defeated your opponent."
                : "Your opponent finished first.";

    }


    currentResultType =
        "multiplayer";


    /*
     * Multiplayer does not use Continue.
     */

    if (continueBtn) {

        continueBtn.classList.add(
            "hidden"
        );

    }


    if (tryAgainBtn) {

        tryAgainBtn.classList.add(
            "hidden"
        );

    }


    if (rematchBtn) {

        rematchBtn.classList.remove(
            "hidden"
        );

    }


    if (rematchMessage) {

        rematchMessage.textContent =
            "";

    }


    saveMultiplayerHistory(
        won,
        {
            wpm: finalWpm,
            accuracy: finalAccuracy,
            errors: finalErrors
        }
    );


    showPage(
        "resultPage"
    );

}


/* =====================================================
   REQUEST REMATCH
===================================================== */

function requestMultiplayerRematch() {

    if (
        !socket ||
        socket.readyState !==
        WebSocket.OPEN
    ) {

        if (rematchMessage) {

            rematchMessage.textContent =
                "Connection lost. Reconnect to play again.";

        }

        return;

    }


    socket.send(
        JSON.stringify({

            type: "rematch"

        })
    );


    rematchRequested = true;


    if (rematchMessage) {

        rematchMessage.textContent =
            "Rematch requested. Waiting for opponent...";

    }

}


if (rematchBtn) {

    rematchBtn.addEventListener(
        "click",
        () => {

            requestMultiplayerRematch();

        }
    );

}


/* =====================================================
   BATTLE HOME
===================================================== */

if (battleHomeBtn) {

    battleHomeBtn.addEventListener(
        "click",
        () => {

            leaveMultiplayerRoom();

            showPage(
                "homePage"
            );

        }
    );

}


/* =====================================================
   MULTIPLAYER HOME
===================================================== */

if (multiplayerHomeBtn) {

    multiplayerHomeBtn.addEventListener(
        "click",
        () => {

            leaveMultiplayerRoom();

            showPage(
                "homePage"
            );

        }
    );

}


/* =====================================================
   RESULT HOME
===================================================== */

if (resultHomeBtn) {

    resultHomeBtn.addEventListener(
        "click",
        () => {

            if (
                currentResultType ===
                "multiplayer"
            ) {

                clearBattleState();

            }


            showPage(
                "homePage"
            );

        }
    );

}


/* =====================================================
   LEAVE MULTIPLAYER
===================================================== */

function leaveMultiplayerRoom() {

    clearInterval(
        battleTimerInterval
    );


    battleTimerInterval = null;

    battleRunning = false;

    battleFinished = false;


    if (socket) {

        try {

            socket.close();

        }

        catch (error) {

            console.warn(error);

        }

    }


    socket = null;

    currentRoomCode = "";

    playerId = "";

}


/* =====================================================
   CLEAR BATTLE
===================================================== */

function clearBattleState() {

    clearInterval(
        battleTimerInterval
    );


    battleTimerInterval = null;

    battleRunning = false;

    battleFinished = false;

}


/* =====================================================
   GLOBAL FOCUS
===================================================== */

document.addEventListener(
    "click",
    event => {

        const target =
            event.target;


        if (
            target.closest("button") ||
            target.closest("input") ||
            target.closest(".modal") ||
            target.closest(".account-menu")
        ) {

            return;

        }


        if (
            gamePage &&
            gamePage.classList.contains(
                "active"
            )
        ) {

            typingInput?.focus();

        }


        if (
            battlePage &&
            battlePage.classList.contains(
                "active"
            )
        ) {

            battleTypingInput?.focus();

        }

    }
);


/* =====================================================
   GLOBAL CTRL + ENTER
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Enter" ||
            !(event.ctrlKey || event.metaKey)
        ) {

            return;

        }


        const activeElement =
            document.activeElement;


        /*
         * Don't interfere with account forms.
         */

        if (
            activeElement &&
            (
                activeElement.tagName === "TEXTAREA" ||
                (
                    activeElement.tagName === "INPUT" &&
                    activeElement !== typingInput &&
                    activeElement !== battleTypingInput
                )
            )
        ) {

            return;

        }


        /*
         * SINGLE PLAYER
         *
         * During game:
         * restart SAME challenge.
         */

        if (
            gamePage &&
            gamePage.classList.contains(
                "active"
            )
        ) {

            event.preventDefault();

            restartSinglePlayer(
                true,
                false
            );

            return;

        }


        /*
         * RESULT PAGE
         *
         * Single-player result:
         * Ctrl + Enter = Continue.
         */

        if (
            resultPage &&
            resultPage.classList.contains(
                "active"
            ) &&
            currentResultType === "single"
        ) {

            event.preventDefault();

            continueSinglePlayer();

        }

    }
);


/* =====================================================
   ACCOUNT UI
===================================================== */

function updateAccountUI() {

    const loggedIn =
        Boolean(loggedInUser);


    if (!loggedIn) {

        loggedOutActions?.classList.remove(
            "hidden"
        );

        loggedInActions?.classList.add(
            "hidden"
        );

        accountMenu?.classList.add(
            "hidden"
        );

        return;

    }


    loggedOutActions?.classList.add(
        "hidden"
    );

    loggedInActions?.classList.remove(
        "hidden"
    );


    const username =
        loggedInUser.username ||
        "warrior";


    const displayName =
        loggedInUser.displayName ||
        username;


    const avatar =
        loggedInUser.profileImage ||
        "⚔";


    if (headerAvatar) {

        headerAvatar.textContent =
            avatar;

    }


    if (headerUsername) {

        headerUsername.textContent =
            displayName;

    }


    if (menuAvatar) {

        menuAvatar.textContent =
            avatar;

    }


    if (menuDisplayName) {

        menuDisplayName.textContent =
            displayName;

    }


    if (menuUsername) {

        menuUsername.textContent =
            "@" + username;

    }


    updateProfileModal();

}


/* =====================================================
   PROFILE MODAL
===================================================== */

function updateProfileModal() {

    if (!loggedInUser) {
        return;
    }


    const username =
        loggedInUser.username ||
        "warrior";


    const displayName =
        loggedInUser.displayName ||
        username;


    const avatar =
        loggedInUser.profileImage ||
        "⚔";


    const stats =
        loggedInUser.stats ||
        {};


    if (profileAvatar) {

        profileAvatar.textContent =
            avatar;

    }


    if (profileDisplayName) {

        profileDisplayName.textContent =
            displayName;

    }


    if (profileUsername) {

        profileUsername.textContent =
            "@" + username;

    }


    if (profileBestWpm) {

        profileBestWpm.textContent =
            stats.best_wpm ?? 0;

    }


    if (profileAverageWpm) {

        profileAverageWpm.textContent =
            stats.average_wpm ?? 0;

    }


    if (profileAverageAccuracy) {

        profileAverageAccuracy.textContent =
            `${stats.average_accuracy ?? 0}%`;

    }


    if (profileMatches) {

        profileMatches.textContent =
            stats.matches ?? 0;

    }


    if (profileWins) {

        profileWins.textContent =
            stats.wins ?? 0;

    }


    if (profileLosses) {

        profileLosses.textContent =
            stats.losses ?? 0;

    }


    if (settingsEmail) {

        settingsEmail.textContent =
            loggedInUser.email ||
            "—";

    }

}


/* =====================================================
   PROFILE PANELS
===================================================== */

function hideProfilePanels() {

    profilePanel?.classList.add(
        "hidden"
    );

    editProfilePanel?.classList.add(
        "hidden"
    );

    historyPanel?.classList.add(
        "hidden"
    );

    settingsPanel?.classList.add(
        "hidden"
    );

}


function showProfilePanel() {

    hideProfilePanels();

    profilePanel?.classList.remove(
        "hidden"
    );

}


/* =====================================================
   OPEN PROFILE
===================================================== */

function openProfileModal() {

    if (!loggedInUser) {
        return;
    }


    updateProfileModal();

    showProfilePanel();


    profileModal?.classList.remove(
        "hidden"
    );

}


/* =====================================================
   CLOSE PROFILE
===================================================== */

function closeProfileModal() {

    profileModal?.classList.add(
        "hidden"
    );

}


/* =====================================================
   PROFILE HEADER MENU
===================================================== */

if (profileHeaderBtn) {

    profileHeaderBtn.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            accountMenu?.classList.toggle(
                "hidden"
            );

        }
    );

}


/* =====================================================
   PROFILE MENU ACTIONS
===================================================== */

if (menuProfileBtn) {

    menuProfileBtn.addEventListener(
        "click",
        () => {

            accountMenu?.classList.add(
                "hidden"
            );

            openProfileModal();

        }
    );

}


if (menuHistoryBtn) {

    menuHistoryBtn.addEventListener(
        "click",
        () => {

            accountMenu?.classList.add(
                "hidden"
            );

            openProfileModal();

            showHistoryPanel();

        }
    );

}


if (menuSettingsBtn) {

    menuSettingsBtn.addEventListener(
        "click",
        () => {

            accountMenu?.classList.add(
                "hidden"
            );

            openProfileModal();

            showSettingsPanel();

        }
    );

}


/* =====================================================
   CLOSE PROFILE
===================================================== */

if (closeProfileBtn) {

    closeProfileBtn.addEventListener(
        "click",
        () => {

            closeProfileModal();

        }
    );

}


if (profileModal) {

    profileModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                profileModal
            ) {

                closeProfileModal();

            }

        }
    );

}


/* =====================================================
   EDIT PROFILE
===================================================== */

if (
    document.getElementById(
        "editProfileBtn"
    )
) {

    document
        .getElementById(
            "editProfileBtn"
        )
        .addEventListener(
            "click",
            () => {

                if (!loggedInUser) {
                    return;
                }


                hideProfilePanels();


                editProfilePanel?.classList.remove(
                    "hidden"
                );


                const username =
                    loggedInUser.username ||
                    "";


                const displayName =
                    loggedInUser.displayName ||
                    username;


                const avatar =
                    loggedInUser.profileImage ||
                    "⚔";


                if (
                    profileDisplayNameInput
                ) {

                    profileDisplayNameInput.value =
                        displayName;

                }


                if (
                    profileUsernameInput
                ) {

                    profileUsernameInput.value =
                        username;

                }


                if (editProfileAvatar) {

                    editProfileAvatar.textContent =
                        avatar;

                }


                selectedProfileAvatar =
                    avatar;


                avatarChoices.forEach(
                    button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.avatar ===
                            avatar
                        );

                    }
                );

            }
        );

}


/* =====================================================
   AVATAR SELECTION
===================================================== */

let selectedProfileAvatar =
    "⚔";


avatarChoices.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const avatar =
                    button.dataset.avatar;


                if (!avatar) {
                    return;
                }


                selectedProfileAvatar =
                    avatar;


                avatarChoices.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                if (editProfileAvatar) {

                    editProfileAvatar.textContent =
                        avatar;

                }

            }
        );

    }
);


/* =====================================================
   SAVE PROFILE
===================================================== */

if (saveProfileBtn) {

    saveProfileBtn.addEventListener(
        "click",
        () => {

            if (!loggedInUser) {
                return;
            }


            const displayName =
                profileDisplayNameInput
                    ? profileDisplayNameInput.value.trim()
                    : "";


            const username =
                profileUsernameInput
                    ? profileUsernameInput.value.trim()
                    : "";


            if (!displayName) {

                showProfileMessage(
                    "Display name cannot be empty.",
                    "error"
                );

                return;

            }


            if (
                username.length < 3
            ) {

                showProfileMessage(
                    "Username must contain at least 3 characters.",
                    "error"
                );

                return;

            }


            loggedInUser.displayName =
                displayName;


            loggedInUser.username =
                username;


            loggedInUser.profileImage =
                selectedProfileAvatar;


            saveLocalUser(
                loggedInUser
            );


            updateAccountUI();


            showProfileMessage(
                "Profile updated.",
                "success"
            );


            setTimeout(
                () => {

                    showProfilePanel();

                },
                600
            );

        }
    );

}


/* =====================================================
   CANCEL PROFILE EDIT
===================================================== */

if (cancelProfileEditBtn) {

    cancelProfileEditBtn.addEventListener(
        "click",
        () => {

            showProfilePanel();

        }
    );

}


/* =====================================================
   PROFILE MESSAGE
===================================================== */

function showProfileMessage(
    message,
    type = ""
) {

    if (!profileMessage) {
        return;
    }


    profileMessage.textContent =
        message;


    profileMessage.className =
        "account-message";


    if (type) {

        profileMessage.classList.add(
            type
        );

    }

}


/* =====================================================
   HISTORY STORAGE
===================================================== */

function getHistory() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEYS.history
            );


        if (!saved) {
            return [];
        }


        const history =
            JSON.parse(
                saved
            );


        return Array.isArray(history)
            ? history
            : [];

    }

    catch (error) {

        console.warn(error);

        return [];

    }


}


function saveHistoryItem(
    item
) {

    try {

        const history =
            getHistory();


        history.unshift(
            item
        );


        const limitedHistory =
            history.slice(
                0,
                50
            );


        localStorage.setItem(
            STORAGE_KEYS.history,
            JSON.stringify(
                limitedHistory
            )
        );

    }

    catch (error) {

        console.warn(
            "Could not save history:",
            error
        );

    }

}


/* =====================================================
   SINGLE HISTORY
===================================================== */

function saveSingleHistory(
    stats
) {

    saveHistoryItem({

        type: "single",

        result: "practice",

        mode:
            singleMode,

        length:
            singleLength,

        wpm:
            stats.wpm,

        accuracy:
            stats.accuracy,

        errors:
            stats.errors,

        date:
            new Date().toISOString()

    });

}


/* =====================================================
   MULTIPLAYER HISTORY
===================================================== */

function saveMultiplayerHistory(
    won,
    stats
) {

    saveHistoryItem({

        type: "multiplayer",

        result:
            won
                ? "win"
                : "loss",

        mode:
            multiplayerMode,

        length:
            multiplayerLength,

        wpm:
            stats.wpm,

        accuracy:
            stats.accuracy,

        errors:
            stats.errors,

        date:
            new Date().toISOString()

    });

}


/* =====================================================
   SHOW HISTORY
===================================================== */

function showHistoryPanel() {

    hideProfilePanels();


    historyPanel?.classList.remove(
        "hidden"
    );


    renderHistory();

}


function renderHistory() {

    if (!matchHistoryList) {
        return;
    }


    const history =
        getHistory();


    matchHistoryList.innerHTML = "";


    if (!history.length) {

        emptyHistoryMessage?.classList.remove(
            "hidden"
        );

        return;

    }


    emptyHistoryMessage?.classList.add(
        "hidden"
    );


    history.forEach(
        item => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "history-item";


            const main =
                document.createElement(
                    "div"
                );


            main.className =
                "history-main";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                item.type ===
                "multiplayer"
                    ? "Multiplayer Battle"
                    : "Single Player";


            const details =
                document.createElement(
                    "span"
                );


            details.textContent =
                `${String(item.mode || "words").toUpperCase()} • ${item.wpm} WPM • ${item.accuracy}% accuracy`;


            main.appendChild(
                title
            );


            main.appendChild(
                details
            );


            const result =
                document.createElement(
                    "span"
                );


            const resultText =
                item.result === "win"
                    ? "VICTORY"
                    : item.result === "loss"
                        ? "DEFEAT"
                        : "PRACTICE";


            result.textContent =
                resultText;


            result.className =
                "history-result " +
                (
                    item.result === "win"
                        ? "win"
                        : item.result === "loss"
                            ? "loss"
                            : "practice"
                );


            row.appendChild(
                main
            );


            row.appendChild(
                result
            );


            matchHistoryList.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   HISTORY BACK
===================================================== */

if (profileHistoryBtnExists()) {

    document
        .getElementById(
            "profileHistoryBtn"
        )
        .addEventListener(
            "click",
            () => {

                showHistoryPanel();

            }
        );

}


function profileHistoryBtnExists() {

    return Boolean(
        document.getElementById(
            "profileHistoryBtn"
        )
    );

}


if (closeHistoryBtn) {

    closeHistoryBtn.addEventListener(
        "click",
        () => {

            showProfilePanel();

        }
    );

}


/* =====================================================
   SETTINGS
===================================================== */

function showSettingsPanel() {

    hideProfilePanels();


    settingsPanel?.classList.remove(
        "hidden"
    );


    if (settingsEmail && loggedInUser) {

        settingsEmail.textContent =
            loggedInUser.email ||
            "—";

    }

}


if (profileSettingsBtnExists()) {

    document
        .getElementById(
            "profileSettingsBtn"
        )
        .addEventListener(
            "click",
            () => {

                showSettingsPanel();

            }
        );

}


function profileSettingsBtnExists() {

    return Boolean(
        document.getElementById(
            "profileSettingsBtn"
        )
    );

}


if (closeSettingsBtn) {

    closeSettingsBtn.addEventListener(
        "click",
        () => {

            showProfilePanel();

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutUser() {

    loggedInUser = null;

    removeLocalUser();

    accountMenu?.classList.add(
        "hidden"
    );

    closeProfileModal();

    updateAccountUI();

}


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            logoutUser();

        }
    );

}


if (settingsLogoutBtn) {

    settingsLogoutBtn.addEventListener(
        "click",
        () => {

            logoutUser();

        }
    );

}


/* =====================================================
   OUTSIDE ACCOUNT MENU CLICK
===================================================== */

document.addEventListener(
    "click",
    event => {

        if (
            accountMenu &&
            profileHeaderBtn &&
            !accountMenu.contains(
                event.target
            ) &&
            !profileHeaderBtn.contains(
                event.target
            )
        ) {

            accountMenu.classList.add(
                "hidden"
            );

        }

    }
);


/* =====================================================
   ACCOUNT MODAL
===================================================== */

function openAccountModal() {

    accountModal?.classList.remove(
        "hidden"
    );

}


function closeAccountModal() {

    accountModal?.classList.add(
        "hidden"
    );

}


function showLoginPanel() {

    loginPanel?.classList.remove(
        "hidden"
    );

    signupPanel?.classList.add(
        "hidden"
    );


    if (loginMessage) {

        loginMessage.textContent =
            "";

        loginMessage.className =
            "account-message";

    }

}


function showSignupPanel() {

    loginPanel?.classList.add(
        "hidden"
    );

    signupPanel?.classList.remove(
        "hidden"
    );


    if (signupMessage) {

        signupMessage.textContent =
            "";

        signupMessage.className =
            "account-message";

    }

}


if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        () => {

            openAccountModal();

            showLoginPanel();

            setTimeout(
                () => {

                    loginIdentity?.focus();

                },
                50
            );

        }
    );

}


if (signupBtn) {

    signupBtn.addEventListener(
        "click",
        () => {

            openAccountModal();

            showSignupPanel();

            setTimeout(
                () => {

                    signupUsername?.focus();

                },
                50
            );

        }
    );

}


if (switchToSignup) {

    switchToSignup.addEventListener(
        "click",
        () => {

            showSignupPanel();

        }
    );

}


if (switchToLogin) {

    switchToLogin.addEventListener(
        "click",
        () => {

            showLoginPanel();

        }
    );

}


if (closeAccountBtn) {

    closeAccountBtn.addEventListener(
        "click",
        () => {

            closeAccountModal();

        }
    );

}


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


/* =====================================================
   ACCOUNT MESSAGES
===================================================== */

function showSignupMessage(
    message,
    type = ""
) {

    if (!signupMessage) {
        return;
    }


    signupMessage.textContent =
        message;


    signupMessage.className =
        "account-message";


    if (type) {

        signupMessage.classList.add(
            type
        );

    }

}


function showLoginMessage(
    message,
    type = ""
) {

    if (!loginMessage) {
        return;
    }


    loginMessage.textContent =
        message;


    loginMessage.className =
        "account-message";


    if (type) {

        loginMessage.classList.add(
            type
        );

    }

}


/* =====================================================
   SIGNUP
===================================================== */

if (submitSignupBtn) {

    submitSignupBtn.addEventListener(
        "click",
        async () => {

            const username =
                signupUsername
                    ? signupUsername.value.trim()
                    : "";


            const email =
                signupEmail
                    ? signupEmail.value.trim()
                    : "";


            const password =
                signupPassword
                    ? signupPassword.value
                    : "";


            const confirmPassword =
                signupConfirm
                    ? signupConfirm.value
                    : "";


            if (!username) {

                showSignupMessage(
                    "Please enter a username.",
                    "error"
                );

                return;

            }


            if (
                username.length < 3
            ) {

                showSignupMessage(
                    "Username must contain at least 3 characters.",
                    "error"
                );

                return;

            }


            if (!email) {

                showSignupMessage(
                    "Please enter your email.",
                    "error"
                );

                return;

            }


            if (!email.includes("@")) {

                showSignupMessage(
                    "Please enter a valid email.",
                    "error"
                );

                return;

            }


            if (
                password.length < 6
            ) {

                showSignupMessage(
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;

            }


            if (
                password !==
                confirmPassword
            ) {

                showSignupMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            submitSignupBtn.disabled =
                true;


            submitSignupBtn.textContent =
                "Creating Account...";


            try {

                const response =
                    await fetch(
                        `${API_URL}/signup`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    username:
                                        username,

                                    email:
                                        email,

                                    password:
                                        password

                                })

                        }
                    );


                const data =
                    await response.json();


                if (
                    response.ok &&
                    data.success
                ) {

                    showSignupMessage(
                        "Account created successfully!",
                        "success"
                    );


                    if (signupUsername) {
                        signupUsername.value = "";
                    }


                    if (signupEmail) {
                        signupEmail.value = "";
                    }


                    if (signupPassword) {
                        signupPassword.value = "";
                    }


                    if (signupConfirm) {
                        signupConfirm.value = "";
                    }


                    setTimeout(
                        () => {

                            showLoginPanel();

                        },
                        1000
                    );

                }

                else {

                    showSignupMessage(
                        data.message ||
                        "Could not create account.",
                        "error"
                    );

                }

            }

            catch (error) {

                console.error(
                    "SIGNUP ERROR:",
                    error
                );


                showSignupMessage(
                    "Could not connect to FastAPI. Make sure the backend is running.",
                    "error"
                );

            }

            finally {

                submitSignupBtn.disabled =
                    false;


                submitSignupBtn.textContent =
                    "Create Account";

            }

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

if (submitLoginBtn) {

    submitLoginBtn.addEventListener(
        "click",
        async () => {

            const identity =
                loginIdentity
                    ? loginIdentity.value.trim()
                    : "";


            const password =
                loginPassword
                    ? loginPassword.value
                    : "";


            if (!identity) {

                showLoginMessage(
                    "Please enter your username or email.",
                    "error"
                );

                return;

            }


            if (!password) {

                showLoginMessage(
                    "Please enter your password.",
                    "error"
                );

                return;

            }


            submitLoginBtn.disabled =
                true;


            submitLoginBtn.textContent =
                "Logging in...";


            try {

                const response =
                    await fetch(
                        `${API_URL}/login`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    identity:
                                        identity,

                                    password:
                                        password

                                })

                        }
                    );


                const data =
                    await response.json();


                if (
                    response.ok &&
                    data.success
                ) {

                    loggedInUser = {

                        username:
                            data.username,

                        displayName:
                            data.display_name ||
                            data.username,

                        email:
                            data.email ||
                            "",

                        profileImage:
                            data.profile_image ||
                            "⚔",

                        stats:
                            data.stats ||
                            {

                                matches: 0,

                                wins: 0,

                                losses: 0,

                                best_wpm: 0,

                                average_wpm: 0,

                                average_accuracy: 0

                            }

                    };


                    saveLocalUser(
                        loggedInUser
                    );


                    updateAccountUI();


                    showLoginMessage(
                        `Welcome back, ${loggedInUser.displayName}!`,
                        "success"
                    );


                    if (loginIdentity) {
                        loginIdentity.value = "";
                    }


                    if (loginPassword) {
                        loginPassword.value = "";
                    }


                    setTimeout(
                        () => {

                            closeAccountModal();

                        },
                        800
                    );

                }

                else {

                    showLoginMessage(
                        data.message ||
                        "Invalid username/email or password.",
                        "error"
                    );

                }

            }

            catch (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );


                showLoginMessage(
                    "Could not connect to FastAPI. Make sure the backend is running.",
                    "error"
                );

            }

            finally {

                submitLoginBtn.disabled =
                    false;


                submitLoginBtn.textContent =
                    "Login";

            }

        }
    );

}


/* =====================================================
   ENTER KEY IN ACCOUNT FORMS
===================================================== */

if (loginPassword) {

    loginPassword.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                submitLoginBtn?.click();

            }

        }
    );

}


if (signupConfirm) {

    signupConfirm.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                submitSignupBtn?.click();

            }

        }
    );

}


/* =====================================================
   INITIAL SETUP
===================================================== */

function initializeGame() {

    const defaultSingleMode =
        document.querySelector(
            "#singleModeButtons .mode-btn.active"
        );


    if (defaultSingleMode) {

        singleMode =
            defaultSingleMode.dataset.mode ||
            "words";

    }


    const defaultSingleLength =
        document.querySelector(
            "#singleLengthButtons .length-btn.active"
        );


    if (defaultSingleLength) {

        const value =
            parseInt(
                defaultSingleLength.dataset.length,
                10
            );


        if (!Number.isNaN(value)) {

            singleLength =
                value;

        }

    }


    const defaultSingleBackspace =
        document.querySelector(
            "#singleBackspaceButtons .backspace-btn.active"
        );


    if (defaultSingleBackspace) {

        singleBackspaceEnabled =
            defaultSingleBackspace.dataset.backspace !==
            "off";

    }


    const defaultMultiMode =
        document.querySelector(
            "#multiModeButtons .mode-btn.active"
        );


    if (defaultMultiMode) {

        multiplayerMode =
            defaultMultiMode.dataset.mode ||
            "words";

    }


    const defaultMultiLength =
        document.querySelector(
            "#multiLengthButtons .length-btn.active"
        );


    if (defaultMultiLength) {

        const value =
            parseInt(
                defaultMultiLength.dataset.length,
                10
            );


        if (!Number.isNaN(value)) {

            multiplayerLength =
                value;

        }

    }


    const defaultMultiBackspace =
        document.querySelector(
            "#multiBackspaceButtons .backspace-btn.active"
        );


    if (defaultMultiBackspace) {

        multiplayerBackspaceEnabled =
            defaultMultiBackspace.dataset.backspace !==
            "off";

    }


    battleBackspaceEnabled =
        multiplayerBackspaceEnabled;


    updateLengthVisibility(
        singleLengthGroup,
        singleMode
    );


    updateLengthVisibility(
        multiLengthGroup,
        multiplayerMode
    );


    updateBattleBackspaceLabel();


    updateAccountUI();


    /*
     * Create the first challenge.
     */

    restartSinglePlayer(
        false,
        true
    );

}


initializeGame();

