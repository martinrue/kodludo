const game = (() => {
  const correct = "2ba100d60448c3b5fe2dc55a892104f0";
  let previousAttempt = "000";

  const attemptsMade = () => {
    return parseInt(localStorage.getItem("attempts") || 0, 10);
  };

  const attemptsRemaining = () => {
    return 3 - attemptsMade();
  };

  const resetAttemptsRemaining = () => {
    localStorage.removeItem("attempts");
    localStorage.removeItem("success");
  };

  const addAttempt = () => {
    localStorage.setItem("attempts", attemptsMade() + 1);
  };

  const setSuccess = (answer) => {
    localStorage.setItem("success", previousAttempt);
  };

  const getSuccess = () => {
    return localStorage.getItem("success");
  };

  const guess = (attempt) => {
    if (attempt === previousAttempt) {
      return "ignored";
    }

    if (attemptsRemaining() <= 0) {
      return "ignored";
    }

    if (getSuccess()) {
      return "ignored";
    }

    previousAttempt = attempt;
    addAttempt();

    if (md5(attempt) !== correct) {
      return "failed";
    }

    return "ok";
  };

  return {
    attemptsRemaining: attemptsRemaining,
    resetAttemptsRemaining: resetAttemptsRemaining,
    setSuccess: setSuccess,
    getSuccess: getSuccess,
    guess: guess,
  };
})();
