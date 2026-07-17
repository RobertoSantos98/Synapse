import Svg, { G, Path } from "react-native-svg";
import { Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

const TILE_SIZE = 300;



const books = [
  { x: 30, y: 40, rotate: 15, scale: 0.8 },
  { x: 150, y: 20, rotate: -35, scale: 0.6 },
  { x: 240, y: 80, rotate: 55, scale: 0.9 },
  { x: 60, y: 170, rotate: -15, scale: 0.7 },
  { x: 200, y: 190, rotate: 80, scale: 0.5 },
  { x: 120, y: 260, rotate: -45, scale: 0.6 },
];



function Book({
  x,
  y,
  rotate,
  scale,
}: {
  x: number;
  y: number;
  rotate: number;
  scale: number;
}) {
  return (
    <G
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      stroke="#64748b"
      strokeWidth={1.8}
      fill="none"
      opacity={0.15}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </G>
  );
}

export function BookTile() {
  return (
    <Svg width={300} height={300}>
      {books.map((book, index) => (
        <Book key={index} {...book} />
      ))}
    </Svg>
  );
}


export default function BackgroundHome() {
  const columns = Math.ceil(width / TILE_SIZE) + 1;

  // 15 tiles = 4500px de altura
  const rows = 15;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#f1f5f9",
      }}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => (
          <View
            key={`${row}-${col}`}
            style={{
              position: "absolute",
              left: col * TILE_SIZE,
              top: row * TILE_SIZE,
            }}
          >
            <BookTile />
          </View>
        ))
      )}
    </View>
  );
}