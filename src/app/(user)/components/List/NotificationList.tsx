import React from "react";
import notifications from "../../../mock/notifications.json";

const NotificationList = () => {
  return (
    <div className="max-w-6xl pt-4 mx-auto">
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <div className="flex justify-between items-center px-28">
          <span className="text-xl font-bold text-black cursor-pointer transition duration-200 ease-in-out transform hover:text-blue-500 hover:text-xl">
            All Notifications
          </span>

          <span className="text-lg font-bold text-gray-500 cursor-pointer transition duration-200 ease-in-out transform hover:text-blue-500 hover:text-xl ">
            Read Notifications
          </span>
        </div>

        <hr className="my-4 border-gray-300 border-t-2" />

        <div className="mt-4 space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={notification.user.profileImage}
                  alt={notification.user.name}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <span className="font-bold">{notification.user.name}</span>
                  <span className="text-sm text-gray-600"> {notification.message}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{new Date(notification.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
