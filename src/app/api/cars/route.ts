import prisma from "@prisma";

export const POST = async (request: Request) => {
  const { model, mileage, ownerId } = await request.json();

  if (!model || !mileage) {
    return new Response("Missing model or mileage", { status: 400 });
  }

  try {
    // TODO: check for existing car with the same model and mileage

    const res = await prisma.car.create({
      data: {
        name: model,
        mileage: Number(mileage),
        owner: ownerId ? { connect: { id: ownerId } } : { create: {} },
      },
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error creating car", { status: 500 });
  }
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get("ownerId");

  if (!ownerId) {
    return new Response("Missing ownerId", { status: 400 });
  }

  try {
    const cars = await prisma.car.findMany({
      where: {
        ownerId,
      },
    });

    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching cars", { status: 500 });
  }
};
