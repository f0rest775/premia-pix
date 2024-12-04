import { db } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  const path = params.path;

  if (!path || typeof path !== 'string') {
    return NextResponse.json(
      {
        message: 'ID inválido ou ausente.',
        error: 'Path parameter is required and must be a string'
      },
      { status: 400 }
    );
  }

  try {
    const sale = await db.sale.findUnique({
      where: { path },
      select: {
        status: true,
      }
    });

    if (!sale) {
      return NextResponse.json(
        {
          message: 'Pagamento não encontrado.',
          error: `No sale found with path: ${path}`
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: {
          status: sale.status,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro na busca de pagamento:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: 'Erro no banco de dados.',
          error: error.code
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Erro interno do servidor.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}