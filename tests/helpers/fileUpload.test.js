import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dq13zbhoe',
    api_key: '744385457882783',
    api_secret: '0Mza0qSt25tOG7yhM8rRvRbMFrI',
    secure: true
});

describe('test in fileUpload', () => { 
    test('should upload the file correctly', async () => { 
        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto,jpg')
        const url = await fileUpload(file);

        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1 ].replace('.jpg', '');
        
        await cloudinary.api.delete_resources(['journal-app/' + imageId]);

     });

    test('should return null if there ara an error', async () => { 
        const file = new File([], 'foto,jpg')
        const url = await fileUpload(file);
        expect( url ).toBe(null);
     });
 })