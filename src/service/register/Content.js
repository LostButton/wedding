import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Select from 'react-select';
import { BsGeoAlt, BsCalendarEvent } from 'react-icons/bs';

import Box from '../../components/Box';
import Input, { StyleTextarea } from '../../components/Input';
import Flex from '../../components/Flex';
import Text from '../../components/Text';
import Image from '../../components/Image';
import { ReportButton, LinkOuterButton } from '../../components/Button';

import {
    RELATION,
    JOIN,
    INVITE,
    PEOPLE,
    VEGETARIAN,
    CHILD
} from '../../config/register';
import { color } from '../../config/theme';
import { URL } from '../../config/common';
import { validateTel } from '../../utils/validation';

import content from '../../assets/content.json';
import ImageMain from '../../assets/images/finished.png';

export const InputBlock = styled(Flex)`
    width: inherit;
    justify-content: center;
    flex-direction: column;
    padding: 8px 0;
`;

export const InputTitle = styled(Flex)`
    width: inherit;
    justify-content: center;
    font-size: 16px;
    padding: 6px 0 8px;

    &&::after {
        content: '${(props) => (props.optional ? '' : '*')}';
        color: ${color.warning};
    }
`;

export const InputField = styled(Flex)`
    justify-content: center;
    width: inherit;
    padding-bottom: 8px;
`;

const StyledSelect = styled(Select)`
    & {
        width: 290px;
    }
`;

export const ValidationInput = ({
    keyValue,
    value,
    validationFlag,
    validationWarning,
    onInput,
    placeholder
}) => {
    return (
        <Flex direction="column">
            <Input
                name={keyValue}
                value={value}
                width="290px"
                onChange={onInput}
                borderColor={validationFlag ? color.disable : color.warning}
                placeholder={placeholder}
            />
            {!validationFlag && (
                <Text color={color.warning}>{validationWarning}</Text>
            )}
        </Flex>
    );
};
ValidationInput.propTypes = {
    keyValue: PropTypes.string.isRequired,
    value: PropTypes.string,
    validationFlag: PropTypes.bool.isRequired,
    validationWarning: PropTypes.string.isRequired,
    onInput: PropTypes.func.isRequired
};

const InputTitleComp = ({ title, notes }) => {
    return (
        <Flex direction="column" width="100vw">
            <InputTitle>{title}</InputTitle>
            {notes && (
                <Flex justify="center" width="100vw">
                    <Text color={color.black}>{notes}</Text>
                </Flex>
            )}
        </Flex>
    );
};

