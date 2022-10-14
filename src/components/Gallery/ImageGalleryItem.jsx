import React from "react";
import css from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = (({hitId, webformatURL, openModal}) => 
{
    return (
        <li className={css.item} onClick={() => openModal({hitId})}>
        <img className={css.image} src={webformatURL} alt=""/>
        </li>
    )
});

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
        hitId: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        openModal: PropTypes.func.isRequired,
    }
