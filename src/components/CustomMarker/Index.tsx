import { Marker } from "react-native-maps";
import Svg, { Image } from 'react-native-svg';

function CustomMarker({ coordinate, title, size, image }): React.JSX.Element {
  return (
    <Marker coordinate={coordinate} title={title}>
      <Svg height={size} width={size} viewBox="0 0 50 50">
        <Image
          href={image}
          width="50"
          height="50"
          preserveAspectRatio="xMidYMid slice" />
      </Svg>
    </Marker>
  );
}

export default CustomMarker;
