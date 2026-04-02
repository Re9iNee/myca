import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id;
  if (!ownerId) return new Response("Unauthorized", { status: 401 });

  const {
    carId,
    serviceType,
    title,
    details,
    mileage,
    mileageInterval,
  } = await request.json();

  if (!carId || !serviceType || !title || !mileage) {
    return new Response("Missing carId or serviceType or title or mileage", {
      status: 400,
    });
  }

  // Ensure the car belongs to the logged in user.
  const car = await prisma.car.findFirst({
    where: { id: carId, ownerId },
    select: { id: true },
  });

  if (!car) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const res = await prisma.service.create({
      data: {
        title,
        details,
        mileage,
        mileageInterval,
        type: serviceType,
        date: new Date(),
        cost: 0,
        owner: { connect: { id: ownerId } },
        car: { connect: { id: carId } }, // car ownership validated above
      },
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error creating service", { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id;
  if (!ownerId) return new Response("Unauthorized", { status: 401 });

  const { id, title, details, mileage } = await request.json();

  if (!id || !title || !details || !mileage) {
    return new Response("Missing id or title or details or mileage", {
      status: 400,
    });
  }

  try {
    const updated = await prisma.service.updateMany({
      where: { id, ownerId },
      data: {
        title,
        details,
        mileage: Number(mileage),
      },
    });

    if (updated.count === 0) {
      return new Response("Service not found", { status: 404 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error updating service", { status: 500 });
  }
};

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id;
  if (!ownerId) return new Response("Unauthorized", { status: 401 });

  if (!id) return new Response("Missing id", { status: 400 });

  try {
    // Use findFirst to avoid leaking existence across owners.
    const service = await prisma.service.findFirst({
      where: { id, ownerId },
    });

    if (!service) return new Response("Not found", { status: 404 });

    return new Response(JSON.stringify(service), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error getting service", { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id;
  if (!ownerId) return new Response("Unauthorized", { status: 401 });

  const { id } = await request.json();

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  try {
    const deleted = await prisma.service.deleteMany({
      where: { id, ownerId },
    });

    if (deleted.count === 0) {
      return new Response("Service not found", { status: 404 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error deleting service", { status: 500 });
  }
};
