import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from "react";
import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import "../global.css";

export default function App() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
    translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
    scale.value = withSpring(1, { damping: 12, stiffness: 100 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
  }));

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <StatusBar barStyle="light-content" />

      {/* Floating decorative circles */}
      <View className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <View className="absolute top-40 right-5 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl" />
      <View className="absolute bottom-32 left-5 w-36 h-36 bg-pink-300/20 rounded-full blur-3xl" />

      <Animated.ScrollView
        style={animatedStyle}
        className="flex-1"
        contentContainerClassName="pt-4 px-6 pb-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Tier Logo/Brand */}
        <View className="items-center mb-3">
          <View className="w-14 h-14 bg-white rounded-3xl items-center justify-center mb-2 shadow-2xl">
            <Text className="text-3xl font-bold text-purple-600">T</Text>
          </View>
          <Text className="text-white text-3xl font-bold tracking-wider">TIER</Text>
        </View>

        {/* Welcome Text */}
        <View className="mb-2">
          <Text className="text-white text-xl font-bold mb-1">Welcome Back</Text>
          <Text className="text-white/70 text-sm">Sign in to continue your journey</Text>
        </View>

        {/* Email Input with Glassmorphism */}
        <View className="mb-2">
          <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 overflow-hidden">
            <View className="flex-row items-center px-5 py-4">
              <Ionicons name="mail-outline" size={22} color="white" style={{ marginRight: 12 }} />
              <TextInput
                placeholder="Email address"
                placeholderTextColor="rgba(255,255,255,0.6)"
                className="flex-1 text-white text-base"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>

        {/* Password Input with Glassmorphism */}
        <View className="mb-2">
          <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 overflow-hidden">
            <View className="flex-row items-center px-5 py-4">
              <Ionicons name="lock-closed-outline" size={22} color="white" style={{ marginRight: 12 }} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.6)"
                className="flex-1 text-white text-base"
                secureTextEntry
              />
              <TouchableOpacity>
                <Ionicons name="eye-outline" size={22} color="rgba(255,255,255,0.7)" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="self-end mb-3">
          <Text className="text-white font-semibold text-sm">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button with Gradient */}
        <TouchableOpacity className="mb-3 rounded-2xl overflow-hidden shadow-2xl">
          <LinearGradient
            colors={['#ffffff', '#f0f0f0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-5"
          >
            <Text className="text-purple-700 text-center text-lg font-bold tracking-wide">
              Sign In
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-3">
          <View className="flex-1 h-px bg-white/30" />
          <Text className="text-white/60 text-sm mx-4">or continue with</Text>
          <View className="flex-1 h-px bg-white/30" />
        </View>

        {/* Social Login Buttons */}
        <View className="flex-row gap-4 mb-4">
          <TouchableOpacity className="flex-1 bg-white/20 backdrop-blur-xl rounded-2xl py-4 border border-white/30 flex-row items-center justify-center gap-2">
            <Ionicons name="logo-google" size={20} color="white" />
            <Text className="text-white text-center font-semibold">Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-white/20 backdrop-blur-xl rounded-2xl py-4 border border-white/30 flex-row items-center justify-center gap-2">
            <Ionicons name="logo-apple" size={20} color="white" />
            <Text className="text-white text-center font-semibold">Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center">
          <Text className="text-white/70 text-sm">Don't have an account? </Text>
          <TouchableOpacity>
            <Text className="text-white font-bold text-sm">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>

      {/* Bottom Wave Decoration */}
      <View className="absolute bottom-0 left-0 right-0 h-2 bg-white/30" />
    </LinearGradient>
  );
}