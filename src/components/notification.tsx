'use client'

import { useEffect, useState } from 'react';

export default function NotificationSystem() {
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && "Notification" in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      } else {
        setNotificationPermission(Notification.permission);
      }
    }
  }, []);

  const showNotification = () => {
    if (notificationPermission === 'granted') {
      new Notification('Notificação de Exemplo', {
        body: 'Esta é uma notificação de teste!',
        icon: '/images/bb.png',
      });
    } else {
      alert('Permissão de notificação não concedida.');
    }
  };

  return (
    <div>
      <h1>Sistema de Notificação</h1>
      {notificationPermission === 'granted' ? (
        <button onClick={showNotification}>Mostrar Notificação</button>
      ) : (
        <p>Permissão para notificações: {notificationPermission}</p>
      )}
    </div>
  );
}
