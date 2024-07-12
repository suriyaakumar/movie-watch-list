import PropTypes from 'prop-types';

function Movie({ image, title, year, type }) {
    return (
        <div className="rounded overflow-hidden shadow-md">
            <img className="w-full h-10/12" src={image} alt="Placeholder" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block text-sm font-semibold text-gray-700 mr-2 mb-2">{year}</span>
                <span className="inline-block text-sm font-semibold text-gray-700 mr-2 mb-2">{type}</span>
            </div>
        </div>
    );
}

Movie.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Movie;