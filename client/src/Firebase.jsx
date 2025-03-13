import { storage } from './firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
const { useState } = require("react")

function Firebase() {

    const [imageUpload, setImageUpload] = useState(null)

    const upload = () => {
        if(imageUpload==null) return
        const imageRef = ref(storage, `b2b/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image uploaded")
        })
    }

    return (
        <div className="App" style={{marginTop: "200px"}}>
            <input type="file" 
            onChange={(event) => 
            {setImageUpload(event.target.files[0])}}/>
            <button onClick={upload}>Upload Image</button>
        </div>
    )
}

export default Firebase