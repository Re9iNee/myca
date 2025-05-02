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

  console.log({ carId, serviceType, title, details, mileage, mileageInterval });
  console.log("ownerId", ownerId);

  if (!carId || !serviceType || !title || !details || !mileage || !ownerId) {
    return new Response("Missing carId or serviceType or title or ownerId", {
      status: 400,
    });
  }

  try {
    const res = await prisma.services.create({
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
