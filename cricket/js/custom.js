// Batting Calculation
function calculatePoints() {
  var runsInput = document.getElementById("runs");
  var ballsInput = document.getElementById("balls");
  var dotBallsInput = document.getElementById("dotBalls");
  var foursInput = document.getElementById("foursBt");
  var sixesInput = document.getElementById("sixesBt");
  var battingPaymentInput = document.getElementById("battingPayment");
  var totalCreditsInput = document.getElementById("totalBattingCredits");
  var totalFineBtInput = document.getElementById("totalFineBt");

  var runs = parseInt(runsInput.value);
  var balls = parseInt(ballsInput.value);

  // Check if runs and balls are valid numbers
  if (isNaN(runs) && isNaN(balls)) {
    alert("Please enter valid numbers for runs and balls faced.");
    return;
  }

  // Calculate strike rate
  var strikeRate = (runs / balls) * 100;

  // Update strike rate field
  document.getElementById("strikeRate").value = strikeRate.toFixed(2);

  var dotBalls = parseInt(dotBallsInput.value);
  var fours = parseInt(foursInput.value);
  var sixes = parseInt(sixesInput.value);

  var battingFine = 0;
  if (strikeRate < 90 && strikeRate >= 80) {
    battingFine = 15;
  } else if (strikeRate < 80 && strikeRate >= 70) {
    battingFine = 20;
  } else if (strikeRate < 70 && strikeRate >= 60) {
    battingFine = 25;
  } else if (strikeRate < 60 && strikeRate >= 50) {
    battingFine = 30;
  } else if (strikeRate < 50 && strikeRate >= 40) {
    battingFine = 35;
  } else if (strikeRate < 40) {
    battingFine = 40;
  }

  var battingPoints = 0;
  if (runs == 0) {
    battingFine = 40;
  } else if (runs > 35) {
    battingPoints = 500;
  } else if (runs >= 30 && runs < 35) {
    battingPoints = 50;
  } else if (runs >= 25 && runs < 30) {
    battingPoints = 30;
  } else if (runs >= 20 && runs < 25) {
    battingPoints = 20;
  } else if (runs > 10 && runs < 20) {
    battingPoints = 10;
  }

  var dotBallFine = 0;
  if (dotBalls >= 4 && runs <= 10 && strikeRate <= 100) {
    dotBallFine = dotBalls * 5;
  }

  var boundaryCredits = fours * 5 + sixes * 5;
  var totalFineBt = battingFine + dotBallFine;
  var totalBattingCredits = battingPoints + boundaryCredits;

  document.getElementById("battingFine").value = battingFine;
  document.getElementById("battingPoints").value = battingPoints;
  document.getElementById("dotBallFine").value = dotBallFine;
  document.getElementById("boundaryCredits").value = boundaryCredits;
  document.getElementById("totalFineBt").value = totalFineBt;
  document.getElementById("totalBattingCredits").value = totalBattingCredits;

  var totalBattingCredits = parseInt(totalCreditsInput.value);
  var totalFineBt = parseInt(totalFineBtInput.value);
  var battingPayment = totalFineBt - totalBattingCredits;
  battingPaymentInput.value = battingPayment;
}

//Bowling Calculation

