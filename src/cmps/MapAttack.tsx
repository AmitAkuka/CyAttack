import { useAnimation } from "@/hooks/useAnimation";
import { Line, Marker } from "react-simple-maps";
import { AttackDataType } from "@/types";
import { useMemo } from "react";
import { TEXT_STYLE } from "@/constants";

type Props = {
  attack: AttackDataType;
  onDeleteAttack: (attackId: string) => void;
};

export const MapAttack = ({ attack, onDeleteAttack }: Props) => {
  const { id, initialCoords, finalCoords, countryName, peerCountry } = attack;
  const fromCoords: [number, number] = [initialCoords[1], initialCoords[0]];
  const toCoords: [number, number] = [finalCoords[1], finalCoords[0]];

  const lineLength = useMemo(() => {
    const dx = toCoords[1] - fromCoords[1];
    const dy = toCoords[0] - fromCoords[0];
    const length = Math.sqrt(dx * dx + dy * dy) * 2.5;
    return length;
  }, [attack]);

  const { animationProgress } = useAnimation(id, lineLength, onDeleteAttack);

  return (
    <>
      <Line
        from={fromCoords}
        to={toCoords}
        stroke={"#BF40BF"}
        strokeWidth={1.5}
        strokeDasharray={`${animationProgress}, 10000`}
      />
      <Marker coordinates={fromCoords}>
        <circle r={2} fill="#BF40BF" />
        <text {...TEXT_STYLE} fill="darkviolet" dy={6}>
          {countryName}
        </text>
      </Marker>
      <Marker coordinates={toCoords}>
        <circle r={2.5} fill="red" />
        <text {...TEXT_STYLE} fill="#F53" dy={-4}>
          {peerCountry}
        </text>
      </Marker>
    </>
  );
};
