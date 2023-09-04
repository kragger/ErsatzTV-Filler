<script>
// user theme things
  // Function to create a button for each theme
function createThemeButton(themeName) {
    const buttonContainer = document.createElement('div'); // Create a container for the button and theme name
    const button = document.createElement('button');
    button.textContent = `Use This Theme`;
    button.setAttribute('id', `${themeName}setthemeButtonuser`);
    button.setAttribute('onclick', `settheme('user/${themeName}')`);
    button.innerHTML += `<i class="fa">&#x2713;</i>`;

    const jsonbutton = document.createElement('button');
jsonbutton.textContent = `Show JSON`;
jsonbutton.setAttribute('id', `${themeName}jsonbuttonuser`);
jsonbutton.setAttribute('onclick', `returnJson('user/${themeName}')`);



    const themeNameElement = document.createElement('span'); // Use a span for the theme name
    themeNameElement.textContent = themeName;

    // Create a line break element
        const lineBreak = document.createElement('br');

        // Create a horizontal rule
        const hrElement = document.createElement('hr');
        hrElement.classList.add('solid'); // Add a class for styling, assuming you have a CSS class for the rule

    buttonContainer.appendChild(button);
    buttonContainer.appendChild(jsonbutton);
    buttonContainer.appendChild(themeNameElement); // Append the theme name next to the button

    // Add CSS styling for a standard gap between the button and the theme name
    button.style.marginRight = '30px'; // Adjust this value as needed
    jsonbutton.style.marginRight = '30px'; // Adjust this value as needed
    button.style.marginLeft = '200px'; // Adjust this value as needed
    buttonContainer.appendChild(lineBreak); // Append the line break
    buttonContainer.appendChild(hrElement); // Append the horizontal rule


    return buttonContainer;
}


// Function to display the list of themes
function displayThemeList(themes) {
    const themeListDiv = document.getElementById('theme-list');

    themes.forEach((themeFileName) => {
        // Decode HTML entities, then extract the theme name
        const decodedFileName = decodeHTMLEntities(themeFileName);
        const themeName = decodedFileName.split('/').pop().replace('.theme', '');
        const buttonContainer = createThemeButton(themeName);
        themeListDiv.appendChild(buttonContainer);

    });
}

// Fetch and display the theme list on page load
// Add an event listener for loading the theme list
document.addEventListener('DOMContentLoaded', () => {
    // Get the <ul> element by its ID
    const ulElement = document.getElementById('userthemes');

    // Initialize an empty array to store the themes
    const themesArray = [];

    // Iterate through each <li> element inside the <ul>
    ulElement.querySelectorAll('li').forEach((liElement) => {
        // Add the text content of each <li> to the themesArray
        themesArray.push(liElement.textContent);
    });

    const downloadedThemes = themesArray;
    displayThemeList(downloadedThemes);
});

// Function to decode HTML entities
function decodeHTMLEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}
</script>

<script>
    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
</script>
<script>
// Function to toggle between light and dark mode
function toggleTheme() {

  const body = document.body;
  const isDarkMode = body.classList.contains('dark-mode');

  body.classList.toggle('dark-mode');

  // Save the selected mode to a JSON file
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  saveThemeToJSON(theme);

  var button = document.getElementById("theme-toggle");

    // Disable the button
    button.disabled = true;

    // Set a timeout to re-enable the button after 2 seconds (2000 milliseconds)
    // would like to change this to some sort of on/off switch if possible that takes the same amount of time to animate change
    setTimeout(function() {
      button.disabled = false;
      //
    }, 3500);
}

// Function to save the theme to a JSON file
function saveThemeToJSON(theme) {
  const xhr = new XMLHttpRequest();
  const endpointUrl = `/api/config/webtheme/set?theme=${theme}&timestamp=${Date.now()}`;
  xhr.open('GET', endpointUrl, true);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      logger.info(this.responseText);
    }
  };
  xhr.send();
}

// Function to load the theme preference from the JSON file and set the theme
async function loadThemePreference() {
  try {
    const response = await fetch('/api/config/webtheme/load');
    const data = await response.json();
    const theme = data.theme;
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // Set the initial state and position of the theme toggle switch
     const themeToggleButton = document.getElementById('theme-toggle');
     const themeToggleSlider = themeToggleButton.nextElementSibling;

     if (document.body.classList.contains('dark-mode')) {
      themeToggleButton.checked = false;

     } else {
       themeToggleButton.checked = true;
     }
   } catch (error) {
     logger.error('Failed to load the theme preference:', error);
   }
}

