import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    file: PropTypes.string
};

const AgencyDownloadLinkCell = ({ file }) => {
    return file ? (
        <a
            className="agency-table-download"
            target="_blank"
            href={file}
            rel="noopener noreferrer"
            aria-label="Raw quarterly submission files">
            <FontAwesomeIcon icon="file-alt" />Download
        </a>
    ) : '--';
}

AgencyDownloadLinkCell.propTypes = propTypes;
export default AgencyDownloadLinkCell;
