angular.module('app').service('MessageService', ['CONSTANTS', function (CONSTANTS) {
        // declarations
        messages = [];

        var service = {};

        service.addMessage = function (messageType, messageText) {
            console.log('calling add message with ' + messageType + ' and text of ' + JSON.stringify(messageText));
            var messageDuration = CONSTANTS.MESSAGE_DURATION.Default;

            switch (messageType) {
                case 'alert':
                    messageDuration = CONSTANTS.MESSAGE_DURATION.Alert;
                    break;
                case 'danger':
                    messageDuration = CONSTANTS.MESSAGE_DURATION.Danger;
                    break;
                case 'info':
                    messageDuration = CONSTANTS.MESSAGE_DURATION.Info;
                    break;
                case 'success':
                    messageDuration = CONSTANTS.MESSAGE_DURATION.Success;
                    break;
                case 'warning':
                    messageDuration = CONSTANTS.MESSAGE_DURATION.Warning;
                    break;
                default:
                    {
                        messageType = 'info';
                        messageDuration = CONSTANTS.MESSAGE_DURATION.Default;
                    }
            }

            messages.push({
                type: messageType,
                text: messageText,
                duration: messageDuration
            });
        };

        service.getMessages = function () {
            console.log('getting messages ' + JSON.stringify(messages));
            return messages;
        };

        service.removeMessage = function (messageIndex) {
            messages.splice(messageIndex, 1);
        };

        return service;
    }]);