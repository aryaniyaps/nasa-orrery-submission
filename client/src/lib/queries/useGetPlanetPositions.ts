import { useSuspenseQuery } from "@tanstack/react-query";
import { planetsApi } from "../api";

export default function useGetPlanetPositions({
  targetDate,
}: {
  targetDate: string;
}) {
  return useSuspenseQuery({
    queryKey: ["/planets/positions/", targetDate],
    queryFn: async () => {
      const { data } = await planetsApi.readPlanetPositions(targetDate);
      return data;
    },
  });
}
