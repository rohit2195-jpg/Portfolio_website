import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
import { cn } from "../../lib/utils";

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export function Dock({
  className,
  children,
  iconSize = DEFAULT_SIZE,
  iconMagnification = DEFAULT_MAGNIFICATION,
  iconDistance = DEFAULT_DISTANCE,
  ...props
}) {
  const mouseX = useMotionValue(Infinity);

  const renderChildren = () =>
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          mouseX,
          iconSize,
          iconMagnification,
          iconDistance,
        });
      }
      return child;
    });

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("dock", className)}
      {...props}
    >
      {renderChildren()}
    </motion.div>
  );
}

export function DockIcon({
  mouseX,
  iconSize = DEFAULT_SIZE,
  iconMagnification = DEFAULT_MAGNIFICATION,
  iconDistance = DEFAULT_DISTANCE,
  className,
  children,
  ...props
}) {
  const ref = useRef(null);

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-iconDistance, 0, iconDistance],
    [iconSize, iconMagnification, iconSize],
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize }}
      className={cn("dock-icon", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