// Load the theme preference when the page loads
document.addEventListener('DOMContentLoaded', loadThemePreference)
</script>
<script>
  //start json popup functions
  function returnConfigJson() {
    const xhr = new XMLHttpRequest();
    const endpointUrl = `/api/config/readconfigjson`;

    xhr.open('GET', endpointUrl, true);
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const jsonData = JSON.parse(this.responseText);
        // Display the JSON data in a modal popup
        showConfigJsonPopup(jsonData);
      }
    };
    xhr.send();
  }

  // Function to display the JSON popup
  function showConfigJsonPopup(content, theme) {
    const jsonString = JSON.stringify(content, null, 2);
      var popup = document.getElementById("jsonPopup");
      var jsonContent = document.getElementById("jsonContent");
      jsonContent.textContent = jsonString;
      var jsonfileheading = document.getElementById("jsonfileheading");
      jsonfileheading.textContent = `Config.json file`;
      popup.style.display = "flex";
      document.body.classList.add('modal-open');
  }

  // Function to close the JSON popup
  // Function to close the modal
  function closeModal() {
    var modal = document.getElementById("jsonPopup");
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
  }

  // Close the modal when the user clicks outside of it
  window.onclick = function(event) {
    var modal = document.getElementById("jsonPopup");
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.classList.remove('modal-open');
    }
  }

  //end json popup function
  </script>
  <script>
    function openTab(event, tabName) {
      var i, tabcontent, tablinks;

      // Hide all tab content
      tabcontent = document.getElementsByClassName("tab");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Remove 'active' class from all tab links
      tablinks = document.getElementsByClassName("tab-link");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab and add 'active' class to the clicked tab link
      document.getElementById(tabName).style.display = "block";
      event.currentTarget.className += " active";
    }
  </script>
  <script>
    const healthapistatusElement = document.getElementById('healthapistatus');
    const platformElement = document.getElementById('platform');
    const hostnameElement = document.getElementById('hostname');
    const totalMemoryElement = document.getElementById('totalMemory');
    const freeMemoryElement = document.getElementById('freeMemory');
    const ffmpeginstallationstatusElement = document.getElementById('ffmpeginstallationstatus');

    fetch('/api/health')
      .then(response => {
        if (response.ok) {
          healthapistatusElement.innerText = 'OK';
          return response.json();
        } else {
          healthapistatusElement.innerText = 'Failed';
        }
      })
      .then(data => {
        platformElement.innerText = data.os.platform;
        hostnameElement.innerText = data.os.hostname;
        totalMemoryElement.innerText = data.os.totalMemory;
        freeMemoryElement.innerText = data.os.freeMemory;
        ffmpeginstallationstatusElement.innerText = data.os.ffmpeg;
      })
      .catch(error => {
        healthapistatusElement.innerText = 'Failed';
      });

  </script>
  <script>
    function runFor(option) {

      const url = `/api/run/${option}`; // Provide the correct URL for your weather API
      // Set up the request options
      const options = {
        method: "GET", // Adjust the method based on your API requirements
        headers: {
          'Content-Type': 'application/json' // Adjust the Content-Type header based on your API requirements
        }
      };

      // Send the request
      fetch(url, options)
        .then(response => {
          if (response.ok) {
            logger.info('Request succeeded');
          } else {
            logger.error('Request failed');
          }
        })
        .catch(error => {
          // Handle any errors
          logger.error('Error:', error);
        });
    }
  </script>
  <script>
    // Function to load and display logs in real-time
    function loadLogs() {
      const logContainer = document.getElementById('logContainer');
      const logRequest = new XMLHttpRequest();

      logRequest.onreadystatechange = function() {
        if (logRequest.readyState === 4 && logRequest.status === 200) {
          const newLogs = logRequest.responseText.split('\n').reverse().join('\n');
          const currentLogs = logContainer.innerHTML;

          // Check if the new logs are different from the current logs
          if (newLogs !== currentLogs) {
            logContainer.innerHTML = newLogs; // Update logs
          //  logContainer.scrollTop = 0; // Scroll to the top of the container
          }
        }
      };

      logRequest.open('GET', '/logsload', true);
      logRequest.send();
    }

    // Start loading logs when the page is ready
    window.addEventListener('load', function() {
      loadLogs();
      setInterval(loadLogs, 1000);
    });
  </script>
  <script>
    //slideshow start
  let slideIndex = [1,1,1,1,1,1,1];
  let slideId = ["mySlides1", "mySlides2", "mySlides3", "mySlides4", "mySlides5", "mySlides6", "mySlides7"]
  showSlides(1, 0);
  showSlides(1, 1);
  showSlides(1, 2);
  showSlides(1, 3);
  showSlides(1, 4);
  showSlides(1, 5);
  showSlides(1, 6);

  function plusSlides(n, no) {
    showSlides(slideIndex[no] += n, no);
  }

  function showSlides(n, no) {
    let i;
    let x = document.getElementsByClassName(slideId[no]);
    if (n > x.length) {slideIndex[no] = 1}
    if (n < 1) {slideIndex[no] = x.length}
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    x[slideIndex[no]-1].style.display = "block";
  }
  //end slideshow


        // set theme
        function settheme(theme) {
          const xhr = new XMLHttpRequest();
          const endpointUrl = `/api/themes/settheme?theme=${theme}`;
          xhr.open('GET', endpointUrl, true);
          xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
              logger.info(this.responseText);
            }
          };
          xhr.send();
          function showLoadingOverlay() {
            var myDiv = document.getElementById('loading-message');
          myDiv.textContent = "New Theme (" + `${theme}` + ") has been set successfully. Please wait...";
          document.getElementById('overlay').style.display = 'block';
        }
        function reloadPageWithDelay(delay) {
          showLoadingOverlay();
          setTimeout(function() {
            location.reload();
          }, delay);
        }
        // Call the reloadPageWithDelay function with a specified delay (in milliseconds)
        reloadPageWithDelay(1500); // Refresh after 2 seconds (2000 milliseconds)

        }

        //end set theme

    // download theme files
    function makeRequest(url, filepath) {
      const xhr = new XMLHttpRequest();
      const endpointUrl = `/api/themes/download?url=${url}&filepath=${filepath}`;
      xhr.open('GET', endpointUrl, true);
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          loger.info(this.responseText);
        }
      };
      xhr.send();
      function showLoadingOverlay() {
        var myDiv = document.getElementById('loading-message');
        var themefilepath = `${filepath}`;
  var theme = themefilepath.replace(".theme", "");
      myDiv.textContent = "New Theme (" + `${theme}` + ") has been downloaded successfully. Please wait...";
      document.getElementById('overlay').style.display = 'block';
    }
    function reloadPageWithDelay(delay) {
      showLoadingOverlay();
      setTimeout(function() {
        location.reload();
      }, delay);
    }
    // Call the reloadPageWithDelay function with a specified delay (in milliseconds)
    reloadPageWithDelay(1500); // Refresh after 2 seconds (2000 milliseconds)
    }
  //end download theme files