document.addEventListener("DOMContentLoaded", function (event) {
  var oversBowledInput = document.getElementById("oversBowled");
  var runsGivenInput = document.getElementById("runsGiven");
  var economyInput = document.getElementById("economy");
  var economyCreditsInput = document.getElementById("economyCredits");
  var economyFineInput = document.getElementById("economyFine");
  var wicketsInput = document.getElementById("wickets");
  var wicketCreditsInput = document.getElementById("wicketCredits");
  var maidenInput = document.getElementById("maiden");
  var maidenCreditsInput = document.getElementById("maidenCredits");
  var totalCreditsInput = document.getElementById("totalCredits");
  var foursInput = document.getElementById("fours");
  var sixesInput = document.getElementById("sixes");
  var boundaryFineInput = document.getElementById("boundaryFine");
  var continuousBoundaryInput = document.getElementById("continuousBoundary");
  var continuousBoundariesFineInput = document.getElementById(
    "continuousBoundariesFine"
  );
  var widesInput = document.getElementById("wides");
  var wideFineInput = document.getElementById("wideFine");
  var totalFineInput = document.getElementById("totalFine");
  var bowlingPaymentInput = document.getElementById("bowlingPayment");
  var hatTrickCheckbox = document.getElementById("hatTrickWicket");

  oversBowledInput.addEventListener("input", calculateEconomy);
  runsGivenInput.addEventListener("input", calculateEconomy);
  wicketsInput.addEventListener("input", calculateWicketCredits);
  maidenInput.addEventListener("input", calculateMaidenCredits);
  foursInput.addEventListener("input", calculateBoundaryFine);
  sixesInput.addEventListener("input", calculateBoundaryFine);
  continuousBoundaryInput.addEventListener(
    "input",
    calculateContinuousBoundariesFine
  );
  widesInput.addEventListener("input", calculateWideFine);
  hatTrickCheckbox.addEventListener("change", calculateHatTrickCredits);

  function calculateEconomy() {
    var runsGiven = parseFloat(runsGivenInput.value);
    var oversBowled = parseFloat(oversBowledInput.value);

    if (isNaN(runsGiven) || isNaN(oversBowled)) {
      economyInput.value = "";
      economyCreditsInput.value = "";
      economyFineInput.value = "";
    } else {
      var economy = runsGiven / oversBowled;
      economyInput.value = economy.toFixed(2);

      var economyCredits = 0;
      if (economy >= 4 && economy <= 5) {
        economyCredits = 10;
      } else if (economy < 4 && economy >= 3) {
        economyCredits = 15;
      } else if (economy < 3 && economy > 0) {
        economyCredits = 20;
      }
      economyCreditsInput.value = economyCredits;

      var economyFine = 0;
      if (economy > 8 && economy <= 10) {
        economyFine = 15;
      } else if (economy > 10 && economy <= 12) {
        economyFine = 20;
      } else if (economy > 12 && economy <= 15) {
        economyFine = 25;
      } else if (economy > 15) {
        economyFine = 50;
      }
      economyFineInput.value = economyFine;
    }

    calculateTotalCredits();
  }

  function calculateWicketCredits() {
    var wickets = parseInt(wicketsInput.value);
    var wicketCredits = 0;
    if (wickets < 3) {
      wicketCredits = wickets * 10;
    } else if (wickets >= 3) {
      wicketCredits = 40;
    }
    wicketCreditsInput.value = wicketCredits;

    calculateTotalCredits();
  }

  function calculateMaidenCredits() {
    var maiden = parseInt(maidenInput.value);
    var maidenCredits = maiden * 30;
    maidenCreditsInput.value = maidenCredits;

    calculateTotalCredits();
  }

  function calculateBoundaryFine() {
    var fours = parseInt(foursInput.value);
    var sixes = parseInt(sixesInput.value);
    var boundaryFine = fours * 5 + sixes * 5;
    boundaryFineInput.value = boundaryFine;

    calculateTotalCredits();
  }

  function calculateContinuousBoundariesFine() {
    var continuousBoundary = parseInt(continuousBoundaryInput.value);
    var continuousBoundariesFine = 0;

    if (continuousBoundary === 2) {
      continuousBoundariesFine = 15;
    } else if (continuousBoundary > 2) {
      continuousBoundariesFine = 30;
    }

    continuousBoundariesFineInput.value = continuousBoundariesFine;

    calculateTotalFine();
  }

  function calculateWideFine() {
    var wides = parseInt(widesInput.value);
    var wideFine = wides * 10;
    wideFineInput.value = wideFine;

    calculateTotalFine();
  }

  function calculateTotalCredits() {
    var economyCredits = parseInt(economyCreditsInput.value);
    var wicketCredits = parseInt(wicketCreditsInput.value);
    var maidenCredits = parseInt(maidenCreditsInput.value);
    var totalCredits = economyCredits + wicketCredits + maidenCredits;
    totalCreditsInput.value = totalCredits;

    calculateBowlingPayment();
  }

  function calculateTotalFine() {
    var economyFine = parseInt(economyFineInput.value);
    var boundaryFine = parseInt(boundaryFineInput.value);
    var continuousBoundariesFine = parseInt(
      continuousBoundariesFineInput.value
    );
    var wideFine = parseInt(wideFineInput.value);
    var totalFine =
      economyFine + boundaryFine + continuousBoundariesFine + wideFine;
    totalFineInput.value = totalFine;

    calculateBowlingPayment();
  }

  function calculateBowlingPayment() {
    var totalCredits = parseInt(totalCreditsInput.value);
    var totalFine = parseInt(totalFineInput.value);
    var bowlingPayment = totalFine - totalCredits;
    bowlingPaymentInput.value = bowlingPayment;
  }

  function calculateHatTrickCredits() {
    var hatTrickCheckbox = document.getElementById("hatTrickWicket");
    var hatTrickCredits = hatTrickCheckbox.checked ? 40 : 0;
    var totalCredits = parseInt(totalCreditsInput.value);
    totalCredits += hatTrickCredits;
    totalCreditsInput.value = totalCredits;

    calculateBowlingPayment();
  }
});

