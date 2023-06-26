import NodeGeoCoder, { OpenStreetMapOptions } from "node-geocoder";

export async function geoNearCode(
  address: string
): Promise<{ latitude: number; longitude: number }[]> {
  const options: OpenStreetMapOptions = {
    provider: "openstreetmap",
  };
  const geoCoder = NodeGeoCoder(options);
  const result = (await geoCoder.geocode(address)) as {
    latitude: number;
    longitude: number;
  }[];
  return result;
}
