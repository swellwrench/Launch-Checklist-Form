window.addEventListener("load", function() {
   let formSubmit = document.getElementById("formSubmit");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let faultyItems = document.getElementById("faultyItems");
   let launchStatus = document.getElementById("launchStatus");
   let missionTarget = document.getElementById("missionTarget");
   let launchReady = true;
      formSubmit.addEventListener("click", function(event) {
         if (!(pilotName.value && copilotName.value && fuelLevel.value && cargoMass.value)) {
            alert("All fields are required.");
            event.preventDefault();
         } else if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value)) || !isNaN(Number(pilotName.value)) || !isNaN(Number(copilotName.value))) {
            alert("Make sure to enter valid information for each field!");
            event.preventDefault();
         } else {
            pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`;
            copilotStatus.innerHTML = `Copilot ${copilotName.value} is ready for launch.`;
            event.preventDefault();
            if (fuelLevel.value < 10000) {
               faultyItems.style.visibility = "visible";
               fuelStatus.innerHTML = "WARNING: Insufficient fuel!";
               launchStatus.innerHTML = "<font color='FF0000'>Shuttle not ready for launch</font>";
               launchReady = false;
            }
            if (cargoMass.value > 10000) {
               faultyItems.style.visibility = "visible";
               cargoStatus.innerHTML = "WARNING: Too much cargo!";
               launchStatus.innerHTML = "<font color='FF0000'>Shuttle not ready for launch</font>";
               launchReady = false;
            }
            if (launchReady === true) {
               launchStatus.innerHTML = "<font color='00FF00'>Shuttle is ready for launch</font>";
            }
         }

      });
      fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      response.json().then(function(json) {
         let planetChoice = Math.floor(Math.random()*json.length);
         missionTarget.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[planetChoice].name}</li>
            <li>Diameter: ${json[planetChoice].diameter}</li>
            <li>Star: ${json[planetChoice].star}</li>
            <li>Distance from Earth: ${json[planetChoice].distance}</li>
            <li>Number of Moons: ${json[planetChoice].moons}</li>
         </ol>
         <img src='${json[planetChoice].image}'>`
      })
   })
   
   });