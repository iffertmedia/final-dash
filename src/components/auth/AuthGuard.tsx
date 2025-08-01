import { FaUser } from 'react-icons/fa';
import React from 'react';
// [converted from react-native] import { div, span, Pressable } from 'react-native';
import { useAuthStore } from '../../state/useAuthStore';

interface AuthGuardProps {
  children: React.ReactNode;
  navigation: any;
  fallbackMessage?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  navigation,
  fallbackMessage = "Administrator access required to view this content."
}) => {
  const { isAdmin } = useAuthStore();

  if (isAdmin()) {
    return <>{children}</>;
  }

  return (
    <div className="flex-1 bg-gray-50 items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 items-center max-w-sm">
        {/* Lock Icon */}
        <div className="bg-gray-100 rounded-full p-4 mb-4">
          <Ionicons name="lock-closed" size={32} color="#6b7280" />
        </div>

        <span className="text-xl font-bold text-gray-900 text-center mb-2">
          Access Restricted
        </span>
        
        <span className="text-gray-600 text-center mb-6 leading-relaxed">
          {fallbackMessage}
        </span>

        {/* Login Button */}
        <Pressable
          onPress={() => navigation.navigate('Login')}
          className="bg-black rounded-lg py-3 px-6 flex-row items-center"
        >
          <Ionicons name="shield-checkmark" size={18} color="white" />
          <span className="text-white font-medium ml-2">
            Admin Login
          </span>
        </Pressable>

        {/* Info */}
        <span className="text-gray-400 text-xs text-center mt-4">
          Contact your administrator for access
        </span>
      </div>
    </div>
  );
};