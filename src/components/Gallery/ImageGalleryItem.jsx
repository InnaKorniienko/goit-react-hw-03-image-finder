import React from "react";
import css from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({hit, onClick}) => 
{
    const {webformatURL, largeImageURL} = hit;
    return (
        <li className={css.item}>
        <img className={css.image} src={webformatURL} alt="" onClick={() => onClick(largeImageURL)}/>
        </li>
    )
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    hits: PropTypes.exact({
        id: PropTypes.string,
        webformatURL: PropTypes.string,
        largeImageURL: PropTypes.string,
    }),
    onClick: PropTypes.func.isRequired,
};