import { prisma } from '@/lib/prisma';
import { validateContactForm } from '@/lib/validators';
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-utils';
import { ERROR_MESSAGES } from '@/lib/api-utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const errors = validateContactForm({
      name: name || '',
      email: email || '',
      subject: subject || '',
      message: message || '',
    });

    if (Object.keys(errors).length > 0) {
      return validationErrorResponse(errors);
    }

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return successResponse({ id: contact.id }, 201);
  } catch {
    return errorResponse(ERROR_MESSAGES.CONTACT_SEND_ERROR);
  }
}
