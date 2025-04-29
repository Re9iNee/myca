import { getSelectedCarMileage } from "../cars.service";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const carName = searchParams.get("carName");
  const ownerId = searchParams.get("ownerId");

  if (!carName || !ownerId) {
    return new Response("Missing carName or ownerId", { status: 400 });
  }

  try {
    const mileage = await getSelectedCarMileage(carName, ownerId);
    return new Response(JSON.stringify(mileage), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching mileage:", error);
    return new Response("Failed to fetch mileage", { status: 500 });
  }
};
