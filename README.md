# week03-assignment

## Budget Bakery

### Reflection

#### Initial Thoughts

To start the project I loaded up https://orteil.dashnet.org/cookieclicker/ to get a baseline of what was needed for the page. I immediately noticed that there were 3 distinct segments to the page along with a very thing heading sitting at the top. Seeing this I decided that CSS Grid was the optimal approach to achieve this structure. I loaded up a HTML document and created 4 div elements and named them left sidebar, right sidebar and main. From here I was able to use the browser inspect tool and my knowledge from https://cssgridgarden.com/ to put together the desired format. From here I wanted to apply sort the background out. Looking at the reference site, I initially wanted to use a background image in the style of wallpaper to sit here. Instead after some consideration of options I chose to use background image gradient. This option lowered the total file size by no longer needing webp assets. I tried to recreate a style that was similar to the reference. Next I needed placeholder text to fill the segments where I wanted the content. I placed title text in each div that would allow me to apply some basic styling. Using rgba colouring I was able to add transparency to these segments allowing the background behind to show through.

After the basic styling was looking roughly how I wanted it, I the added the tracking cookie accept and decline buttons to the lower portion of the display using absolute as the display attribute. I then added a dark mode toggle button to the header and placed a save button under main. These were then styled to my liking.

#### Dark mode and Tracking Cookies

With the basic style created it was time to start making what I had on the page operate. To begin this process, I initialised some variables for the the buttons on already on the page and created some logic for the tracking cookie accept and decline segment. Accepting placed a true cookie on the browser, decline placed a false cookie. After this was completed I turned my attention to the dark mode toggle. From here I realised it wasn't going to be as simple as any toggles I made in the past. I needed to add a method of changing three different segments of the page at the same time. Firstly I created alternate styles for these background portions. I opted to darken the colours of teach of the gradients. By setting the `toggle("dark")` I noticed this didn't work at all. After checking stack overflow, it became apparent that toggle couldn't toggle more than one class at the same time. To handle this issue I changed the classes to ldark, rdark, mdark and hdark respectively. Once complete it looked almost as if the lights were turned off. I then used cookies to track this preference.

#### Left Sidebar

From here I needed some sort of cookie image to place on the page to create clicking logic for the big cookie image. I jumped on a royalty free webpage to source an image of a chocolate chip cookie that had a transparent background. This image was initially a .png which I converted to a .webp . For this I used https://www.freeconvert.com/png-to-webp

#### API

For the right sidebar I needed to utilise an API https://cookie-upgrade-api.vercel.app/api/upgrades This contained all the upgrades that were needed for the bakery. I started this by grabbing the API with an async function, placing the API inside the function and using await and fetch to take the outputted promise. From here I converting it to the json file format with `.json` and assigned it to a variable. I then initialised some button variables. After this I passed the apidata to a different function which would handle creating the buttons and assigning the metadata (id, class and textContent). Next I created a click event lister which used a vast number of if statements. This was reworked to utilise a for loop instead later in the project, however the initial format of this looked as follows:

```js
if (buttonId === upgrades[0]) {
  console.log("Upgrade Clicker selected");
  if (apiButtonsData[0].cost > cookieCount) return;
  cookieCount -= apiButtonsData[0].cost;
  upgradeAmounts[0]++;
} else if (buttonId === upgrades[1]) {
  console.log("Upgrade Oven selected");
  if (apiButtonsData[1].cost > cookieCount) return;
  cookieCount -= apiButtonsData[1].cost;
  upgradeAmounts[1]++;
} else if (buttonId === upgrades[2]) {
  console.log("Upgrade Farm selected");
  if (apiButtonsData[2].cost > cookieCount) return;
  cookieCount -= apiButtonsData[2].cost;
  upgradeAmounts[2]++;
} else if (buttonId === upgrades[3]) {
  console.log("Upgrade Baker selected");
  if (apiButtonsData[3].cost > cookieCount) return;
  cookieCount -= apiButtonsData[3].cost;
  upgradeAmounts[3]++;
} else if (buttonId === upgrades[4]) {
  console.log("Upgrade Factory selected");
  if (apiButtonsData[4].cost > cookieCount) return;
  cookieCount -= apiButtonsData[4].cost;
  upgradeAmounts[4]++;
} else if (buttonId === upgrades[5]) {
  console.log("Upgrade Flour selected");
  if (apiButtonsData[5].cost > cookieCount) return;
  cookieCount -= apiButtonsData[5].cost;
  upgradeAmounts[5]++;
} else if (buttonId === upgrades[6]) {
  console.log("Upgrade Machine selected");
  if (apiButtonsData[6].cost > cookieCount) return;
  cookieCount -= apiButtonsData[6].cost;
  upgradeAmounts[6]++;
} else if (buttonId === upgrades[7]) {
  console.log("Upgrade Quantum Oven selected");
  if (apiButtonsData[7].cost > cookieCount) return;
  cookieCount -= apiButtonsData[7].cost;
  upgradeAmounts[7]++;
} else if (buttonId === upgrades[8]) {
  console.log("Upgrade Baker selected");
  if (apiButtonsData[8].cost > cookieCount) return;
  cookieCount -= apiButtonsData[8].cost;
  upgradeAmounts[8]++;
} else if (buttonId === upgrades[9]) {
  console.log("Upgrade Interdimensional Baker selected");
  if (apiButtonsData[9].cost > cookieCount) return;
  cookieCount -= apiButtonsData[9].cost;
  upgradeAmounts[9]++;
}
```

