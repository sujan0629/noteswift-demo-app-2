// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/onboarding/Login/login" />;
}