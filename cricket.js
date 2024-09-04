   
       var scores = { A: { score: 0, wickets: 0, overs: 0 }, B: { score: 0, wickets: 0, overs: 0 } };
       var currentTeam = "A";
       var Limit = 1;
       var ball = 6;
       var wik = 11;
       
       $(document).ready(function() {
           $("#team").hide();
           $(".button-container button").click(function() {
               var runs = parseInt($(this).text());
               updateScore(currentTeam, runs);
               ball--;
               if (ball == 0) {
                   updateOvers(currentTeam);
                   checkOversLimit();
                   ball = 6;
               }
           });
       
           $("#out button, #wikt button").click(function() {
               updateWicket(currentTeam);
               checkwikt();
           });
       
           $("#over button").click(function() {
               updateOvers(currentTeam);
               checkOversLimit();
           });
       
           $("#team button").click(function() {
               switchInning();
               $(".flip-card-inner").toggleClass("flip");
               enableButtons();
               checkGameStatus();
           });
       });
       
       function updateScore(team, runs) {
           scores[team].score += runs;
           $("#score" + team).text("Score: " + scores[team].score);
       }
       
       function updateWicket(team) {
           scores[team].wickets += 1;
           $("#wickets" + team).text("Wickets: " + scores[team].wickets);
       }
       
       function updateOvers(team) {
           scores[team].overs += 1;
           $("#overs" + team).text("Overs: " + scores[team].overs.toFixed(1));
       }
       
       function switchInning() {
           currentTeam = currentTeam === "A" ? "B" : "A";
           $("#score").text("Current Team: A");
           $("#scoreA").text("Score: " + scores.A.score);
           $("#scoreB").text("Score: " + scores.B.score);
           $("#wicketsA").text("Wickets: " + scores.A.wickets);
           $("#wicketsB").text("Wickets: " + scores.B.wickets);
           $("#oversA").text("Overs: " + scores.A.overs.toFixed(1));
           $("#oversB").text("Overs: " + scores.B.overs.toFixed(1));
       }
       
       function checkwikt() {
           if (scores[currentTeam].wickets >= wik) {
               disableAllButtons();
               $("#team").show();
           }
       }
       
       function checkOversLimit() {
           if (scores[currentTeam].overs >= Limit) {
               disableButtons();
               $("#team").show();
           }
       }
       
       function disableButtons() {
           $(".button-container button, #out button, #wikt button, #over button").prop("disabled", true);
       }
       
       function enableButtons() {
           $(".button-container button, #out button, #wikt button, #over button").prop("disabled", false);
       }
       
       function checkGameStatus() {
           if (scores.A.overs >= Limit && scores.B.overs >= Limit) {
               disableAllButtons();
               declareWinner();
           }
       }
       
       function disableAllButtons() {
           $(".button-container button, #out button, #wikt button, #over button, #team button").prop("disabled", true);
       }
       
       function declareWinner() {
           if (scores.A.score > scores.B.score) {
               alert("Team A wins!");
           } else if (scores.B.score > scores.A.score) {
               alert("Team B wins!");
           } else {
               alert("It's a tie!");
           }
       }