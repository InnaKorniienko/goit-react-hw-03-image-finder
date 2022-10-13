import React from "react";
import styles from "./ImageGalleryItem.module.scss";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ hits, onClick }) => {
    const images = hits.map(({id, webformatURL, tags}) => 
    <li key={id} className={styles.item}>
        <img src={webformatURL} alt={tags} onClick={() => onClick({webformatURL})}/>
    </li>);

    return <ul className={styles.gallery}> {images} </ul>
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    hits:PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    }))
}