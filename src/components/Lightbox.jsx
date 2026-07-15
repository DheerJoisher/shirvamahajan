import { useEffect } from 'react';

function Lightbox({ galleryItems, galleryIndex, onClose, onPrevious, onNext }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') onNext();
      else if (event.key === 'ArrowLeft') onPrevious();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [onClose, onNext, onPrevious]);
  const item = galleryItems[galleryIndex];
  return <div className="lightbox open" role="dialog" aria-modal="true" aria-label="Image preview" tabIndex="-1" onClick={(event) => event.target === event.currentTarget && onClose()}><div className="lightbox-content"><img src={item.full} alt={item.alt} /><div className="lightbox-caption"><div>{item.caption}</div><div className="lightbox-controls"><button type="button" aria-label="Show previous image" onClick={onPrevious}>←</button><button type="button" aria-label="Show next image" onClick={onNext}>→</button><button type="button" className="lightbox-close" aria-label="Close image preview" onClick={onClose}>×</button></div></div></div></div>;
}

export default Lightbox;
