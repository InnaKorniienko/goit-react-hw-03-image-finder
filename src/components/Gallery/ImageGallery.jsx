import React, { Component } from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from "./ImageGalleryItem";
import css from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
 render() {
    const { hits, openModal } = this.props;
   return (<ul className={css.gallery}>
    {hits.map(({ id, webformatURL }) => (<ImageGalleryItem key={id} hitId={id} webformatURL={webformatURL} openModal={openModal}/>))}
   </ul>);
 }
}

ImageGallery.propTypes = {
    hits: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            webformatURL: PropTypes.string.isRequired,
        })
    ),
openModal: PropTypes.func.isRequired,
}

