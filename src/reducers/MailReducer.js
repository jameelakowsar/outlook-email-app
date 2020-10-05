import {
  DELETE_MAIL_ACTION,
  FLAG_CLICK_ACTION,
  GET_FILTER_DATA,
  REDUCE_UNREAD_COUNT,
  STORE_INBOX_DATA,
  SET_SELECTED_FOLDER,
} from "../actions";

const initialState = {
  inboxItems: [],
  spamItems: [],
  deletedItems: [],
  customItems:[],
  inboxUnreadCount: 0,
  spamUnreadCount: 0,
  deletedUnreadCount: 0,
  selectedFolder: "inbox",
  selectedFilter: "allMail",
  isMailOpened: false,
  selectedMailId: "",
};
const getUnreadItems = (allMails) => {
  return allMails.filter((singleItem) => singleItem.unread);
}

const getUnreadCount = (items) => {
  return Object.keys(items) && Object.keys(items).length;
}

export const MailReducer = (state = initialState, action) => {
  switch (action.type) {
    // Loading data for the first time
    case STORE_INBOX_DATA:
      const inboxUnreadCount = getUnreadCount(getUnreadItems(action.payload.inboxItems));
      const spamUnreadCount = getUnreadCount(getUnreadItems(action.payload.spamItems));
      const deletedUnreadCount = getUnreadCount(getUnreadItems(action.payload.deletedItems));

      return Object.assign({}, state, {
        inboxItems: action.payload.inboxItems,
        spamItems: action.payload.spamItems,
        deletedItems: action.payload.deletedItems,
        inboxUnreadCount: inboxUnreadCount,
        spamUnreadCount: spamUnreadCount,
        deletedUnreadCount: deletedUnreadCount,
      }) 
     
    case GET_FILTER_DATA:
      if (action.payload.selectedFilter === "unread") {
        if (action.payload.selectedFolder === "inbox") {
          return {
            ...state,
            selectedFilter: action.payload.selectedFilter,
            inboxItems: getUnreadItems(state.inboxItems),
          };
        } else if (action.payload.selectedFolder === "spam") {
          return {
            ...state,
            selectedFilter: action.payload.selectedFilter,
            spamItems: getUnreadItems(state.spamItems),
          };
        } else if (action.payload.selectedFolder === "deleted") {
          return {
            ...state,
            selectedFilter: action.payload.selectedFilter,
            deletedItems: getUnreadItems(state.deletedItems),
          };
        }
      } else if (action.payload.selectedFilter === "flagged") {
        if (action.payload.selectedFolder === "inbox") {
          const totalItems = state.inboxItems
          const flaggedItems = totalItems.filter(
            (singleItem) => singleItem.flagged
          );

          return Object.assign({}, state, { inboxItems: flaggedItems });
        } else if (action.payload.selectedFolder === "spam") {
          const totalItems = state.spamItems
          const flaggedItems = totalItems.filter(
            (singleItem) => singleItem.flagged
          );

          return Object.assign({}, state, { spamItems: flaggedItems });
        } else if (action.payload.selectedFolder === "deleted") {
          const totalItems = state.deletedItems
          const flaggedItems = totalItems.filter(
            (singleItem) => singleItem.flagged
          );

          return Object.assign({}, state, { deletedItems: flaggedItems });
        }
      } else {
        return Object.assign({}, state);
      }

    // To store selected folder.
    case SET_SELECTED_FOLDER:
      return Object.assign({}, state, { selectedFolder: action.payload, selectedFilter: 'allMail' })
     
    // on click of short mail, reduce unread count and
    case REDUCE_UNREAD_COUNT:
      if (action.payload.selectedFolder === "inbox") {
        const totalInboxItems = state.inboxItems
        totalInboxItems.forEach((singleItem) => {
          if (singleItem.mId === action.payload.selectedMailId) {
            singleItem.unread = false;
          }
        });
        return Object.assign({}, state, {
          inboxItems: totalInboxItems,
          selectedMailId: action.payload.selectedMailId,
          inboxUnreadCount: getUnreadCount(getUnreadItems(totalInboxItems)),
        });

      } else if (action.payload.selectedFolder === "spam") {
        const totalSpamItems = state.spamItems
        totalSpamItems.forEach((singleItem) => {
          if (singleItem.mId === action.payload.selectedMailId) {
            singleItem.unread = false;
          }
        });
        return Object.assign({}, state, {
          spamItems: totalSpamItems,
          selectedMailId: action.payload.selectedMailId,
          spamUnreadCount: getUnreadCount(getUnreadItems(totalSpamItems))
        })

      } else if (action.payload.selectedFolder === "deleted") {
        const totalDeletedItems = state.deletedItems
        totalDeletedItems.forEach((singleItem) => {
          if (singleItem.mId === action.payload.selectedMailId) {
            singleItem.unread = false;
          }
        });
       
        return Object.assign({}, state, {
          deletedItems: totalDeletedItems,
          selectedMailId: action.payload.selectedMailId,
          deletedUnreadCount: getUnreadCount(getUnreadItems(totalDeletedItems)),
        });
      }
    // on falg click - updating flag param to true and udpating mails.
    case FLAG_CLICK_ACTION:
      if (action.payload.selectedFolder === "inbox") {
        const totalInboxItems = state.inboxItems
        totalInboxItems.forEach((singleItem) => {
          if (singleItem.mId === action.payload.selectedMailId) {
            singleItem.flagged = true;
          }
        });
        return Object.assign({}, state, { inboxItems: totalInboxItems });
      } else if (action.payload.selectedFolder === "spam") {
        const totalSpamItems = state.spamItems
        totalSpamItems.forEach((singleItem) => {
          if (singleItem.mId === action.payload.selectedMailId) {
            singleItem.flagged = true;
          }
        });
        return Object.assign({}, state, { spamItems: spamData });
      } else if (action.payload.selectedFolder === "deleted") {
        const totalDeletedItems = state.deletedItems
        totalDeletedItems.forEach((singleItem) => {
          if (singleItem.mId === action.payload.selectedMailId) {
            singleItem.flagged = true;
          }
        });
        return Object.assign({}, state, { deletedItems: deletedData });
      }

    case DELETE_MAIL_ACTION:
      const mails = [ ...state.inboxItems, ...state.spamItems ]
      let deletedData = [...state.deletedItems]
      const inboxData = state.inboxItems.filter((singleItem) => singleItem.mId !== action.payload) 
      const spamData = state.spamItems.filter((singleItem) => singleItem.mId !== action.payload)
      const deletedMail = mails.filter((singleItem) => singleItem.mId === action.payload)
      deletedData.push(deletedMail[0])

      return {
        ...state,
        inboxItems: inboxData,
        spamItems: spamData,
        deletedItems: deletedData,
        deletedUnreadCount: getUnreadCount(getUnreadItems(deletedData))
      }

    default:
      return state;
  }
};
