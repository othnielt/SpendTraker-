import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Provider/AuthContext';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigation = useNavigation();
  const { loginWithEmailPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitHandle(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      console.log(emailRef.current.text);
      console.log(passwordRef.current.value);
      await loginWithEmailPassword(emailRef.current.value, passwordRef.current.value);
      navigation.navigate('RenderingCard');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Log in</Text>
      {error && Alert.alert('Error', error)}

      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Email"
        ref={emailRef}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Password"
        ref={passwordRef}
        secureTextEntry={true}
      />
      <Button disabled={loading} title="Log In" onPress={submitHandle} />
      <Text style={{ marginTop: 20 }}>
        Need an account?{' '}
        <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
