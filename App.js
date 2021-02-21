import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions, ScrollView} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector'

const {width, height} = Dimensions.get('window');
let defaultvalue = 0;

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const text = "Eye Ball identification of and creating boundary boxes particularly Using real time application of camera. It Detect you eye sight and change text size automatically. Its usefull for you reading purpose."

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState(false);
  const[eyesOpen, setEyesOpen] = useState(false);
  const[count, setCount] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);

  const faceDetected = ({faces}) => {
    // console.log(faces);
    if(faces && faces[0]){
      setFaces(true)
    }else{
      setFaces(false)
    }
    if(faces && faces[0] && faces[0].leftEyeOpenProbability && faces[0].leftEyeOpenProbability.toFixed() > '0'
    && faces && faces[0] && faces[0].rightEyeOpenProbability && faces[0].rightEyeOpenProbability.toFixed() > "0"){
      blinkFunction(1)
    }else if(faces && faces[0] && faces[0].leftEyeOpenProbability && faces[0].leftEyeOpenProbability.toFixed() == '0'
    && faces && faces[0] && faces[0].rightEyeOpenProbability && faces[0].rightEyeOpenProbability.toFixed() == "0"){
      blinkFunction(0)
    }
  }
  
  const blinkFunction = (data) => {
    if(defaultvalue === 0 && defaultvalue === data){
        setCount(count + 1)
        defaultvalue = 1;
    }else if(data === 1){
      defaultvalue = 0;
    }
  }

  useEffect(() => {
    if(count){
      console.log('sdkdbdl', count)
      if(count > 5){
        setCount(0);
      }
    }
    },[count])

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission !== true) {
    return <Text style={{fontSize: 20}}>No access to camera</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden} />
      <Camera
        style={{ flex: 1 }}
        type='front'
        onFacesDetected = {faceDetected}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.all,
          minDetectionInterval: 100,
          tracking: false,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            flexDirection: 'column',
          }}>
          <View style={{position: 'absolute', top: 0, height: 60, backgroundColor: "#61dafb", width: width}}>
            <View>
              <Text style={styles.header_style}>Eye Ball</Text>
            </View>
          </View>
          <View style={{ height: height - 50, position: 'absolute', top: 100}}>
            <ScrollView>
            {faces === false && <Text style={{fontSize: 20, fontWeight: 'bold'}}>No Face Fount</Text>}
          { faces === true && count === 0 && <Text style={{fontSize: 15, fontWeight: "bold"}}>{text}</Text>}
          { faces === true && count === 1 && <Text style={{fontSize: 25, fontWeight: "bold"}}>{text}</Text>}
          { faces === true && count === 2 && <Text style={{fontSize: 35, fontWeight: "bold"}}>{text}</Text>}
          { faces === true && count === 3 && <Text style={{fontSize: 45, fontWeight: "bold"}}>{text}</Text>}
          { faces === true && count === 4 && <Text style={{fontSize: 55, fontWeight: "bold"}}>{text}</Text>}
          {faces === true && count === 5 && <Text style={{fontSize: 65, fontWeight: "bold"}}>{text}</Text>}
          </ScrollView>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1'
  },
  buttonsContainer: {
    padding: 10
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8
  },
  header_style: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
    color: "#fff",
  }
});
