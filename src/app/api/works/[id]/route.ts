import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const work = await prisma.work.findUnique({ where: { id: params.id } });

  if (!work) {
    return errorResponse('Not found', 404);
  }

  return successResponse(work);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updated = await prisma.work.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        image: body.image,
        date: body.date,
      },
    });

    return successResponse(updated);
  } catch (error) {
    if ((error as { code?: string }).code === 'P2025') {
      return errorResponse('Not found', 404);
    }
    return errorResponse('更新に失敗しました');
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.work.delete({ where: { id: params.id } });
    return successResponse({ success: true });
  } catch (error) {
    if ((error as { code?: string }).code === 'P2025') {
      return errorResponse('Not found', 404);
    }
    return errorResponse('削除に失敗しました');
  }
}
