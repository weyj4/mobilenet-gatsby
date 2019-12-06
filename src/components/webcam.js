import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const MOBILENET_MODEL_PATH =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

function Webcam() {
  const [result, setResult] = useState({});
  const [model, setModel] = useState('');
  const [webcam, setWebcam] = useState('');
  const [webcamRef, setWebcamRef] = useState(React.createRef());

  // constructor(props) {
  //   super(props);
  //   this.webcamRef = React.createRef();
  // }

  useEffect(() => {
    async function setUp() {
      const model = await mobilenet.load();
      const webcam = await tf.data.webcam(document.getElementById('webcam'));
      setModel(model);
      setWebcam(webcam);
      while (true) {
        const img = await webcam.capture();
        const result = await model.classify(img);
        console.log(`result: ${JSON.stringify(result)}`);
        document.getElementById('prediction').innerText = `
          prediction: ${result[0].className}\n
          probability: ${result[0].probability}`;
        setResult(result);
        img.dispose();
        await tf.nextFrame();
      }
    }

    setUp();
  }, [])

  useEffect(() => {
    async function run() {

    }

    run();
  }, [])

  return (
    <>
      <video 
        autoPlay 
        playsInline 
        muted 
        id="webcam" 
        width="224" 
        height="224"
      ></video>
      <div id='prediction'></div>
    </>
  )
}

Webcam.propTypes = {}

export default Webcam