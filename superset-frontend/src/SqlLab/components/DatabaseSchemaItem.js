
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Collapse, ListGroup, ListGroupItem } from 'react-bootstrap';

import {
    fetchSchemaTables,
} from '../actions/sqlLab';

const propTypes = {
    tables: PropTypes.array,
}

const defaultProps = {
    tables: [],
}

function DatabaseSchemaItem(props) {
    const [open, setOpen] = useState(false);
    const table_divs = (
        <ListGroup>
            {props.tables && props.tables.length
                ? props.tables.map((table, index) => {
                    return <ListGroupItem>{table.value}</ListGroupItem>
                })
                : "No tables"
            }
        </ListGroup>
    );
    return (
        <>
            <ListGroupItem action onClick={() => {
                setOpen(!open);
                props.fetchSchemaTables(props.databaseId, props.schema);
            }}>
                {props.schema.value}
            </ListGroupItem>
            <Collapse in={open}>
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
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseSchemaItem);
