/**
 * Icon library
 * https://tablericons.com/
 */

import { IconHeadphones, IconSatellite } from "@tabler/icons";
export default function Icon({ icon }) {
  if (icon === "headphones") return <IconHeadphones className="ml-2" />;
  else return <IconSatellite className="ml-2" />;
}
