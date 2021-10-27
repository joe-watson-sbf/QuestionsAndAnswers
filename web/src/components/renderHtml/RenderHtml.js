import React from 'react'

/**
 * @reference  https://reactjs.org/docs/dom-elements.html
 */

const RenderHtml = ({data, tag}) => {
    switch (tag) {
        case 'p':
            return <p dangerouslySetInnerHTML={{ __html: data }} />
        case 'h1':
            return <h1 dangerouslySetInnerHTML={{ __html: data }} />
        case 'h2':
            return <h2 dangerouslySetInnerHTML={{ __html: data }} />
        case 'h3':
            return <h2 dangerouslySetInnerHTML={{ __html: data }} />
        case 'small':
            return <small dangerouslySetInnerHTML={{ __html: data }} />
        default:
            return <div dangerouslySetInnerHTML={{ __html: data }} />
    }    
}

export default RenderHtml