This was clearly an extremely long method of defining what each button did but worked as an ideal placeholder to check functionality in the meantime.

#### Animations

With the buttons applied to the page and click functionality handled, I wanted to turn my attention to some animations. Firstly I jumped back into the CSS and added some `:hover` styling. This would change the background colour of the hovered element. I also applied `:active` styling to the right sidebar buttons to indicate they have been clicked by the user. From here I wanted the big cookie to be a little bit more animated. I wanted the cookie to resize when clicked. To do this I added `transition: width 0.1s ease;` to the image styling and `.style.width` in the javascript to change the size using an event listener.

#### Counter

In the left sidebar I wanted a counter that tracked how many cookies were baked total and how many were being generated by upgrades per second. I initialised both of these variables. Applied p tags to the html, grabbed them with the DOM and incremented them with `cookieCount++` under the click event listener for the big cookie image. I then called a UI update function to update the count in real time. I also wanted this count to update every 1 second that passed. To do this I used `setInterval(update, 1000);`. Lastly in this segment I styled the outputted cookie amounts using a function found in this stackoverflow thread https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators. This was used to format the value as thousands with commas for better readability.

#### Saving progress

Next I needed a way for the cookie total to save so that next time the page was loaded, the total number of cookies and the unlocked upgrades didn't reset to zero during the next play session. To do this I utilised the local storage on the browser. I used `localStorage.setItem()`for the cookieCount and each individual upgrade. When loading these stored values I needed to use `JSON.parse` to reassign the upgrades to the back into my array containing current upgrades and setting the cookieCount to the stored value.

#### Current upgrades

From here I wanted the current upgrades applied to the page so the user can actively keep track of which upgrades they've obtained and how much CPS they're gaining from each. I created a loop that grabbed this information from relevant arrays I had created previously during the project and output this information into p tags and appended them to a new div created under the main element. I wanted this information to update in real time so I called it under the click event listener for the buttons.

#### Try/Catch

To ensure that if the game operated despite the API becoming unavailable, I created a try catch under the async function which grabbed the API. In the event this occurred, I would catch the error, log it and fallback to a locally stored copy of the API under `upgrades.json`. To test this worked, I used I commented out the API and added `throw new Error("testing exception");` in its place.

### Overview

Overall I completed many of the targeted goals. Regarding the requirements, I fetched the upgrade data from the API, utilising all the information in each object at least once. I created event listeners for each button, with each completing its own unique operation. The functions I used throughout this project are sometimes called in multiple locations showcasing the reusability of the code. Some execute every 1 second, some execute every 60 seconds, depending on the need to update the UI or save the content to local storage. Speaking of local storage, I saved the cookie count and each upgrades information to the local storage and loaded it upon page reload. I used `setInterval` to increment the cookie count every 1 second if an upgrade was available to increment this count (since having no upgrades gave a CPS of zero).

In terms of the given stretch goals, I used a single function to handle all the upgrades, using another function only to handle the click event listener logic, all of which was encapsulated within the same function. I did include animations to the big cookie and button elements. In the readme file (what we're reading currently), I originally had a description of how to operate the game here, but instead I opted to put it in the direct centre of the game itself for easier usability. This is located below the "How to play" heading under main. I used a try/catch to handle situations when the API doesn't load. The only stretch goal suggested which I didn't include was a menu. This is because I instead opted to create a dark mode toggle, cookies check, manual save button, dynamically updating current upgrades, a favicon and an information panel. I also ensured that the styling would work for the mobile aspect ratio to allow mobile play.

#### Post completion Update

Some small changes were made after finishing the project. To make the game a little less confusion when trying to purchase the upgrades, I changed the styling of those elements to be more transparent when unavailable. Then I added a small if statement in the javascript to check if the cookie count was enough to cover the cost which would change the classlists of that element.

Alongside this I adjusted the aria labels on some of the elements and added a sound effect to the big cookie when clicked. I sourced the sound effect from https://www.soundjay.com/.

### Difficulties

Overall, this project was much smoother to complete compared to week02. The main difficulty with this week was passing data between my functions and naming my variables too closely to each other. I found it difficult to tell which variable did half the time, causing me to continually double check I had the correct variable. I used various different names variables using some variation of cookie, update and upgrade. This made it incredibly difficult to find what I needed, especially after moving many of the declarations to the global scope. When needing to pass data outside of a function, specifically data located inside the API, I found I needed to do some strange workarounds half the time. In the end I gave up with doing odd workarounds and just created a blank array in the global scope and assigned the API data directly to this, allowing it to be accessible everywhere.
