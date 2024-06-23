import './FirstDescriptionFragment.css';
import globalEarthImage from '../../resources/images/global-earth-2.jpg'

function FirstDescriptionFragment() {
    return (
        <div className="description-container">
            <div className="text-content">
                <h1>Generative Voice AI</h1>
                <p></p>
                <p>
                    Convert text to speech online for free with our AI voice generator. Create natural AI voices instantly in any language - perfect for video creators, developers, and businesses.
                </p>
            </div>
            <div className="image-content">
                <img src={globalEarthImage} alt="Description" />
            </div>
        </div>
    )
}

export default FirstDescriptionFragment