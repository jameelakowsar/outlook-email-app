import React from "react";

export const ShortMail = (props) => {
  const mailInfo = props.mailInfo;
  return (
    <React.Fragment>
      <div
        className={mailInfo.unread ? "list-items" : "read-mail"}
        onClick={props.onShortMailClick}
      >
        <div className="list-items-wrapper" id={mailInfo.mId}>
          <div className="span1 span-items" id={mailInfo.mId}>
            {mailInfo.mId}
          </div>
          <div className="span2 span-items" id={mailInfo.mId}>
            {mailInfo.subject}
          </div>
          <div className="span3 span-items" id={mailInfo.mId}>
            {mailInfo.content}
          </div>
        </div>
        {props.selectedFolder !== 'deleted' && (
          <div className="icons-section-wrapper">
            <i
              className="fa fa-flag-o"
              aria-hidden="true"
              id={mailInfo.mId}
              onClick={props.onClickFlag}
            />
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              id={mailInfo.mId}
              onClick={props.onDeleteMail}
            />
          </div>
        )}
      </div>
      <div className="list-border" />
    </React.Fragment>
  );
};
