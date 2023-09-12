import { AttackDataType } from "@/types";
import { AttackPreview } from "./AttackPreview";

type Props = {
  attacksData: AttackDataType[];
};

export const AttackList = ({ attacksData }: Props) => {
  return (
    <section className="attack-list-main-container">
      <section className="attack-headers-main-container">
        <p>Attack Date</p>
        <p>Country Source</p>
        <p>City Source</p>
        <p>Country Dest</p>
        <p>City Dest</p>
        <p>Protocol</p>
        <p>Port</p>
      </section>
      {attacksData.map((attackData) => (
        <AttackPreview key={attackData.id + 2421} attackData={attackData} />
      ))}
    </section>
  );
};
