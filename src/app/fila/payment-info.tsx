'use client'

import Typewriter from "typewriter-effect";
import { useState, useEffect } from "react";

export function PaymentInfo() {
  const [step, setStep] = useState(1);

  useEffect(() => {

    let time = 3000

    if (step === 1 || step === 2) {
      time = 2000
    }

    if (step === 3) {
      time = 10000
    }

    const timer = setTimeout(() => {
      if (step < 4) {
        setStep(step + 1);
      }
    }, time);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="bg-white rounded-lg w-full p-4">
      {step >= 1 && (
        <div className="text-sm">
          <Typewriter
            options={{
              strings: "Já identificamos o seu pagamento!",
              autoStart: true,
              delay: 50,
            }}
          />
        </div>
      )}

      {step >= 2 && (
        <div className="text-sm">
          <Typewriter
            options={{
              strings: "Aguarde...",
              autoStart: true,
              delay: 75,
            }}
          />
        </div>
      )}

      {step >= 3 && (
        <div className="text-sm">
          <Typewriter
            options={{
              strings:
                "Para te deixar mais tranquilo, nós te notificaremos por e-mail assim que sua vez chegar, não se preocupe...",
              autoStart: true,
              delay: 50,
            }}
          />
        </div>
      )}

      {step >= 4 && (
        <div className="text-sm">
          <Typewriter
            options={{
              strings: "Em alguns casos de valores altos o dinheiro cai em até 7 dias...",
              autoStart: true,
              delay: 50,
            }}
          />
        </div>
      )}
    </div>
  );
}
