/* eslint-disable react/no-unescaped-entities */
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import CustomInput from "../component/CustomInput";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const validatePassword = (
    password: string,
  ): { valid: boolean; message: string } => {
    if (password.length < 8) {
      return {
        valid: false,
        message: "Password must be at least 8 characters",
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        message: "Password must contain at least one uppercase letter",
      };
    }
    if (!/[a-z]/.test(password)) {
      return {
        valid: false,
        message: "Password must contain at least one lowercase letter",
      };
    }
    if (!/\d/.test(password)) {
      return {
        valid: false,
        message: "Password must contain at least one number",
      };
    }
    return { valid: true, message: "" };
  };

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Validate inputs
    if (!emailAddress || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(emailAddress)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      Alert.alert("Password Requirements", passwordValidation.message);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err: any) {
      // Handle specific Clerk errors
      let errorMessage = "An error occurred during sign up";

      if (err.errors && err.errors[0]) {
        const clerkError = err.errors[0];
        if (clerkError.code === "form_identifier_exists") {
          errorMessage = "An account with this email already exists";
        } else if (clerkError.code === "form_password_pwned") {
          errorMessage =
            "This password has been compromised. Please choose a different one.";
        } else if (clerkError.code === "form_password_length_too_short") {
          errorMessage = "Password is too short";
        } else {
          errorMessage = clerkError.message || errorMessage;
        }
      }

      Alert.alert("Sign Up Failed", errorMessage);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    if (!code) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    setLoading(true);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert("Error", "Verification failed. Please try again.");
      }
    } catch (err: any) {
      let errorMessage = "Invalid verification code";

      if (err.errors && err.errors[0]) {
        errorMessage = err.errors[0].message || errorMessage;
      }

      Alert.alert("Verification Failed", errorMessage);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification code to {emailAddress}
        </Text>

        <View style={styles.inputContainer}>
          <CustomInput
            label="Verification Code"
            iconName="verified"
            value={code}
            placeholder="Enter 6-digit code"
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            returnKeyType="done"
            onSubmitEditing={onVerifyPress}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onVerifyPress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verifying..." : "Verify Email"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={onSignUpPress}
          disabled={loading}
        >
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.inputContainer}>
        <CustomInput
          label="Email"
          iconName="email"
          value={emailAddress}
          placeholder="Enter your email"
          onChangeText={setEmailAddress}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
        />

        <CustomInput
          label="Password"
          iconName="lock"
          value={password}
          placeholder="Create a password"
          onChangeText={setPassword}
          secureTextEntry={true}
    
          autoComplete="password-new"
          textContentType="newPassword"
          returnKeyType="next"
        />

        <CustomInput
          label="Confirm Password"
          iconName="lock-outline"
          value={confirmPassword}
          placeholder="Confirm your password"
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
    
          autoComplete="password-new"
          textContentType="newPassword"
          returnKeyType="done"
          onSubmitEditing={onSignUpPress}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={onSignUpPress}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating Account..." : "Continue"}
        </Text>
      </TouchableOpacity>

      <View style={styles.signinContainer}>
        <Text style={styles.signinText}>Already have an account? </Text>
        <Link href="/signin" style={styles.signinLink}>
          <Text style={styles.signinLinkText}>Sign in</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#91627b",
    marginBottom: 10,
    textAlign: "center",
  },
    buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#91627b",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: "#d1b3c4",
    opacity: 0.7,
  },
  resendButton: {
    padding: 15,
    alignItems: "center",
  },
  resendText: {
    color: "#91627b",
    fontSize: 16,
    fontWeight: "600",
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signinText: {
    color: "#666",
    fontSize: 16,
  },
  signinLink: {
    padding: 5,
  },
  signinLinkText: {
    color: "#91627b",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
}); // import * as React from 'react'
// import { Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { useSignUp } from '@clerk/clerk-expo'
// import { Link, useRouter } from 'expo-router'

// export default function SignUpScreen() {
//   const { isLoaded, signUp, setActive } = useSignUp()
//   const router = useRouter()

//   const [emailAddress, setEmailAddress] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const [pendingVerification, setPendingVerification] = React.useState(false)
//   const [code, setCode] = React.useState('')

//   // Handle submission of sign-up form
//   const onSignUpPress = async () => {
//     if (!isLoaded) return

//     // Start sign-up process using email and password provided
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       })

//       // Send user an email with verification code
//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

//       // Set 'pendingVerification' to true to display second form
//       // and capture OTP code
//       setPendingVerification(true)
//     } catch (err) {
//       // See Clerk docs: custom flows error handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }

//   // Handle submission of verification form
//   const onVerifyPress = async () => {
//     if (!isLoaded) return

//     try {
//       // Use the code the user provided to attempt verification
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({
//         code,
//       })

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signUpAttempt.status === 'complete') {
//         await setActive({ session: signUpAttempt.createdSessionId })
//         router.replace('/')
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signUpAttempt, null, 2))
//       }
//     } catch (err) {
//       // See Clerk docs: custom flows error handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }

//   if (pendingVerification) {
//     return (
//       <>
//         <Text>Verify your email</Text>
//         <TextInput
//           value={code}
//           placeholder="Enter your verification code"
//           onChangeText={(code) => setCode(code)}
//         />
//         <TouchableOpacity onPress={onVerifyPress}>
//           <Text>Verify</Text>
//         </TouchableOpacity>
//       </>
//     )
//   }

//   return (
//     <View>
//       <>
//         <Text>Sign up</Text>
//         <TextInput
//           autoCapitalize="none"
//           value={emailAddress}
//           placeholder="Enter email"
//           onChangeText={(email) => setEmailAddress(email)}
//         />
//         <TextInput
//           value={password}
//           placeholder="Enter password"
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />
//         <TouchableOpacity onPress={onSignUpPress}>
//           <Text>Continue</Text>
//         </TouchableOpacity>
//         <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
//           <Text>Already have an account?</Text>
//           <Link href="/signin">
//             <Text className='text-red-500'>Sign in</Text>
//           </Link>
//         </View>
//       </>
//     </View>
//   )
// }