//Fielding Calculation

document.addEventListener("DOMContentLoaded", function (event) {
  var catchDropInput = document.getElementById("catchDrop");
  var catchDropFineInput = document.getElementById("catchDropFine");
  var catchDropBoundaryInput = document.getElementById("catchDropBoundary");
  var catchDropBoundaryFineInput = document.getElementById(
    "catchDropBoundaryFine"
  );
  var misfieldInput = document.getElementById("misfield");
  var misfieldFineInput = document.getElementById("misfieldFine");
  var runOutMissInput = document.getElementById("runOutMiss");
  var runOutMissFineInput = document.getElementById("runOutMissFine");
  var dismissalsInput = document.getElementById("dismissals");
  var dismissalCreditsInput = document.getElementById("dismissalCredits");
  var totalFieldingFineInput = document.getElementById("totalFieldingFine");
  var overthrowInput = document.getElementById("overthrow");
  var overthrowFineInput = document.getElementById("overthrowFine");
  var overallFieldingFineInput = document.getElementById("overallFieldingFine");

  catchDropInput.addEventListener("input", calculateFieldingFine);
  catchDropBoundaryInput.addEventListener("input", calculateFieldingFine);
  misfieldInput.addEventListener("input", calculateFieldingFine);
  runOutMissInput.addEventListener("input", calculateFieldingFine);
  dismissalsInput.addEventListener("input", calculateFieldingFine);
  overthrowInput.addEventListener("input", calculateFieldingFine);

  function calculateFieldingFine() {
    var catchDrop = parseInt(catchDropInput.value) || 0;
    var catchDropBoundary = parseInt(catchDropBoundaryInput.value) || 0;
    var misfield = parseInt(misfieldInput.value) || 0;
    var runOutMiss = parseInt(runOutMissInput.value) || 0;
    var dismissals = parseInt(dismissalsInput.value) || 0;
    var overthrow = parseInt(overthrowInput.value) || 0;

    var catchDropFine = catchDrop * 25;
    var catchDropBoundaryFine = catchDropBoundary * 50;
    var misfieldFine = misfield * 10;
    var runOutMissFine = runOutMiss * 25;
    var overthrowFine = overthrow * 10;

    var dismissalCredits = 0;
    if (dismissals === 1 || dismissals === 2) {
      dismissalCredits = dismissals * 10;
    } else if (dismissals === 3) {
      dismissalCredits = 35;
    } else if (dismissals > 3) {
      dismissalCredits = 35 + (dismissals - 3) * 10;
    }

    var totalFieldingFine =
      catchDropFine +
      catchDropBoundaryFine +
      misfieldFine +
      runOutMissFine +
      overthrowFine;
    var totalDismissalCredits = dismissalCredits;
    var overallFieldingFine = totalFieldingFine - totalDismissalCredits;

    catchDropFineInput.value = catchDropFine;
    catchDropBoundaryFineInput.value = catchDropBoundaryFine;
    misfieldFineInput.value = misfieldFine;
    runOutMissFineInput.value = runOutMissFine;
    dismissalCreditsInput.value = totalDismissalCredits;
    overthrowFineInput.value = overthrowFine;
    totalFieldingFineInput.value = totalFieldingFine;
    overallFieldingFineInput.value = overallFieldingFine;
  }
});

//late fine

