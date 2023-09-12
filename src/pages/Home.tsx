import { useEffect, useState, useCallback, useMemo } from "react";
import { dataService } from "@/services/dataService";
import { AttackDataType, GeographyType } from "@/types";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { MAP_OBJ, MAP_CONFIG1, MAP_CONFIG2, GEO_STYLE } from "@/constants";
import { MapAttack } from "@/cmps/MapAttack";
import { AttackList } from "@/cmps/AttackList";
import { AttackSettings } from "@/cmps/AttackSettings";

export const Home = () => {
  const [attacksData, setAttacksData] = useState<AttackDataType[]>([]);
  const [attacksShownAmount, setAttacksShownAmount] = useState(5);

  useEffect(() => {
    // Saving changes to local storage
    if (attacksData.length !== 0) {
      dataService.saveAttacksData(attacksData);
    }
    // 0 for query initial data
    // 10 for query additional data
    if (attacksData.length !== 0 && attacksData.length !== 10) return;
    const queryData = async () => {
      try {
        const data = (await dataService.getInitialAttacksData()) ?? [];
        setAttacksData((prevState) =>
          prevState.length === 10 ? [...prevState, ...data] : data
        );
      } catch (err) {
        console.error(err);
      }
    };
    queryData();
  }, [attacksData]);

  const attacksToDisplay = useMemo(() => {
    return attacksData.length > attacksShownAmount
      ? attacksData.slice(0, attacksShownAmount)
      : attacksData;
  }, [attacksData, attacksShownAmount]);

  const onDeleteAttack = useCallback(
    (attackId: string) => {
      setAttacksData((prevState) =>
        prevState.filter((attack) => attack.id !== attackId)
      );
    },
    [attacksData]
  );

  return (
    <section className="main-home-container">
      <main className="app-workboard-main-container">
        <ComposableMap {...MAP_CONFIG1}>
          <Geographies geography={MAP_OBJ} stroke="black" strokeWidth={0.3}>
            {({ geographies }) =>
              geographies.map((geo: GeographyType) => (
                <Geography key={geo.rsmKey} geography={geo} {...GEO_STYLE} />
              ))
            }
          </Geographies>
          {attacksToDisplay &&
            attacksToDisplay.map((attack: AttackDataType) => (
              <MapAttack
                key={attack.id}
                attack={attack}
                onDeleteAttack={onDeleteAttack}
              />
            ))}
        </ComposableMap>
      </main>
      {attacksToDisplay && (
        <>
          <AttackSettings
            attacksShownAmount={attacksShownAmount}
            setAttacksShownAmount={setAttacksShownAmount}
          />
          <AttackList attacksData={attacksToDisplay} />
        </>
      )}
    </section>
  );
};
