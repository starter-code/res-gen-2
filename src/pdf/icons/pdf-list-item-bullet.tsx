import { Circle, Svg } from '@react-pdf/renderer';

const svgStyle = {
  width: 12,
  height: 12,
};

export default function ListItemBullet({ style = {} }) {
  return (
    <Svg viewBox="0 0 10 10" style={{ ...svgStyle, ...style }}>
      <Circle cx="5" cy="5" r="1.5" fill="black" />
    </Svg>
  );
}
