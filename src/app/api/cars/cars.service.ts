import prisma from "@prisma";

export async function getSelectedCarMileage(
  carName: string,
  ownerId: string,
): Promise<number> {
  try {
    const car = await prisma.cars.findFirstOrThrow({
      where: {
        ownerId,
        name: carName,
      },
    });

    return car.mileage;
  } catch (error) {
    console.error("Error fetching mileage:", error);
    throw new Error("Failed to fetch mileage");
  }
}
