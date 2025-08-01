import { FaUser } from 'react-icons/fa';
import React
import { useNavigate } from 'react-router-dom'; from 'react';
// [converted from react-native] import { div, span, Image, Pressable, Scrolldiv } from 'react-native';
import { FeaturedCreator } from '../types/product';
import { useProductStore } from '../state/useProductStore';

interface FeaturedCreatorsSliderProps {
  creators: FeaturedCreator[];
  title?: string;
  navigation?: any;
}

export const FeaturedCreatorsSlider: React.FC<FeaturedCreatorsSliderProps> = ({ 
  creators, 
  title = "Featured Creators",
  navigation
}) => {
  const { creators: fullCreators } = useProductStore();

  const handleCreatorPress = (featuredCreator: FeaturedCreator) => {
    if (!navigation) {
      console.warn('Navigation not provided to FeaturedCreatorsSlider');
      return;
    }

    // Find the full creator data from the store
    const fullCreator = fullCreators.find(c => c.id === featuredCreator.id);
    
    if (fullCreator) {
      navigation.navigate('Creators', {
        screen: 'CreatorDetail',
        params: { creator: fullCreator }
      });
    } else {
      console.warn('Full creator data not found for:', featuredCreator.name);
    }
  };

  if (creators.length === 0) return null;

  return (
    <div className="bg-white border-t border-gray-100">
      {/* Header */}
      <div className="px-4 py-4 flex-row items-center justify-between">
        <span className="text-lg font-bold text-gray-900">
          {title}
        </span>
        <span className="text-sm text-gray-500">
          {creators.length} creators
        </span>
      </div>

      {/* Creators Slider */}
      <Scrolldiv
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        className="flex-row"
      >
        {creators.map((creator, index) => (
          <Pressable
            key={creator.id}
            onPress={() => handleCreatorPress(creator)}
            className="bg-gray-50 rounded-xl p-4 mr-3 items-center border border-gray-100"
            style={{ width: 140 }}
          >
            {/* Avatar */}
            <div className="relative mb-3">
              <Image
                source={{ uri: creator.avatar }}
                className="w-16 h-16 rounded-full"
              />
              {creator.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <Ionicons name="checkmark" size={12} color="white" />
                </div>
              )}
            </div>

            {/* Creator Info */}
            <span className="font-semibold text-gray-900 text-sm text-center mb-1" numberOfLines={1}>
              {creator.name}
            </span>
            
            <span className="text-xs text-gray-600 mb-2" numberOfLines={1}>
              {creator.tiktokHandle}
            </span>

            {/* Followers */}
            <div className="flex-row items-center mb-2">
              <Ionicons name="people" size={12} color="#6b7280" />
              <span className="text-xs text-gray-600 ml-1 font-medium">
                {creator.followers}
              </span>
            </div>

            {/* Specialty */}
            {creator.specialty && (
              <div className="bg-black/5 px-2 py-1 rounded-full">
                <span className="text-xs text-gray-700" numberOfLines={1}>
                  {creator.specialty}
                </span>
              </div>
            )}
          </Pressable>
        ))}
      </Scrolldiv>
    </div>
  );
};