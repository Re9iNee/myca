import prisma from "@prisma";

export const POST = async (request: Request) => {
  const {
    carId,
    serviceType,
    title,
    details,
    mileage,
    mileageInterval,
    ownerId,
  } = await request.json();

  if (!carId || !serviceType || !title || !details || !mileage || !ownerId) {
    return new Response("Missing carId or serviceType or title or ownerId", {
      status: 400,
    });
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
        car: { connect: { id: carId } },
      },
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error creating service", { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  const { id, title, details, mileage } = await request.json();

  console.log({ id, title, details, mileage });

  if (!id || !title || !details || !mileage) {
    return new Response("Missing id or title or details or mileage", {
      status: 400,
    });
  }

  try {
    const res = await prisma.service.update({
      where: { id },
      data: {
        title,
        details,
        mileage,
      },
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error updating service", { status: 500 });
  }
};

export const GET = async (request: Request) => {
  // get id of service from url
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  try {
    const service = await prisma.service.findUniqueOrThrow({
      where: { id },
    });

    return new Response(JSON.stringify(service), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error getting service", { status: 500 });
  }
};
