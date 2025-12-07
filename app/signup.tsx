import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import "../global.css";
import { supabase } from '../lib/supabase';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
        translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    const handleSignUp = async () => {
        // Validation
        if (!username || !email || !firstName || !lastName || !dateOfBirth || !phoneNumber || !password) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                        first_name: firstName,
                        middle_name: middleName,
                        last_name: lastName,
                        date_of_birth: dateOfBirth,
                        phone_number: phoneNumber,
                    },
                },
            });

            if (error) throw error;

            // Show success message and navigate to login
            Alert.alert('Success', 'Account created! Please sign in.', [
                { text: 'OK', onPress: () => router.replace('/') }
            ]);
        } catch (error: any) {
            Alert.alert('Sign Up Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#667eea', '#764ba2', '#f093fb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1"
        >
            <StatusBar barStyle="light-content" />

            <Animated.ScrollView
                style={animatedStyle}
                className="flex-1"
                contentContainerClassName="pt-12 px-6 pb-6"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="mb-4">
                    <TouchableOpacity onPress={() => router.back()} className="mb-4">
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-3xl font-bold mb-1">Create Account</Text>
                    <Text className="text-white/70 text-sm">Join Tier and elevate your experience</Text>
                </View>

                {/* Username */}
                <View className="mb-2">
                    <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                        <View className="flex-row items-center px-5 py-3">
                            <Ionicons name="person-outline" size={20} color="white" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="flex-1 text-white text-base"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                </View>

                {/* Email */}
                <View className="mb-2">
                    <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                        <View className="flex-row items-center px-5 py-3">
                            <Ionicons name="mail-outline" size={20} color="white" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="flex-1 text-white text-base"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                </View>

                {/* First Name */}
                <View className="mb-2">
                    <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                        <View className="flex-row items-center px-5 py-3">
                            <Ionicons name="person" size={20} color="white" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="flex-1 text-white text-base"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>
                    </View>
                </View>

                {/* Middle Name (Optional) */}
                <View className="mb-2">
                    <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                        <View className="flex-row items-center px-5 py-3">
                            <Ionicons name="person" size={20} color="white" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="Middle Name (Optional)"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="flex-1 text-white text-base"
                                value={middleName}
                                onChangeText={setMiddleName}
                            />
                        </View>
                    </View>
                </View>

                {/* Last Name */}
                <View className="mb-2">
                    <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                        <View className="flex-row items-center px-5 py-3">
                            <Ionicons name="person" size={20} color="white" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="flex-1 text-white text-base"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                    </View>
                </View>

                {/* Date of Birth */}
                <View className="mb-2">
                    <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                        <View className="flex-row items-center px-5 py-3">
                            <Ionicons name="calendar-outline" size={20} color="white" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="Date of Birth (YYYY-MM-DD)"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="flex-1 text-white text-base"
                                value={dateOfBirth}
                                onChangeText={setDateOfBirth}
                            />
                        </View>
                    </View>
                </View>

                {/* Phone Number */}
                <View className="mb-2">
                    <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                        <View className="flex-row items-center px-5 py-3">
                            <Ionicons name="call-outline" size={20} color="white" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="Phone Number"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="flex-1 text-white text-base"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                </View>

                {/* Password */}
                <View className="mb-2">
                    <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                        <View className="flex-row items-center px-5 py-3">
                            <Ionicons name="lock-closed-outline" size={20} color="white" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="flex-1 text-white text-base"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="rgba(255,255,255,0.7)" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Confirm Password */}
                <View className="mb-4">
                    <View className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                        <View className="flex-row items-center px-5 py-3">
                            <Ionicons name="lock-closed-outline" size={20} color="white" style={{ marginRight: 12 }} />
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="flex-1 text-white text-base"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPassword}
                            />
                        </View>
                    </View>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity
                    className="mb-4 rounded-2xl overflow-hidden shadow-2xl"
                    onPress={handleSignUp}
                    disabled={loading}
                >
                    <LinearGradient
                        colors={['#ffffff', '#f0f0f0']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="py-4"
                    >
                        <Text className="text-purple-700 text-center text-lg font-bold tracking-wide">
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Sign In Link */}
                <View className="flex-row justify-center items-center mb-4">
                    <Text className="text-white/70 text-sm">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-white font-bold text-sm">Sign In</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>
        </LinearGradient>
    );
}
