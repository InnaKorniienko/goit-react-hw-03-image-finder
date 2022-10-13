import React from "react";
import css from "./ImageGalleryItem.module.css";
// import PropTypes from "prop-types";

const ImageGalleryItem = ({ hits, onClick }) => {
    const images = hits.map(({id, webformatURL, tags}) => 
    <li key={id} className={css.item}>
        <img src={webformatURL} alt={tags} onClick={() => onClick({webformatURL})}/>
    </li>);

    return <ul className={css.gallery}> {images} </ul>
}

export default ImageGalleryItem;

// ImageGalleryItem.propTypes = {
//     hits:PropTypes.arrayOf(PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         webformatURL: PropTypes.string.isRequired,
//         tags: PropTypes.string.isRequired,
//         onClick: PropTypes.func.isRequired,
//     }))
// }