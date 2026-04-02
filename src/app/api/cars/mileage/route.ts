import { getSelectedCarMileage } from "../cars.service";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const carName = searchParams.get("carName");

  if (!carName) return new Response("Missing carName", { status: 400 });

  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id;
  if (!ownerId) return new Response("Unauthorized", { status: 401 });

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
