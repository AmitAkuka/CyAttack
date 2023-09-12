import { MAX_ATTACK_RATE } from "@/constants";

type Props = {
  attacksShownAmount: number;
  setAttacksShownAmount: (amount: number) => void;
};

export const AttackSettings = ({
  attacksShownAmount,
  setAttacksShownAmount,
}: Props) => {
  return (
    <section className="attack-settings-container">
      <h2>Settings:</h2>
      <div className="slider-main-container">
        <p>Choose attack rate:</p>
        <input
          type="range"
          min="1"
          max={MAX_ATTACK_RATE}
          list="attack-markers"
          onChange={({ target }) => setAttacksShownAmount(+target.value)}
          value={attacksShownAmount}
        />
        <datalist id="attack-markers">
          {new Array(MAX_ATTACK_RATE).fill(1).map((_, idx) => (
            <option
              key={234234 + idx}
              value={idx + 1}
              label={(idx + 1).toString()}
            ></option>
          ))}
        </datalist>
      </div>
    </section>
  );
};
