'use client'

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect } from 'react';

async function fetchPaymentStatus(path: string) {
  const response = await fetch(`/api/verify-payment/${path}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar status do pagamento');
  }

  return response.json();
}

export function QrCode({ brCode, id }: { brCode: string, id: string }) {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['paymentStatus', id],
    queryFn: () => fetchPaymentStatus(id),
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    retry: 3,
  });

  useEffect(() => {
    if (data?.data?.status && data.data.status === 'APPROVED') {
      router.push('/fila');
    }
  }, [data, router]);

  return (
    <div className='w-full flex items-center justify-center'>
      <div className="w-[180px] h-[180px] bg-white flex items-center justify-center rounded-lg">
        <QRCodeCanvas value={brCode} size={150} />
      </div>
    </div>
  )
}