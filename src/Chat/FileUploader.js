import { useRef } from "react";
import { Button } from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";
// import FileBase from "react-file-base64";


const FileUploader = ({ handleFile }) => {
    // Create a reference to the hidden file input element
    const hiddenFileInput =  useRef(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (event) => {
       hiddenFileInput.current.click();
    };

    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = async (event) => {
       const fileUploaded = event.target.files[0];
       const base64File = await convertBase64(fileUploaded);
       handleFile(base64File);
    };

    const convertBase64 = (file) => {
// Promise is a wrapper around a value that may or may not be known when the
// object is instantiated and provides a method for handling the value after
// it is known (resolve) or is unavailable for a failure reason (reject)
// used when the code can take some time to do something 
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);// reads data from file

            fileReader.onload = () => { // onload is an event handler which is firred when the data is read
                resolve(fileReader.result);
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }

    return (
        <>
            <Button onClick={handleClick}>
                <AttachFile />
                {/* <FileBase type="file" multiple={false}  onDone={(base64) => handleFile(base64)} /> */}
            </Button>
            <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display: 'none'}} />
        </>
    );
}

export default FileUploader;