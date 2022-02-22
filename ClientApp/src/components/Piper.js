import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import './Piper.css'

export function Piper(props) {
    const [selectedAutoPipeResultFile, setSelectedAutoPipeResultFile] = useState();
    const [selectedAutoPipeInputFile, setSelectedAutoPipeInputFile] = useState();
    const [isResultFileSelected, setResultFileIsSelected] = useState(false);
    const [isInputFileSelected, setInputFileIsSelected] = useState(false);
    const [minHclpf, setMinHclpf] = useState(0);
    const [outputLog, setOutputLog] = useState("");

    const resultFileSelectHandler = (event) => {
        setSelectedAutoPipeResultFile(event.target.files[0]);
        setResultFileIsSelected(true);
    };

    const inputFileSelectHandler = (event) => {
        setSelectedAutoPipeInputFile(event.target.files[0]);
        setInputFileIsSelected(true);
    };

    // const minHclpfChangeHandler

    const submitHandler = () => {
        const formData = new FormData();
        formData.name = "some name";
        formData.append('AutoPipeResultFile', selectedAutoPipeResultFile);
        formData.append('AutoPipeInputFile', selectedAutoPipeInputFile);
        formData.append('MinHclpf', minHclpf);

        fetch(
            'https://localhost:44378/piper',
            {
                method: 'POST',
                body: formData,
            }
        )
            // .then(res => res.blob())
            .then(async (res) => {
                const blob = await res.blob();
                const newBlob = new Blob([blob]);

                const blobUrl = window.URL.createObjectURL(newBlob);

                // https://stackoverflow.com/questions/49286221/need-to-get-the-filename-from-a-file-downloaded-using-javascript-fetch-api
                const header = res.headers.get('content-disposition');
                const parts = header.split(';');
                const filename = parts[1].split('=')[1];

                const veryLongHeader = res.headers.get('VeryLongHeader');

                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', filename);
                // link.setAttribute('download');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                window.URL.revokeObjectURL(blob);

            })
            // .then( res => {
            //   var fileContent = "asdfasdfasdf";
            //   var bb = new Blob(res.body, { type: 'application/octet-stream"' });
            //   var a = document.createElement('a');
            //   a.download = 'download.mdb';
            //   a.href = window.URL.createObjectURL(bb);
            //   a.click();
            // })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Form>
            <FormGroup row>
                <Label for="autoPipeResultFile" sm={3}>AutoPipe Result File</Label>
                <Col sm={9}>
                    <Input type="file" name="autoPipeResultFile" id="autoPipeResultFile" onChange={resultFileSelectHandler} />
                    {isResultFileSelected ? (
                        <div>
                            <p>Filename: {selectedAutoPipeResultFile.name}</p>
                            <p>Filetype: {selectedAutoPipeResultFile.type}</p>
                            <p>Size in bytes: {selectedAutoPipeResultFile.size}</p>

                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )}
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="autoPipeInputFile" sm={3}>AutoPipe Input File</Label>
                <Col sm={9}><Input type="file" name="autoPipeResultFile" id="autoPipeInputFile" onChange={inputFileSelectHandler} />
                    {isInputFileSelected ? (
                        <div>
                            <p>Filename: {selectedAutoPipeInputFile.name}</p>
                            <p>Filetype: {selectedAutoPipeInputFile.type}</p>
                            <p>Size in bytes: {selectedAutoPipeInputFile.size}</p>
                            {/* <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p> */}
                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )}
                    <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                    </FormText>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="minHclpf" sm={3}>Minimální HCLPF</Label>
                <Col sm={9}>
                    <Input
                        id="minHclpf"
                        name="number"
                        placeholder="Minimální HCLPF"
                        type="number"
                        onChange = {event => setMinHclpf(event.target.valueAsNumber)}
                    />
                </Col>
            </FormGroup>
            <Button onClick={submitHandler}>Submit</Button>
            <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input type="textarea" name="text" id="exampleText" readOnly="true"/>
            </FormGroup>
        </Form>
    );
}