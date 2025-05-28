import { useState } from 'react';

const useOrderPageLogic = () => {
  const [popupState, setPopupState] = useState({
    visible: false,
    type: null, // 'approve', 'cancelConfirm', 'cancelResult'
    message: null,
    orderId: null,
  });

  const openPopup = ({ type, message = null, orderId = null }) => {
    setPopupState({ visible: true, type, message, orderId });
  };

  const closePopup = () => {
    setPopupState({ visible: false, type: null, message: null, orderId: null });
  };

  return {
    popupState,
    openPopup,
    closePopup,
  };
};

export default useOrderPageLogic;
