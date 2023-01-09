     //When a user inputs a value into the monthlySalary form input field, save it as a variable called monthlySalary it should be multiplied by 12
        //When the user clicks the button with id="btn" it should run the function calculateTopskat
        //If calculateTopskat is greater than or equal to 544800, the user should see a message that says "Du skal betale topskat" else output "Du skal ikke betale topskat!" output it in div id="msg"
        
        let monthlySalary = document.getElementById("monthlySalary");
        let btn = document.getElementById("btn");
        let msg = document.getElementById("msg");
        
        function calculateTopskat() {
          let monthlySalary = parseInt(document.getElementById("monthlySalary").value);
          let topskat = monthlySalary * 12;
        
          if (topskat > 544800) {
            msg.innerHTML = "Du skal betale topskat";
          } else {
            msg.innerHTML = "Du skal ikke betale topskat!";
          }
        
        if (topskat > 544800) {
            topskatDiff = 45400 - monthlySalary;
            document.getElementById("topskatDiff").innerHTML = "Du skal tjene " + topskatDiff + " kr. mindre om måneden for ikke at betale topskat.";
        }
        else if (topskat < 544800) {
            topskatDiff = 45400 - monthlySalary;
            document.getElementById("topskatDiff").innerHTML = "Du kan tjene " + topskatDiff + " kr. mere om måneden før du skal betale topskat.";
        }
        
        var taxRate = 0.08;
        var taxAmountMonthly;
        
        taxRate = document.getElementById("taxRate").value;
        monthlySalary = document.getElementById("monthlySalary").value;
        
        //Calculate the tax amount of the variable monthlySalary + 8% AM bidrag
        taxAmountMonthly = monthlySalary * ((taxRate / 100)+0.08);
        document.getElementById("monthlyTax").innerHTML = "Du betaler " + taxAmountMonthly + " kr. om måneden i skat.";
        
        topskatPaid = (monthlySalary - 45400) * 0.15;
        document.getElementById("topskatPaid").innerHTML = "Du betaler " + topskatPaid + " kr. om måneden i topskat.";
        
        taxTotal = topskatPaid + taxAmountMonthly;
        salaryAfterAllTaxes = monthlySalary - taxTotal;
        document.getElementById("taxTotal").innerHTML = "Du betaler i alt " + taxTotal + "  kr. om måneden i skat (skat+topskat). Og får udbetalt" + salaryAfterAllTaxes + " kr. om måneden.";
        
        }
        
        //Add preventDefault to the event listener on the button
        btn.addEventListener("click", function(e) {
          e.preventDefault();
          calculateTopskat();
        });