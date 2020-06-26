import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
// import dynamic from "next/dynamic"
// import { Container } from "@material-ui/core"
// const FileViewer = dynamic(() => import("react-file-viewer"), {
//   ssr: false
// })
import FileViewer from 'react-file-viewer'

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
}
const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #EAEAEA",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
}
const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
}
const img = {
  display: "block",
  width: "auto",
  height: "100%"
}
const dropzone = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px",
  padding: "20px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: " ${props => getColor(props)}",
  borderStyle: "dashed",
  backgroundColor: "#FAFAFA",
  color: "#BDBDBD",
  outline: "none"
}
export default function Drop(props) {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    }
  })
  const thumbs = files.map(file => (
    <div key={file.name}>
      <FileViewer
        filePath={file.preview}
        fileType={file.name.split(".").pop()}
      />
    </div>
  ))
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])
  return (
    <div>
      <section>
        <div style={dropzone} {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div style={{ width: "100%", height: "50vh" }}>
          <span style={dropzone}>
            {" "}
            {thumbs}
          </span>
        </div>
      </section>
    </div>
  )
}
