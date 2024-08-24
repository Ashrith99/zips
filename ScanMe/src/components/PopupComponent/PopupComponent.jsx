import React, { useEffect, useState } from "react";
import { useAddedItems } from "../context/AddedItemsContext";
import "./PopupComponent.css";
import { toast } from "react-toastify";
import { icons } from "../../assets/icons/icons";

const PopupComponent = ({ setPopup, combinationItem }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem, isItemAdded, updateItemCount, addedItems } = useAddedItems();
  const [count, setCount] = useState(1);

  useEffect(() => {
    const currentItem = addedItems.find(
      (item) => item.id === combinationItem.id
    );
    setCount(currentItem ? currentItem.count : 1);
  }, [combinationItem.id, addedItems]);

  const handleQuantityIncrement = () => {
    setCount((c) => c + 1);
  };

  const handleQuantityDecrement = () => {
    if (count > 1) {
      setCount((c) => c - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector(".popup-overlay").classList.add("show");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleAddItem = () => {
    if (isItemAdded(combinationItem.id)) {
      updateItemCount(combinationItem.id, count);
      toast.info(`${combinationItem.name} quantity updated!`);
    } else {
      addItem(combinationItem, count);
      toast.success(`${combinationItem.name} added to the cart!`);
    }
    setPopup(false);
  };

  return (
    <div className={`popup-overlay ${imageLoaded ? "show" : ""}`}>
      <div className="popup-content">
        <div className="popup-item-close">
        <img onClick={() => setPopup(false)} className="popup-item-close" src={icons.close_icon} alt="close" />
        </div>
        <h1>{combinationItem.name}</h1>
        {!imageLoaded && (
          <div className="image-loading-placeholder">Loading image...</div>
        )}
        <div className="popup-item-img">
        <img
          src={combinationItem.image}
          alt={combinationItem.name}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
        </div>
        <p className="popup-item-desc">{combinationItem.price}</p>
        <div className="popup-buttons">
          <button onClick={handleQuantityDecrement}>-</button>
          <span>{count}</span>
          <button onClick={handleQuantityIncrement}>+</button>

          <button
            onClick={() => {
              handleAddItem();
            }}
          >
           Add
          </button>
          <button onClick={() => setPopup(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
