import {
  FLAG_CLICK_ACTION,
  DELETE_MAIL_ACTION,
  GET_FILTER_DATA,
  REDUCE_UNREAD_COUNT,
  STORE_INBOX_DATA,
  SET_SELECTED_FOLDER,
} from "./ActionTypes";

export const storeInboxData = (inboxItems, spamItems, deletedItems) => {
  return {
    type: STORE_INBOX_DATA,
    payload: {
      inboxItems,
      spamItems,
      deletedItems,
    },
  };
};

export const setSelectedFilter = (selectedFilter, selectedFolder) => ({
  type: GET_FILTER_DATA,
  payload: {
    selectedFilter,
    selectedFolder,
  },
});

export const setSelectedFolderAction = (selectedFolder) => {
  return {
    type: SET_SELECTED_FOLDER,
    payload: selectedFolder,
  };
};

export const reduceUnreadCount = (selectedMailId, selectedFolder) => {
  return {
    type: REDUCE_UNREAD_COUNT,
    payload: {
      selectedMailId,
      selectedFolder,
    },
  };
};

export const flagClickAction = (flaggedMailId, selectedFolder) => {
  return {
    type: FLAG_CLICK_ACTION,
    payload: {
      flaggedMailId,
      selectedFolder
    }
  }
}

export const deleteMailAction = (deletedMailId) => {
  return {
    type: DELETE_MAIL_ACTION,
    payload: deletedMailId,
  }
} 