import prisma from "@prisma";
import { request } from "http";
import { unstable_noStore as noStore } from "next/cache";

export const POST = async (request: Request) => {
  noStore();
  const { model, mileage, ownerId } = await request.json();

  if (!model || !mileage) {
    return new Response("Missing model or mileage", { status: 400 });
  }

  try {
    // TODO: check for existing car with the same model and mileage

    const res = await prisma.cars.create({
      data: {
        name: model,
        mileage: Number(mileage),
        owner: ownerId ? { connect: { id: ownerId } } : { create: {} },
      },
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error updating mileage", { status: 500 });
  }
};

export const GET = async (request: Request) => {
  noStore();
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get("ownerId");

  if (!ownerId) {
    return new Response("Missing ownerId", { status: 400 });
  }

  try {
    const cars = await prisma.cars.findMany({
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
