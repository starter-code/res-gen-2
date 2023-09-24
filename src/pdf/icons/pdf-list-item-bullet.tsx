import { Circle, Svg } from '@react-pdf/renderer';

export default function ListItemBullet({ style = {} }) {
  return (
    <Svg width="12" height="12" viewBox="0 0 10 10" style={style}>
      <Circle cx="5" cy="5" r="1.5" fill="black" />
    </Svg>
  );
}
