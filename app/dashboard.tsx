import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import "../global.css";
import { supabase } from '../lib/supabase';

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);

    const opacity = useSharedValue(0);
    const translateY = useSharedValue(30);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) });
        translateY.value = withSpring(0, { damping: 15, stiffness: 100 });

        // Get current user
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            if (user) {
                // Get user profile from users table
                supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                    .then(({ data }) => setUserProfile(data));
            }
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="pt-12 px-4 pb-4 border-b border-gray-800">
                <View className="flex-row items-center justify-between">
                    <Text className="text-white text-2xl font-bold">TIER</Text>
                    <View className="flex-row gap-4">
                        <TouchableOpacity>
                            <Ionicons name="add-circle-outline" size={28} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="heart-outline" size={28} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="chatbubble-outline" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Animated.ScrollView style={animatedStyle} showsVerticalScrollIndicator={false}>
                {/* Stories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="py-4 px-2 border-b border-gray-800"
                >
                    {/* Your Story */}
                    <View className="items-center mx-2">
                        <View className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                            <View className="w-full h-full rounded-full bg-black items-center justify-center">
                                <View className="w-16 h-16 rounded-full bg-gray-800 items-center justify-center">
                                    <Ionicons name="add" size={24} color="white" />
                                </View>
                            </View>
                        </View>
                        <Text className="text-white text-xs mt-1">Your Story</Text>
                    </View>

                    {/* Other Stories */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <View key={i} className="items-center mx-2">
                            <View className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                                <View className="w-full h-full rounded-full bg-black p-0.5">
                                    <View className="w-full h-full rounded-full bg-gray-700" />
                                </View>
                            </View>
                            <Text className="text-white text-xs mt-1">User {i}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Posts */}
                {[1, 2, 3].map((postId) => (
                    <View key={postId} className="mb-4">
                        {/* Post Header */}
                        <View className="flex-row items-center justify-between px-4 py-3">
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                                    <View className="w-full h-full rounded-full bg-gray-700" />
                                </View>
                                <View className="ml-3">
                                    <Text className="text-white font-semibold">username_{postId}</Text>
                                    <Text className="text-gray-400 text-xs">2 hours ago</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Post Image */}
                        <View className="w-full h-96 bg-gray-800" />

                        {/* Post Actions */}
                        <View className="flex-row items-center justify-between px-4 py-3">
                            <View className="flex-row gap-4">
                                <TouchableOpacity>
                                    <Ionicons name="heart-outline" size={28} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Ionicons name="chatbubble-outline" size={26} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Ionicons name="paper-plane-outline" size={26} color="white" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="bookmark-outline" size={26} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Post Info */}
                        <View className="px-4">
                            <Text className="text-white font-semibold mb-1">1,234 likes</Text>
                            <View className="flex-row">
                                <Text className="text-white font-semibold">username_{postId} </Text>
                                <Text className="text-white">Amazing view! 🌅</Text>
                            </View>
                            <TouchableOpacity>
                                <Text className="text-gray-400 mt-1">View all 45 comments</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>

            {/* Bottom Navigation */}
            <View className="flex-row items-center justify-around py-3 border-t border-gray-800 bg-black">
                <TouchableOpacity>
                    <Ionicons name="home" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="search" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="add-circle-outline" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="play-circle-outline" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                        <View className="w-full h-full rounded-full bg-gray-700" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
