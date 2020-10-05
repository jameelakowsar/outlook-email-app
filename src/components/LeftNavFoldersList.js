import React from "react";
import { connect } from "react-redux";

import { SearchBar } from "./SearchBar";
import { setSelectedFolderAction } from "../actions";

const FolderTypes = [
    {
      key:'inbox',
      displayName: 'Inbox',
      unreadCount: 'inboxUnreadCount'
    },
    {
      key:'deleted',
      displayName: 'Deleted Items',
      unreadCount: 'deletedUnreadCount'
    },
    {
      key:'spam',
      displayName: 'Spam',
      unreadCount: 'spamUnreadCount'
    },
  ];

class LeftNavFoldersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
    };
  }


  onSearch = (searchValue) => {
    this.setState({ searchKey: searchValue });
    // we can call action with search key
    // use redux to get required data
    // render mails with updated data
  };

  handleClick = (event) => {
    this.props.setSelectedFolderAction(event.target.id);
  };

  render() {
    return (
      <div className="section1">
        <SearchBar onSearch={this.onSearch} />
        <div className="menu-section">
          <div className="sectio-header1">
            <i className="fa fa-chevron-up" aria-hidden="true" />
            <span className="span-header">Folders</span>
          </div>
          <div className="menu-items-list">
            {FolderTypes.map((folder) => {
              const classname =
                this.props.selectedFolder === folder.key
                  ? "menu-items menu-main-item"
                  : "menu-items";
              return (
                <div
                  className={classname}
                  id={folder.key}
                  onClick={this.handleClick}
                >
                  {folder.displayName}
                  {this.props.unreadCounts[folder.unreadCount] > 0 && this.props.unreadCounts[folder.unreadCount]}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    unreadCounts: {
      inboxUnreadCount: state.MailReducer.inboxUnreadCount,
      spamUnreadCount: state.MailReducer.spamUnreadCount,
      deletedUnreadCount: state.MailReducer.deletedUnreadCount,
    },
    selectedFolder: state.MailReducer.selectedFolder
  }
}

export default connect(mapStateToProps, {
  setSelectedFolderAction,
})(LeftNavFoldersList);
