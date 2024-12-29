import React from "react";
import GeneralNotification from "./GeneralNotification ";

const NotificationsPage = () => {
  return (
    <div>
      <h1>Notifications</h1>
      <GeneralNotification
        eventName="notifyPatient"
        displayMessage={(msg) => `Patient Alert: ${msg}`}
      />
      <GeneralNotification
        eventName="notifyStaff"
        displayMessage={(msg) => `Staff Alert: ${msg}`}
      />
      <GeneralNotification
        eventName="notifyDoctor"
        displayMessage={(msg) => `Doctor Alert: ${msg}`}
      />
    </div>
  );
};

export default NotificationsPage;
