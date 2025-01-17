import React from 'react';
import { render, screen } from 'test-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollerOverlayCard from "components/interactiveDataSources/scroller/scrollerOverlay/ScrollerOverlayCard";

describe('Scroller Overlay Card', () => {
    test('should display an icon, heading, content, and link', () => {
        render(<ScrollerOverlayCard
            icon={<FontAwesomeIcon title="font-awesome-icon" size="2x" icon="chart-area" />}
            heading={<p>hello</p>}
            content={<p>world</p>}
            link={<a href="https://www.usaspending.gov/">USAspending</a>} />);
        expect(screen.queryByTitle('font-awesome-icon')).toBeTruthy();
        expect(screen.queryByText('hello')).toBeTruthy();
        expect(screen.queryByText('world')).toBeTruthy();
        expect(screen.queryByText('USAspending')).toBeTruthy();
    });
});
