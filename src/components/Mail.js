import React from "react";

export const Mail = ({ mail }) => {
  const mailLength = mail && Object.keys(mail).length;
  return (
    <div className="section-2-section-2">
      <div className="container">
        {mailLength ? (
          <React.Fragment>
            <div class="mail-subject">{mail.content}</div>
            <div class="mail-from-details">
              <div class="mail-from-name">
                <div class="short-name">{mail.subject}</div>
                <div class="short-Expanded">{mail.mId}</div>
              </div>
            </div>
            </React.Fragment>
        ) : (
          <div>
            <i
              className="fa fa-arrow-circle-o-up container-icon"
              aria-hidden="true"
            />
            <div>Select an item to read</div>
            <div>Click here to always select the first item in the list</div>
          </div>
        )}
      </div>
    </div>
  );
};
