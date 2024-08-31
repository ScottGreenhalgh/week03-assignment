// ------ DOM  ------

const acceptButton = document.getElementById("button-accept");
const declineButton = document.getElementById("button-decline");
const cookieNotice = document.getElementById("cookie-notice");

const toggleThemeButton = document.getElementById("button-theme-toggle");
const headerElement = document.getElementById("header");
const mainElement = document.getElementById("main");
const leftSidebarElement = document.getElementById("left-sidebar");
const rightSidebarElement = document.getElementById("right-sidebar");

const upgradesContainer = document.getElementById("upgrades-container");

const cookieCountDisplay = document.getElementById("cookieCount");
const cookiePerSecondDisplay = document.getElementById("cookiesPerSecond");
const bigCookieImage = document.getElementById("cookie-image");

const upgradeClicker = document.createElement("button");
const upgradeOven = document.createElement("button");
const upgradeFarm = document.createElement("button");
const upgradeBaker = document.createElement("button");
const upgradeFactory = document.createElement("button");
const upgradeFlour = document.createElement("button");
const upgradeMachine = document.createElement("button");
const upgradeQuOven = document.createElement("button");
const upgradeTech = document.createElement("button");
const upgradeIntBaker = document.createElement("button");

const currentUpgrades = document.getElementById("current-upgrades");

const saveButton = document.getElementById("save-button");

// ------ Global Variables ------

let cookieDark = document.cookie.includes("cookie.dark=true");

let cookieCount = 0;
let cookiesPerSecond = 0;

upgradeAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const upgrades = [
  upgradeClicker,
  upgradeOven,
  upgradeFarm,
  upgradeBaker,
  upgradeFactory,
  upgradeFlour,
  upgradeMachine,
  upgradeQuOven,
  upgradeTech,
  upgradeIntBaker,
];

let apiButtonsData = [];

// ------ Tracking Cookies -------

if (document.cookie.includes("cookiesAccepted")) {
  cookieNotice.style.display = "none";
}

acceptButton.addEventListener("click", function () {
  document.cookie = "cookiesAccepted=true";
  console.log("accept button pressed");
  cookieNotice.style.display = "none";
});

declineButton.addEventListener("click", function () {
  document.cookie = "cookiesAccepted=false";
  console.log("decline button pressed");
  cookieNotice.style.display = "none";
});

// ------ Dark Mode Toggle ------

function toggleDarkMode() {
  rightSidebarElement.classList.toggle("rdark");
  leftSidebarElement.classList.toggle("ldark");
  mainElement.classList.toggle("mdark");
  headerElement.classList.toggle("hdark");
}

if (cookieDark) {
  toggleDarkMode();
}

toggleThemeButton.addEventListener("click", function () {
  console.log("toggled dark");

  if (!cookieDark) {
    toggleDarkMode();
    document.cookie = "cookie.dark=true";
  } else {
    toggleDarkMode();
    document.cookie = "cookie.dark=false";
  }
  cookieDark = !cookieDark;
});

// -------- API & Upgrades ----------

async function getCookieUpgrades() {
  let cookieUpgradesInfo = 0;
  try {
    //throw new Error("testing exception"); testing scenario where api fails to load
    const cookieUpgrades = await fetch(
      `https://cookie-upgrade-api.vercel.app/api/upgrades`
    );
    cookieUpgradesInfo = await cookieUpgrades.json();
  } catch (error) {
    console.log(error);
    cookieUpgradesInfo = (await fetch("./assets/upgrades.json")).json();
  }
  console.log(cookieUpgradesInfo);
  return cookieUpgradesInfo;
}

function createUpgrades(apidata) {
  for (let i = 0; i < apidata.length; i++) {
    const nameP = document.createElement("p");
    nameP.textContent = apidata[i].name;
    nameP.id = `name-${apidata[i].id}`; //unique ID for styling

    const costP = document.createElement("p");
    costP.textContent = "Cost: " + numberWithCommas(apidata[i].cost);
    costP.id = `cost-${apidata[i].id}`;

    const increaseP = document.createElement("p");
    increaseP.textContent = "CPS: " + numberWithCommas(apidata[i].increase);
    increaseP.id = `increase-${apidata[i].id}`;

    upgrades[i].appendChild(nameP);
    upgrades[i].appendChild(costP);
    upgrades[i].appendChild(increaseP);

    upgrades[i].id = apidata[i].id;
    upgrades[i].className = "upgrade-buttons";

    upgrades[i].addEventListener("click", function () {
      clickedUpgrade(upgrades[i]);
    });

    upgradesContainer.appendChild(upgrades[i]);
  }
}

