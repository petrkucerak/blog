/**
 * Icon library
 * https://tablericons.com/
 */

import {
  IconAnchor,
  IconBiohazard,
  IconEye,
  IconHeadphones,
  IconMicrophone2,
  IconPresentation,
  IconRecycle,
  IconSatellite,
  IconShip,
  IconSlideshow,
} from "@tabler/icons";
export default function Icon({ icon }) {
  if (icon === "headphones") return <IconHeadphones className="ml-2" />;
  if (icon === "ship") return <IconShip className="ml-2" />;
  if (icon === "slideshow") return <IconSlideshow className="ml-2" />;
  if (icon === "anchor") return <IconAnchor className="ml-2" />;
  if (icon === "biohazard") return <IconBiohazard className="ml-2" />;
  if (icon === "recycle") return <IconRecycle className="ml-2" />;
  if (icon === "eye") return <IconEye className="ml-2" />;
  if (icon === "microphone2") return <IconMicrophone2 className="ml-2" />;
  if (icon === "presentation") return <IconPresentation className="ml-2" />;
  else return <IconSatellite className="ml-2" />;
}
