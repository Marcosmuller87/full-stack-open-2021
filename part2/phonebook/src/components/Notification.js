const Notification = ({ notification, className }) => {
  if (notification == null) {
    return null;
  }
  return <div className={className}>{notification}</div>;
};

export default Notification;
