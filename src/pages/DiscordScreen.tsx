import { FaUser } from 'react-icons/fa';
import React, { useEffect } from 'react';
// [converted from react-native] import { div, span, Pressable, Linking, Alert } from 'react-native';
interface DiscordScreenProps {
  navigation: any;
}

export const DiscordScreen: React.FC<DiscordScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const discordInviteUrl = 'https://discord.gg/iffertmedia'; // Replace with your actual Discord invite link

  useEffect(() => {
    // Auto-redirect to Discord when this screen loads
    handleJoinDiscord();
  }, []);

  const handleJoinDiscord = async () => {
    try {
      const canOpen = await Linking.canOpenURL(discordInviteUrl);
      if (canOpen) {
        await Linking.openURL(discordInviteUrl);
        // Navigate back to previous screen after opening Discord
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      } else {
        Alert.alert(
          'Unable to Open Discord',
          'Please install Discord app or visit the link manually.',
          [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]
        );
      }
    } catch (error) {
      console.error('Failed to open Discord:', error);
      Alert.alert(
        'Error',
        'Failed to open Discord. Please try again.',
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div 
        className="bg-white px-4 pb-6 border-b border-gray-100"
        style={{ paddingTop: insets.top + 16 }}
      >
        <span className="text-2xl font-bold text-gray-900 mb-2">
          Join Our Discord
        </span>
        <span className="text-gray-600">
          Connect with other affiliates and get support
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 items-center max-w-sm">
          {/* Discord Logo */}
          <div className="bg-indigo-100 rounded-full p-4 mb-4">
            <Ionicons name="chatbubbles" size={48} color="#5865f2" />
          </div>

          <span className="text-xl font-bold text-gray-900 mb-2 text-center">
            Iffert Media Discord
          </span>
          
          <span className="text-gray-600 text-center mb-6 leading-relaxed">
            Join our community to get exclusive deals, higher commission opportunities, and connect with other TikTok Shop affiliates.
          </span>

          {/* Join Button */}
          <Pressable
            onPress={handleJoinDiscord}
            className="bg-indigo-600 rounded-lg py-4 px-8 flex-row items-center mb-4"
          >
            <Ionicons name="chatbubbles" size={20} color="white" />
            <span className="text-white font-medium text-base ml-2">
              Join Discord Server
            </span>
          </Pressable>

          {/* Back Button */}
          <Pressable
            onPress={() => navigation.goBack()}
            className="py-2"
          >
            <span className="text-gray-500 text-center">
              Back to App
            </span>
          </Pressable>
        </div>

        {/* Info Cards */}
        <div className="mt-8 space-y-4 w-full max-w-sm">
          <div className="bg-white rounded-lg border border-gray-100 p-4 flex-row items-center">
            <Ionicons name="flash" size={20} color="#f59e0b" />
            <span className="text-gray-700 ml-3 flex-1">
              Get notified of new campaigns first
            </span>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-100 p-4 flex-row items-center">
            <Ionicons name="people" size={20} color="#10b981" />
            <span className="text-gray-700 ml-3 flex-1">
              Connect with 1000+ affiliates
            </span>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-100 p-4 flex-row items-center">
            <Ionicons name="gift" size={20} color="#8b5cf6" />
            <span className="text-gray-700 ml-3 flex-1">
              Access exclusive sample programs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};