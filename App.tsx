import React, { useEffect } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AxeptioEventListener, AxeptioService } from '@axeptio/react-native-sdk';
import AxeptioSDK from '@axeptio/react-native-sdk';



function App(): React.JSX.Element {
  useEffect(() => {
    async function init() {
      try {
        // Initialize the SDK with the desired service (brands or publishers)
        await AxeptioSDK.initialize(
          AxeptioService.brands, // or AxeptioService.tcfPublishers
        );

        const listener: AxeptioEventListener = {
          onPopupClosedEvent: () => {
            console.log('onPopupClosedEvent');
          },
         onConsentCleared: ()=> {
          console.log('onConsentCleared');
         },
          onGoogleConsentModeUpdate: _consents => {
            console.log('onGoogleConsentModeUpdate', _consents);
          },
        };

        AxeptioSDK.addListener(listener);
          await AxeptioSDK.setupUI();

        console.log("Axeptio SDK initialized successfully!");
      } catch (error) {
        console.error("Error initializing Axeptio SDK:", error);
      }
    }

    init();
  },[]);

  const getConsents = async() => {
   // Not available with current SDK Version
   // const consents = await AxeptioSDK.getConsentStatus();
  }
  return (
    <View style={styles.backgroundStyle}>
      <Text>Axeptio SDK React Native Tests</Text>
      <Button onPress={AxeptioSDK.showConsentScreen} title={'Show'}/>
      <Button onPress={getConsents} title={'Get consents'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
