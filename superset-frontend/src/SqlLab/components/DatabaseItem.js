import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Collapse, ListGroup, ListGroupItem } from 'react-bootstrap';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

import {
    fetchDatabaseSchemas
} from '../actions/sqlLab';
import DatabaseSchemaItem from './DatabaseSchemaItem';

const propTypes = {
    schemas: PropTypes.array,
}

const defaultProps = {
    schemas: [],
}

function DatabaseItem(props) {
    const { promiseInProgress } = usePromiseTracker({area: props.db_name});
    const [open, setOpen] = useState(false);
    const schema_divs = (
        <ListGroup>
            {props.schemas && props.schemas.length
                ? props.schemas.map((schema, index) => {
                    return (<DatabaseSchemaItem
                        schema={schema}
                        databaseId={props.db_id} />);
                })
                : "No schemas"}
        </ListGroup>
    );

    return (
        <>
            <ListGroupItem action onClick={() => {
                if (!open) {
                    trackPromise(
                        props.fetchDatabaseSchemas(props.db_id, props.db_name),
                        props.db_name);
                }
                setOpen(!open);
            }}>
                <span>{props.db_name}</span>
                {promiseInProgress &&
                    <div
                        style={{
                            width: "100%",
                            height: "100",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Loader type="ThreeDots" color="#2BAD60" height="50" width="50" />
                    </div>}
            </ListGroupItem>
            <Collapse in={open && !promiseInProgress}>
                {schema_divs}
            </Collapse>
        </>
    );
}

DatabaseItem.defaultProps = defaultProps;
DatabaseItem.propTypes = propTypes;

function mapStateToProps(state, props) {
    const { sqlLab } = state;
    const schemas = sqlLab.schemasByDb ? sqlLab.schemasByDb[props.db_id] : [];
    return { sqlLab, ...props, schemas };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchDatabaseSchemas,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseItem);
