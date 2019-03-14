Notification.requestPermission(function () {
    var oldNofitication = Notification;
    Notification = function() {
        if(notifications_allowed) {
            oldNotification.apply(this, arguments);
        }
    }
})();