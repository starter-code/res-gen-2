import { Path, Svg, G } from '@react-pdf/renderer';

const svgStyle = {
  width: 12,
  height: 12,
  marginRight: 5,
};

export default function WebsiteSvg() {
  return (
    <Svg viewBox="0 0 64 64" style={svgStyle}>
      <G fill="#186da3">
        <Path d="m31.879 0c-17.608 0-31.879 14.273-31.879 31.881 0 17.606 14.271 31.881 31.879 31.881 17.606 0 31.879-14.274 31.879-31.881 0-17.608-14.273-31.881-31.879-31.881m0 59.53c-15.417 0-27.912-12.494-27.912-27.908 0-15.413 12.496-27.909 27.912-27.909 15.412 0 27.908 12.496 27.908 27.909 0 15.414-12.496 27.908-27.908 27.908" />
        <Path d="m32.563.018c-11.237 0-20.35 14.272-20.35 31.879 0 17.608 9.113 31.88 20.35 31.88 11.243 0 20.354-14.272 20.354-31.88 0-17.606-9.11-31.879-20.354-31.879m0 59.53c-9.841 0-17.814-12.496-17.814-27.908 0-15.414 7.973-27.908 17.814-27.908 9.842 0 17.819 12.494 17.819 27.908 0 15.412-7.977 27.908-17.819 27.908" />
        <Path d="m54.886 12.472c-.934-.713-1.689-1.729-2.145-2.825-5.118 6.113-12.746 9.99-21.265 9.99-8.08 0-15.355-3.486-20.447-9.06-.965.838-1.979 1.626-3.063 2.281 5.837 6.637 14.326 10.814 23.775 10.814 9.429 0 17.897-4.159 23.734-10.769-.197-.138-.395-.281-.589-.432" />
        <Path d="m30.04 1.868h3.667v59.75h-3.667z" />
        <Path d="m1.866 29.787h59.75v3.667h-59.75z" />
        <Path d="m11.38 53.643c5.112-5.817 12.548-9.482 20.829-9.482 8.246 0 15.657 3.638 20.767 9.417.815-.995 1.603-2.01 2.454-2.968-5.829-6.445-14.193-10.483-23.483-10.483-9.589 0-18.19 4.301-24.03 11.11.691.179 1.346.524 1.896 1.036.508.474 1.032.931 1.568 1.372" />
      </G>
    </Svg>
  );
}
