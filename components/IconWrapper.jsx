import { Defs, LinearGradient, Stop, Svg } from "react-native-svg";

export default function IconWrapper({ Icon, active, width = 24, height = 24 }) {
  if (!Icon) return null; // safeguard if SVG fails to load

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#5151C6" />
          <Stop offset="100%" stopColor="#888BF4" />
        </LinearGradient>
      </Defs>

      <Icon
        width={width}
        height={height}
        fill={active ? "url(#grad)" : "none"}
        stroke={active ? "none" : "#BDBDBD"}
      />
    </Svg>
  );
}
