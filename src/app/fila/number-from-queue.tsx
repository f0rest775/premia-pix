'use client'

import { getData } from "@/functions/get-cookie";
import { setCookie, deleteCookie } from "cookies-next"; // cookies-next API
import { useEffect, useState } from "react";

export function NumberFromQueue() {
  const [number, setNumber] = useState(215);

  useEffect(() => {
    async function main() {
      const queue = await getData('user_queue') ?? null;
      const queueTime = await getData('user_queue_time') ?? null;

      const now = new Date().getTime();
      const twoHours = 60 * 30000;


      if (queue && queueTime) {
        const timeDifference = now - Number(queueTime);


        if (timeDifference > twoHours) {
          const newQueueValue = Math.max(0, Number(queue) - 7);


          deleteCookie('user_queue');
          setCookie('user_queue', newQueueValue.toString(), {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          });


          setCookie('user_queue_time', now.toString(), {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          });

          setNumber(newQueueValue);
        } else {
          setNumber(Number(queue));
        }
      } else {
        const initialQueueValue = 193;

        setTimeout(() => {
          setCookie('user_queue', initialQueueValue.toString(), {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          });

          setCookie('user_queue_time', now.toString(), {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          });

          setNumber(initialQueueValue);

        }, 2000)
      }
    }
    main();






  }, []);

  return (
    <h2 className="text-6xl font-bold">{number}</h2>
  );
}
