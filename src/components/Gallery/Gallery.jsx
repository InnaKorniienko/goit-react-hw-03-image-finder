import React, { Component } from "react";
import axios from "axios";
import Loader from "./Loader";
import ImageGalleryItem from "./ImageGalleryItem";

export default class Gallery extends Component {
    state = {
        hits: [],
        loading: false,
        error: null,
        page: 1,
    }
    
componentDidMount() {
    this.fetchGallery();
}

fetchGallery () {
    const { page } = this.state;
    this.setState ({
        loading: true
    })
console.log('fetchGallery');
axios.get(`https://pixabay.com/api/?q=cat&page=${page}&key=29162955-32e71cd5a6cadb845e07a1aad&image_type=photo&orientation=horizontal&per_page=12`)
.then(({ data }) => {
    this.setState(({ hits }) => {
        return {
            hits: [...hits, ...data.hits]
        }
    })
})
.catch(error => {
    this.setState({
        error
    })
})
.finally(() => this.setState({loading: false}))
}

 render() {
    const { hits, loading, error } = this.state;
    const isImage = Boolean(hits.length);
   return (<div>
    <p>Tralyaya</p>
    {loading && <Loader />}
    {error && <p> Please try later...</p>}
    {isImage && <ImageGalleryItem hits={hits}/>}
   </div>);
 }
}