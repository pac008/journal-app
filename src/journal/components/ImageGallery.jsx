import { ImageListItem, ImageList } from '@mui/material';


export const ImageGallery = ({images}) => {

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      { images.map((imageUrl) => (
        <ImageListItem key={imageUrl}>
          <img
            src={imageUrl}
            srcSet={imageUrl}
            alt="Imagen de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}