function clickedUpgrade(buttonId) {
  let clickedId = -1;
  for (let i = 0; upgrades.length > i; i++) {
    if (buttonId === upgrades[i]) {
      clickedId = i;
      break;
    }
  }
  if (clickedId < 0) {
    console.log("The clicked button wasn't valid");
    return;
  }
  console.log(`Upgrade ${apiButtonsData[clickedId].name} selected`);
  if (apiButtonsData[clickedId].cost > cookieCount) {
    console.log("Could not afford upgrade");
    //buttonId
    return;
  }
  cookieCount -= apiButtonsData[clickedId].cost;
  upgradeAmounts[clickedId]++;
  updateUpgradeInfo(clickedId);
}

async function addUpgradesToPage() {
  apiButtonsData = await getCookieUpgrades();
  createUpgrades(apiButtonsData);
  populateUpgradeInfo();
}

addUpgradesToPage();

//-------- Counter --------

function numberWithCommas(number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

bigCookieImage.addEventListener("click", function () {
  cookieCount++;
  updateUI();
  clickAnimation();
});

function updateUI() {
  cookieCountDisplay.innerText = numberWithCommas(cookieCount);
  cookiePerSecondDisplay.innerText = numberWithCommas(cookiesPerSecond);
}

function update() {
  cookiesPerSecond = 0;
  for (let i = 0; upgradeAmounts.length > i; i++) {
    cookiesPerSecond += upgradeAmounts[i] * apiButtonsData[i].increase;
  }
  cookieCount = cookieCount + cookiesPerSecond;
  updateUI();
}

setInterval(update, 1000);

// ------- Click Animations --------

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function clickAnimation() {
  bigCookieImage.style.width = "60%";
  await delay(100);
  bigCookieImage.style.width = "75%";
}

// --------- Save ---------

async function autoSaveProgress() {
  while (true) {
    //indefinitely loop
    await delay(60_000);
    saveProgress();
  }
}

function saveProgress() {
  console.log("Progress Saved");
  localStorage.setItem("cookies", cookieCount);
  localStorage.setItem("autoClicker", upgradeAmounts[0]);
  localStorage.setItem("ovenCount", upgradeAmounts[1]);
  localStorage.setItem("cookieFarm", upgradeAmounts[2]);
  localStorage.setItem("robotBaker", upgradeAmounts[3]);
  localStorage.setItem("cookieFactory", upgradeAmounts[4]);
  localStorage.setItem("magicFlour", upgradeAmounts[5]);
  localStorage.setItem("timeMachine", upgradeAmounts[6]);
  localStorage.setItem("quantumOven", upgradeAmounts[7]);
  localStorage.setItem("alienTechnology", upgradeAmounts[8]);
  localStorage.setItem("interdimensionalBaker", upgradeAmounts[9]);
}

function loadProgress() {
  if (localStorage.getItem("cookies") != null) {
    console.log("Progress Loaded");
    cookieCount = JSON.parse(localStorage.getItem("cookies"));
    upgradeAmounts[0] = JSON.parse(localStorage.getItem("autoClicker"));
    upgradeAmounts[1] = JSON.parse(localStorage.getItem("ovenCount"));
    upgradeAmounts[2] = JSON.parse(localStorage.getItem("cookieFarm"));
    upgradeAmounts[3] = JSON.parse(localStorage.getItem("robotBaker"));
    upgradeAmounts[4] = JSON.parse(localStorage.getItem("cookieFactory"));
    upgradeAmounts[5] = JSON.parse(localStorage.getItem("magicFlour"));
    upgradeAmounts[6] = JSON.parse(localStorage.getItem("timeMachine"));
    upgradeAmounts[7] = JSON.parse(localStorage.getItem("quantumOven"));
    upgradeAmounts[8] = JSON.parse(localStorage.getItem("alienTechnology"));
    upgradeAmounts[9] = JSON.parse(
      localStorage.getItem("interdimensionalBaker")
    );
  }
}

saveButton.addEventListener("click", saveProgress);

loadProgress();
autoSaveProgress();

// -------- Current Upgrades Info --------

const activeUpgradeInfo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function populateUpgradeInfo() {
  for (let i = 0; upgradeAmounts.length > i; i++) {
    activeUpgradeInfo[i] = document.createElement("p");
    if (upgradeAmounts[i] > 0) {
      activeUpgradeInfo[i].textContent = `${
        apiButtonsData[i].name
      }: ${numberWithCommas(upgradeAmounts[i])} (CPS: ${numberWithCommas(
        upgradeAmounts[i] * apiButtonsData[i].increase
      )})`;
    }
    activeUpgradeInfo[i].id = `active-upgrade-${apiButtonsData[i].id}`;
    activeUpgradeInfo[i].className = "active-upgrade";

    currentUpgrades.appendChild(activeUpgradeInfo[i]);
  }
}

function updateUpgradeInfo(upgradeId) {
  activeUpgradeInfo[upgradeId].textContent = `${
    apiButtonsData[upgradeId].name
  }: ${upgradeAmounts[upgradeId]} (CPS: ${
    upgradeAmounts[upgradeId] * apiButtonsData[upgradeId].increase
  })`;
}
