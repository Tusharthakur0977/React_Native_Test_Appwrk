# Currency Converter Mobile App

A clean, responsive, and real-time currency conversion application built with React Native. Designed as a professional test project, this app provides accurate exchange rates while demonstrating modern architectural patterns, robust state management, and optimized user interactions.

## 🚀 Tech Stack

- **Core:** React Native (0.76.5), React (18.3.1)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`), React Redux
- **Navigation:** React Navigation v7 (Native Stack)
- **UI Components:** `react-native-element-dropdown`, `react-native-keyboard-aware-scroll-view`
- **Networking:** Native `fetch` with Redux Async Thunks (`createAsyncThunk`)

## ⭐ Spotlight Feature: Dynamic Currency Conversion Engine & State Synchronization

The most complex and technically impressive feature in this application is the unified `CustomInput` component coupled with the asynchronous Redux state engine. Building a highly responsive financial tool requires bridging user inputs, global state, and asynchronous API calls without causing UI stutter or API rate limiting.

### How it works under the hood:
1. **Debounced API Operations:** Instead of firing network requests on every single keystroke, the app leverages a custom debounce mechanism using `setTimeout` inside `useEffect` hooks. This ensures the app only fetches live currency data from the `exchangerate-api` when the user pauses typing, significantly optimizing network usage and performance.
2. **Memoized Conversion Logic:** The component relies on `useMemo` to tightly monitor the Redux store (`currencyData`, `currency1Value`, `currency2`). It dynamically computes the conversion rate in real-time, executing floating-point math against live API rates only when exact dependencies change, thereby preventing wasteful re-renders.
3. **Automated History Tracking:** Once a conversion is calculated and presented, a secondary debounced side-effect automatically dispatches a `setHistory` action to the Redux store. It performs deep validation against the store array to ensure duplicate conversion logs aren't recorded, keeping the history accurate and clean.

### Technical Challenges Overcome:
- **Unified Component Architecture:** Architecting a single `CustomInput` component that dynamically acts as both the user input ("From" currency) and the computed output ("To" currency) based on its props. This required intricate conditional rendering and tight integration with Redux.
- **State Synchronization:** Maintaining perfect harmony between local component state (numerical validation, error flags) and the global Redux state (selected currencies, input values, API responses) without introducing memory leaks or infinite render loops.
- **Data Validation:** Handling edge cases where users input invalid string characters into numeric fields by gracefully intercepting the keystrokes, flagging errors, and preventing corrupted data from entering the Redux store.

## 🛠 Features

- **Real-Time Exchange Rates:** Interacts with a live API to pull the most up-to-date conversion data globally.
- **Conversion History Logging:** Automatically records user conversions, persisting them in a dedicated history tracker for easy reference.
- **Accessible UI:** Utilizes `react-native-keyboard-aware-scroll-view` to guarantee that input fields are never obscured by the device's native keyboard.
- **Dynamic Dropdowns:** Features a clean, search-ready dropdown UI to quickly select between dozens of supported global currencies.

## 💡 Why This Project Stands Out

This project stands out because it prioritizes engineering fundamentals over relying on heavy, monolithic libraries. It implements a highly controlled data flow architecture using Redux Toolkit and React hooks to handle complex asynchronous behaviors natively. By successfully navigating the nuances of dynamic component rendering, debounced API calls, and global state synchronization, this application demonstrates a strong command of React Native's lifecycle and a deep understanding of mobile performance optimization.
