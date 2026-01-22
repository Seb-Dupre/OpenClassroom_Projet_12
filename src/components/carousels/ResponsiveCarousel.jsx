import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import SwipeCarousel from "./SwipeCarousel";
import DesktopCarousel from "./DesktopCarousel";

export default function ResponsiveCarousel({ slides }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return isDesktop ? (
    <DesktopCarousel slides={slides} />
  ) : (
    <SwipeCarousel slides={slides} />
  );
}
