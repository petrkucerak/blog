/**
 * Icon library
 * https://tablericons.com/
 */

import { IconHeadphones, IconSatellite, IconShip, IconSlideshow } from "@tabler/icons";
export default function Icon({ icon }) {
  if (icon === "headphones") return <IconHeadphones className="ml-2" />;
  if (icon === "ship") return <IconShip className="ml-2" />;
  if (icon === "slideshow") return <IconSlideshow className="ml-2" />;
  else return <IconSatellite className="ml-2" />;
}