const Content = ({ page, answer, setAnswer }) => {
    const [validName, setValidName] = useState(true);
    const [validTel, setValidTel] = useState(true);

    const updateAnswerValue = (name, value) => {
        setAnswer({
            ...answer,
            [name]: value
        });
    };

    const onSelect = (newValue, actionMeta) => {
        const { name } = actionMeta;
        setAnswer({
            ...answer,
            [name]: newValue?.value
        });
    };

    const onInput = (e) => {
        const { name, value } = e?.target || {};
        updateAnswerValue(name, value);
    };

    const onInputName = (e) => {
        const { name, value } = e?.target || {};
        const formattedValue = value?.trim();

        setValidName(!(formattedValue.length === 0));
        updateAnswerValue(name, formattedValue);
    };

    const onInputTel = (e) => {
        const { name, value } = e?.target || {};
        const formattedValue = value?.trim();

        setValidTel(validateTel(formattedValue));
        updateAnswerValue(name, formattedValue);
    };

    const {
        name,
        relation,
        join,
        invitation,
        address,
        people,
        vegetarian,
        child,
        tel,
        notes
    } = answer;

    return (
        <Flex justify="center" direction="column" width="100vw">
            {page === 0 && (
                <>
                    <InputBlock
                        padding={validName ? '28px 8px' : '28px 8px 11px'}
                    >
                        <InputTitle>
                            {content.register.content.title_name}
                        </InputTitle>
                        <InputField>
                            <ValidationInput
                                keyValue="name"
                                value={name}
                                validationFlag={validName}
                                validationWarning={
                                    content.register.validation.name
                                }
                                onInput={onInputName}
                            />
                        </InputField>
                    </InputBlock>
                    <InputBlock>
                        <InputTitle>
                            {content.register.content.title_relation}
                        </InputTitle>
                        <InputField>
                            <StyledSelect
                                name="relation"
                                value={RELATION.find(
                                    (r) => r.value === relation
                                )}
                                options={RELATION}
                                onChange={onSelect}
                            />
                        </InputField>
                    </InputBlock>
                    <InputBlock>
                        <InputTitle>
                            {content.register.content.title_join}
                        </InputTitle>
                        <InputField>
                            <StyledSelect
                                name="join"
                                value={JOIN.find((r) => r.value === join)}
                                options={JOIN}
                                onChange={onSelect}
                            />
                        </InputField>
                    </InputBlock>
                    <InputBlock>
                        <InputTitle>
                            {content.register.content.title_invitation}
                        </InputTitle>
                        <InputField>
                            <StyledSelect
                                name="invitation"
                                value={INVITE.find(
                                    (r) => r.value === invitation
                                )}
                                options={INVITE}
                                onChange={onSelect}
                            />
                        </InputField>
                    </InputBlock>
                    {(invitation === 0 || invitation === 1) && (
                        <InputBlock margin="0 0 20px">
                            <InputTitle>
                                {invitation === 0 &&
                                    content.register.content.title_address}
                                {invitation === 1 &&
                                    content.register.content.title_email}
                            </InputTitle>
                            <InputField>
                                <Input
                                    name="address"
                                    value={address}
                                    width="290px"
                                    onChange={onInput}
                                />
                            </InputField>
                        </InputBlock>
                    )}
                </>
            )}
            {page === 1 && (
                <>
                    <InputBlock>
                        <InputTitleComp
                            title={content.register.content.title_people}
                            notes={content.register.content.title_people_notes}
                        />
                        <InputField>
                            <StyledSelect
                                name="people"
                                value={PEOPLE.find((r) => r.value === people)}
                                options={PEOPLE}
                                onChange={onSelect}
                            />
                        </InputField>
                    </InputBlock>
                    <InputBlock>
                        <InputTitle>
                            {content.register.content.title_vegetarian}
                        </InputTitle>
                        <InputField>
                            <StyledSelect
                                name="vegetarian"
                                value={VEGETARIAN.find(
                                    (r) => r.value === vegetarian
                                )}
                                options={VEGETARIAN.filter(
                                    (v) => v.value <= people
                                )}
                                onChange={onSelect}
                                isDisabled={people === undefined}
                            />
                        </InputField>
                    </InputBlock>
                    <InputBlock>
                        <InputTitle>
                            {content.register.content.title_child}
                        </InputTitle>
                        <InputField>
                            <StyledSelect
                                name="child"
                                value={CHILD.find((r) => r.value === child)}
                                options={CHILD.filter((v) => v.value <= people)}
                                onChange={onSelect}
                                isDisabled={people === undefined}
                            />
                        </InputField>
                    </InputBlock>
                </>
            )}
            {page === 2 && (
                <>
                    <InputBlock
                        padding={validTel ? '28px 8px' : '28px 8px 11px'}
                    >
                        <InputTitleComp
                            title={content.register.content.title_tel}
                            notes={content.register.content.title_tel_notes}
                        />
                        <InputField>
                            <ValidationInput
                                keyValue="tel"
                                value={tel}
                                validationFlag={validTel}
                                validationWarning={
                                    content.register.validation.tel
                                }
                                onInput={onInputTel}
                                placeholder={
                                    content.register.content.title_tel_example
                                }
                            />
                        </InputField>
                    </InputBlock>
                    <InputBlock>
                        <InputTitle optional={true}>
                            {content.register.content.title_notes}
                        </InputTitle>
                        <InputField>
                            <StyleTextarea
                                width="280px"
                                height="200px"
                                onChange={onInput}
                                value={notes}
                                name="notes"
                            />
                        </InputField>
                    </InputBlock>
                </>
            )}
            {page === 3 && (
                <Flex direction="column">
                    <Text fontSize="24px" padding="12px">
                        {content.register.content.title_confirm}
                    </Text>
                    <Box padding="12px">
                        <Box padding="4px">
                            {content.register.content.title_name} {name}
                        </Box>
                        <Box padding="4px">
                            {content.register.content.title_relation}{' '}
                            {RELATION[relation].label}
                        </Box>
                        <Box padding="4px">
                            {content.register.content.title_join}{' '}
                            {JOIN[join ? 0 : 1].label}
                        </Box>
                        <Box padding="4px">
                            {content.register.content.title_invitation}{' '}
                            {INVITE[invitation].label}
                        </Box>
                        {address && invitation === 0 && (
                            <Box padding="4px">
                                {content.register.content.title_address}{' '}
                                {address}
                            </Box>
                        )}
                        {address && invitation === 1 && (
                            <Box padding="4px">
                                {content.register.content.title_email} {address}
                            </Box>
                        )}
                        {people && (
                            <Box padding="4px">
                                {content.register.content.title_people} {people}
                            </Box>
                        )}
                        {vegetarian !== undefined && (
                            <Box padding="4px">
                                {content.register.content.title_vegetarian}{' '}
                                {vegetarian}
                            </Box>
                        )}
                        {child !== undefined && (
                            <Box padding="4px">
                                {content.register.content.title_child} {child}
                            </Box>
                        )}
                        <Box padding="4px">
                            {content.register.content.title_tel} {tel}
                        </Box>
                        <Box padding="4px">
                            {content.register.content.title_notes}{' '}
                            {notes || 'N/A'}
                        </Box>
                    </Box>
                </Flex>
            )}
            {page === 4 && (
                <>
                    <Flex
                        justify="center"
                        width="inherit"
                        padding="20px 0 12px"
                    >
                        <Image
                            width="260px"
                            src={ImageMain}
                            boxShadow="0px 0px 8px black"
                            alt="final-image"
                        />
                    </Flex>
                    <Flex justify="center" width="inherit">
                        <Text
                            fontSize="20px"
                            padding="8px 0"
                            color={color.highlight}
                        >
                            {content.register.content.final_content}
                        </Text>
                    </Flex>{' '}
                    <Flex justify="center" width="inherit">
                        <Text
                            fontSize="18px"
                            padding="4px"
                            color={color.highlight}
                        >
                            {content.register.content.final_content_cont}
                        </Text>
                    </Flex>
                    <Flex justify="center" width="inherit">
                        <Text fontSize="22px" padding="8px" color={color.black}>
                            {content.register.content.final_title}
                        </Text>
                    </Flex>
                    <Flex justify="center" width="inherit">
                        <Flex direction="column">
                            <Text color={color.black} padding="4px">
                                {content.main.time}
                            </Text>
                            <Text color={color.black} padding="4px">
                                {content.main.location}
                            </Text>
                            <Text color={color.black} padding="4px">
                                {content.main.address}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex justify="center" width="inherit" padding="8px 0 16px">
                        <LinkOuterButton
                            href={URL.MAP}
                            target="_blank"
                            rel="noreferrer"
                            width="140px"
                        >
                            <Flex justify="center">
                                <BsGeoAlt />
                                <Box padding="0 4px">
                                    {content.register.content.final_map}
                                </Box>
                            </Flex>
                        </LinkOuterButton>
                        <LinkOuterButton
                            href={URL.EVENT}
                            target="_blank"
                            rel="noreferrer"
                            width="140px"
                        >
                            <Flex justify="center" width="130px">
                                <BsCalendarEvent />
                                <Box padding="0 4px">
                                    {content.main.button_event}
                                </Box>
                            </Flex>
                        </LinkOuterButton>
                    </Flex>
                </>
            )}
            {page === 5 && (
                <Flex direction="column">
                    <Text fontSize="20px" padding="12px" color={color.black}>
                        {content.register.content.error_title}
                    </Text>
                    <Text fontSize="16px" padding="12px" color={color.black}>
                        {content.register.content.error_content}
                    </Text>
                    <Box padding="12px">
                        <ReportButton />
                    </Box>
                </Flex>
            )}
        </Flex>
    );
};

Content.propTypes = {
    answer: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    setAnswer: PropTypes.func.isRequired
};

export default Content;
