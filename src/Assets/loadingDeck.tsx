import React from "react";
import Svg, {
  Circle,
  G,
  Path,
  Rect,
} from "react-native-svg";

type LoadingDeckProps = {
  width?: number;
  height?: number;
  color?: string;
};

export default function LoadingDeck({
  width = 320,
  height = 320,
  color = "#FFFFFF",
}: LoadingDeckProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 320 320"
      fill="none"
    >
      {/* Cards de fundo */}

      <G opacity={0.25} transform="rotate(-35 160 160)">
        <Rect
          x="90"
          y="65"
          width="110"
          height="165"
          rx="14"
          stroke={color}
          strokeWidth="4"
        />
      </G>

      <G opacity={0.3} transform="rotate(-22 160 160)">
        <Rect
          x="100"
          y="55"
          width="110"
          height="165"
          rx="14"
          stroke={color}
          strokeWidth="4"
        />
      </G>

      <G opacity={0.35} transform="rotate(25 160 160)">
        <Rect
          x="110"
          y="55"
          width="110"
          height="165"
          rx="14"
          stroke={color}
          strokeWidth="4"
        />
      </G>

      <G opacity={0.22} transform="rotate(40 160 160)">
        <Rect
          x="110"
          y="65"
          width="110"
          height="165"
          rx="14"
          stroke={color}
          strokeWidth="4"
        />
      </G>

      {/* Pequenos cards espalhados */}

      <G opacity={0.2} transform="rotate(-60 80 210)">
        <Rect
          x="52"
          y="165"
          width="60"
          height="90"
          rx="10"
          stroke={color}
          strokeWidth="3"
        />
      </G>

      <G opacity={0.2} transform="rotate(55 245 190)">
        <Rect
          x="215"
          y="145"
          width="60"
          height="90"
          rx="10"
          stroke={color}
          strokeWidth="3"
        />
      </G>

      {/* Deck principal - camadas */}

      <Rect
        x="113"
        y="88"
        width="120"
        height="170"
        rx="17"
        fill={color}
        opacity={0.15}
        transform="translate(12 10)"
      />

      <Rect
        x="109"
        y="84"
        width="120"
        height="170"
        rx="17"
        fill={color}
        opacity={0.25}
        transform="translate(8 7)"
      />

      <Rect
        x="105"
        y="80"
        width="120"
        height="170"
        rx="17"
        fill={color}
        opacity={0.35}
        transform="translate(4 4)"
      />

      {/* Card principal */}

      <Rect
        x="100"
        y="75"
        width="120"
        height="170"
        rx="18"
        fill={color}
      />

      <Rect
        x="109"
        y="84"
        width="102"
        height="152"
        rx="13"
        fill="#6366F1"
      />

      <Rect
        x="117"
        y="92"
        width="86"
        height="136"
        rx="10"
        stroke={color}
        strokeWidth="2"
        opacity={0.65}
      />

      {/* Símbolo central */}

      <Circle
        cx="160"
        cy="160"
        r="30"
        stroke={color}
        strokeWidth="2.5"
        opacity={0.8}
      />

      <Path
        d="
          M160 137
          C163 151 169 157 183 160
          C169 163 163 169 160 183
          C157 169 151 163 137 160
          C151 157 157 151 160 137
          Z
        "
        fill={color}
      />

      {/* Estrelas decorativas */}

      <Path
        d="
          M72 92
          C74 99 78 103 85 105
          C78 107 74 111 72 118
          C70 111 66 107 59 105
          C66 103 70 99 72 92
          Z
        "
        fill={color}
        opacity={0.7}
      />

      <Path
        d="
          M250 105
          C252 111 255 114 261 116
          C255 118 252 121 250 127
          C248 121 245 118 239 116
          C245 114 248 111 250 105
          Z
        "
        fill={color}
        opacity={0.6}
      />

      <Path
        d="
          M245 245
          C247 250 250 253 255 255
          C250 257 247 260 245 265
          C243 260 240 257 235 255
          C240 253 243 250 245 245
          Z
        "
        fill={color}
        opacity={0.45}
      />

      <Circle cx="67" cy="145" r="4" fill={color} opacity={0.4} />

      <Circle cx="265" cy="160" r="3" fill={color} opacity={0.5} />

      <Circle cx="85" cy="245" r="3" fill={color} opacity={0.35} />
    </Svg>
  );
}