document.addEventListener("DOMContentLoaded", function (event) {
  var playerSelect = document.getElementById("playerSelect");
  var within5OversCheckbox = document.getElementById("within5Overs");
  var oversCameInput = document.getElementById("oversCame");
  var fineTable = document.getElementById("fineTable");
  var selectedPlayers = {};

  playerSelect.addEventListener("change", addLateFine);

  function addLateFine() {
    var player = playerSelect.value;

    // Check if the player has already been selected
    if (selectedPlayers[player]) {
      alert("Player already selected!");
      return;
    }

    // Add the selected player to the selectedPlayers object with a default fine amount of 25
    selectedPlayers[player] = 25;

    // Create a new row in the table
    var row = fineTable.insertRow();

    // Insert player name and fine amount in the row
    var nameCell = row.insertCell(0);
    nameCell.innerHTML = player;
    var fineCell = row.insertCell(1);
    fineCell.innerHTML = selectedPlayers[player];
  }

  within5OversCheckbox.addEventListener("change", function () {
    if (within5OversCheckbox.checked) {
      // Enable the "Overs Came into the match" field
      oversCameInput.disabled = false;
    } else {
      // Disable the "Overs Came into the match" field
      oversCameInput.disabled = true;
    }
    // Calculate the fine amount for the currently selected player
    updateFineAmount();
  });

  oversCameInput.addEventListener("input", function () {
    // Calculate the fine amount for the currently selected player
    updateFineAmount();
  });

  function updateFineAmount() {
    var player = playerSelect.value;
    var fineMultiplier = within5OversCheckbox.checked
      ? parseInt(oversCameInput.value) || 0
      : 0;

    // Update the fine amount for the currently selected player
    selectedPlayers[player] = fineMultiplier * 5 || 25;

    // Update the fine amount in the table
    updateFineTable();
  }

  function updateFineTable() {
    // Clear the existing rows in the table
    fineTable.innerHTML = `
          <tr>
                        <td></td>
                        <td></td>
                      </tr>
        `;

    // Add rows for each selected player with their updated fine amount
    for (var player in selectedPlayers) {
      var row = document.createElement("tr");
      var nameCell = document.createElement("td");
      nameCell.innerHTML = player;
      var fineCell = document.createElement("td");
      fineCell.innerHTML = selectedPlayers[player];
      row.appendChild(nameCell);
      row.appendChild(fineCell);
      fineTable.appendChild(row);
    }
  }
});

//table update code
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the form and table body
  const formBatting = document.getElementById("myFormBatting");
  const formBowling = document.getElementById("myFormBowling");
  const formFeilding = document.getElementById("myFormFeilding");
  const tableBodybatting = document.querySelector("#battingPointsTable tbody");
  const tableBodybowling = document.querySelector("#bowlingPointsTable tbody");
  const tableBodyFeilding = document.querySelector(
    "#feildingPointsTable tbody"
  );
  const resetBatting = document.getElementById("battingReset");
  const resetBowling = document.getElementById("bowlingReset");
  const resetFeilding = document.getElementById("feildingReset");
  // const battingSubmit = document.getElementById("battingSubmit");

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission
    // Get form values
    const playerName = document.getElementById("playerName").value;
    const battingPayment = document.getElementById("battingPayment").value;
    // Create a new table row with form data
    const newRow = document.createElement("tr");
    const playernameCell = document.createElement("td");
    playernameCell.textContent = playerName;
    const battingPaymentCell = document.createElement("td");
    battingPaymentCell.textContent = battingPayment;
    // Append the new row to the table body
    newRow.appendChild(playernameCell);
    newRow.appendChild(battingPaymentCell);
    tableBodybatting.appendChild(newRow);
    // Reset the form
    formBatting.reset();
  }

  function handleSubmitBowling(event) {
    event.preventDefault(); // Prevent form submission
    // Get form values
    const playerNamebowling =
      document.getElementById("playerNameBowling").value;
    const bowlingPayment = document.getElementById("bowlingPayment").value;
    // Create a new table row with form data
    const newRowBowling = document.createElement("tr");
    const playernameCellBowling = document.createElement("td");
    playernameCellBowling.textContent = playerNamebowling;
    const bowlingPaymentCell = document.createElement("td");
    bowlingPaymentCell.textContent = bowlingPayment;
    // Append the new row to the table body
    newRowBowling.appendChild(playernameCellBowling);
    newRowBowling.appendChild(bowlingPaymentCell);
    tableBodybowling.appendChild(newRowBowling);
    // Reset the form
    formBowling.reset();
  }

  function handleSubmitFielding(event) {
    event.preventDefault(); // Prevent form submission
    // Get form values
    const playerNamefeilding =
      document.getElementById("playerNameFeilding").value;
    const feildingPayment = document.getElementById(
      "overallFieldingFine"
    ).value;
    // Create a new table row with form data
    const newRowFeilding = document.createElement("tr");
    const playernameCellFeilding = document.createElement("td");
    playernameCellFeilding.textContent = playerNamefeilding;
    const feildingPaymentCell = document.createElement("td");
    feildingPaymentCell.textContent = feildingPayment;
    // Append the new row to the table body
    newRowFeilding.appendChild(playernameCellFeilding);
    newRowFeilding.appendChild(feildingPaymentCell);
    tableBodyFeilding.appendChild(newRowFeilding);
    // Reset the form
    formFeilding.reset();
  }

  function handleReset() {
    // Clear the table body
    tableBodybatting.innerHTML = "";
  }
  function handleResetBowling() {
    // Clear the table body
    tableBodybowling.innerHTML = "";
  }

  function handleResetFeilding() {
    // Clear the table body
    tableBodyFeilding.innerHTML = "";
  }
  // Event listener for form submission
  formBatting.addEventListener("submit", handleSubmit);
  formBowling.addEventListener("submit", handleSubmitBowling);
  formFeilding.addEventListener("submit", handleSubmitFielding);

  // Event listener for form reset
  resetBatting.addEventListener("click", handleReset);
  resetBowling.addEventListener("click", handleResetBowling);
  resetFeilding.addEventListener("click", handleResetFeilding);
});

