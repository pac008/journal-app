
export const fileUpload = async ( file ) => {
    // if ( !file ) throw new Error(' file no exists');
    if ( !file ) return null;
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dq13zbhoe/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })
        if ( !resp.ok ) throw new Error('the file cant be uploaded ');
        const cloudResp = await resp.json();
        return cloudResp.secure_url
    } catch (error) {
    //     console.log('err',error);
        
    //     throw new Error(error.message);
        return null;
    }
}
