document.addEventListener("DOMContentLoaded", function() {
  const bill = document.getElementById("bill");
  const billErr = document.getElementById("bill-err");

  const people = document.getElementById("people");
  const peopleErr = document.getElementById("people-err");

  const tipButtons = document.querySelectorAll(".tip-inputs input[type='button']");
  const customTipInput = document.getElementById("customTip");

  const tipAmountDisplay = document.getElementById("tip");
  const totalAmountDisplay = document.getElementById("total");
  const resetButton = document.getElementById("reset-btn");

  let billValue = 0;
  let peopleValue = 0;
  let tipPercentage = 0;

  bill.addEventListener("keyup", function() {
    billValue = parseFloat(bill.value);
    if (billValue === 0) {
      billErr.innerHTML = "Can't be zero";
      bill.style.border = "2px solid red";
    } else {
      billErr.innerHTML = "";
      bill.style.border = "";
    }
    calculateAndDisplayResults();
  });

  people.addEventListener("keyup", function() {
    peopleValue = parseInt(people.value, 10);
    if (peopleValue === 0) {
      peopleErr.innerHTML = "Can't be zero";
      people.style.border = "2px solid red";
    } else {
      peopleErr.innerHTML = "";
      people.style.border = "";
    }
    calculateAndDisplayResults();
  });

  tipButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      tipButtons.forEach(btn => btn.style.backgroundColor = "");
      this.style.backgroundColor = "hsl(172, 67%, 45%)";
      customTipInput.value = '';
      tipPercentage = parseFloat(this.value);
      calculateAndDisplayResults();
    });
  });

  customTipInput.addEventListener("input", function() {
    tipButtons.forEach(btn => btn.style.backgroundColor = "");
    tipPercentage = parseFloat(this.value);
    if (!isNaN(tipPercentage)) {
      calculateAndDisplayResults();
    }
  });

  resetButton.addEventListener("click", function() {
    location.reload();
  });

  function calculateAndDisplayResults() {
    if (billValue > 0 && peopleValue > 0 && tipPercentage >= 0) {
      resetButton.style.backgroundColor = "hsl(172, 67%, 45%)"
      const tipAmount = (billValue * tipPercentage) / 100;
      const totalAmount = billValue + tipAmount;
      const tipPerPerson = tipAmount / peopleValue;
      const totalPerPerson = totalAmount / peopleValue;

      tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
      totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
    } else {
      tipAmountDisplay.textContent = "$0.00";
      totalAmountDisplay.textContent = "$0.00";
    }
  }
});
