import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadToR2 } from '@/lib/r2';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { ERROR_MESSAGES } from '@/lib/api-utils';
import { UPLOAD_ALLOWED_TYPES, UPLOAD_MAX_SIZE } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return errorResponse(ERROR_MESSAGES.NO_FILE, 400);
    }

    if (!UPLOAD_ALLOWED_TYPES.includes(file.type)) {
      return errorResponse(ERROR_MESSAGES.INVALID_FILE_TYPE, 400);
    }

    if (file.size > UPLOAD_MAX_SIZE) {
      return errorResponse(ERROR_MESSAGES.FILE_TOO_LARGE, 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const url = await uploadToR2(buffer, filename, file.type);

    await prisma.image.create({
      data: { url, filename },
    });

    return successResponse({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return errorResponse(ERROR_MESSAGES.UPLOAD_ERROR);
  }
}
