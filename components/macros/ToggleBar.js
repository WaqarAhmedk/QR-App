import React, { useState, useEffect } from "react";
import { PLUS_MINUS_ICONS as icons } from "@/utils/mock";
import { ToggleIcons } from "./toggleIcon";
function ToggleBar({
  label,
  onToggleDecorator,
  type,
  setIsOpen,
  isOpen,
  isModalVisible,
}) {
  const [iconIndex, setIconIndex] = useState(type === "Modal" ? 1 : 0);
  useEffect(() => {
    // when modal is closed the icon is setting to plus again (reset)
    if (!isModalVisible && type === "Modal") {
      setIconIndex(1);
    }
  }, [isModalVisible]);

  return (
    <div className="bg-secondary w-full row-flex rounded-xl px-5 py-2 justify-between mb-4">
      <p className="font-[500]">{label}</p>

      <ToggleIcons
        {...{
          isOpen,
          width: 20,
          height: 20,
          setIconIndex,
          setIsOpen,
          onToggleDecorator,
          icons,
          type: { type },
          iconIndex,
        }}
      />
    </div>
  );
}

export default ToggleBar;
