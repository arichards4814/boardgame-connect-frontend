import React, { useState, useEffect } from 'react';
import TopNav from '../Components/TopNav'

import Button from '@material-ui/core/Button'

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import GamesIcon from '@material-ui/icons/Games';
import GroupIcon from '@material-ui/icons/Group';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'



    const FAQ = (props) => {
        return(
            <div>
                <TopNav history={props.history} />
                {/* <Container maxWidth="sm" > */}
                    <div className="faq-div-card">
                        <h1 className="faqs-header"> FAQs </h1>
                        <ul>
                            <li><h1>Why Board Game Connect!?</h1></li>
                            <ul>
                                <li className="li-faq"><h3>Because the world needs this right now!</h3></li>
                            </ul>
                            <li><h1>What games can I play!?</h1></li>
                            <ul>
                                <li className="li-faq"><h3>Any games you own or are able to use at home!</h3></li>
                            </ul>
                            <li><h1>Okay, sounds intersesting but who the heck came up with this!?</h1></li>
                            <ul>
                                <li className="li-faq"><h3>Andrew Richards and Miles Higbie!</h3></li>
                            </ul>
                            <li><h1>Who are those guys!?</h1></li>
                            <ul>
                                <li className="li-faq"><h3>They Software Enigneers helping the world one app at a time! Their Githubs are linked below!</h3></li>
                                    <ul>
                                        <li> <a href="https://github.com/arichards4814" target="_blank"> <h3> Andrew Richards </h3> </a> </li>
                                        <li> <a href="https://github.com/SatLibRe" target="_blank"> <h3> Miles Higbie </h3> </a> </li>
                                    </ul>
                            </ul>
                        </ul>
                    </div>
                {/* </Container> */}
            </div>
        )
    }

export default FAQ