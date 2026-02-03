import { prisma } from '@/lib/prisma';
import { isValidContactStatus } from '@/lib/validators';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { ERROR_MESSAGES } from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() || '';
    const status = searchParams.get('status') || '';

    const where: Record<string, unknown> = {};

    if (q) {
      where.OR = [
        { name: { contains: q } },
        { email: { contains: q } },
        { subject: { contains: q } },
        { message: { contains: q } },
      ];
    }

    if (status && isValidContactStatus(status)) {
      where.status = status;
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(contacts);
  } catch {
    return errorResponse(ERROR_MESSAGES.CONTACT_FETCH_ERROR);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (typeof id !== 'number') {
      return errorResponse(ERROR_MESSAGES.INVALID_REQUEST, 400);
    }

    if (!isValidContactStatus(status)) {
      return errorResponse(ERROR_MESSAGES.INVALID_STATUS, 400);
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    return successResponse(contact);
  } catch {
    return errorResponse(ERROR_MESSAGES.CONTACT_UPDATE_ERROR);
  }
}
