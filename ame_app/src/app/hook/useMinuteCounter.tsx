import React, {useState, useEffect} from 'react';

const useSecondCounter = (durationSeconds: number, onTimerEnd?: () => void) => {
  const [seconds, setSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === durationSeconds) {
          setIsFinished(true);
          clearInterval(intervalId);

          // Llama a la función proporcionada cuando el temporizador ha terminado
          if (typeof onTimerEnd === 'function') {
            onTimerEnd();
          }
        }
        return prevSeconds + 1;
      });
    }, 1000); // Cambiado a 1000 para representar segundos en lugar de minutos (60,000 ms = 1 min).

    return () => clearInterval(intervalId);
  }, [durationSeconds, onTimerEnd]);

  return {seconds, isFinished};
};

export default useSecondCounter;
