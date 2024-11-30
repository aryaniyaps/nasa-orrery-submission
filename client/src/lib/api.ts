import { Configuration } from "../generated/openapi/v1.0";
import { PlanetsApi } from "../generated/openapi/v1.0/api";

const configuration = new Configuration({
  basePath: import.meta.env.VITE_BASE_API_URL,
});

export const planetsApi = new PlanetsApi(configuration);
