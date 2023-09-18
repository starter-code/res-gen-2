import { Font } from '@react-pdf/renderer';

import Roboto from '@/fonts/Roboto-Regular.ttf';
import RobotoItalic from '@/fonts/Roboto-Italic.ttf';
import RobotoBold from '@/fonts/Roboto-Bold.ttf';
import RobotoBoldItalic from '@/fonts/Roboto-BoldItalic.ttf';

export default function loadFonts() {
  Font.register({
    family: 'Roboto',
    format: 'truetype',
    fonts: [
      {
        src: Roboto,
      },
      {
        src: RobotoBold,
        fontWeight: 'bold',
      },
      {
        src: RobotoItalic,
        fontWeight: 'normal',
        fontStyle: 'italic',
      },
      {
        src: RobotoBoldItalic,
        fontWeight: 'bold',
        fontStyle: 'italic',
      },
    ],
  });
}
