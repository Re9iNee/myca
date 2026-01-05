import { prisma } from "@/lib/prisma";

export const POST = async (request: Request) => {
  const { model, mileage, ownerId } = await request.json();

  if (!model || !mileage) {
    return new Response("Missing model or mileage", { status: 400 });
  }

  try {
    // Attempt to connect to the provided ownerId or create a new one if it doesn't exist
    const ownerData = ownerId
      ? { connectOrCreate: { where: { id: ownerId }, create: {} } }
      : { create: {} };
    console.log("ownerData: ",ownerData)

    const res = await prisma.car.create({
      data: {
        name: model,
        owner: ownerData,
        mileage: Number(mileage),
      },
    });
    console.log("res: ",res)
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
export const PATCH = async (request: Request) => {
  const { id, mileage } = await request.json();

  if (!id || !mileage) {
    return new Response("Missing id or mileage", { status: 400 });
  }

  try {
    const res = await prisma.car.update({
      where: { id },
      data: {
        mileage,
      },
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error updating car", { status: 500 });
  }
};
