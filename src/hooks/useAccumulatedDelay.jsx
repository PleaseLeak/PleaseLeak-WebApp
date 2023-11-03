export function useAccumulatedDelay() {
  let accumulatedDelay = 0;

  const getDelay = (index) => {
    let delay;

    if (index < 5) {
      delay = 0.3;
    } else if (index < 10) {
      delay = 0.2;
    } else if (index < 15) {
      delay = 0.1;
    } else {
      delay = 0.05;
    }

    accumulatedDelay += delay;
    return accumulatedDelay - delay; // pour avoir le délai correct pour l'élément courant
  };

  return getDelay;
}
