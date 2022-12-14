import React, { useState, useMemo, useCallback } from "react";

export default function Box(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const styles = {
    width: "560px",
    height: "560px",
    border: "3px solid black",
    display: "grid",
    gridTemplateColumns: `repeat(${props.boxSize}, 1fr)`,
    gridTemplateRows: `repeat(${props.boxSize}, 1fr)`,
  };

  const styleBoxes = {
    border: "1px solid black",
  };

  let arrayBoxes = useMemo(() => {
    let arrayBoxes = [];
    for (let i = 0; i < props.boxSize * props.boxSize; i++) {
      arrayBoxes.push({ hoverOver: false, rgbValue: `rgba(255,255,255)` });
    }
    return arrayBoxes;
  }, [props.boxSize]);

  let handleMouseOver = useCallback(
    (id) => {
      setActiveIndex(id);

      arrayBoxes[id].hoverOver = true;
      const randomColor = () => Math.floor(Math.random() * 255);

      arrayBoxes[
        id
      ].rgbValue = `rgba(${randomColor()},${randomColor()},${randomColor()})`;
    },
    [arrayBoxes]
  );

  return (
    <div style={styles}>
      {arrayBoxes.map((el, l) => {
        const styleBox = { border: "1px solid black" };

        if (el.hoverOver) {
          styleBox.backgroundColor = el.rgbValue;
        }

        return (
          <div
            style={activeIndex === l ? { ...styleBox } : styleBox}
            id={l}
            key={l}
            onMouseOver={() => handleMouseOver(l)}
          ></div>
        );
      })}
    </div>
  );
}
