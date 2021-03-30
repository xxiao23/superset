
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Collapse, ListGroup, ListGroupItem } from 'react-bootstrap';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

import {
    fetchSchemaTables,
    fetchTableMetadata,
} from '../actions/sqlLab';

const propTypes = {
    tables: PropTypes.array,
}

const defaultProps = {
    tables: [],
}

function DatabaseSchemaItem(props) {
    const schema_id = `${props.databaseId}.${props.schema.value}`;
    const [open, setOpen] = useState(false);
    const { promiseInProgress } = usePromiseTracker({area: schema_id});
    const table_divs = (
        <ListGroup>
            {props.tables && props.tables.length
                ? props.tables.map((table, index) => {
                    return (
                        <ListGroupItem action onClick={() => {
                            props.fetchTableMetadata(props.databaseId, props.schema, table.value);
                        }}>
                            {table.value}
                        </ListGroupItem>
                    );
                })
                : "No tables"
            }
        </ListGroup>
    );
    return (
        <>
            <ListGroupItem action onClick={() => {
                if (!open) {
                    trackPromise(
                        props.fetchSchemaTables(props.databaseId, props.schema),
                        schema_id);
                }
                setOpen(!open);
            }}>
                <span>{props.schema.value}</span>
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
                {table_divs}
            </Collapse>
        </>
    );
}

DatabaseSchemaItem.defaultProps = defaultProps;
DatabaseSchemaItem.propTypes = propTypes;

function mapStateToProps(state, props) {
    const { sqlLab } = state;
    const tables = sqlLab.tablesByDbSchema
        ? sqlLab.tablesByDbSchema[`${props.databaseId}.${props.schema.value}`]
        : [];
    return { sqlLab, ...props, tables };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchSchemaTables,
            fetchTableMetadata,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseSchemaItem);
