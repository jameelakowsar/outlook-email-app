import React from "react";
import { connect } from "react-redux";

import { Header } from "./Header";
import LeftNavFoldersList from "./LeftNavFoldersList";
import MailList from "./MailList";
import { InboxData, SpamData, DeletedData } from "../DataJson";
import { storeInboxData } from "../actions";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.storeInboxData(InboxData, SpamData, DeletedData);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        {Object.keys(this.props.mailItems)?.length && (
          <div className="sections">
          <LeftNavFoldersList />
          <MailList/>
        </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mailItems: {
      inbox: state.MailReducer.inboxItems,
      spam: state.MailReducer.spamItems,
      deleted: state.MailReducer.DeletedItems,
    },
  }
};

export default connect(mapStateToProps, {
  storeInboxData,
})(HomePage);
