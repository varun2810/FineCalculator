"use strict";

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
  var balls = parseInt(ballsInput.value); // Check if runs and balls are valid numbers

  if (isNaN(runs) && isNaN(balls)) {
    alert("Please enter valid numbers for runs and balls faced.");
    return;
  } // Calculate strike rate


  var strikeRate = runs / balls * 100; // Update strike rate field

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
} //Bowling Calculation


document.addEventListener("DOMContentLoaded", function () {
  var oversBowledInput = document.getElementById("oversBowled");
  var runsGivenInput = document.getElementById("runsGiven");
  var economyInput = document.getElementById("economy");
  var economyCreditsInput = document.getElementById("economyCredits");
  var economyFineInput = document.getElementById("economyFine");
  var wicketsInput = document.getElementById("wickets");
  var wicketCreditsInput = document.getElementById("wicketCredits");
  var totalCreditsInput = document.getElementById("totalCredits");
  var maidenInput = document.getElementById("maiden");
  var maidenCreditsInput = document.getElementById("maidenCredits");
  var foursInput = document.getElementById("fours");
  var sixesInput = document.getElementById("sixes");
  var boundaryFineInput = document.getElementById("boundaryFine");
  var twoOrMoreFoursInput = document.getElementById("twoOrMoreFours");
  var twoOrMoreSixesInput = document.getElementById("twoOrMoreSixes");
  var continuousBoundariesFineInput = document.getElementById("continuousBoundariesFine");
  var totalFineInput = document.getElementById("totalFine");
  var bowlingPaymentInput = document.getElementById("bowlingPayment");
  oversBowledInput.addEventListener("input", calculateEconomy);
  runsGivenInput.addEventListener("input", calculateEconomy);
  wicketsInput.addEventListener("input", calculateTotalCredits);
  maidenInput.addEventListener("input", calculateMaidenCredits);
  foursInput.addEventListener("input", calculateBoundaryFine);
  sixesInput.addEventListener("input", calculateBoundaryFine);
  twoOrMoreFoursInput.addEventListener("input", calculateContinuousBoundariesFine);
  twoOrMoreSixesInput.addEventListener("input", calculateContinuousBoundariesFine);

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
      } else if (economy < 3 && economy >= 1) {
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

  function calculateTotalCredits() {
    var wickets = parseInt(wicketsInput.value);
    var wicketCredits = wickets * 10;
    wicketCreditsInput.value = wicketCredits;
    var economyCredits = parseInt(economyCreditsInput.value);
    var maidenCredits = parseInt(maidenCreditsInput.value);

    if (maidenCredits > 0) {
      var totalCredits = economyCredits + maidenCredits;
      totalCreditsInput.value = totalCredits;
    } else if (maidenCredits == 0 && wickets > 0) {
      var totalCredits = economyCredits + maidenCredits + wicketCredits;
      totalCreditsInput.value = totalCredits;
    } else if (maidenCredits == 0) {
      var totalCredits = economyCredits + maidenCredits - wicketCredits;
      totalCreditsInput.value = totalCredits;
    }

    calculateTotalFine();
  }

  function calculateMaidenCredits() {
    var maiden = parseInt(maidenInput.value);
    var wickets = parseInt(wicketsInput.value);
    var maidenCredits = 0;

    if (maiden === 0) {
      var wicketCredits = wickets * 10;
      wicketCreditsInput.value = wicketCredits;
    } else if (maiden > 0) {
      maidenCredits = 25;

      if (wickets > 0) {
        maidenCredits += wickets * 25;
        wicketCreditsInput.value = ""; // Clear wicketCreditsInput value
      }
    }

    maidenCreditsInput.value = maidenCredits;
    calculateTotalCredits();
  }

  function calculateBoundaryFine() {
    var fours = parseInt(foursInput.value);
    var sixes = parseInt(sixesInput.value);
    var boundaryFine = fours * 5 + sixes * 5;
    boundaryFineInput.value = boundaryFine;
    calculateTotalFine();
  }

  function calculateContinuousBoundariesFine() {
    var twoOrMoreFours = parseInt(twoOrMoreFoursInput.value);
    var twoOrMoreSixes = parseInt(twoOrMoreSixesInput.value);
    var continuousBoundariesFine = 0;

    if (twoOrMoreFours >= 2) {
      continuousBoundariesFine = 15;
    } else if (twoOrMoreSixes >= 2) {
      continuousBoundariesFine = 20;
    } else if (twoOrMoreSixes >= 3) {
      continuousBoundariesFine = 40;
    }

    continuousBoundariesFineInput.value = continuousBoundariesFine;
    calculateTotalFine();
  }

  function calculateTotalFine() {
    var economyFine = parseInt(economyFineInput.value);
    var boundaryFine = parseInt(boundaryFineInput.value);
    var continuousBoundariesFine = parseInt(continuousBoundariesFineInput.value);
    var totalFine = economyFine + boundaryFine + continuousBoundariesFine;
    totalFineInput.value = totalFine;
    calculateBowlingPayment();
  }

  function calculateBowlingPayment() {
    var totalCredits = parseInt(totalCreditsInput.value);
    var totalFine = parseInt(totalFineInput.value);
    var bowlingPayment = totalFine - totalCredits;
    bowlingPaymentInput.value = bowlingPayment;
  }
});