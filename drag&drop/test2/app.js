import React, { useState } from 'react';
import { useDropZone } from 'react-dropzone';

function App(){
    const [yourImage, setImage] = useState([]);

    const{getRootProps, getInputProps, isDragActive} = useDropZone({
        accept : "image/*",
        onDrop : (acceptedFiles) => {
            setImage( acceptedFiles.map((upfile) =>
                Object.assign(upFile,
                    { preview : URL.createObjectURL(upfile) }
                ) )
            )
        }
    })

    return(
        <div className="App">
            <header className="App-header">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ? <p>Drop the Image here..</p> : <p>Drag & drop Image here || click to select Image</p>
                    }
                </div>
                <div>
                    {yourImage.map((upFile) =>{
                        return (
                            <div>
                                <img src={upFile.preview} style={{width:"600px", height:"400px", border: "3px solid black"}} alt="preview" />
                            </div>
                        )
                    })}
                </div>
            </header>
        </div>
    );
}

export default App;
