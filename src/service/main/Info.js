import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';

import Box from '../../components/Box';
import Text from '../../components/Text';
import Flex from '../../components/Flex';
import Image from '../../components/Image';

import ButtonAction from './layouts/ButtonAction';

import { color } from '../../config/theme';
import content from '../../assets/content.json';
import ImageMain from '../../assets/images/main.png';

const StyledMainImage = styled(Image)`
    width: 400px;
    height: 300px;

    @media (max-width: 900px) {
        width: 350px;
        height: 262px;
    }

    @media (max-width: 780px) {
        width: 300px;
        height: 225px;
    }
`;

const StyledInfoText = styled(Text)`
    color: ${color.black};
    font-size: 16px;
    padding: 8px 36px;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const StyledContentBlock = styled(Flex)`
    justify-content: center;
    width: 100vw;
`;

const StyledTitleEventFirst = styled(Text)`
    @media (max-width: 768px) {
        font-size: 52px;
    }
`;

const StyledTitleEvent = styled(Text)`
    padding: 40px 0px 12px;
    @media (max-width: 768px) {
        font-size: 20px;
        padding: 30px 0px 12px;
    }
`;

const InformationComp = ({ delay, content }) => (
    <FadeIn delay={delay} transitionDuration={500}>
        <StyledInfoText>{content}</StyledInfoText>
    </FadeIn>
);
InformationComp.propTypes = {
    delay: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
};

const Info = () => {
    return (
        <Flex justify="center" minWidth="375px" width="100vw">
            <Flex direction="column" minWidth="375px">
                <StyledContentBlock padding="16px 0 0">
                    <FadeIn delay={500} transitionDuration={1000}>
                        <StyledMainImage
                            src={ImageMain}
                            alt="main-page-image"
                        />
                    </FadeIn>
                </StyledContentBlock>
                <StyledContentBlock margin="4px 0">
                    <FadeIn delay={1000}>
                        <StyledTitleEventFirst
                            color={color.font}
                            fontSize="72px"
                            fontStyle="italic"
                        >
                            {content.main.title_event_first}
                        </StyledTitleEventFirst>
                    </FadeIn>
                    <FadeIn delay={1000}>
                        <StyledTitleEvent
                            color={color.font}
                            fontSize="28px"
                            fontStyle="italic"
                        >
                            {content.main.title_event}
                        </StyledTitleEvent>
                    </FadeIn>
                </StyledContentBlock>
                <StyledContentBlock>
                    <FadeIn delay={1000}>
                        <Box padding="16px 0 0">
                            <Text color={color.black}>
                                {content.main.section_1_notes_1}
                            </Text>
                            <Text color={color.black}>
                                {content.main.section_1_notes_2}
                            </Text>
                            <Text color={color.black} padding="16px 0 0">
                                {content.main.section_2_notes_1}
                            </Text>
                            <Text color={color.black} padding="0 0 16px">
                                {content.main.section_2_notes_2}
                            </Text>
                        </Box>
                    </FadeIn>
                </StyledContentBlock>
                <StyledContentBlock>
                    <Box
                        border="1px black solid"
                        borderBottom="1px black solid"
                        margin="8px 0 0"
                    >
                        <InformationComp
                            delay={1500}
                            content={content.main.time}
                        />
                        <InformationComp
                            delay={1800}
                            content={content.main.location}
                        />
                        <InformationComp
                            delay={2100}
                            content={content.main.address}
                        />
                    </Box>
                </StyledContentBlock>
                <StyledContentBlock margin="16px 0 36px">
                    <ButtonAction />
                </StyledContentBlock>
            </Flex>
        </Flex>
    );
};

export default Info;