</script>
<script>
  //button display functions

    window.onload = function() {

      var statusDiv1 = document.getElementById('currentTheme');

      // Define the theme buttons and their corresponding IDs
      var themeButtons1 = [
        { id1: 'SystemLightsetthemeButton', theme1: 'system/SystemLight' },
        { id1: 'SystemDarksetthemeButton', theme1: 'system/SystemDark' },
        { id1: 'stopandgosetthemeButton', theme1: 'system/stopandgo' },
        { id1: 'CandycanesetthemeButton', theme1: 'system/Candycane' },
        { id1: 'MoRBiD_MaNGLeRDarksetthemeButton', theme1: 'system/MoRBiD_MaNGLeR-Dark' },
        { id1: 'MoRBiD_MaNGLeRC64setthemeButton', theme1: 'system/MoRBiD_MaNGLeR-C64' },
        { id1: 'MoRBiD_MaNGLeRBlueWhitesetthemeButton', theme1: 'system/MORBiD_MaNGLeR-BlueWhite' }
      ];

    var allElements = document.querySelectorAll('[id]');
    allElements.forEach(function(element) {
      var id = element.getAttribute('id');

      if (id && id.endsWith('setthemeButtonuser')) {
        var id1 = id;
        var theme1 = id1.replace(/setthemeButtonuser$/, '');

        themeButtons1.push({ id1: id1, theme1: theme1 });
      }
    });

    var currentThemesText = statusDiv1.innerText;
    themeButtons1.forEach(function(buttonset) {
      var themeButton1 = document.getElementById(buttonset.id1);
      if (currentThemesText.includes(buttonset.theme1)) {
        themeButton1.disabled = true;
        themeButton1.style.backgroundColor = '#d9d9d9';
        themeButton1.style.textDecoration = 'line-through';
        themeButton1.style.cursor = 'no-drop';
      } else {
        themeButton1.disabled = false;
      }
    });


    //disable download button if already downloaded

    function isThemeDownloaded2(themeName) {
      var downloadedThemesList = document.getElementById('systemthemes').getElementsByTagName('li');
      for (var i = 0; i < downloadedThemesList.length; i++) {
        if (downloadedThemesList[i].textContent === themeName) {
          return true;
        }
      }
      return false;
    }


    var themeButtons2 = [
    { id: 'SystemLightdownloadButton', theme: 'themes/system/SystemLight.theme' },
    { id: 'SystemDarkdownloadButton', theme: 'themes/system/SystemDark.theme' },
    { id: 'stopandgodownloadButton', theme: 'themes/system/stopandgo.theme' },
    { id: 'CandycanedownloadButton', theme: 'themes/system/Candycane.theme' },
    { id: 'MoRBiD_MaNGLeRDarkdownloadButton', theme: 'themes/system/MoRBiD_MaNGLeR-Dark.theme' },
    { id: 'MoRBiD_MaNGLeRC64downloadButton', theme: 'themes/system/MoRBiD_MaNGLeR-C64.theme' },
    { id: 'MoRBiD_MaNGLeRBlueWhitedownloadButton', theme: 'themes/system/MORBiD_MaNGLeR-BlueWhite.theme' }
    ];

    // Iterate over the theme buttons array
    themeButtons2.forEach(function(button) {
    var themeButton2 = document.getElementById(button.id);
    var themeName2 = button.theme;

    if (isThemeDownloaded2(themeName2)) {
      // Theme is downloaded, enable the JSON button
      themeButton2.disabled = true;
      themeButton2.style.backgroundColor = '#d9d9d9';
      themeButton2.style.textDecoration = 'line-through';
      themeButton2.style.cursor = 'no-drop';
    } else {
      // Theme is not downloaded, disable the JSON button
      themeButton2.disabled = false;
    }
    });


    //disable set button if not downloaded

    function isThemeDownloaded3(themeName) {
      var downloadedThemesList = document.getElementById('systemthemes').getElementsByTagName('li');
      for (var i = 0; i < downloadedThemesList.length; i++) {
        if (downloadedThemesList[i].textContent === themeName) {
          return true;
        }
      }
      return false;
    }


    var themeButtons3 = [
    { id: 'SystemLightsetthemeButton', theme: 'themes/system/SystemLight.theme' },
    { id: 'SystemDarksetthemeButton', theme: 'themes/system/SystemDark.theme' },
    { id: 'stopandgosetthemeButton', theme: 'themes/system/stopandgo.theme' },
    { id: 'CandycanesetthemeButton', theme: 'themes/system/Candycane.theme' },
    { id: 'MoRBiD_MaNGLeRDarksetthemeButton', theme: 'themes/system/MoRBiD_MaNGLeR-Dark.theme' },
    { id: 'MoRBiD_MaNGLeRC64setthemeButton', theme: 'themes/system/MoRBiD_MaNGLeR-C64.theme' },
    { id: 'MoRBiD_MaNGLeRBlueWhitesetthemeButton', theme: 'themes/system/MORBiD_MaNGLeR-BlueWhite.theme' }
    ];

    // Iterate over the theme buttons array
    themeButtons3.forEach(function(button) {
    var themeButton3 = document.getElementById(button.id);
    var themeName3 = button.theme;

    if (isThemeDownloaded3(themeName3)) {
      // Theme is downloaded, enable the JSON button
      themeButton3.disabled = false;
    } else {
      // Theme is not downloaded, disable the JSON button
      themeButton3.disabled = true;
      themeButton3.style.backgroundColor = '#d9d9d9';
      themeButton3.style.textDecoration = 'line-through';
      themeButton3.style.cursor = 'no-drop';
    }
    });


    //disable show json button if not downloaded

    // Function to check if a theme is downloaded
    // Function to check if a theme is downloaded
    function isThemeDownloaded(themeName) {
      var downloadedThemesList = document.getElementById('systemthemes').getElementsByTagName('li');
      for (var i = 0; i < downloadedThemesList.length; i++) {
        if (downloadedThemesList[i].textContent === themeName) {
          return true;
        }
      }
      return false;
    }


  var themeButtons = [
    { id: 'SystemLightjsonButton', theme: 'themes/system/SystemLight.theme' },
    { id: 'SystemDarkjsonButton', theme: 'themes/system/SystemDark.theme' },
    { id: 'stopandgojsonButton', theme: 'themes/system/stopandgo.theme' },
    { id: 'CandycanejsonButton', theme: 'themes/system/Candycane.theme' },
    { id: 'MoRBiD_MaNGLeRDarkjsonButton', theme: 'themes/system/MoRBiD_MaNGLeR-Dark.theme' },
    { id: 'MoRBiD_MaNGLeRC64jsonButton', theme: 'themes/system/MoRBiD_MaNGLeR-C64.theme' },
    { id: 'MoRBiD_MaNGLeRBlueWhitejsonButton', theme: 'themes/system/MORBiD_MaNGLeR-BlueWhite.theme' }
  ];

  // Iterate over the theme buttons array
  themeButtons.forEach(function(button) {
    var themeButton = document.getElementById(button.id);
    var themeName = button.theme;

    if (isThemeDownloaded(themeName)) {
      // Theme is downloaded, enable the JSON button
      themeButton.disabled = false;
    } else {
      // Theme is not downloaded, disable the JSON button
      themeButton.disabled = true;
      themeButton.style.backgroundColor = '#d9d9d9';
      themeButton.style.textDecoration = 'line-through';
      themeButton.style.cursor = 'no-drop';
    }
  });
};
    //end button display functions

    //start json popup functions
    function returnJson(theme) {
      const xhr = new XMLHttpRequest();
      const filepath = `${theme}.theme`
      const endpointUrl = `/api/themes/readthemejson?filepath=${filepath}`;

      xhr.open('GET', endpointUrl, true);
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const jsonData = JSON.parse(this.responseText);
          // Display the JSON data in a modal popup
          showJsonPopup(jsonData, theme);
        }
      };
      xhr.send();
    }

    // Function to display the JSON popup
    function showJsonPopup(content, theme) {
      const jsonString = JSON.stringify(content, null, 2);
        var popup = document.getElementById("jsonPopup");
        var jsonContent = document.getElementById("jsonContent");
        jsonContent.textContent = jsonString;
        var jsonfileheading = document.getElementById("jsonfileheading");
        jsonfileheading.textContent = `${theme} Theme JSON`;
        popup.style.display = "flex";
        document.body.classList.add('modal-open');
    }

    // Function to close the JSON popup
    // Function to close the modal
    function closeModal() {
      var modal = document.getElementById("jsonPopup");
      modal.style.display = "none";
      document.body.classList.remove('modal-open');
    }

    // Close the modal when the user clicks outside of it
    window.onclick = function(event) {
      var modal = document.getElementById("jsonPopup");
      if (event.target == modal) {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
      }
    }

    //end json popup function
  </script>
  <script>
    const button = document.querySelector('.show-content-button');
    const expandContent = document.querySelector('.expand-content');
    let isContentHidden = true;

    button.addEventListener('click', function() {
        expandContent.classList.toggle('hidden');
        isContentHidden = !isContentHidden;
        button.textContent = isContentHidden ? 'Show older Changelogs' : 'Hide older Changelogs';
    });
    </script>



    <script>
      function copySrc(copyItem) {
        // Get the image element
        var image = document.getElementById(copyItem);

        // Get the src attribute value
        var src = image.src;

        // Create a temporary input element
        var tempInput = document.createElement("input");
        tempInput.value = src;

        // Append the input element to the document
        document.body.appendChild(tempInput);

        // Select the text inside the input
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text to the clipboard
        document.execCommand("copy");

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        // Alert the user
        alert("Image src copied: " + src);
      }
    </script>

    <script>
        function handleZip() {
          fetch('/zip/logs')
            .then(response => {
              if (response.ok) {
                return response.blob();
              } else {
                throw new Error('Error creating zip file.');
              }
            })
            .then(blob => {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'logs.zip';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            })
            .catch(error => {
              logger.error('Error:', error);
            });
        }
      </script>
