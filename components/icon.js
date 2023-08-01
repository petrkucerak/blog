/**
 * Icon library
 * https://tablericons.com/
 */

import {
  IconAerialLift,
  IconAnchor,
  IconAxe,
  IconBiohazard,
  IconBuildingMonument,
  IconCirclePlus,
  IconEye,
  IconHandOff,
  IconHeadphones,
  IconMicrophone2,
  IconMoodBoy,
  IconPresentation,
  IconRecycle,
  IconRocket,
  IconSatellite,
  IconShip,
  IconSlideshow,
  IconWifi,
  IconWritingSign,
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
  if (icon === "moodboy") return <IconMoodBoy className="ml-2" />;
  if (icon === "wifi") return <IconWifi className="ml-2" />;
  if (icon === "handOff") return <IconHandOff className="ml-2" />;
  if (icon === "axe") return <IconAxe className="ml-2" />;
  if (icon === "circlePlus") return <IconCirclePlus className="ml-2" />;
  if (icon === "aerialLift") return <IconAerialLift className="ml-2" />;
  if (icon === "buildingMonument")
    return <IconBuildingMonument className="ml-2" />;
  if (icon === "writingSign") return <IconWritingSign className="ml-2" />;
  if (icon === "rocket") return <IconRocket className="ml-2" />;
  else return <IconSatellite className="ml-2" />;
}
