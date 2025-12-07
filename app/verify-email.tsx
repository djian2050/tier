import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from "react";
import { StatusBar, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import "../global.css";

export default function VerifyEmail() {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
        scale.value = withSpring(1, { damping: 12, stiffness: 100 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <LinearGradient
            colors={['#667eea', '#764ba2', '#f093fb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1"
        >
            <StatusBar barStyle="light-content" />

            <View className="flex-1 justify-center items-center px-6">
                <Animated.View style={animatedStyle} className="items-center">
                    {/* Email Icon */}
                    <View className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full items-center justify-center mb-8 border-4 border-white/30">
                        <Ionicons name="mail-outline" size={48} color="white" />
                    </View>

                    {/* Title */}
                    <Text className="text-white text-3xl font-bold mb-4 text-center">
                        Verify Your Email
                    </Text>

                    {/* Description */}
                    <Text className="text-white/80 text-base text-center mb-8 leading-6">
                        We've sent a confirmation link to your email address.{'\n\n'}
                        Please check your inbox and click the link to verify your account.
                    </Text>

                    {/* Instructions */}
                    <View className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 w-full">
                        <View className="flex-row items-start mb-3">
                            <Ionicons name="checkmark-circle" size={24} color="#4ade80" style={{ marginRight: 12 }} />
                            <Text className="text-white/90 text-sm flex-1">
                                Open your email inbox
                            </Text>
                        </View>
                        <View className="flex-row items-start mb-3">
                            <Ionicons name="checkmark-circle" size={24} color="#4ade80" style={{ marginRight: 12 }} />
                            <Text className="text-white/90 text-sm flex-1">
                                Find the email from Tier
                            </Text>
                        </View>
                        <View className="flex-row items-start">
                            <Ionicons name="checkmark-circle" size={24} color="#4ade80" style={{ marginRight: 12 }} />
                            <Text className="text-white/90 text-sm flex-1">
                                Click the confirmation link
                            </Text>
                        </View>
                    </View>

                    {/* Note */}
                    <Text className="text-white/60 text-xs text-center mt-8">
                        Didn't receive the email? Check your spam folder or contact support.
                    </Text>
                </Animated.View>
            </View>
        </LinearGradient>
    );
}
