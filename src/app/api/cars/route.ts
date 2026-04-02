import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id;

  if (!ownerId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { model, mileage } = await request.json();

  if (!model || !mileage) {
    return new Response("Missing model or mileage", { status: 400 });
  }

  try {
    const res = await prisma.car.create({
      data: {
        ownerId,
        name: model,
        mileage: Number(mileage),
      },
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error creating car", { status: 500 });
  }
};

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id;

  if (!ownerId) return new Response("Unauthorized", { status: 401 });

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
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id;

  if (!ownerId) return new Response("Unauthorized", { status: 401 });

  const { id, mileage } = await request.json();

  if (!id || !mileage) {
    return new Response("Missing id or mileage", { status: 400 });
  }

  try {
    const updated = await prisma.car.updateMany({
      where: { id, ownerId },
      data: {
        mileage: Number(mileage),
      },
    });

    if (updated.count === 0) {
      return new Response("Car not found", { status: 404 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error updating car", { status: 500 });
  }
};
