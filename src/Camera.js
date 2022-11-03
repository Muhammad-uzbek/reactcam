import React,{ useState, useEffect} from "react";
import { useParams, Routes, Route } from "react-router-dom";
import Webcam from "react-webcam";
import FormData from "form-data";
import './styles.css';

function Camera() {
    const { slug } = useParams();
    const webcamRef = React.useRef(null);
    const [imgSrcBefore, setImgSrcBefore] = React.useState(null);
    const [errrs, setErrrs] = React.useState(null);
    const [imgSrcAfter, setImgSrcAfter] = React.useState(null);
    const [step, setStep] = useState(1);
    const [user, setUser] = useState(null);
    const videoConstraints = {
            facingMode: { exact: "environment" },
            width: 1080,
            height: 720,
        };
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrcBefore(imageSrc);
        let fileOfImage = new File([imageSrc], "image.png", {
            type: "image/png",
        });
        console.log(fileOfImage);
        let formData = new FormData();
        formData.append("slug", slug);
        formData.append("demo_image", fileOfImage);
        setStep(2);
        fetch("/api/camera", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Success:", result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        // try {
        //     const response = axios.post(
        //         "/api/camera",
        //         formdata,
        //         {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         }
        //     );
        //     setErrrs(response.data);
        // } catch (error) {
        //     setErrrs(error.response.data);
        // }
    }, [webcamRef, setImgSrcBefore]);
    const capture2 = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setStep(3)
        setImgSrcAfter(imageSrc)
    }, [webcamRef, setImgSrcAfter]);

    const upload = async () => {
        // upload base64 image to server with axios
        console.log(imgSrcAfter);
        // try {
        //     const response = await axios.post(
        //         "/api/camera",
        //         formdata,
        //         {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         }
        //     );
        //     setErrrs(response.data);
        // } catch (error) {
        //     setErrrs(error.response.data);
        // }
    }

    useEffect(()=>{
        console.log(slug);
        fetch("https://merchendise-27vajn3fc-muhammad-uzbek.vercel.app/api/merch",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
        })
        .then(resp => resp.json())
        .then(response => {
            let finded = response.find(el=>{
                return el.userId == slug
            })
            setUser(finded || {fname:"Topilmadi"});
        });
    },[slug])
    return (
    <main className="cover">
        <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="camera"
        />  
        <div className="errs">
            {
                errrs && (
                    <p>
                        {JSON.stringify(errrs)}
                    </p>
                )
            }
        </div>
        <div className="cont">
            <div className="cont-bef imgs">
                <p>Photo before</p>
                {imgSrcBefore && (
                    <img
                        src={imgSrcBefore}
                    />
                )}
            </div>
            <div className="cont-bef camerabtn">
                {
                    step == 3 ? <button onClick={upload}>Upload</button> : <button onClick={step == 2 ? capture2 : capture} className="btn">{step}</button> 

                }
               
            </div>
            <div className="cont-bef imgs">
                <p>Photo after</p>
                {imgSrcAfter && (
                    <img
                        src={imgSrcAfter}
                    />
                )}
            </div>
        </div>
        <div className="userfound">
            Foydalanuvchi: {user ? user.fname : "Qidirilmoqda"}
        </div>
    </main>
    );
}

export default Camera;