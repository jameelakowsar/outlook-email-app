import  React from "react";
import { connect } from "react-redux";

import { ShortMail } from "./ShortMail";
import { reduceUnreadCount, deleteMailAction, setSelectedFilter } from '../actions'
import { Mail } from "./Mail";
import { FilterDropdown } from "./FilterDropdown";

class MailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMailClicked: false
    }
  }
  onShortMailClick = (event) => {
    event.preventDefault();
    this.setState({ isMailClicked: true })
    this.props.reduceUnreadCount(event.target.id, this.props.selectedFolder);
    // styles update
  };

  onClickFlag = (event) => {
    event.preventDefault();
    this.props.flagClickAction(event.target.id, this.props.selectedFolder)
  };

  onDeleteMail = (event) => {
    this.props.deleteMailAction(event.target.id)
  };

  onChangeFilter = (event) => {
    this.props.setSelectedFilter(event.target.value, this.props.selectedFolder)
  };

  render() {
    const mailsData = this.props.mailItems && this.props.mailItems[this.props.selectedFolder]
    let singleMailData = [];
    if (this.state.isMailClicked && this.props.selectedMailId) {
       singleMailData = mailsData && mailsData.filter((singleMail) => singleMail.mId === this.props.selectedMailId)
    }
    return (
      <div className="section2">
        <div className="header1">
          <div className="section-header-items">
            <div className="items-headers">
              <div className="header-new">
                <i className="fa fa-arrow-circle-o-up" aria-hidden="true" />
                <span className="header-2-span">New</span>
                <FilterDropdown selectedFolder={this.props.selectedFolder} onChangeFilter={this.onChangeFilter} />
              </div>
            </div>
            <div className="mark-mail">
              <i className="fa fa-print" aria-hidden="true" />
              <span className="header-2-span">Mark all as read</span>
            </div>
          </div>
          <div className="section-header-items-left">
            <div className="items-headers">
              <div className="header-new">
                <i className="fa fa-arrow-circle-o-up" aria-hidden="true" />
                <span className="header-2-span">Undo</span>
              </div>
            </div>

            <div className="mark-mail">
              <i className="fa fa-toggle-off " aria-hidden="true" />
              <span className="header-2-span">Try the beta</span>
            </div>
          </div>
        </div>
        <div className="section-2-separate">
          <div className="section-2-section-1">
            <div className="list-items-cotainer">
                {mailsData && mailsData.length ?
                  mailsData.map((mail) => {
                    return <ShortMail mailInfo={mail} selectedFolder={this.props.selectedFolder} onflagClick={this.onClickFlag} onDeleteMail={this.onDeleteMail} onShortMailClick={this.onShortMailClick} />;
                  }) : <div>No Data</div>}
            </div>
          </div>
          <Mail mail={singleMailData[0]} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const mailInfo = state.MailReducer;
  return {
    isMailClicked: mailInfo.isMailClicked,
    selectedMailId: mailInfo.selectedMailId,
    selectedFolder: mailInfo.selectedFolder,
    mailItems: {
      inbox: mailInfo.inboxItems,
      spam: mailInfo.spamItems,
      deleted: mailInfo.deletedItems
    },
  };
};

export default connect(mapStateToProps, { reduceUnreadCount, deleteMailAction, setSelectedFilter })(MailList);
