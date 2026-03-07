import {
  Building2, Layers, Smartphone, Globe,
  Briefcase, Monitor, Code2, Database,
  Cloud, Rocket, Box, Cpu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const PROJECT_ICON_MAP: Record<string, LucideIcon> = {
  building2:  Building2,
  layers:     Layers,
  smartphone: Smartphone,
  globe:      Globe,
  briefcase:  Briefcase,
  monitor:    Monitor,
  code2:      Code2,
  database:   Database,
  cloud:      Cloud,
  rocket:     Rocket,
  box:        Box,
  cpu:        Cpu,
};

export const PROJECT_ICON_KEYS = Object.keys(PROJECT_ICON_MAP);
