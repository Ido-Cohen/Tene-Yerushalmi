import React, {useState} from 'react';

const AddGroup = () => {
    // const csv2json = require('../csv2json.js');

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    var regex = new RegExp("(.*?)\.(csv)$");
    const changeHandler = (event) => {
        if (!(regex.test(event.target.value.toLowerCase()))) {
            event.target.value = '';
            alert('Please select correct file format');
            setIsFilePicked(false);
            return;
        }

        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {
        if (!isFilePicked){
            alert("please select file");
            return;
        }
        // console.log(selectedFile);
        var reader = new FileReader();
        reader.readAsText(selectedFile);
        let fileText;
        reader.onload = function () {
            fileText = reader.result;
            fileText = fileText.substring(fileText.indexOf("Name"));
            fileText = fileText.substring(0, fileText.indexOf(",,,,,,,,,,,,,,,,"));
            fileText = fileText.replace("Name", "firstName");
            fileText = fileText.replace("משפחה", "lastName");
            fileText = fileText.replace("מין", "gen");
            fileText = fileText.replace("פלאפון", "number");
            fileText = fileText.replace("כתובת של ההורים (Text)", "parentsAddress");
            fileText = fileText.replace("מקום מגורים נוכחי", "address");
            fileText = fileText.replace("מייל", "email");
            fileText = fileText.replace("לימודים", "studies");

            const csv2json = require('csvjson-csv2json');
            const json = csv2json(fileText, {parseNumbers: true});
            console.log(json);
        }
    };
    return(
        <div className={"container"}>


            <form className={"white right-align"}>
                <h5 className={"grey-text text-darken-3"}>הוספת קבוצה</h5>
                <div className={"input-field"}>
                    <input type={"file"} name={"file"} accept={".csv"} onChange={changeHandler} />
                </div>
                <div>
                    <div onClick={handleSubmission} className={"btn orange lighten-1 z-depth-0"}>טעינה</div>
                </div>

            </form>
        </div>
    );
}

export default AddGroup;