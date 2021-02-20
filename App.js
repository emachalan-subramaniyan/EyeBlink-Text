import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector'

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([])
  const[eyesOpen, setEyesOpen] = useState(false);
  const[count, setCount] = useState(null);

  const faceDetected = ({faces}) => {
    setFaces(faces) // instead of setFaces({faces})
    console.log(faces && faces[0] && faces[0].leftEyeOpenProbability.toFixed(),  faces && faces[0] && faces[0].rightEyeOpenProbability.toFixed())
    if(faces && faces[0] && faces[0].leftEyeOpenProbability.toFixed() > '0' && faces && faces[0] && faces[0].rightEyeOpenProbability > "0"){
      // if(faces && faces[0] && faces[0].leftEyeOpenProbability.toFixed() == '0' && faces && faces[0] && faces[0].rightEyeOpenProbability == "0"){
        setCount(count + 1)
      // }
      
    }else if(faces && faces[0] && faces[0].leftEyeOpenProbability.toFixed() == '0' && faces && faces[0] && faces[0].rightEyeOpenProbability.toFixed() == "0"){
      console.log('hai')
    }
  }

  useEffect(() => {
    if(count){
      console.log('sdkdbdl', count)
    }
    },[count])

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={{ flex: 1 }}>
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
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          {faces[0] && <Text style= {{top:200}}> is {faces[0].rollAngle} </Text>}
        </View>
      </Camera>
    </View>
  );
}