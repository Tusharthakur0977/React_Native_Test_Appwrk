# 🎧 Inscape Mobile App

An advanced, feature-rich audio streaming and meditation application built with React Native. The app delivers a seamless listening experience with background audio playback, offline downloads, and smooth, gesture-driven interactions. 

Designed with modern architectural patterns and optimized for performance, this project demonstrates deep technical competency in mobile audio processing, state management, and animated user interfaces.

## 🚀 Tech Stack

- **Core:** React Native (0.78), React (19.0)
- **State Management:** Redux Toolkit, Context API
- **Navigation:** React Navigation v7 (Native Stack, Bottom Tabs)
- **Audio Engine:** `react-native-track-player`
- **Animations & UI:** `react-native-reanimated` (v3), `@react-native-community/blur`, `react-native-fast-image`
- **Background Tasks & Notifications:** `@notifee/react-native`, `react-native-fs`, `react-native-file-access`
- **Networking:** Axios

## ⭐ Spotlight Feature: Universal Track Player & Background Download Manager

The most complex and technically demanding component of this application is the custom **UniversalTrackPlayer** combined with the background **PlayBackService**. Building a robust audio player in React Native requires bridging native iOS/Android audio capabilities while keeping the JavaScript thread perfectly synchronized for UI updates.

### How it works under the hood:
1. **Background Audio Processing:** Leveraging `react-native-track-player`, the app continues playing audio even when minimized or the device is locked. It fully integrates with the OS-level media controls (lock screen player, headphone buttons), listening to events like `RemotePause`, `RemoteNext`, and `RemoteSeek` directly from native threads via `PlayBackService`.
2. **Synchronous UI Animations:** The progress bar utilizes `react-native-reanimated` running on the UI thread. Instead of updating the progress bar state on the JS thread (which causes stuttering during heavy renders), it uses shared values and worklets to provide a buttery-smooth 60FPS seek bar that accurately reflects the exact audio position.
3. **Resilient Background Downloading:** Users can download tracks for offline listening. This relies on `react-native-fs` for file management and `@notifee/react-native` to create dedicated background download channels. When a download is initiated, it triggers an OS-level notification that updates the download progress in real-time, independent of the app's foreground state.

### Technical Challenges Overcome:
- **State Synchronization:** Keeping Redux state, Context API player state, and the native track player's internal state completely in sync without memory leaks or race conditions.
- **Performance Optimization:** Handling large audio files and rapid scrub-seeking without blocking the JavaScript thread, achieved by pushing heavy lifting to the native side and using Reanimated for visual feedback.
- **Offline Reliability:** Handling network interruptions during file downloads and gracefully managing filesystem paths across different Android/iOS sandboxes.

## 🛠 Features

- **Full-Fledged Audio Player:** Play, pause, skip, seek, shuffle, and track playback history through a robust backend integration.
- **Offline Mode:** Download tracks securely to the device's local storage and manage downloaded media through a dedicated library.
- **Mini Player:** A persistent, universally accessible mini-player that hovers above bottom tabs across all screens.
- **Secure Authentication:** Complete onboarding, login, sign-up, and OTP verification flows.
- **Custom UI Components:** From custom accordions and modals to keyboard-avoiding views, built entirely from scratch to ensure pixel-perfect fidelity and smooth performance.

## 💡 Why This Project Stands Out

Building a reliable media playback application is notoriously tricky in React Native due to the asynchronous nature of the bridge and the strict background execution limits of iOS and Android. 

This project stands out because it doesn't just use a basic UI library; it orchestrates a complex symphony of native modules (audio engines, file systems, local notifications) to create an experience that feels truly native. By successfully implementing a background download manager with live progress notifications and an audio player that effortlessly handles interruptions, lock-screen controls, and fluid animations, this application proves a high level of engineering maturity and a deep understanding of mobile system architecture.
