import { FaUser } from 'react-icons/fa';
import React, { useState } from 'react';
// [converted from react-native] import { div, span, spanInput, Pressable, Alert, Scrolldiv } from 'react-native';
import { useProductStore } from '../../state/useProductStore';

export const NotificationManagerScreen: React.FC = () => {
  const { addNotification, getActiveNotifications, deleteNotification } = useProductStore();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'success' | 'announcement'>('info');

  const handleSendNotification = () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in both title and message');
      return;
    }

    console.log('🔔 Adding notification:', { title: title.trim(), message: message.trim(), type });
    
    addNotification({
      title: title.trim(),
      message: message.trim(),
      type
    });

    console.log('🔔 Notification added, current count:', getActiveNotifications().length);
    Alert.alert('Success', 'Notification sent to all users!');
    setTitle('');
    setMessage('');
    setType('info');
  };

  const activeNotifications = getActiveNotifications();

  const handleDeleteNotification = (notificationId: string) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification? It will be removed from all users.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNotification(notificationId);
            Alert.alert('Success', 'Notification deleted');
          }
        }
      ]
    );
  };

  const typeOptions = [
    { value: 'info', label: 'Info', color: 'bg-blue-100 text-blue-800', icon: 'information-circle' },
    { value: 'success', label: 'Success', color: 'bg-green-100 text-green-800', icon: 'checkmark-circle' },
    { value: 'warning', label: 'Warning', color: 'bg-yellow-100 text-yellow-800', icon: 'warning' },
    { value: 'announcement', label: 'Announcement', color: 'bg-purple-100 text-purple-800', icon: 'megaphone' }
  ];

  return (
    <Scrolldiv className="flex-1 bg-gray-50 p-4">
      {/* Send New Notification */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <span className="text-lg font-bold text-gray-900 mb-4">Send New Notification</span>
        
        {/* Title Input */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700 mb-2">Title</span>
          <spanInput
            value={title}
            onChangespan={setTitle}
            placeholder="Enter notification title..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-base"
            maxLength={100}
          />
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700 mb-2">Message</span>
          <spanInput
            value={message}
            onChangespan={setMessage}
            placeholder="Enter notification message..."
            multiline
            numberOfLines={4}
            className="border border-gray-300 rounded-lg px-3 py-2 text-base"
            style={{ textAlignVertical: 'top' }}
            maxLength={300}
          />
        </div>

        {/* Type Selection */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700 mb-2">Type</span>
          <Scrolldiv horizontal showsHorizontalScrollIndicator={false}>
            {typeOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => setType(option.value as any)}
                className={`mr-3 px-3 py-2 rounded-lg border ${
                  type === option.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex-row items-center">
                  <Ionicons 
                    name={option.icon as any} 
                    size={16} 
                    color={type === option.value ? '#3b82f6' : '#6b7280'} 
                  />
                  <span className={`ml-2 text-sm ${
                    type === option.value ? 'text-blue-600 font-medium' : 'text-gray-600'
                  }`}>
                    {option.label}
                  </span>
                </div>
              </Pressable>
            ))}
          </Scrolldiv>
        </div>

        {/* Send Button */}
        <div className="flex-row space-x-3">
          <Pressable
            onPress={handleSendNotification}
            className="flex-1 bg-blue-600 py-3 rounded-lg items-center"
          >
            <span className="text-white font-semibold">Send Notification</span>
          </Pressable>
          
          <Pressable
            onPress={() => {
              addNotification({
                title: 'Test Notification',
                message: 'This is a test notification to verify the system is working!',
                type: 'info'
              });
              Alert.alert('Success', 'Test notification sent!');
            }}
            className="bg-gray-600 py-3 px-4 rounded-lg items-center"
          >
            <span className="text-white font-semibold">Test</span>
          </Pressable>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <span className="text-lg font-bold text-gray-900 mb-4">
          Recent Notifications ({activeNotifications.length})
        </span>
        
        {activeNotifications.length === 0 ? (
          <div className="items-center py-8">
            <Ionicons name="notifications-outline" size={48} color="#d1d5db" />
            <span className="text-gray-500 mt-2">No notifications sent yet</span>
          </div>
        ) : (
          activeNotifications.slice(0, 10).map((notification) => (
            <div key={notification.id} className="border-b border-gray-100 pb-3 mb-3 last:border-b-0">
              <div className="flex-row items-start justify-between mb-1">
                <div className="flex-1 mr-3">
                  <div className="flex-row items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 flex-1">{notification.title}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 mb-2">{notification.message}</span>
                  <div className={`self-start px-2 py-1 rounded ${
                    typeOptions.find(t => t.value === notification.type)?.color || 'bg-gray-100 text-gray-800'
                  }`}>
                    <span className="text-xs font-medium">
                      {typeOptions.find(t => t.value === notification.type)?.label || 'Info'}
                    </span>
                  </div>
                </div>
                
                {/* Delete Button */}
                <Pressable
                  onPress={() => handleDeleteNotification(notification.id)}
                  className="bg-red-100 rounded-lg p-2 ml-2"
                >
                  <Ionicons name="trash" size={16} color="#dc2626" />
                </Pressable>
              </div>
            </div>
          ))
        )}
      </div>
    </Scrolldiv>
  );
};

export default NotificationManagerScreen;
