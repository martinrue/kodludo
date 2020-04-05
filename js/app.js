const app = (() => {
  const setLocked = () => {
    $(".input-container").classList.add("locked");
    $(".input-container .input").className = "input fail";
    $("#input-1").value = "-";
    $("#input-2").value = "-";
    $("#input-3").value = "-";
  };

  const setFailed = () => {
    $(".input-container .input").className = "input fail";

    setTimeout(() => {
      $(".input-container .input").className = "input";
    }, 1500);
  };

  const setSuccess = () => {
    $(".input-container .input").className = "input ok";
  };

  const updateAttemptsRemaining = () => {
    const remaining = game.attemptsRemaining();

    $("#attempts-remaining").innerText = remaining;
    $("#attempts-remaining-label").innerHTML =
      remaining === 1 ? "Provo<br />Restas" : "Provoj<br />Restas";
  };

  const checkStats = () => {
    updateAttemptsRemaining();

    const success = game.getSuccess();

    if (success) {
      $("#input-1").value = success[0];
      $("#input-2").value = success[1];
      $("#input-3").value = success[2];

      return setSuccess();
    }

    const remaining = game.attemptsRemaining();

    if (remaining <= 0) {
      setLocked();
    }
  };

  const checkForReset = () => {
    if (window.location.search.match(/reset/g)) {
      game.resetAttemptsRemaining();
    }
  };

  const makeGuess = () => {
    const guess = [
      $("#input-1").value,
      $("#input-2").value,
      $("#input-3").value,
    ].join("");

    const result = game.guess(guess);
    updateAttemptsRemaining();

    if (result === "ok") {
      game.setSuccess();
      setSuccess();
      return;
    }

    if (result === "failed") {
      if (game.attemptsRemaining() <= 0) {
        return setLocked();
      }

      setFailed();
    }
  };

  const clearField = (e) => {
    if (e.target) {
      e.target.value = "";
    }
  };

  const ensureNumber = (e) => {
    if (e.which < 48 || e.which > 57) {
      e.preventDefault();
    }
  };

  const init = () => {
    lib.onReady(() => {
      checkForReset();
      checkStats();

      $("#input-1").addEventListener("focus", clearField);
      $("#input-2").addEventListener("focus", clearField);
      $("#input-3").addEventListener("focus", clearField);

      $("#input-1").addEventListener("keypress", ensureNumber);
      $("#input-2").addEventListener("keypress", ensureNumber);
      $("#input-3").addEventListener("keypress", ensureNumber);

      $("#guess-button").addEventListener("click", makeGuess);
    });
  };

  return {
    init: init,
  };
})();