//Umpires Calculation

document.addEventListener("DOMContentLoaded", function (event) {
  var umpire1Select = document.getElementById("umpire1");
  var umpire2Select = document.getElementById("umpire2");
  var umpire3Select = document.getElementById("umpire3");
  var umpire4Select = document.getElementById("umpire4");
  var umpire5Select = document.getElementById("umpire5");
  var umpire6Select = document.getElementById("umpire6");
  var umpireTable = document.getElementById("umpireTable");
  //const tableBodyumpire = document.querySelector("#umpireTable tbody");

  var umpiresCredits = {};

  function updateUmpireCredits(umpireSelect) {
    var umpireName = umpireSelect.value;
    if (umpiresCredits.hasOwnProperty(umpireName)) {
      umpiresCredits[umpireName] += 15;
    } else {
      umpiresCredits[umpireName] = 15;
    }
  }

  function updateUmpireTable() {
    umpireTable.innerHTML =
      "<thead><tr><th>Umpire Name</th><th>Credits</th></tr></thead>";
    for (var umpireName in umpiresCredits) {
      var umpireRow = document.createElement("tr");
      var umpireNameCell = document.createElement("td");
      var umpireCreditsCell = document.createElement("td");

      umpireNameCell.textContent = umpireName;
      umpireCreditsCell.textContent = umpiresCredits[umpireName];

      umpireRow.appendChild(umpireNameCell);
      umpireRow.appendChild(umpireCreditsCell);
      umpireTable.appendChild(umpireRow);
      //tableBodyumpire.appendChild(umpireRow);
    }
  }

  umpire1Select.addEventListener("change", function () {
    updateUmpireCredits(umpire1Select);
    updateUmpireTable();
  });

  umpire2Select.addEventListener("change", function () {
    updateUmpireCredits(umpire2Select);
    updateUmpireTable();
  });

  umpire3Select.addEventListener("change", function () {
    updateUmpireCredits(umpire3Select);
    updateUmpireTable();
  });

  umpire4Select.addEventListener("change", function () {
    updateUmpireCredits(umpire4Select);
    updateUmpireTable();
  });

  umpire5Select.addEventListener("change", function () {
    updateUmpireCredits(umpire5Select);
    updateUmpireTable();
  });

  umpire6Select.addEventListener("change", function () {
    updateUmpireCredits(umpire6Select);
    updateUmpireTable();
  });
});
