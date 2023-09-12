import { AttackDataType } from "@/types";

type Props = {
  attackData: AttackDataType;
};

export const AttackPreview = ({ attackData }: Props) => {
  const {
    date,
    countryName,
    city,
    peerCountry,
    peerCity,
    protocol,
    destinationPort,
  } = attackData;
  return (
    <section className="attack-preview-main-container">
      <p>{date}</p>
      <p>{countryName}</p>
      <p>{city ?? "-"}</p>
      <p>{peerCountry}</p>
      <p>{peerCity ?? "-"}</p>
      <p>{protocol}</p>
      <p>{destinationPort}</p>
    </section>
  );
};
