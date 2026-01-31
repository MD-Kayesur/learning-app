/* eslint-disable react/no-unescaped-entities */

import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import React from 'react'
import CustomInput from '../component/CustomInput'
 
export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    if (!emailAddress || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
        Alert.alert('Error', 'Sign in incomplete. Please try again.')
      }
    } catch (err: any) {
      // Handle specific Clerk errors
      let errorMessage = 'An error occurred during sign in'
      
      if (err.errors && err.errors[0]) {
        const clerkError = err.errors[0]
        if (clerkError.code === 'form_identifier_not_found') {
          errorMessage = 'Email not found'
        } else if (clerkError.code === 'form_password_incorrect') {
          errorMessage = 'Incorrect password'
        } else {
          errorMessage = clerkError.message || errorMessage
        }
      }
      
      Alert.alert('Sign In Failed', errorMessage)
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Welcome back! Please sign in to continue.</Text>

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
          placeholder="Enter your password"
          onChangeText={setPassword}
          secureTextEntry={true}
          autoComplete="password"
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={onSignInPress}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={onSignInPress}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Signing In...' : 'Continue'}
        </Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Link href="/signup" style={styles.signupLink}>
          <Text style={styles.signupLinkText}>Sign up</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#91627b',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#91627b',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#d1b3c4',
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 16,
  },
  signupLink: {
    padding: 5,
  },
  signupLinkText: {
    color: '#91627b',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
})













// import { useSignIn } from '@clerk/clerk-expo'
// import { Link, useRouter } from 'expo-router'
// import { Text, TextInput, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
// import { Kohana } from 'react-native-textinput-effects';
// export default function Page() {
//   const { signIn, setActive, isLoaded } = useSignIn()
//   const router = useRouter()

//   const [emailAddress, setEmailAddress] = React.useState('')
//   const [password, setPassword] = React.useState('')

//   // Handle the submission of the sign-in form
//   const onSignInPress = async () => {
//     if (!isLoaded) return

//     // Start the sign-in process using the email and password provided
//     try {
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       })

//       // If sign-in process is complete, set the created session as active
//       // and redirect the user
//       if (signInAttempt.status === 'complete') {
//         await setActive({ session: signInAttempt.createdSessionId })
//         router.replace('/')
//       } else {
//         // If the status isn't complete, check why. User might need to
//         // complete further steps.
//         console.error(JSON.stringify(signInAttempt, null, 2))
//       }
//     } catch (err) {
//       // See Clerk docs: custom flows error handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }

//   return (
//     <View>
//       <Text>Sign in</Text>
//       {/* <TextInput
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
//       /> */}


// <Kohana
//   style={{ backgroundColor: '#f9f5ed' }}
//   label={'Email'}
//   iconClass={MaterialsIcon}
//   iconName={'email'}
//   iconColor={'#f4d29a'}
//   inputPadding={16}
//   labelStyle={{ color: '#91627b' }}
//   inputStyle={{ color: '#91627b' }}
//   labelContainerStyle={{ padding: 20 }}
//   iconContainerStyle={{ padding: 20 }}
//   useNativeDriver
//   autoCapitalize="none"
//   value={emailAddress}
//   placeholder="Enter email"
//   onChangeText={(text) => setEmailAddress(text)}
// />








//       <TextInput
//         value={password}
//         placeholder="Enter password"
//         secureTextEntry={true}
//         onChangeText={(password) => setPassword(password)}
//       />
//       <TouchableOpacity onPress={onSignInPress}>
//         <Text>Continue</Text>
//       </TouchableOpacity>
//       <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
//         <Link href="/signup">
//           <Text>Sign up</Text>
//         </Link>
//       </View>
//     </View>
//   )
// }