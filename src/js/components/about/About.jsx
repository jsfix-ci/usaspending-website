/**
 * About.jsx
 * Created by Destin Frasier 03/30/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import MastHead from './MastHead';
import Overview from './Overview';
import AboutData from './AboutData';
import NextSteps from './NextSteps';
import Introduction from './Introduction';


export default class About extends React.Component {
    render() {
        return (
            <div className="usa-da-about-page">
                <Header />
                <MastHead />
                <Introduction />
                <Overview />
                <AboutData />
                <div className="usa-da-about-inner">
                    <NextSteps />
                </div>
                <Footer />
            </div>
        );
    }
}
